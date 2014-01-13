var request = require('request')
    , _ = require('underscore');

// @param: options.url     string the url to call
exports.Grab = function(options, callback) {
    var returnObject = {
        html: 'test',
    },
        url = options.url || options;

    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            returnObject.html =  body;
            callback(returnObject);
        }
    });
};


// @param: options.url     string the url to call
exports.AppendCssFiles = function(snap, callback) {
    
    
    var urls = snap.getExternalCss(),
        cssFiles = [];

    if(urls && urls.length > 0) {
        console.log("in snap service: urls.length = " + urls.length);
        
        var cb = _.after(urls.length, function() {
            if(cssFiles.length > 0) snap.appendCss(cssFiles);
            callback(snap);
        });

        _.each(urls, function(url, index, list) {
            console.log(url);
            request("http://www.qvinci.com" + url, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    cssFiles.push(body);
                    cb();
                }
            });
        });
    }
    else {
        callback(snap);
    }
};