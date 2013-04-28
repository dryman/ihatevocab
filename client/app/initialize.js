

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
require('templates/tier/flashcard');

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
        var that = this;
        lines.forEach(function(elem, idx, arr){
            var url = "/dict/"+dict+"/"+elem;
            $.get(url, null, function(data){
                if (data && data.length) {
                    that.get('successWords').pushObject(Ember.Object.create({value: elem, definitions: data}));
                } else {
                    this.get('failWords').pushObject(Ember.Object.create({value:elem}));
                }
            });
        });
        that.set('shouldHidden', true);
        that.set('textArea', "");
    },
    successWords: [],
    failWords: [],
    shouldHidden: false,
    submit: function(){
        var tier = App.Tier.createRecord();
        tier.set('name', this.get('name'));
        this.get('successWords').forEach(function(item,idx,arr){
            var word = App.Word.createRecord();
            word.set('value', item.get('value'));
            item.get('definitions').forEach(function(item1,idx1,arr1){
                var mydef = App.Definition.createRecord();
                mydef.set('value', item1);
                word.get('definitions').pushObject(mydef);
            });
            tier.get('words').pushObject(word);
        });

        this.set('shouldHidden', false);
        this.set('textArea', "");
        this.transitionToRoute('tiers');
    }

});

App.TierController = Ember.ObjectController.extend({
    runFlashcard: false
});

// App.QuizesNewController = Ember.ObjectController.extend({
//     questions: function(){
//         var words = this.get('tier').get('words');
//         var choices = Ember.Array.create();
//         var questions = Ember.Array.create();
//         words.forEach(function(item){
//             questions.pushObject(
//                 Ember.Object.create({
//                     value: item.get('definitions').find(1),
//                     answer: item,
//                     choices: [item]
//                 }));
//         });
        
//     }

// });

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
            // this.route('flashcard');
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
});

App.TierEditRoute = Ember.Route.extend();
App.TiersNewRoute = Ember.Route.extend();
App.QuizesNewRoute = Ember.Route.extend({
    setupController: function(controller, model){
        controller.set('tier', model);
    }
});

// App.TierFlashcardRoute = Ember.Route.extend();



