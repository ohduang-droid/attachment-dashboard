const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

// MIME types mapping
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Parse URL and remove query string
    let filePath = req.url.split('?')[0];

    // Default to index.html for root or paths without extension (SPA routing)
    if (filePath === '/' || !path.extname(filePath)) {
        filePath = '/index.html';
    }

    const fullPath = path.join(DIST_DIR, filePath);

    // Security check: prevent directory traversal
    if (!fullPath.startsWith(DIST_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found, serve index.html for SPA routing
                fs.readFile(path.join(DIST_DIR, 'index.html'), (err, content) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Server Error');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + err.code);
            }
        } else {
            const ext = path.extname(filePath);
            const contentType = mimeTypes[ext] || 'application/octet-stream';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
