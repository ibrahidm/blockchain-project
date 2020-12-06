const hexToBinary = require('hex-to-binary')
const { GENESIS_DATA, MINE_RATE } = require('../config');
const { cryptoHash } = require('../util');

class Block {
    constructor ({ timestamp, data, lastHash, hash, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.data = data;
        this.lastHash = lastHash;
        this.nonce = nonce;
        this.difficulty = difficulty
        this.hash = hash ? hash : this.calculateHash();
    }

    calculateHash() {
        return cryptoHash(this.timestamp, this.lastHash, this.data, this.nonce, this.difficulty);
    }

    static genesis() {
       return new this(GENESIS_DATA)
    }

    static mineBlock({ lastBlock, data }) {
        let timestamp;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0; 
        let hash = cryptoHash(timestamp, lastHash, data, difficulty, nonce)

        do {
            nonce ++;
            timestamp = Date.now();
            // Block.adjustDifficulty works the same here.
            difficulty = this.adjustDifficulty({ originalBlock: lastBlock, timestamp });
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({
            timestamp,
            lastHash,
            difficulty,
            nonce,
            data
        })
    }

    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;
        if (difficulty < 1) return 1; 
        if ((timestamp - originalBlock.timestamp) > MINE_RATE) return difficulty - 1;
        return difficulty + 1;
    }
}

module.exports = Block;
