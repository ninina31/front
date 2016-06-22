define([
  'backbone',
  'models/CandidateTestModel',
  'collections/BaseCollection',
  'config/paths'
],
function( Backbone, CandidateTestModel, BaseCollection, Paths ) {
    'use strict';

  /* Return a collection class definition */
  return BaseCollection.extend({

    model: CandidateTestModel,

    url: function() {return Paths.url + '/candidatetests';},

    parse: function (response) {
      var raw = response.raw;
      var tests = response.tests;
      var candidates = response.candidates;
      _.each(raw, function (candidate_test) {
        var test = _.findWhere(tests, { id_test: candidate_test.id_test});
        var candidate = _.findWhere(candidates, { id: candidate_test.id_candidate});
        candidate_test.id_test = test;
        candidate_test.id_candidate = candidate;
      })
      return raw;
    }

  });
});
