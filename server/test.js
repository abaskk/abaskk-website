const http = require('http');

const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/auth',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let cookies = res.headers['set-cookie'];
  if (cookies) {
    console.log(cookies);
  } else {
    console.log('No cookies received.');
  }

  res.on('data', (data) => {
    console.log("data")
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(JSON.stringify({ password: 'Cypher@3003' }));

