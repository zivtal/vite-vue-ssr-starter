const express = require('express');
const fs = require('fs');
const path = require('path');
const {createApp} = require('./dist/server/entry-server.js');
const {renderToString} = require('@vue/server-renderer');

const server = express();

server.get('*', async (req, res) => {
    const {app, router} = createApp();

    router.push(req.url);

    router.isReady().then(async () => {
        try {
            const context = {};
            const appContent = await renderToString(app, context);

            const template = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8');
            const html = template.replace('{{{ renderState() }}}', appContent);

            res.end(html);
        } catch (err) {
            console.error(err);
            res.status(500).end('Internal Server Error');
        }
    });
});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
