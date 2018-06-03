const fs = require ('fs');
const EventEmitter = require('events');

class WithTime extends EventEmitter {
    execute(asyncFunction, ...args){            // gather args into array
        console.time('execute');                // label
        asyncFunction(...args, (err,data) => {  // spread args from array into individuals
            if (err) {
                return this.emit('error',err);
            }
            this.emit('data', data);
            console.timeEnd('execute')
        });        
    }
}

const withTime = new WithTime();
withTime.on('data',(data) => {
    console.log(data.length);    
})

// withTime.on('error', console.error);
// withTime.once('error',console.error);           // exit only once. Multiple errors will trigger 'on' multiple times, so using 'once'
withTime.once('error', (err) => {
    console.log('Uncaught Exception found:');
    console.error(err);
    // any clean up code you might need
    process.exit(1); 
})

withTime.execute(fs.readFile, './numbers');