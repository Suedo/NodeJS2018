const http = require('http');

// req: hhtp.ClientRequest
const req = http.request(
  { hostname: 'www.google.com', method: 'GET'},
  // no 'err' in the argument list, as the returned object is itself an EventEmmitor.
  (res) => { // res : http.IncomingMessage
    console.log(res);
  }
);

req.on('error', (error) => console.log(error))
req.end(); // if this was a POST method, we would probably 'write()' something before 'end()'-ing it

// If doing only read, better to use the http.get() method


/**
example from : http://devdocs.io/node/http#http_http_request_options_callback
const postData = querystring.stringify({
  'msg': 'Hello World!'
});

const options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();
*/
