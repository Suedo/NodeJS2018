const async_cb = require('./async_callback');
const async_pr = require('./async_promise');

async_cb.readFileIntoStringArray('./numbers.txt', (err,data) => {
  console.log('trying callback based read');
  if(err) throw err;
  console.log('back in main');
  console.log('Data lines read : ' + data.length);
  data.map(Number).filter(n => n%2 === 0) // keep evens
      .forEach(n => console.log(n));
})
console.log('in main..');

async_pr.readFileIntoStringArray('./numbers.txt')
  .then(data => {
    console.log('back in main');
    console.log('trying promise based read');
    console.log('Data lines read : ' + data.length);
    data.map(Number).filter(n => n%2 === 1) // keep odds
        .forEach(n => console.log(n));
  })
  .catch(console.error)
