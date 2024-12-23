const validUrl = require('valid-url');
const axios = require('axios');


const blacklistedDomains = ['example.com', 'malicious-site.com'];


const validateUrlStructure = (url) => {
  return validUrl.isUri(url);
};


const isBlacklisted = (url) => {
  const hostname = new URL(url).hostname;
  return blacklistedDomains.includes(hostname);
};


const validateUrlReachability = async (url) => {
  try {
    await axios.get(url);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  validateUrlStructure,
  isBlacklisted,
  validateUrlReachability,
};
