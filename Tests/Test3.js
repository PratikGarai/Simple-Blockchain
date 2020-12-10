const Block = require('../Block');
const BlockChain = require('../BlockChain');
const Transaction = require('../Transaction');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Test3
{
    constructor(difficulty, reward, key, walletAddress)
    {
        this.difficulty = difficulty;
        this.reward = reward;
        this.address = walletAddress;
        this.key = key;
        this.Coin = new BlockChain(this.difficulty, this.reward);
    }

    step1()
    {
        const tx1 = new Transaction(this.address, "someone's public key here", 10);
        tx1.signTransaction(this.key);
        this.Coin.addTransaction(tx1);
    }

    step2()
    {
        console.log("Starting miner...");
        this.Coin.minePendingTransactions(this.address);
    }

    step3()
    {
        console.log("Balance is : "+this.Coin.getBalanceOf(this.address));
    }

    conduct()
    {
        this.step1();
        this.step2();
        this.step3();
        this.step1();
        this.step2();
        this.step1();
        this.step2();
        this.step3();
        this.Coin.printChain();
    }

}

const myKey = ec.keyFromPrivate('d8648d546647325013a1c129b242119f3180620d56235f5b621aa3effebc975d');
const myWalletAddress = myKey.getPublic('hex');

const testObject = new Test3(4,250, myKey, myWalletAddress);
testObject.conduct();