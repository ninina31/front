define([
  'backbone',
  'models/SessionModel',
  'classes/store'
],
function( Backbone, SessionModel, Store ) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({

    initialize: function () {
      _.bindAll(this, 'triggerError');
    },

    fetch: function (options) {
      options = options || {};
      options.data = {
        key: this._getApiKey()
      };
      var promise = Backbone.Collection.prototype.fetch.call(this, options);
      promise.then(null, this.triggerError);
      return promise;
    },

    save: function (options) {
      var data = {
        key: this._getApiKey()
      };
      data = $.param(data);
      var url = _.result(this, 'url');
      if (options.url == undefined) {
        options.url = url + '?' + data;
      }
      var promise = Backbone.sync('create', this, options);
      promise.then(null, this.triggerError);
      return promise;
    },

    _getApiKey: function () {
      return Store.get('apikey');
    },

    triggerError: function (jqhxr) {
      if (jqhxr.responseText.indexOf('ApiKey') > 0) {
        SessionModel.logout();
        this.trigger('invalidkey');
      }
    }

  });
});
