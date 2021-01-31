const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction
{
    constructor(fromAddress, toAddress, amount)
    {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash()
    {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey)
    {
        //console.log(signingKey.getPublic('hex'));
        //console.log(this.fromAddress);
        if(signingKey.getPublic('hex') != this.fromAddress)
            throw new Error('You cannot use this wallet');

        const hashtx = this.calculateHash();
        const sig = signingKey.sign(hashtx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid()
    {
        if(this.fromAddress===null) 
            return true;
        
        if(!this.signature || this.signature.length===0)
            throw new Error("Transaction not signed");
        
        const pub = ec.keyFromPublic(this.fromAddress, 'hex');
        return pub.verify(this.calculateHash(), this.signature);
    }
}

module.exports = Transaction;