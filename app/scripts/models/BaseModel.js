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

    get: function (attr) {
      var result = Backbone.Model.prototype.get.call(this, attr);
      if (_.isString(result)) {
        return _.unescape(result);
      }
      return result;
    },

    fetch: function (options) {
      options = options || {};
      options.data = {
        key: this._getApiKey()
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
        key: this._getApiKey()
      };
      data = $.param(data);
      var url = _.result(this, 'urlRoot') || _.result(this, 'url');
      if (!this.isNew()) {
        url = url + '/' + this.id;
      }
      if (options.url == undefined) {
        options.url = url + '?' + data;
      }
      var promise = Backbone.Model.prototype.save.call(this, attrs, options);
      promise.then(null, this.triggerError);
      return promise;
    },

    _getApiKey: function () {
      return Store.get('apikey');
    }

    });
});
