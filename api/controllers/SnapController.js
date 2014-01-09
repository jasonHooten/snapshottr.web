/**
 * SnapController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {
    fromUrl: function(req, res) {
        if (req.param('url') == false) return res.redirect('/', 301);
        WebPageService.Grab(url, function(data) {
            


            return res.redirect('/snap');
        });
    }
};
