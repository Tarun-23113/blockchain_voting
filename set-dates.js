const Web3 = require('web3');
const contract = require('@truffle/contract');
const votingArtifacts = require('./build/contracts/Voting.json');

const web3 = new Web3('http://127.0.0.1:7545');
const VotingContract = contract(votingArtifacts);
VotingContract.setProvider(web3.currentProvider);

async function setDates() {
    try {
        const accounts = await web3.eth.getAccounts();
        const instance = await VotingContract.deployed();
        
        // Set dates: Yesterday to 30 days from now
        const now = Math.floor(Date.now() / 1000);
        const startDate = now - 86400; // Yesterday
        const endDate = now + (30 * 86400); // 30 days from now
        
        console.log('Setting voting dates...');
        console.log('Start:', new Date(startDate * 1000).toString());
        console.log('End:', new Date(endDate * 1000).toString());
        
        const result = await instance.setDates(startDate, endDate, { from: accounts[0], gas: 3000000 });
        
        console.log('✅ Dates set successfully!');
        console.log('Transaction hash:', result.tx);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
    process.exit();
}

setDates();
