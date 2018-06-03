const fs = require('fs')
const path = require('path')
const dir_before = path.join(__dirname, 'double_data', 'before');
const dir_after = path.join(__dirname, 'double_data', 'after');

// initialize files
fs.readdirSync(dir_before).forEach(file => {
    const src = path.join(dir_before, file)
    const dest = path.join(dir_after, file)
    console.log(`${src} >> ${dest}`);    
    fs.copyFileSync(src,dest);
})

// truncate files in after
const files = fs.readdirSync(dir_after);

files.forEach(file => {
    const filepath = path.join(dir_after, file);
    fs.stat(filepath, (err, stats) => {
        if (err) throw err;
        console.log(`truncating ${filepath}`);
        fs.truncate(filepath, stats.size / 2, err => {
            if (err) throw err;
        })
    })
})