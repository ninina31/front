define('templates/helpers/isIn', ['hbs/handlebars'], function ( Handlebars ) {

  Handlebars.registerHelper('isIn', function(element, array, options) {
    var model = array.findWhere({id_permit: element});
    if (model != undefined){
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

});
