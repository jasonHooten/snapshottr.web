var Model = require("../models/Base"),
        chai = require('chai'),
        expect = chai.expect,
        dbMockup = {};


var model;

beforeEach(function() {
    model = new Model(dbMockup);
});

describe("{Models}", function() {
    it("should create a new model", function() {
        expect(model.extend).to.exist;
    });

    it("should be extendable", function() {
        var OtherTypeOfModel = model.extend({
            myCustomModelMethod: function() {}
        });

        var model2 = new OtherTypeOfModel(dbMockup);

        expect(model2.db).to.exist;
        expect(model2.myCustomModelMethod).to.exist;
    });
});