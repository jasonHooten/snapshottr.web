var grab = require("./../api/services/webPageService").Grab,
    expect = require("chai").expect;


describe('{webPageService.Grab}', function() {
    it('should grab the html from a single url', function() {
        grab('www.google.com', function (data) {
            
            expect(data).to.exist;
            expect(data).to.have.ownProperty('html');
            
            expect(data.html).to.exist;
            expect(data.html).to.have.string('Google');
        });
    });
    
    it('should grab the html from a url in options', function() {
        grab({url: 'www.google.com'}, function (data) {
            
            expect(data).to.exist;
            expect(data).to.have.ownProperty('html');
            
            expect(data.html).to.exist;
            expect(data.html).to.have.string('Google');
        });
    });
});