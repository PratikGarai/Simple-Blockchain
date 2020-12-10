const Block = require('./Block');
const BlockChain = require('./BlockChain');

// Creating a new blockchain
let Coin = new BlockChain();


// Adding few demo blocks
Coin.addBlock( new Block(1, "02/01/2021", {amount : 50}) );
Coin.addBlock( new Block(2, "03/01/2021", {amount : 10}) );
Coin.addBlock( new Block(3, "04/01/2021", {amount : 40}) );


// Printing the blockchain
console.log(JSON.stringify(Coin, null, 4));


// Checking integrity
function integrityPrinter(result)
{
    
    if(result.result)
    {
        console.log("Result : Valid Blockchain");
    }
    else
    {
        console.log("Result : Invalid Blockchain");
        console.log("Defective block index : "+result.block_index);
        console.log("Block");
        console.log(result.block);
    }
}

let result = Coin.isChainValid();
integrityPrinter(result);
Coin.chain[2].data = { amount : 500 };
console.log("\n---- Changing block 2 ----\n");
result = Coin.isChainValid();
integrityPrinter(result);