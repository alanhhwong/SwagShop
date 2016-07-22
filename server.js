var path = require('path'),
    express = require('express'),
    routes = require('./routes'),
    fb_bot_webhook = require('./routes/fb_bot_webhook'),
    bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/', routes);
app.use('/fb_bot/', fb_bot_webhook);

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
