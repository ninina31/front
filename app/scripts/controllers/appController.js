define([
	'backbone',
  'views/item/BannerView',
  'views/item/NavBarView',
  'views/item/HomeView',
  'views/item/LoginView',
  'views/item/ListCompaniesView',
  'views/item/ListUsersView',
  'views/item/CompanyView',
  'views/item/DoTestView',
  'views/item/GetTestView',
  'views/item/GetUserView',
  'views/item/GetCompanyView',
  'views/item/ReviewTestView',
  'views/item/AddTestView',
  'views/item/EditUserView',
  'views/item/ProfileView',
  'views/collection/QuestionCreationView',
  'models/TestModel',
  'views/item/AddUserView',
  'views/item/EditTestView',
  'views/collection/QuestionUpdateView',
  'models/CompanyModel',
  'models/UserModel',
  'models/SessionModel'
],
function( Backbone , BannerView, NavBarView, HomeView, LoginView, ListCompaniesView, ListUsersView, CompanyView, DoTestView, GetTestView, GetUserView, GetCompanyView, ReviewTestView, AddTestView, EditUserView, ProfileView, QuestionCreationView, TestModel, AddUserView, EditTestView, QuestionUpdateView, CompanyModel, UserModel, SessionModel ) {
    'use strict';

  return Backbone.Marionette.Controller.extend({

    initialize: function( options ) {
      console.log("initialize a Appcontroller Controller");
      _.bindAll(this, 'renderView');
    },

    addNavBars: function () {
      App.topNavbar.show(new NavBarView());
    },

    home: function () {
      this.addNavBars();
      var content = new HomeView();
      App.content.show(content);
    },

    listUsers: function () {
      this.addNavBars();
      var content = new ListUsersView();
      content.listenTo(content, 'fetched', this.renderView);
    },

    listCompanies: function () {
      this.addNavBars();
      var content = new ListCompaniesView();
      content.listenTo(content, 'fetched', this.renderView);
    },

    addTest: function () {
      this.addNavBars();
      var test = new AddTestView();
      App.content.show(test);
      _.bindAll(this, "addQuestions");
      test.listenTo(test, 'testAdded', this.addQuestions);
    },

    addQuestions: function (model){
      var questions = new QuestionCreationView({model: model});
      App.content.show(questions);
    },

    login: function () {
      this.addNavBars();
      var content = new LoginView();
      App.content.show(content);
    },

    addCompany: function () {
      this.addNavBars();
      var content = new CompanyView();
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

    getCompany: function (id) {
      this.addNavBars();
      var model = new CompanyModel({id: id});
      var content = new GetCompanyView({model: model});
      content.listenTo(content, 'fetched', this.renderView);
    },

    getUser: function (id) {
      this.addNavBars();
      var model = new UserModel({ id: id });
      var content = new GetUserView({ model: model });
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

    addUser: function () {
      this.addNavBars();
      var content = new AddUserView();
      content.listenTo(content, 'fetched', this.renderView);
    },

    editUser: function (id) {
      this.addNavBars();
      var model = new UserModel({ id: id });
      var content = new EditUserView({ model: model });
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

    userProfile: function () {
      this.addNavBars();
      var content = new ProfileView();
      App.content.show(content);
    },

    renderView: function (view) {
      App.content.show(view);
    },

    hasPermission: function (page) {
      var user = SessionModel;
      var permits = user.get('rol').permits;
      return permits.indexOf(page) > -1;
    }

  });

});
