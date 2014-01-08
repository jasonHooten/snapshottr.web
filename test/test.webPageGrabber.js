var webPageGrabber = require("./../api/services/webPageGrabber").webPageGrabber,
    expect = require("chai").expect;


describe('{webPageGrabber}', function() {
    it('should grab the html from a single url', function() {
        webPageGrabber('www.google.com', function (data) {
            
            expect(data).to.exist;
            expect(data).to.have.ownProperty('html');
            
            expect(data.html).to.exist;
            expect(data.html).to.have.string('Google');
        });
    });
    
    it('should grab the html from a url in options', function() {
        webPageGrabber({url: 'www.google.com'}, function (data) {
            
            expect(data).to.exist;
            expect(data).to.have.ownProperty('html');
            
            expect(data.html).to.exist;
            expect(data.html).to.have.string('Google');
        });
    });
});