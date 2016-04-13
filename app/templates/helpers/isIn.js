define('templates/helpers/isIn', ['hbs/handlebars'], function ( Handlebars ) {

  Handlebars.registerHelper('isIn', function(element, array) {
    return array.indexOf(element) > -1;
  });

});
