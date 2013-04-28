

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
        this.resource('tier', {path: ':tier_id'}, function(){
            this.route('edit');
            this.resource('flashcards', function(){
                this.route('flashcard', {path: ':word_id'});
            });
            this.resource('quizes', function(){
                this.route('new');
            });
        });
        this.route('new');
    });
    this.route('about');
});

App.TiersRoute = Ember.Route.extend({
    model: function(){
        return App.Tier.find();
    }
    // renderTemplate: function(){
    //     this.render('tiers-root', { outlet: 'tiers' });
    // }
});

App.TierEditRoute = Ember.Route.extend();

App.ApplicationController = Ember.Controller.extend({
    noop: function(){ }
});


