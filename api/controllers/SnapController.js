/**
 * SnapController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {
    
    fromUrl: function(req, res) {
        var url = req.param('url');
        if (!url) return res.redirect('/', 301);
        WebPageService.Grab(url, function (data){
            if (!data) return res.send("That webpage has no html!", 404);
            SnapShottrService.Snap(data, function (snap) {
                var html = snap.view();
                console.log(html);
                Snap.create({
                    html: html,
                    like: 0,
                    userId: 1
                }).done(function (err, snapModel) {
                    if (err) return res.send(err, 404);
                    return res.redirect('/snap/' + snapModel.id);
                });//create    
            });//snap
        });//grab 
    }//fromUrl
    
};
