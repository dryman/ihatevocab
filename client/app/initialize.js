

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




