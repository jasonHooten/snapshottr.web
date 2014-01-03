var expect = require('chai').expect,
    MongoClient = require('mongodb').MongoClient;

describe("MongoDB", function() {
        it("is there a server running", function() {
                MongoClient.connect('mongodb://127.0.0.1:27017/snapshottr', function(err, db) {
                        expect(err).to.be.null;
                        expect(db).to.not.be.undefined;
                });
        });
});
