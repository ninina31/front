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
      var dateStarted = new Date(response.started);
      var dateSubmitted = new Date(response.submitted);
      var dateCreated = new Date(response.created_at);
      if (response.started != null) {
        response.started = dateStarted.toUTCString();
      }
      if (response.submitted != null) {
        response.submitted = dateSubmitted.toUTCString();
      }
      response.created_at = dateCreated.toDateString();
      return response;
    }

    });

});
