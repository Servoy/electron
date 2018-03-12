const os = require('os');

/**
 * Interpretation of the current platform
 * @return {String} platform
 */
function interpretPlatform() {
  const platform = os.platform();
  if ((platform === 'darwin' || platform === 'mas') || platform === 'win32' ||
  platform === 'linux') {
    return platform;
  }
  throw new Error(`Untested platform ${platform} detected`);
}

/**
 * Interpretation of the os architecture
 * @return {String} architecture type
 */
function interpretArch() {
  const arch = os.arch();
  if (arch !== 'ia32' && arch !== 'x64' && arch !== 'arm') {
    throw new Error(`Incompatible architecture ${arch} detected`);
  }
  return arch;
}

module.exports = {
  interpretPlatform,
  interpretArch,
};
