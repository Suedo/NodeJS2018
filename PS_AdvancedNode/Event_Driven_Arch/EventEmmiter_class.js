const EventEmmitter = require('events');

class WithLog extends EventEmmitter {
    execute(taskFunction) {
        console.log('Before executing');
        this.emit('begin');
        taskFunction();
        this.emit('end');
        console.log('After executing');
    }
}

const withLog = new WithLog();

withLog.on('begin', () => console.log('logging to start...'));
withLog.on('end', () => console.log('all about to end'));
withLog.on('end', () => console.log('times 2'));


withLog.execute(() => console.log("start"));
/* Prints:

Before executing
logging to start...
start
all about to end
times 2
After executing

*/