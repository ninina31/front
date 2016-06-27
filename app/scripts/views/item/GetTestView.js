define([
  'backbone',
  'models/CandidateModel',
  'models/ReviewerTestModel',
  'models/SessionModel',
  'collections/CandidateTestCollection',
  'collections/UserCollection',
  'hbs!tmpl/item/GetTestView_tmpl'
],
function( Backbone, CandidateModel, ReviewerTestModel, SessionModel, CandidateTestCollection, UserCollection, GettestviewTmpl ) {
    'use strict';

  var permit = 5;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    getPermit: function () {
      return permit;
    },

    initialize: function() {
      _.bindAll(this, 'renderView', 'onDeleteSuccess', 'onDeleteFail', 'onSaveSuccess', 'onSaveError');
      this.collection = new CandidateTestCollection();
      $('[data-toggle="popover"]').popover({ html: true });
      this.reviewers = new UserCollection();
    },
    
    template: GettestviewTmpl,

    /* Ui events hash */
    events: {
      'click #deleteExam': 'deleteExam',
      'click #asignCandidate': 'asignCandidateToTest',
      'click #addEmailField': 'addEmailField',
      'click .review': 'hideModal',
      'click .reviewerAsign': 'reviewerAsign'
    },

    fetchContent: function () {
      Backbone.$.when(this.model.fetch(), this.collection.fetch(), this.reviewers.fetch()).done(this.renderView);
    },

    renderView: function(){
      this.trigger('fetched', this);
    },

    hideModal: function () {
      $('#candidateModal').modal('hide');
    },

    deleteExam: function () {
      this.model.destroy({
        method: 'DELETE',
        success: this.onDeleteSuccess,
        error: this.onDeleteFail
      });
    },

    onDeleteSuccess: function () {
      Backbone.history.navigate('', {trigger: true});
    },

    onDeleteFail: function () {
      $('.alert.alert-danger').removeClass('hidden');
    },

    asignCandidateToTest: function (event) {
      event.preventDefault();
      var id_test = this.model.id;
      var id_user = SessionModel.id;
      var emails = $('.email');
      var emailsParam = [];
      _.each(emails, function (email) {
        emailsParam.push({email: email.value});
      });
      var candidate = new CandidateModel();
      candidate.save({
        id_test: id_test,
        id_user: id_user,
        emails: emailsParam
      },
      {
        success: this.onSaveSuccess,
        error: this.onSaveError
      }
      );
    },

    onSaveSuccess: function () {
      $('#modal').modal('hide');
      $('.alert.alert-danger').addClass('hidden');
      $('.alert.alert-success').removeClass('hidden');
    },

    onSaveError: function () {
      $('#modal').modal('hide');
      $('.alert.alert-danger').removeClass('hidden');
    },

    addEmailField: function () {
      $('.emails').append("<input type='email' class='email form-control' placeholder='Usuario'>");
    },

    reviewerAsign: function (event) {
      event.preventDefault();
      var id_reviewer = $('select').val();
      var reviewerTest = new ReviewerTestModel({
        id_test: this.model.id,
        id_reviewer: id_reviewer
      });
      reviewerTest.save(null, {
        success: this.onReviewerTestSuccess,
        error: this.onReviewerTestFail
      });
    },

    onReviewerTestSuccess: function () {
      $('#reviewerModal').modal('hide');
      $('.alert.alert-danger').addClass('hidden');
      $('.reviewerAlert').removeClass('hidden');
    },

    onReviewerTestFail: function () {
      $('#reviewerModal').modal('hide');
      $('.alert.alert-danger').removeClass('hidden');
    },

    serializeData: function(){
      var data = {};

      if (this.model) {
        data = this.model.toJSON();
      }
      if (this.collection) {
        var candidate_tests = this.collection.toJSON();
        data.items = _.filter(candidate_tests, function (ct) {
          return ct.id_test.id_test == this.model.id;
        }, this);
      var reviewers = this.reviewers.filter(function (user) {
        return user.get('rol_id').id == 2;
      });
      reviewers = new Backbone.Collection(reviewers);
      data.reviewers = reviewers.toJSON();
      }

      return data;
    },
    
  });

});
