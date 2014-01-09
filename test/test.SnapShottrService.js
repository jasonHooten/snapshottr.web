var snap = require("./../api/services/SnapShottrService").Snap,
    expect = require("chai").expect;


describe('{SnapShottrService.Snap}', function() {
    it('should create a new Snap', function() {
        snap('<div>test</test>', function (data) {
            expect(data).to.exist;

            var html = data.view();
            expect(html).to.exist;
            expect(html).to.have.string('test');
        });
    });
});