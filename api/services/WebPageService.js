var request = require('request');

// @param: options.url     string the url to call
exports.Grab = function(options, callback) {
    var returnObject = {
        html: 'test',
        css: []
    },
        url = options.url || options;

    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            returnObject.html =  body;
            callback(returnObject);
        }
    });
};