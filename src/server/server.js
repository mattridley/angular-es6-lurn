import express from "express";
let app = express();

app.use(express.static('../../dist'));
app.get('/api/status', (req, res) => res.send("OKAY"));

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});