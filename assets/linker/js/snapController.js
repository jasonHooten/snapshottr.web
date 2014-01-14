var socket = io.connect();

socket.request('/snap',{},function(response) {
    Snapshottr = Ember.Application.create();

        //Routes
        Snapshottr.Router.map(function() {
                this.resource('snap', function() {
                        this.resource('like', {path: ':_id'});
                });
        });

        //Controllers
        Snapshottr.SnapController = Ember.Controller.extend({
                like: function(snap) {
                        socket.request('/snap/like', {
                                id: snap.get('id')
                        }, updatelike);
                }
        });

        //Views

        //Models
});

socket.on('message', function(response) {
        updatelike(response.data);
});

// Methods
var updatelike = function(response){
        var snap = Snapshottr.Snap.find(response.id);
        snap.set('like', response.like);
};