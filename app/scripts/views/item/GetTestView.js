define([
  'backbone',
  'models/CandidateModel',
  'models/SessionModel',
  'hbs!tmpl/item/GetTestView_tmpl'
],
function( Backbone, CandidateModel, SessionModel, GettestviewTmpl ) {
    'use strict';

  var permit = 5;

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    className: 'container',

    getPermit: function () {
      return permit;
    },

    initialize: function() {
      _.bindAll(this, "renderView", "onDeleteSuccess", "onDeleteFail", 'onSaveSuccess', 'onSaveError');
    },
    
    template: GettestviewTmpl,

    /* Ui events hash */
    events: {
      'click #deleteExam': 'deleteExam',
      'click #asignCandidate': 'asignCandidateToTest'
    },

    fetchContent: function () {
      this.model.fetch({
        success: this.renderView
      });
    },

    renderView: function(){
      this.trigger('fetched', this);
      $('[data-toggle="popover"]').popover({ html: true });
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
      var emails = { email: $('#email').val() };
      emails = [emails];
      var candidate = new CandidateModel();
      candidate.save({
        id_test: id_test,
        id_user: id_user,
        emails: emails
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
    }
    
  });

});
