const fs = require('fs');

const readFile = function readFile(file,cb){
  fs.readFile(file, { encoding: "UTF-8" }, function rf(err,data){
    if(err) return cb(err);
    console.log('In cb');
    return cb(null,data);
  })
}

const readFileIntoStringArray = function readFileIntoStringArray(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, {encoding : "UTF-8"}, function rfArr(err,data) {
      if(err){
        return reject(err)
      }
      console.log('in cb, reading file into array');
      const lines = data.toString().trim().split('\r\n');
      resolve(lines);
    })
  })

}

module.exports.readFile = readFile;
module.exports.readFileIntoStringArray = readFileIntoStringArray;
