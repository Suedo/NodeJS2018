const { Duplex } = require('stream')

const inoutStream = new Duplex({

    write(chunk, encoding, callback){
        process.stdout.write(`> ${chunk.toString().trim()}\n`);
        callback();
    },

    read(size) {
        process.stdout.write('\nread > ');
        setTimeout(() => {
            if (this.currentCharCode > 90) {
                process.stdout.write('90, terminating\n');
                this.push(null); // indicate end of stream
                return;
            }
            process.stdout.write(`push: ${this.currentCharCode} > `);
            this.push(String.fromCharCode(this.currentCharCode++))
        }, 0)
    }
})

inoutStream.currentCharCode = 65;
inoutStream.setEncoding('utf8');
process.stdin.pipe(inoutStream).pipe(process.stdout)