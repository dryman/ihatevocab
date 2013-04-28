

window.App = require('app');

//////////////////////////////////
// Templates
//////////////////////////////////

require('templates/application');
require('templates/index');
require('templates/tiers');
require('templates/tiers/index');
require('templates/tier');

//////////////////////////////////
// Models
//////////////////////////////////



/////////////////////////////////
// Controllers
/////////////////////////////////



/////////////////////////////////
// Views
/////////////////////////////////



/////////////////////////////////
// Routes
/////////////////////////////////



/////////////////////////////////
// Store
/////////////////////////////////

App.Store = DS.Store.extend({
    revision: 12,
    adapter: 'DS.FixtureAdapter'
});

require('models/schema');
require('models/modelData');

/////////////////////////////////
// Router
/////////////////////////////////

App.Router.map(function() {
    this.resource('tiers', function(){
        this.resource('tier', {path: ':tier_id'});
    });
});

App.TiersRoute = Ember.Route.extend({
    model: function(){
        return App.Tier.find();
    }
    // renderTemplate: function(){
    //     this.render('tiers-root', { outlet: 'tiers' });
    // }
});

// App.ApplicationController = Ember.Controller.extend({
//     doNothing: function(){
//         return "";
//     }
// });


