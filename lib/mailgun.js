const https = require('https');
const fs = require('fs');

const app = (request, response) => {
  if (request.method == 'GET') {
    console.log('Debug:', request);
  }
  if (request.method == 'POST') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      try {
        console.log('body', body);
        var post = JSON.parse(body);
        // deal_with_post_data(request,post);
        console.log(post); // <--- here I just output the parsed JSON
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end();
        return;
      } catch (err) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.write('Bad Post Data.  Is your data a proper JSON?\n');
        response.end();
        return;
      }
    });
  }
};

const options = {
  key: fs.readFileSync('../key.pem'),
  cert: fs.readFileSync('../cert.pem')
};


console.log('server started');
const port = 443;

const server = https.createServer(options, app).listen(port);
console.log(`Listening at https://localhost:${port}`);
