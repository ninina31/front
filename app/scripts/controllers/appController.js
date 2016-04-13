define([
	'backbone',
  'views/item/BannerView',
  'views/item/NavBarView',
  'views/item/HomeView',
  'views/item/LoginView',
  'views/item/ListAccountsView',
  'views/item/ListReviewersView',
  'views/item/AccountView',
  'views/item/DoTestView',
  'views/item/GetTestView',
  'views/item/GetReviewerView',
  'views/item/GetAccountView',
  'views/item/ReviewTestView',
  'views/item/AddTestView',
  'views/item/EditReviewerView',
  'views/collection/QuestionCreationView',
  'models/TestModel',
  'views/item/AddReviewerView',
  'views/item/EditTestView',
  'views/collection/QuestionUpdateView',
  'models/AccountModel',
  'models/ReviewerModel'
],
function( Backbone , BannerView, NavBarView, HomeView, LoginView, ListAccountsView, ListReviewersView, AccountView, DoTestView, GetTestView, GetReviewerView, GetAccountView, ReviewTestView, AddTestView, EditReviewerView, QuestionCreationView, TestModel, AddReviewerView, EditTestView, QuestionUpdateView, AccountModel, ReviewerModel ) {
    'use strict';

  return Backbone.Marionette.Controller.extend({

    initialize: function( options ) {
      console.log("initialize a Appcontroller Controller");
      _.bindAll(this, "renderView");
    },

    addNavBars: function () {
      App.topNavbar.show(new NavBarView());
    },

    home: function () {
      this.addNavBars();
      var content = new HomeView();
      App.content.show(content);
    },

    listReviewers: function () {
      this.addNavBars();
      var content = new ListReviewersView();
      content.listenTo(content, 'fetched', this.renderView);
    },

    listAccounts: function () {
      this.addNavBars();
      var content = new ListAccountsView();
      content.listenTo(content, 'fetched', this.renderView);
    },

    addTest: function () {
      this.addNavBars();
      var test = new AddTestView();
      App.content.show(test);
      _.bindAll(this, "addQuestions");
      test.listenTo(test, 'testAdded', this.addQuestions);
    },

    addQuestions: function (id){
      var model = new TestModel({id_test: id});
      var questions = new QuestionCreationView({model: model});
      App.content.show(questions);
    },

    login: function () {
      this.addNavBars();
      var content = new LoginView();
      App.content.show(content);
    },

    addAccount: function () {
      this.addNavBars();
      var content = new AccountView();
      App.content.show(content);
    },

    doTest: function (id) {
      this.addNavBars();
      var model = new TestModel({id_test: id});
      var content = new DoTestView({model: model});
      App.content.show(content);
    },

    getTest: function (id) {
      this.addNavBars();
      var model = new TestModel({id_test: id});
      var content = new GetTestView({model: model});
      content.listenTo(content, 'fetched', this.renderView);
    },

    getAccount: function (id) {
      this.addNavBars();
      var model = new AccountModel({id: id});
      var content = new GetAccountView({model: model});
      content.listenTo(content, 'fetched', this.renderView);
    },

    getReviewer: function (id) {
      this.addNavBars();
      var model = new ReviewerModel({ id: id });
      var content = new GetReviewerView({ model: model });
      content.listenTo(content, 'fetched', this.renderView);
    },

    reviewTest: function (id) {
      this.addNavBars();
      var model = new TestModel({id_test: id});
      model.fetch({
        success: function(){
          var content = new ReviewTestView({ model: model });
          App.content.show(content);
        }
      });
    },

    addReviewer: function () {
      this.addNavBars();
      var content = new AddReviewerView();
      content.listenTo(content, 'fetched', this.renderView);
    },

    editReviewer: function (id) {
      this.addNavBars();
      var model = new ReviewerModel({ id: id });
      var content = new EditReviewerView({ model: model });
      content.listenTo(content, 'fetched', this.renderView);
    },

    editTest: function (id) {
      this.addNavBars();
      var model = new TestModel({ id_test: id });
      var content = new EditTestView({ model: model });
      content.listenTo(content, 'fetched', this.renderView);
      _.bindAll(this, 'updateQuestions');
      content.listenTo(content, 'testEdited', this.updateQuestions);
    },

    updateQuestions: function (model){
      var questions = new QuestionUpdateView({model: model});
      App.content.show(questions);
    },

    renderView: function (view) {
      App.content.show(view);
    }

  });

});
