App.Tier = DS.Model.extend({
    name: DS.attr('string'),
    words: DS.hasMany('App.Word')
});

App.Word = DS.Model.extend({
    value: DS.attr('string'),
    definitions: DS.hasMany('App.Definition'),
    tier: DS.belongsTo('App.Tier')
});

App.Definition = DS.Model.extend({
    value: DS.attr('string'),
    word: DS.belongsTo('App.Word')
});

/* TODOS:
 tmp data for importing words
 tmp data for quiz
 */

