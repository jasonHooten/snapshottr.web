var snapshottr = require('./../../external/snapshottr');

// @param: options.snap     string the url to call
exports.Snap = function(html) {
    var snap = new snapShottr;
    snap.load(html);
    return snap;
};