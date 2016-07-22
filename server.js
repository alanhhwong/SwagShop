var path = require('path'),
    express = require('express'),
    routes = require('./routes'),
    bodyParser = require('body-parser'),
    https = require('https'),
    fs = require('fs');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use('/', routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

var options = {
  ca: fs.readFileSync('./ssl/swagshop_alanwong_xyz.ca-bundle'),
  key: fs.readFileSync('./ssl/swagshop_alanwong_xyz.key'),
  cert: fs.readFileSync('./ssl/swagshop_alanwong_xyz.crt')
};

var server = https.createServer(options, app).listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
