const Block = require('./Block');

class BlockChain
{
    constructor(difficulty)
    {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
    }

    createGenesisBlock()
    {
        return new Block(0, "01/01/2021", "Genesis block", "0");
    }

    getLatestBlock()
    {
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock)
    {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid()
    {
        for( let i = 1; i<this.chain.length; i++)
        {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];
            
            if(currentBlock.hash !== currentBlock.calculateHash())
                return { result : false , block_index : i, block : currentBlock, error : "Self hash invalid" };

            if(currentBlock.previousHash !== prevBlock.hash)
                return { result : false , block_index : i-1, block : prevBlock, error : "Hash not matching successor" };
        }
        return { result : true };
    }
}

module.exports = BlockChain;