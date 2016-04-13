define('templates/helpers/stringify', ['hbs/handlebars'], function ( Handlebars ) {

  Handlebars.registerHelper('stringify', function(json) {
    return JSON.stringify(json);
  });

});
