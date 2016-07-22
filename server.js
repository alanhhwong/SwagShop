var path = require('path'),
    express = require('express'),
    routes = require('./routes'),
    bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use('/', routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
