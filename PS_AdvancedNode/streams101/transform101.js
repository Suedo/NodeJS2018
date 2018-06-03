const crypto = require('crypto')
const fs = require('fs')
const zlib = require('zlib')
const path = require('path')
const file = process.argv[2] // the third argument: node appname.js file.ext 
const secretKey = 'my_secret_key_lol'

const {
    Transform
} = require('stream');

/*
Passing a single progress transform stream multiple times will not work, 
as after the first use, the stream will be closed, and we will get ERR_STREAM_WRITE_AFTER_END error 
as we try to call stream.write() after the close. we solve this by creating a new transform stream each time

const progress = new Transform({
    transform(chunk, encoding, cb) {
        process.stdout.write('.');
        cb(null, chunk);
    }
})
*/

function createNewProgressStream(style) {
    return new Transform({
        transform(chunk, encoding, cb) {
            process.stdout.write(`${style}`);
            cb(null, chunk);
        }
    })
}


function onlyZip(file) {
    console.log('zip..');
    fs.createReadStream(file) // read the file
        .pipe(zlib.createGzip()) // stream it to zipper
        // .on('data', data => process.stdout.write('.')) // progressbar
        .pipe(createNewProgressStream('.')) // better progressbar via transform duplex stream
        .pipe(fs.createWriteStream(file + '.gz')) // write file when done zipping
        .on('finish', () => process.stdout.write(` Done\n`)) // log when all done
}

function zipAndEncrypt(file) {
    console.log(`zipping and encrypting ${file}`);
    fs.createReadStream(file) // read the file
        .pipe(zlib.createGzip()) // stream it to zipper
        .pipe(crypto.createCipher('aes192', secretKey)) // encrypt it with the secret key
        .pipe(createNewProgressStream('.'))
        .pipe(fs.createWriteStream(file + '.zz')) // write file when done zipping
        .on('finish', () => process.stdout.write(` Done\n`)) // log when all done
}

/**
 * The only way to decrypt what was encrypted with zipAndEncrypt(), because of the secret key knowledge
 * @param file the .zz encrypted file
 */
function decryptAndUnzip(file) {
    console.log(`Decrypting and extracting ${file}`);
    fs.createReadStream(file) // read the encrypted file
        .on('data', data => process.stdout.write('*'))
        .pipe(crypto.createDecipher('aes192', secretKey)) // decrypt it with the secret key
        .pipe(zlib.createGunzip())
        .pipe(createNewProgressStream('.'))
        .pipe(fs.createWriteStream('unzipped' + file.slice(0, -3))) // remove the last '.zz' three letters, to create unzipped file
        .on('finish', () => process.stdout.write(` Done\n`)) // log when all done
}

zipAndEncrypt(file);
setTimeout(() => {
    decryptAndUnzip(file + '.zz');
}, 100)

/*

> node transform101.js test.txt
Prints:
zipping and encrypting test.txt
.. Done
Decrypting and extracting test.txt.zz
*.......... Done

*/