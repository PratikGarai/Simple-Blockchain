const Block = require('../Block');
const BlockChain = require('../BlockChain');
const Transaction = require('../Transaction');

class Test2
{
    constructor(difficulty , reward)
    {
        this.Coin = new BlockChain(difficulty, reward);
    }

    step1_1()
    {
        // Create transactions set 1
        this.Coin.createTransaction(new Transaction('address1', 'address2', 100));
        this.Coin.createTransaction(new Transaction('address2', 'address1', 50));
    }

    step1_2()
    {
        // Create transactions set 2
        this.Coin.createTransaction(new Transaction('address1', 'address2', 100));
        this.Coin.createTransaction(new Transaction('address2', 'address1', 50));
        this.Coin.createTransaction(new Transaction('address1', 'address3', 80));
    }

    step2(miner_address)
    {
        // Miner in action
        console.log("Starting Miner...");
        this.Coin.minePendingTransactions(miner_address);
        console.log("Balance of miner : "+this.Coin.getBalanceOf(miner_address));
    }

    conduct()
    {
        this.step1_1();
        this.step2("miner-address");
        this.step1_2();
        this.step2("miner-address");
        this.Coin.printChain();
    }
}

const testObject = new Test2(4,250);
testObject.conduct();