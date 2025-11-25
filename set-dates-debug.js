const Web3 = require('web3');

const web3 = new Web3('http://127.0.0.1:7545');

async function debug() {
    const now = Math.floor(Date.now() / 1000);
    const startDate = Math.floor(new Date('2025-11-01').getTime() / 1000);
    const endDate = Math.floor(new Date('2025-12-31').getTime() / 1000);
    
    console.log('Current timestamp:', now);
    console.log('Start timestamp:', startDate);
    console.log('End timestamp:', endDate);
    console.log('');
    console.log('startDate + 1000000:', startDate + 1000000);
    console.log('Is startDate + 1000000 > now?', (startDate + 1000000 > now));
    console.log('Is endDate > startDate?', (endDate > startDate));
    
    // The contract requires: (_startDate + 1000000 > now)
    // This means start date must be within ~11 days from now
    
    // Let's use dates that will work
    const newStart = now - 86400; // Yesterday
    const newEnd = now + (30 * 86400); // 30 days from now
    
    console.log('');
    console.log('Suggested dates:');
    console.log('Start:', new Date(newStart * 1000).toString());
    console.log('End:', new Date(newEnd * 1000).toString());
    
    process.exit();
}

debug();
