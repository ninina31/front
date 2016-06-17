define([
  'backbone',
  'models/SessionModel',
  'classes/store'
],
function( Backbone, SessionModel, Store ) {
    'use strict';

  /* Return a collection class definition */
  return Backbone.Collection.extend({

    fetch: function (options) {
      options = options || {};
      options.data = {
        apikey: this._getApiKey(),
        id_user: SessionModel.id
      };
      return Backbone.Collection.prototype.fetch.call(this, options);
    },

    save: function (options) {
    var data = {
        apikey: this._getApiKey(),
        id_user: this._getUserId()
      };
      data = $.param(data);
      this.url = this.url()+ '?' + data;
      Backbone.sync('create', this, options);
    },

    _getApiKey: function () {
      return Store.get('apikey');
    },
    
    _getUserId: function () {
      return SessionModel.id;
    }

  });
});
