const getCryptoRandomString = async () => {
  const crs = await import('crypto-random-string');
  return crs.default({
    length: 6,
    characters: 'ABCDEFGHJKMNPRTUVWXY0123456789'
  });
};

module.exports = {
  getCryptoRandomString: getCryptoRandomString
};
