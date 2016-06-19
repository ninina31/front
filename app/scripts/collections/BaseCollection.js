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
        key: this._getApiKey(),
        id_user: SessionModel.id
      };
      var promise = Backbone.Collection.prototype.fetch.call(this, options);
      promise.then(null, this.triggerError);
      return promise;
    },

    save: function (options) {
    var data = {
        key: this._getApiKey(),
        id_user: this._getUserId()
      };
      data = $.param(data);
      this.url = this.url()+ '?' + data;
      var promise = Backbone.sync('create', this, options);
      promise.then(null, this.triggerError);
      return promise;
    },

    _getApiKey: function () {
      return Store.get('apikey');
    },
    
    _getUserId: function () {
      return SessionModel.id;
    },

    triggerError: function (jqhxr, textStatus) {
      if (textStatus.message.indexOf('apikey') > 0) {
        SessionModel.logout();
        this.trigger('invalidkey');
      }
    },


  });
});
