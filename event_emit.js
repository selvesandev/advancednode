const EventEmitter = require('events');

const celebrity = new EventEmitter();

celebrity.on('postFeed', (where) => {
    console.log(`Check ${where}!! ASAP`);
});

celebrity.on('postInterview', () => {
    console.log('Check Youtube!! ASAP');
});

celebrity.emit('postFeed', 'Facebook');
celebrity.emit('postInterview');

process.on('exit',function(exitCode) {
    // 0 => success exit
    if(exitCode === 0) {
        console.log('node.js process exited successfully');
    }
})