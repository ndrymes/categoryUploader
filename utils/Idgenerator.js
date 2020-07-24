const { v4: uuidv4 } = require('uuid');
function GetStoreProductId() {
    const prefix = 'STPRD';
    let suffix = uuidv4()
      .toString()
      .toUpperCase()
      .substring(0, 8);
    return prefix.concat(suffix);
  }
  module.exports =GetStoreProductId