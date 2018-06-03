const fs = require('fs')
const path = require('path')
const moment = require('moment')
const dir_before = path.join(__dirname, 'delete_olds', 'before');
const dir_after = path.join(__dirname, 'delete_olds', 'after');

/**
 * As per https://momentjs.com/docs/#/manipulating/ :
 * Note: It should be noted that moments are mutable.Calling any of the manipulation methods will change the original moment.
 * */

// const now = moment(); // this cannot be used because of mutability 
const timestamp = moment().valueOf();
const dayInMs = 24 * 60 * 60 * 1000;
var i = 0;
console.log("\ninitializing test folder:");
console.log(`Current TimeStamp: ${moment().toString()}\n`);

fs.readdirSync(dir_before).forEach(file => {
    i++; // start from 1
    const src = path.join(dir_before, file)
    const dest = path.join(dir_after, file)

    // copy the file
    fs.copyFileSync(src, dest);

    /**
     * Update The Timestamp
     * manipulating a moment would change the original moment, instead of returning a modified copy
     * hence, we create a new moment each time and manipulate that.
     * */
    var atime = moment(timestamp).subtract(i, 'Day').valueOf() / 1000; // fs works with seconds
    var mtime = atime; // last modified time
    console.log(`${file.toString()} will get time: ${moment.unix(atime).format("DD/MM/YYYY HH:ss")}`);

    fs.utimes(dest, atime, mtime, err => {
        if (err) throw err;
    })
})

console.log("\n\nfiles accessed 3 days or earlier:");

fs.readdirSync(dir_after).forEach(file => {
    const fPath = path.join(dir_after, file);
    fs.stat(fPath, (err, stats) => {
        if (err) throw err;
        var lastAccessTime = stats.atimeMs;
        var diff = moment().diff(moment(lastAccessTime));
        if (diff > 3 * dayInMs) {
            console.log(`${file}, accessed: ${moment(lastAccessTime).format("DD/MM/YYYY HH:ss")}, will be deleted`);
            fs.unlink(fPath, (err) => {
                if (err) throw err;
                console.log(`${file} was deleted`);
            });
        }
    })
})

/**
----------------------------------------------------------------
somjit-mint18 [14:43:45] > pwd
some/path/code D/node/node_core_modules/delete_olds/after

somjit-mint18 [14:38:55] > ls -la
total 12
drwxrwxrwx 1 somjit somjit 4096 May 26 14:38 .
drwxrwxrwx 1 somjit somjit    0 May 25 01:01 ..
-rwxrwxrwx 1 somjit somjit 1299 May 25 14:38 one.1.txt
-rwxrwxrwx 1 somjit somjit 1299 May 24 14:38 one.2.txt

somjit-mint18 [14:41:06] > ls -la ../before/
total 21
drwxrwxrwx 1 somjit somjit 4096 May 25 01:01 .
drwxrwxrwx 1 somjit somjit    0 May 25 01:01 ..
-rwxrwxrwx 1 somjit somjit 1299 May 25 01:01 one.1.txt
-rwxrwxrwx 1 somjit somjit 1299 May 25 01:01 one.2.txt
-rwxrwxrwx 1 somjit somjit 1299 May 25 01:01 one.3.txt
-rwxrwxrwx 1 somjit somjit 1299 May 25 01:01 one.txt
-rwxrwxrwx 1 somjit somjit   41 May 25 01:01 two.txt

----------------------------------------------------------------
Prints:
----------------------------------------------------------------

initializing test folder:
Current TimeStamp: Sat May 26 2018 14:38:55 GMT+0530

one.1.txt will get time: 25/05/2018 14:55
one.2.txt will get time: 24/05/2018 14:55
one.3.txt will get time: 23/05/2018 14:55
one.txt will get time: 22/05/2018 14:55
two.txt will get time: 21/05/2018 14:55


files accessed 3 days or earlier:
one.txt, accessed: 22/05/2018 14:55, will be deleted
two.txt, accessed: 21/05/2018 14:55, will be deleted
one.3.txt, accessed: 23/05/2018 14:55, will be deleted
one.txt was deleted
two.txt was deleted
one.3.txt was deleted
 */