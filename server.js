var path = require('path');
var express = require('express');
var routes = require('./routes');

var app = express();

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

app.use('/', routes);

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
