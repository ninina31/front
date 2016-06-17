define([
  'backbone',
  'models/BaseModel',
  'config/paths'
],
function( Backbone, BaseModel, Paths ) {
    'use strict';

  /* Return a model class definition */
  return BaseModel.extend({

    urlRoot: function() {return Paths.url + '/candidatetests';},

    parse: function (response) {
      response = _.findWhere(response, {id: this.get('id_test')});
      var result = new Backbone.Collection(response);
      return { list: result };
    }

    });
});
