const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('qs');

const server = http.createServer((req,res) => {
    if (req.method === "GET") {
        fs.readFile('./templates/index.html', 'utf-8', (err, data) => {
            if (err) console.log(err.message);
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(data);
            res.end();
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let name = qs.parse(data).name
            fs.writeFile('./data/data.txt', name, err => {
                if (err) {
                    console.log(err.message);
                }
                res.end('Create success');
            })
        })
    }
})

server.listen(3000, 'localhost',() => console.log('Server is running at http://localhost:3000'))