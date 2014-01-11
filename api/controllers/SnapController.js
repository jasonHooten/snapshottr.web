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
        
        WebPageService.Grab(url, function(data) {
            if (!data) return res.send("That webpage has no html!", 404);
                
            SnapShottrService.Snap(data, function(snap) {
                var html = snap.view();
                Snap.create({
                    html: html,
                    like: 0,
                    userId: 1
                }).done(function(err, snapModel) {
                    if (err) return res.send(err, 404);
                    return res.redirect('/snap/review?id=' + snapModel.id);
                }); //create
                    
            }); //snap
        }); //grab 
    },//fromUrl

    review: function(req, res) {
        Snap.find(req.param('id')).exec(function(err, snapModel) {
            snapModel = snapModel[0];
            if (err) return res.send(err,500);
            if (!snapModel) return res.send("No other snpa with that id exists!", 404);

            return res.view({ id: snapModel.id, like: snapModel.like });
        });
    },
    
    viewHtml: function(req, res) {
        Snap.find(req.param('id')).exec(function(err, snapModel) {
            snapModel = snapModel[0];
            if (err) return res.send(err,500);
            if (!snapModel) return res.send("No other snpa with that id exists!", 404);

            return res.send(snapModel.html);
        });
    },


    like: function(req, res) {
        Snap.find(req.param('id')).exec(function(err, snapModel) {
            if (err) return res.json(err,500);
            if (!snapModel) return res.json("No other snpa with that id exists!", 404);

            snapModel.like += 1;

            snapModel.save(function(err) {
                if (err) return res.send(err,500);
                return res.json(snapModel);
            });
            
        });
    },
    
};
