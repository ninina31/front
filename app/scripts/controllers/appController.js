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
  'views/item/NotFoundView',
  'views/composite/QuestionCreationView',
  'models/TestModel',
  'views/item/AddUserView',
  'views/item/EditTestView',
  'views/composite/QuestionUpdateView',
  'models/CompanyModel',
  'models/UserModel',
  'models/SessionModel',
  'collections/AnswerCollection'
],
function( Backbone , BannerView, NavBarView, HomeView, LoginView, ListCompaniesView, ListUsersView, CompanyView, DoTestView, GetTestView, GetUserView, GetCompanyView, ReviewTestView, AddTestView, EditUserView, ProfileView, NotFoundView, QuestionCreationView, TestModel, AddUserView, EditTestView, QuestionUpdateView, CompanyModel, UserModel, SessionModel, AnswerCollection ) {
    'use strict';

  return Backbone.Marionette.Controller.extend({

    initialize: function( options ) {
      this.model = SessionModel;
      _.bindAll(this, 'renderView', 'login');
    },

    addNavBars: function () {
      App.topNavbar.show(new NavBarView());
    },

    home: function () {
      this.addNavBars();
      var content = new HomeView();
      if (!this.model.canAccessPage(content)){
        this.showNotFound();
        return false;
      }
      this.prepareView(content);
    },

    listUsers: function () {
      this.addNavBars();
      var content = new ListUsersView();
      if (!this.model.canAccessPage(content)){
        this.showNotFound();
        return false;
      }
      this.prepareView(content);
    },

    listCompanies: function () {
      this.addNavBars();
      var content = new ListCompaniesView();
      if (!this.model.canAccessPage(content)){
        this.showNotFound();
        return false;
      }
      this.prepareView(content);
    },

    addTest: function () {
      this.addNavBars();
      var test = new AddTestView();
      if (!this.model.canAccessPage(test)){
        this.showNotFound();
        return false;
      }
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
      if (!this.model.canAccessPage(content)){
        this.showNotFound();
        return false;
      }
      App.content.show(content);
    },

    doTest: function (id) {
      this.addNavBars();
      var model = new TestModel({id_test: id});
      var content = new DoTestView({model: model});
      if (!this.model.canAccessPage(content)){
        this.showNotFound();
        return false;
      }
      App.content.show(content);
    },

    getTest: function (id) {
      this.addNavBars();
      var model = new TestModel({id_test: id});
      var content = new GetTestView({model: model});
      if (!this.model.canAccessPage(content)){
        this.showNotFound();
        return false;
      }
      this.prepareView(content);
    },

    getCompany: function (id) {
      this.addNavBars();
      var model = new CompanyModel({id: id});
      var content = new GetCompanyView({model: model});
      if (!this.model.canAccessPage(content)){
        this.showNotFound();
        return false;
      }
      this.prepareView(content);
    },

    getUser: function (id) {
      this.addNavBars();
      var model = new UserModel({ id: id });
      var content = new GetUserView({ model: model });
      if (!this.model.canAccessPage(content)){
        this.showNotFound();
        return false;
      }
      this.prepareView(content);
    },

    reviewTest: function (id_test, id_candidate) {
      this.addNavBars();
      var model = new TestModel({id_test: id_test});
      var collection = new AnswerCollection({id_test: id_test, id_candidate: id_candidate});
      var content = new ReviewTestView({ model: model, collection: collection });
      if (!this.model.canAccessPage(content)){
        this.showNotFound();
        return false;
      }
      this.prepareView(content);
    },

    addUser: function () {
      this.addNavBars();
      var content = new AddUserView();
      if (!this.model.canAccessPage(content)){
        this.showNotFound();
        return false;
      }
      this.prepareView(content);
    },

    editUser: function (id) {
      this.addNavBars();
      var model = new UserModel({ id: id });
      var content = new EditUserView({ model: model });
      if (!this.model.canAccessPage(content)){
        this.showNotFound();
        return false;
      }
      this.prepareView(content);
    },

    editTest: function (id) {
      this.addNavBars();
      var model = new TestModel({ id_test: id });
      var content = new EditTestView({ model: model });
      if (!this.model.canAccessPage(content)){
        this.showNotFound();
        return false;
      }
      this.prepareView(content);
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

    showNotFound: function () {
      var notFound = new NotFoundView();
      App.content.show(notFound);
    },

    prepareView: function (content) {
      content.fetchContent();
      content.listenTo(content, 'fetched', this.renderView);
      content.listenTo(content, 'invalidKey', this.login);
    }

  });

});
