define([
  'backbone',
  'models/SessionModel',
  'classes/store'
],
function( Backbone, SessionModel, Store ) {
    'use strict';

  /* Return a model class definition */
  return Backbone.Model.extend({

    initialize: function () {
      _.bindAll(this, 'triggerError');
    },

    set: function (attributes, options) {
      if (_.isObject(attributes)) {
        _.each(attributes, function (value, key) {
          if (_.isString(value)) {
            attributes[key] = _.escape(value);
          }
        });
      } else {
        options = _.escape(options);
      }
      return Backbone.Model.prototype.set.call(this, attributes, options);
    },

    fetch: function (options) {
      options = options || {};
      options.data = {
        key: this._getApiKey(),
        id_user: this._getUserId()
      };
      var promise = Backbone.Model.prototype.fetch.call(this, options);
      promise.then(null, this.triggerError);
      return promise;
    },

    triggerError: function (jqhxr) {
      if (jqhxr.responseText.indexOf('ApiKey') > 0) {
        SessionModel.logout();
        this.trigger('invalidkey');
      }
    },

    save: function (attrs, options) {
      var data = {
        key: this._getApiKey(),
        id_user: this._getUserId()
      };
      data = $.param(data);
      this.url = this.url()+ '?' + data;
      var promise = Backbone.Model.prototype.save.call(this, attrs, options);
      promise.then(null, this.triggerError);
      return promise;
    },

    _getApiKey: function () {
      return Store.get('apikey');
    },
    
    _getUserId: function () {
      return SessionModel.id;
    }

    });
});
