const axios = require('axios');
const cheerio = require('cheerio');
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1)' +
'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36';

/**
 * Interpretation of the title
 * @return {String} title
 */
function interpretTitle(url) {
  const options = {
    method: 'get',
    url,
    headers: {
       // fake a user agent because some pages will throw a 404 error
      'User-Agent': USER_AGENT,
    },
  };

  return axios(options).then(({ data }) => {
    const $ = cheerio.load(data);
    return $('title').first().text().replace(/\//g, '');
  });
}

module.exports = interpretTitle;
