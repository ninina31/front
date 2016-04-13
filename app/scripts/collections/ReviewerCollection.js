define([
  'backbone',
  'models/ReviewerModel',
  'config/paths'
],
function( Backbone, ReviewerModel , Paths) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({
    initialize: function() {
      console.log("initialize a ReviewerCollection collection");
    },

    model: ReviewerModel,

    url: function() {return Paths.url + '/reviewers';}
  });
});
