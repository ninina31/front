define([
  'backbone',
  'models/CandidateModel',
  'models/SessionModel',
  'collections/CandidateTestCollection',
  'hbs!tmpl/item/GetTestView_tmpl'
],
function( Backbone, CandidateModel, SessionModel, CandidateTestCollection, GettestviewTmpl ) {
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
    },
    
    template: GettestviewTmpl,

    /* Ui events hash */
    events: {
      'click #deleteExam': 'deleteExam',
      'click #asignCandidate': 'asignCandidateToTest',
      'click #addEmailField': 'addEmailField'
    },

    fetchContent: function () {
      Backbone.$.when(this.model.fetch(), this.collection.fetch()).done(this.renderView);
    },

    renderView: function(){
      this.trigger('fetched', this);
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
      debugger
    },

    onSaveError: function () {
      debugger
    },

    addEmailField: function () {
      $('.emails').append("<input type='email' class='email form-control' placeholder='Usuario'>");
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
        _.each(data.items, function (ct) {
          var dateStarted = new Date(ct.started);
          var dateSubmitted = new Date(ct.submitted);
          var dateCreated = new Date(ct.created_at);
          ct.started = dateStarted.toUTCString();
          ct.submitted = dateSubmitted.toUTCString();
          ct.created_at = dateCreated.toDateString();
        })
      }

      return data;
    },
    
  });

});
