// To be used with v1 archived codes

const Block = require('../Block');
const BlockChain = require('../BlockChain');

class Test1
{
    constructor(difficulty)
    {
        // Creating a new blockchain
        this.Coin = new BlockChain(difficulty);
    }

    test1()
    {
        // Adding few demo blocks
        this.Coin.addBlock( new Block(1, "02/01/2021", {amount : 50}) );
        this.Coin.addBlock( new Block(2, "03/01/2021", {amount : 10}) );
        this.Coin.addBlock( new Block(3, "04/01/2021", {amount : 40}) );
        this.printChain();
    }

    test2()
    {
        let result = this.Coin.isChainValid();
        this.integrityPrinter(result);
    }

    test3()
    {
        console.log("\n---- Changing block 2 ----\n");
        this.Coin.chain[2].data = { amount : 500 };
        let result = this.Coin.isChainValid();
        this.integrityPrinter(result);
    }

    test4()
    {
        console.log("\n---- Trying again after recalculating hash ----\n");
        this.Coin.chain[2].hash = this.Coin.chain[2].calculateHash();
        let result = this.Coin.isChainValid();
        this.integrityPrinter(result);
    }

    // Checking integrity
    integrityPrinter(result)
    {
        
        if(result.result)
        {
            console.log("Result : Valid Blockchain");
        }
        else
        {
            console.log("Result : Invalid Blockchain -> "+result.error);
            console.log("Defective block index : "+result.block_index);
            console.log("Block");
            console.log(result.block);
        }
    }
    
    printChain()
    {
        // Printing the blockchain
        console.log(JSON.stringify(this.Coin, null, 4));
    }

    conduct()
    {
        this.test1();
        this.test2();
        this.test3();
        this.test4();
    }
}

module.exports  = Test1;