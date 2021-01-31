const Block = require('./Block');
const Transaction = require('./Transaction');

class BlockChain
{
    constructor(difficulty, reward)
    {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
        this.pendingTransactions = [];
        this.miningReward = reward;
    }

    createGenesisBlock()
    {
        return new Block("01/01/2021", "Genesis block", "0");
    }

    getLatestBlock()
    {
        return this.chain[this.chain.length-1];
    }

    minePendingTransactions(miningRewardAddress)
    {
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction)
    {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOf(address)
    {
        let balance = 0;
        for(const block of this.chain)
        {
            for(const trans of block.transactions)
            {
                //console.log(address + " " + trans.fromAddress + " " + trans.toAddress);
                if(trans.fromAddress===address)
                    balance -= trans.amount;
                if(trans.toAddress===address)
                    balance += trans.amount;
            }
        }

        return balance;
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

    printChain()
    {
        console.log(JSON.stringify(this, null, 4));
    }
}

module.exports = BlockChain;