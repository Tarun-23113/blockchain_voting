const Web3 = require('web3');
const contract = require('@truffle/contract');
const votingArtifacts = require('./build/contracts/Voting.json');

const web3 = new Web3('http://127.0.0.1:7545');
const VotingContract = contract(votingArtifacts);
VotingContract.setProvider(web3.currentProvider);

async function checkDates() {
    try {
        const instance = await VotingContract.deployed();
        const dates = await instance.getDates();
        
        const startDate = new Date(dates[0] * 1000);
        const endDate = new Date(dates[1] * 1000);
        const now = new Date();
        
        console.log('Voting Start:', startDate.toString());
        console.log('Voting End:', endDate.toString());
        console.log('Current Time:', now.toString());
        console.log('');
        
        if (dates[0] == 0 && dates[1] == 0) {
            console.log('❌ Dates NOT set! You need to set dates from admin page.');
        } else if (now < startDate) {
            console.log('⚠️ Voting has not started yet!');
        } else if (now > endDate) {
            console.log('⚠️ Voting has ended!');
        } else {
            console.log('✅ Voting is active!');
        }
        
        const candidateCount = await instance.getCountCandidates();
        console.log('\nTotal Candidates:', candidateCount.toString());
        
        for (let i = 1; i <= candidateCount; i++) {
            const candidate = await instance.getCandidate(i);
            console.log(`Candidate ${i}: ${candidate[1]} (${candidate[2]}) - Votes: ${candidate[3]}`);
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    }
    process.exit();
}

checkDates();
