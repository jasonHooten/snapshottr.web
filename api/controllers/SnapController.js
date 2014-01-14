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
                    Html.create({
                        body: snap.view()
                        
                    }).done(function (errHtml, htmlModel) {
                        if (errHtml) return res.send(errHtml, 404);
                        Snap.create({
                            htmlId: htmlModel.id,
                            url: url,
                            like: 0,
                            userId: 1
                            
                        }).done(function(errSnap, snapModel) {
                            if (errSnap) return res.send(errSnap, 404);
                            return res.redirect('/snap/review?id=' + snapModel.id);
                        });   
                    });
            }); //snap
        }); //grab 
    },//fromUrl
    

    review: function(req, res) {
        Snap.find(req.param('id')).exec(function(err, snapModel) {
            snapModel = snapModel[0];
            if (err) return res.send(err,500);
            if (!snapModel) return res.send("No other snpa with that id exists!", 404);

            return res.view({ id: snapModel.id, like: snapModel.like, url: snapModel.url });
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
