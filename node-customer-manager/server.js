const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req,res) => {
    let dataFile = '';
    let html = '';
    fs.readFile('./data/data.txt', 'utf-8', (err, data) => {
        if(err) {
            console.log(err.message);
        }
        dataFile = data.split(',');
        dataFile.forEach((value, index) => {
            html += '<tr>';
            html += `<td>${index + 1}</td>`;
            html += `<td>${value}</td>`;
            html += `<td><button class="btn btn-danger">Delete</button></td>`;
            html += '</tr>';
        });
    })

    fs.readFile('./templates/index.html', 'utf-8', (err, data) => {
        if(err) {
            console.log(err.message);
        }
        res.writeHead(200, {'Content-Type':'text/html'});
        data = data.replace('{list-user}', html);
        res.write(data);
        res.end();
    })
})

server.listen(3000, 'localhost',() => console.log('Server is running at http://localhost:3000'))