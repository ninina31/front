define([
	'backbone',
  'views/item/BannerView',
  'views/item/NavBarView',
  'views/item/HomeView',
  'views/item/TestFormView',
  'views/item/LoginView',
  'views/item/AccountView',
  'views/item/DoTestView',
  'views/item/GetTestView',
  'views/item/ReviewTestView',
  'models/TestModel'
],
function( Backbone , BannerView, NavBarView, HomeView, TestFormView, LoginView, AccountView, DoTestView, GetTestView, ReviewTestView, TestModel ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( options ) {
			console.log("initialize a Appcontroller Controller");
    },

    addNavBars: function () {
      App.topNavbar.show(new NavBarView());
    },

    home: function () {
      this.addNavBars();
      var content = new HomeView();
      App.content.show(content);
    },

    addTest: function () {
      this.addNavBars();
      var content = new TestFormView();
      App.content.show(content);
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
      var model = new TestModel({id: id});
      var content = new DoTestView({model: model});
      App.content.show(content);
    },

    getTest: function (id) {
      this.addNavBars();
      var model = new TestModel({id: id});
      var content = new GetTestView({model: model});
      App.content.show(content);
    },

    reviewTest: function (id) {
      this.addNavBars();
      var model = new TestModel({id: id});
      var content = new ReviewTestView({model: model});
      App.content.show(content);
    }

	});

});
