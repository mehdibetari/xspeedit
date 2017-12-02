let express = require('express');
let app = express();
let path = require('path');
const Packager = require('./XspeedIt');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/packager/:input*?', function (req, res) {
    let packagerInstance = new Packager(req.params.input);
    res.setHeader('Content-Type', 'application/json');
    res.send({'packagedBoxes': packagerInstance.getBoxes(), 'count': packagerInstance.getBoxes().length});
});

app.use(express.static('./public'));
if (!module.parent) {
    app.listen('7777');
    console.log('===> go to http://localhost:7777');
}

module.exports = app;
