import express from 'express';
import path from 'path';
const app = express();

import renderRoute from '../renderRoute';

const publicPath = path.join(__dirname, '/../../../public');

app.get('/', function (req, res) {
    const html = renderRoute(5000);
    res.send(html);
});

app.use('/', express.static(publicPath));

app.listen(3000, function () {
    console.log(`Server running at port 3000`)
});