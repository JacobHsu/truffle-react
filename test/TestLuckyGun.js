const LuckyGun = artifacts.require('LuckyGun');
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract('LuckyGun', (accounts) => {
    let casino;
    const fundingAccount = accounts[0];
    const bettingAccount = accounts[1];
    const fundingSize = 99000000000000000000; // https://eth-converter.com/ 99 Ether

    // build up and tear down a new Casino contract before each test
    beforeEach(async () => {
        casino = await LuckyGun.new({ from: fundingAccount });
        await casino.fund({ from: fundingAccount, value: fundingSize });
        web3.eth.getBalance(casino.address, (err, balance) => {
            let number = Math.round(web3.utils.fromWei(balance, 'Ether') * 100) / 100;
            console.log( 'casino.address:', number ,' Ether');
        });
        assert.equal(await web3.eth.getBalance(casino.address), fundingSize);
    });

    afterEach(async () => {
        await casino.kill({ from: fundingAccount });
    });

    it("should emit when bet", async () => {
        //let betSize = 1;
        // await casino.bet({ from: accounts[0], value: betSize });
        // await casino.bet({ from: accounts[0], value: web3.utils.toWei('0.1', 'ether') });
        let tx = await casino.bet({ from: bettingAccount, value: web3.utils.toWei('0.1', 'ether') });

        truffleAssert.eventEmitted(tx, 'Bet', (ev) => {
            console.log(ev);
            return ev.playerAddress === bettingAccount;
        });

    });

});