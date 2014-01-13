var snapshottr = require('./../../external/snapshottr');

// @param: options.snap     string the url to call
exports.Snap = function(html, callback) {
    var snap = new snapshottr;
    snap.load(html.html);

    WebPageService.AppendCssFiles(snap, function(snapWithCss) {
        callback(snapWithCss);
    });
};