define([
	'backbone',
  'models/SessionModel',
  'models/TestModel',
  'hbs!tmpl/item/HomeUserView_tmpl',
  'hbs!tmpl/item/HomeCandidateView_tmpl',
  'hbs!tmpl/item/HomeReviewerView_tmpl',
  'hbs!tmpl/item/ModalCandidate_tmpl',
  'collections/TestCollection',
  'collections/CandidateTestCollection',
  'collections/ReviewerTestCollection'
],
function( Backbone, SessionModel, TestModel, HomeUserView_tmpl, HomeCandidateView_tmpl, HomeReviewerView_tmpl, ModalCandidate, TestCollection, CandidateTestCollection, ReviewerTestCollection ) {
    'use strict';

  var permit = 4;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    getPermit: function () {
      return permit;
    },

    events: {
      'click .btn-activate': 'changeActiveTest',
      'click .activate': 'loadCandidateTable'
    },

    initialize: function() {
      _.bindAll(this, 'onFetchSuccess', 'onFetchError', 'changeActiveTest', 'onSaveFail', 'onSaveSuccess', 'onCTFetchSuccess', 'onCTFetchFail');
      this.model = SessionModel;
      var logged = this.model.checkAuth();
      if (!logged) {
        Backbone.history.navigate('login', {trigger: true});
      }
      if (this.model.isCandidate()) {
        this.collection = new CandidateTestCollection();
      } else if (this.model.get('rol_id').id == 2){
        this.collection = new ReviewerTestCollection();
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
      } else if (this.model.get('rol_id').id == 2) {
        return HomeReviewerView_tmpl;
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

    loadCandidateTable: function (event) {
      this.chosenTest = event.currentTarget.dataset.testId;
      this.ct = new CandidateTestCollection();
      this.ct.fetch({
        success: this.onCTFetchSuccess,
        error: this.onCTFetchFail
      });
    },

    onCTFetchSuccess: function () {
      this.ct = this.ct.filter(function (cts) {
        return cts.get('id_test').id_test == this.chosenTest;
      }, this);
      this.ct = new Backbone.Collection(this.ct);
      var data = this.ct.toJSON();
      $('.modal-body').html(ModalCandidate({data: data}));
      $('#candidateModal').modal('show');
    },

    onCTFetchFail: function () {
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
          return candidate_test.get('id_candidate').id == this.model.id;
        }, this);
        candidate_tests = new Backbone.Collection(candidate_tests);
        var tests = candidate_tests.pluck('id_test');
        this.collection = new CandidateTestCollection(tests);
        this.collection.each(function (candidate_test) {
          var time = new Date(candidate_test.get('created_at'));
          candidate_test.set({ created_at: time.toDateString()});
        });
      } else if (this.model.get('rol_id').id == 2){
        var collection = this.collection.filter(function (reviewer_test) {
          return reviewer_test.get('id_user') == SessionModel.id;
        });
        this.collection = new Backbone.Collection(collection);
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
