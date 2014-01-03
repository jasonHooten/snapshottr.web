/**
 * Module dependencies.
 */

var express = require('express'),
        http = require('http'), 
        path = require('path'),
        
        config = require('./config')(),
        app = express(),
        MongoClient = require('mongodb').MongoClient,
    
        index = require('./routes/index')
        ;

// all environments
// app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('snapshottr-site'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
          app.use(express.errorHandler());
}

MongoClient.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/snapshottr', function(err, db) {
        if(err) {
                console.log('Sorry, there is no mongo db server running.');
        } else {
                var attachDB = function(req, res, next) {
                        req.db = db;
                        next();
                };
                
                app.get('/', index);

                http.createServer(app).listen(config.port, function() {
                          console.log(
                                  'Successfully connected to ' + 'mongodb://' + config.mongo.host + ':' + config.mongo.port,
                                  '\nExpress server listening on port ' + config.port
                          );
                });
        }
});