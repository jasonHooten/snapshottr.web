/**
 * HtmlController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {
    
    view: function(req, res) {
        Html.find(req.param('id')).exec(function(err, htmlModel) {
            htmlModel = htmlModel[0];
            if (err) return res.send(err,500);
            if (!htmlModel) return res.send("No other htmlModel with that id exists!", 404);

            return res.send(htmlModel.body);
        });
    },

}