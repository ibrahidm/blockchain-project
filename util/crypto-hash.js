const crypto = require('crypto');

const cryptoHash = (...args) => {
    const hash = crypto.createHash('sha256');
    hash.update(
        args
        .map((arg) => JSON.stringify(arg))
        .sort()
        .join(' ')
    );
    return hash.digest('hex');
}

module.exports = cryptoHash;