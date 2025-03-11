// HTTP 服务器示例
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { connect } = require('./db/mongodb');
const User = require('./models/user');

// 连接数据库
connect().catch(console.error);

// 创建一个简单的 HTTP 服务器
const server = http.createServer((req, res) => {
    // 解析请求 URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    console.log(`收到请求: ${req.method} ${pathname}`);

    // 路由处理
    if (pathname === '/' || pathname === '/index.html') {
        // 从文件系统读取HTML页面
        fs.readFile(path.join(__dirname, '../public', 'index.html'), 'utf8', (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('服务器错误');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
        });
    }
    // API 路由
    else if (pathname === '/api/time') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            time: new Date().toLocaleString(),
            timestamp: Date.now()
        }));
    }
    else if (pathname === '/api/info') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            platform: process.platform,
            nodeVersion: process.version,
            uptime: process.uptime(),
            memory: process.memoryUsage()
        }));
    }
    else if (pathname === '/api/random') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            number: Math.random(),
            integer: Math.floor(Math.random() * 100),
            uuid: require('crypto').randomUUID()
        }));
    }
    // 添加新的 API 路由
    else if (pathname === '/api/users' && req.method === 'GET') {
        // 将异步操作包装在异步函数中
        (async () => {
            try {
                const users = await User.getAll();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(users));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: '获取用户列表失败' }));
            }
        })();
    }
    else if (pathname === '/api/users' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const result = await User.create({
                    name: data.name,
                    createdAt: new Date()
                });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: '创建用户失败' }));
            }
        });
    }
    else if (pathname.match(/^\/api\/users\/[\w\d]+$/) && req.method === 'PUT') {
        const userId = pathname.split('/').pop();
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const result = await User.update(userId, { name: data.name });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: '更新用户失败' }));
            }
        });
    }
    else if (pathname.match(/^\/api\/users\/[\w\d]+$/) && req.method === 'DELETE') {
        const userId = pathname.split('/').pop();

        (async () => {
            try {
                const result = await User.delete(userId);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: '删除用户失败' }));
            }
        })();
    }
    // 处理静态文件
    else {
        const filePath = path.join(__dirname, '../public', pathname);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('找不到页面');
                return;
            }

            // 根据文件扩展名设置Content-Type
            const ext = path.extname(filePath);
            let contentType = 'text/plain';
            switch (ext) {
                case '.html':
                    contentType = 'text/html';
                    break;
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.json':
                    contentType = 'application/json';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.jpg':
                    contentType = 'image/jpg';
                    break;
            }

            res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` });
            res.end(content);
        });
    }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});