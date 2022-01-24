const { lastCommit } = require('./server/utils');
const getHashAsync = lastCommit({ cwd: process.cwd() });

module.exports = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  generateBuildId: async () => {
    let hash = 'build';
    try {
      hash = (await getHashAsync).hash || '';
    } catch (error) {
      console.error(error);
    }
    hash += '-ts-' + new Date().getTime();
    return hash;
  },
};
