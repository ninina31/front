define([
  'backbone',
  'collections/BaseCollection',
  'config/paths'
],
function( Backbone, BaseCollection, Paths ) {
    'use strict';

  /* Return a collection class definition */
  return BaseCollection.extend({

    url: function() {return Paths.url + '/reviewertests';},

    parse: function (response) {
      var raw = response.raw;
      var tests = response.tests;
      _.each(raw, function (candidate_test) {
        var test = _.findWhere(tests, { id_test: candidate_test.id_test});
        candidate_test.id_test = test;
      })
      return raw;
    }

  });
});
