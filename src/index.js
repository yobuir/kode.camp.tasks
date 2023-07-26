import fs  from 'fs';
import 'dotenv/config'   
const PORT = process.env.PORT || 4040;
const HOST=process.env.HOST || 'localhost';

const IncomingRequest = (req, res, next) => {
  console.log(`${req.method} => http://localhost:${PORT}${req.url}`);
};

import http from "http";
const server = http.createServer((req,res)=>{
    const { method, url } = req; 
    if (url === '/' && method === 'GET') {
        res.setHeader('Content-Type', 'text/plain');
        res.write("Hello, NodeJs"); 
        res.end();
    } else if (url === '/api/user' && method === 'GET') {
          const user = {
            name: 'Yobu Iradukudnda',
            email: 'irayobu@gmail.com',
            age:21
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));

    } else if (url === '/api/file' && method === 'GET') {
        try {
            fs.readFile('./src/files/data.txt', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify('Error reading the file.',err));
                     
                    }
                req.fileData = data; 
                    res.writeHead(200);
                    res.end(JSON.stringify(data.toString()))
                });

                
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({"error":error}));
                    
            return res.status(500).json({ });
            
        }

    }

});


server.on('request', IncomingRequest);

server.listen(PORT,HOST,() => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
