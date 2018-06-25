const Analytics = require('electron-google-analytics');
const EventEmitter = require('events');
const Ping = require('ping-lite');
const dns = require('dns-socket');
const timers = require('timers');
const resolv = require('resolv');
const path = require('path');
const fs = require('fs');

const config_file_path = path.join(__dirname, './../../config/', 'servoy.json');
const config = JSON.parse(fs.readFileSync(config_file_path, 'utf8'));
const analytics = new Analytics.default(config.options.anaylitcs_tracking_code);

const dnsLatency = (hostname, dnsSocket) =>
  new Promise((resolve, reject) => {
    const nameserver = resolv().nameserver[0];
    const query = { questions: [{ type: 'A', name: hostname }] };
    const dnsStartMs = +(new Date());
    dnsSocket.query(query, 53, nameserver, error =>
      error ? reject(error) : resolve(+(new Date()) - dnsStartMs));
  }
);

const pingLatency = (address) =>
  new Promise((resolve, reject) =>
    new Ping(address).send((error, latencyMs) =>
      error ? reject(error) : resolve(Math.round(latencyMs))
    )
);

const minToMs = (minutes) => {
    return ((minutes * 60) * 1000);
};

const timeout = (promise, timeoutMs) => {
  let timer = null;
  const clearTimeout = () => timers.clearTimeout(timer);
  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      timer = setTimeout(() => reject(new Error('timed out')), timeoutMs);
    })
  ])
  .then(value => { clearTimeout(); return value; })
  .catch(error => { clearTimeout(); throw error; });
};

const checkLatencies = ({ hostname, address, timeoutMs, dnsSocket }) =>
  Promise.all([
    dnsLatency(hostname, dnsSocket).catch(() => null),
    timeout(pingLatency(address), timeoutMs).catch(() => null)
  ]);

const networkStatus = (options) => {
  const latencies = new EventEmitter();
  options.dnsSocket = dns({ timeout: options.timeoutMs });
  const emitLatencies = () => checkLatencies(options)
    .then(([dns, ping]) =>
      latencies.emit('latencies', {dns, ping})
    );
  emitLatencies();
  setInterval(emitLatencies, options.intervalMs);
  return latencies;
};

function sendAnalytics(ping, dns){
   return analytics.send('latency', { dns: dns, ping: ping})
  .then((response) => {
    console.log(response);
    return response;
  }).catch((err) => {
    console.log(err);
    return err;
  });
}

function startNetworkManager(hostname, address){
  const time = minToMs(1);
  networkStatus({
    timeoutMs: time,
    intervalMs: time,
    hostname: hostname,
    address: address
  }).on('latency', ({dns, ping}) => {
    sendAnalytics(ping, dns);
  });
};

module.exports = {
  startNetworkManager
}
