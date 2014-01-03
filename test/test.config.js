var expect = require('chai').expect;

describe("Configuration setup", function() {
        it("should load local configurations", function() {
            var config = require('../config')();
            expect(config.mode).to.exist;    
            expect(config.mode).to.equal('local');
        });
    
        it("should load staging configurations", function() {
            var config = require('../config')('staging');
            expect(config.mode).to.exist;
            expect(config.mode).to.equal('staging');
        });
    
        it("should load production configurations", function() {
            var config = require('../config')('production');
            expect(config.mode).to.exist;
            expect(config.mode).to.equal('production');
        });
});
