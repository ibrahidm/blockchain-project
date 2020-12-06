const MINE_RATE = 1000;

const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
    timestamp: 1,
    lastHash: '0',
    data: [],
    hash: 'bar-hash',
    nonce: 0,
    difficulty: INITIAL_DIFFICULTY
};

const STARTING_BALANCE = 1000;

const REWARD_INPUT = { address: '*authorized-reward*' };

const MINING_REWARD = 0.5;

module.exports = { 
    GENESIS_DATA, 
    MINE_RATE, 
    STARTING_BALANCE,
    REWARD_INPUT,
    MINING_REWARD 
};