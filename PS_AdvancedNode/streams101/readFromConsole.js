const { Readable } = require('stream')
const { Console } = require('console');

/**
 * I wanted prints IN-LINE, log (even below custom one) did now allow that, so using core process.stdout
 * these loggers call process.stdout internally anyway
 * 
    const logger = new Console({
        stdout: process.stdout,
        stderr: process.stderr
    })
*/

const inStream = new Readable({
    read(size) {
        console.time("read")
        process.stdout.write('\nread > ');
        setTimeout(() => {
            if (this.currentCharCode > 90) {
                process.stdout.write('90, terminating\n');
                this.push(null); // indicate end of stream
                console.timeEnd("read");
                return;
            }
            process.stdout.write(`push: ${this.currentCharCode} > `);
            this.push(String.fromCharCode(this.currentCharCode++))
        }, 0)
    }
})

inStream.currentCharCode = 65;
inStream.pipe(process.stdout); // pipe calls read() each time a new data is pushed into the read buffer


/* OP:
read > push: 65 > A
read > push: 66 > B
read > push: 67 > C
read > push: 68 > D
read > push: 69 > E
read > push: 70 > F
read > push: 71 > G
read > push: 72 > H
read > push: 73 > I
read > push: 74 > J
read > push: 75 > K
read > push: 76 > L
read > push: 77 > M
read > push: 78 > N
read > push: 79 > O
read > push: 80 > P
read > push: 81 > Q
read > push: 82 > R
read > push: 83 > S
read > push: 84 > T
read > push: 85 > U
read > push: 86 > V
read > push: 87 > W
read > push: 88 > X
read > push: 89 > Y
read > push: 90 > Z
read > 90, terminating
read: 1.486ms
*/