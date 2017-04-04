const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(path.resolve(process.cwd(), 'static')));

app.listen(3000);
