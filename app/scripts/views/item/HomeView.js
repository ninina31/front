define([
	'backbone',
  'models/SessionModel',
  'hbs!tmpl/item/HomeUserView_tmpl',
  'hbs!tmpl/item/HomeCandidateView_tmpl',
  'collections/TestCollection',
  'collections/CandidateTestCollection'
],
function( Backbone, SessionModel, HomeUserView_tmpl, HomeCandidateView_tmpl, TestCollection, CandidateTestCollection ) {
    'use strict';

  var permit = 4;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    getPermit: function () {
      return permit;
    },

    initialize: function() {
      _.bindAll(this, 'onFetchSuccess', 'onFetchError');
      this.model = SessionModel;
      if (this.model.isCandidate()) {
        this.collection = new CandidateTestCollection();
      } else {
        this.collection = new TestCollection();
      }
    },

    fetchContent: function () {
      this.collection.fetch({
        success: this.onFetchSuccess,
        error: this.onFetchError
      });
    },
    
    getTemplate: function () {
      if (this.model.isCandidate()) {
        return HomeCandidateView_tmpl;
      } else {
        return HomeUserView_tmpl;
      }
    },

    onFetchSuccess: function () {
      this.trigger('fetched', this);
    },

    onFetchError: function () {
      // body...
    },

    serializeData: function(){
      var data = {};

      if (this.model) {
        data = this.model.toJSON();
      }

      if (this.model.isCandidate()) {
        this.collection.each(function (candidate_test) {
          var time = new Date(candidate_test.get('created_at'));
          candidate_test.set({ created_at: time.toDateString()});
        });
        var tests = this.collection.filter(function (candidate_test) {
          return candidate_test.get('id_candidate') == this.model.id;
        }, this);
        this.collection = new CandidateTestCollection(tests);
      } else {
        var tests = this.collection.filter(function (test) {
          return test.get('id_user').id == this.model.id;
        }, this);
        this.collection = new TestCollection(tests);
      }

      if (this.collection) {
        data.items = this.collection.toJSON();
      }

    return data;
  },

  });
});
