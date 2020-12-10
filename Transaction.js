const SHA256 = require('crypto-js/sha256');

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
        if(signingKey.getPublic('hex') !== this.fromAddress)
            throw new Error('You cannot use this wallet');

        const hashtx = this.calculateHash();
        const sig = signingKey.sign(hashtx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid()
    {
        if(this.fromAddress===null) 
            return true;
        
    }
}

module.exports = Transaction;