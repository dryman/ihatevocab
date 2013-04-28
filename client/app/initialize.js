

window.App = require('app');

//////////////////////////////////
// Templates
//////////////////////////////////

require('templates/application');
require('templates/index');
require('templates/tiers');
require('templates/tiers/index');
require('templates/tier');
require('templates/tiers/new');

//////////////////////////////////
// Models
//////////////////////////////////



/////////////////////////////////
// Controllers
/////////////////////////////////

App.ApplicationController = Ember.Controller.extend({
    noop: function(){ }
});

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}
function placeholderText(){
    var date = new Date();
    return padStr(date.getFullYear())
        + "-" + padStr(1+date.getMonth())
        + "-" + padStr(date.getDate())
        + " GRE";
};


App.TiersNewController = Ember.ObjectController.extend({
    name: placeholderText(),
    dictNames: function(){
        return [, , "Chinese-English"];
    },
    dicts: [ "eedict", "ecdict", "cedict"],
    selectedDict: "eedict",
    textArea: "",
    runDict: function(){
        var lines = this.get('textArea').match(/^.+?$/gm);
        var dict = this.get('selectedDict');
        lines.forEach(function(elem, idx, arr){
            alert(elem);
            $.getJSON("http://0.0.0.0:3000/"+dict+"/"+elem, null, function(data){
                 alert("hello");
                if (data && data.length) {
                    this.get('successWords').pushObject(Ember.Object.create({value: elem, definitions: data}));
                    alert(data);
                } else {
                    this.get('failWords').pushObject(Ember.Object.create({value:elem}));
                }
            });

            // var promise = $.ajax({url: "http://0.0.0.0:3000/"+dict+"/"+elem,
            //                       async: false,
            //                       crossDomain: true,
            //                       type: 'GET',
            //                       dataType: 'jsonp',
            //                       success: function(data){
            //                           alert("hello");
            //                           if (data && data.length) {
            //                               this.get('successWords').pushObject(Ember.Object.create({value: elem, definitions: data}));
            //                               alert(data);
            //                           } else {
            //                               this.get('failWords').pushObject(Ember.Object.create({value:elem}));
            //                           }
            //                       },
            //                       error: function(){
            //                           alert('failed');
            //                       }

            //                      });
        });
    },
    successWords: [],
    failWords: []
});


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
App.TiersNewRoute = Ember.Route.extend();




