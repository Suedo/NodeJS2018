/**
 * log any file changes made in the directory
 * 
 * Issues:
 * From the api itself: The fs.watch API is not 100 % consistent across platforms
 * fs.watch() has 'known' issues, like multiple fires for same event, like what i was getting on my linuxmint system.
 * This SO answer : https://stackoverflow.com/a/33047844/2715083 suggests 'chokidar' instead
 * chokidar: https://github.com/paulmillr/chokidar 
 */

const fs = require('fs')
const path = require('path')
const moment = require('moment')
const dir = path.join(__dirname, 'watch_files');

// create list of files
var fList = fs.readdirSync(dir);

fs.watch(dir, (eventType, file) => { // triggers multiple times for same change/add/removal
    // add or delete
    if (eventType === 'rename') {
        let index = fList.indexOf(file); // file already present ?
        if (index > 0) {
            wlog(file, 'removed');
            return;
        }
        wlog(file, 'added')
        return;
    }
    // change
    wlog(file, 'changed');
})

function wlog(file, eventType) {
    console.log(`${file} ${eventType} @ ${moment().format("DD/MM/YYYY HH:ss")}`);
    fList = fs.readdirSync(dir);
}

console.log("started watching...");