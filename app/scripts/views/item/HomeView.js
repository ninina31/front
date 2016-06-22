define([
	'backbone',
  'models/SessionModel',
  'models/TestModel',
  'hbs!tmpl/item/HomeUserView_tmpl',
  'hbs!tmpl/item/HomeCandidateView_tmpl',
  'collections/TestCollection',
  'collections/CandidateTestCollection'
],
function( Backbone, SessionModel, TestModel, HomeUserView_tmpl, HomeCandidateView_tmpl, TestCollection, CandidateTestCollection ) {
    'use strict';

  var permit = 4;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    getPermit: function () {
      return permit;
    },

    events: {
      'click .btn-activate': 'changeActiveTest'
    },

    initialize: function() {
      _.bindAll(this, 'onFetchSuccess', 'onFetchError', 'changeActiveTest', 'onSaveFail', 'onSaveSuccess');
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

    changeActiveTest: function (event) {
      event.preventDefault();
      var id = event.currentTarget.dataset.testId;
      var is_active = JSON.parse(event.currentTarget.dataset.active);
      var model = this.collection.get(id);
      model.save({ is_active: !is_active }, {
        method: 'put',
        success: this.onSaveSuccess,
        error: this.onSaveFail
      });
    },

    onSaveSuccess: function () {
      $('.alert.alert-danger').addClass('hidden');
      Backbone.history.loadUrl(Backbone.history.fragment);
    },

    onSaveFail: function () {
      $('.alert.alert-danger').removeClass('hidden');
    },

    serializeData: function(){
      var data = {};

      if (this.model) {
        data = this.model.toJSON();
      }

      if (this.model.isCandidate()) {
        var candidate_tests = this.collection.filter(function (candidate_test) {
          debugger
          return candidate_test.get('id_candidate').id == this.model.id;
        }, this);
        candidate_tests = new Backbone.Collection(candidate_tests);
        var tests = candidate_tests.pluck('id_test');
        this.collection = new CandidateTestCollection(tests);
        this.collection.each(function (candidate_test) {
          var time = new Date(candidate_test.get('created_at'));
          candidate_test.set({ created_at: time.toDateString()});
        });
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
