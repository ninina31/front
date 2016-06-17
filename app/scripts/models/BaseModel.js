define([
  'backbone',
  'models/SessionModel',
  'classes/store'
],
function( Backbone, SessionModel, Store ) {
    'use strict';

  /* Return a model class definition */
  return Backbone.Model.extend({

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
        apikey: this._getApiKey(),
        id_user: this._getUserId()
      };
      return Backbone.Model.prototype.fetch.call(this, options);
    },

    save: function (attrs, options) {
      var data = {
        apikey: this._getApiKey(),
        id_user: this._getUserId()
      };
      data = $.param(data);
      this.url = this.url()+ '?' + data;
      return Backbone.Model.prototype.save.call(this, attrs, options);
    },

    _getApiKey: function () {
      return Store.get('apikey');
    },
    
    _getUserId: function () {
      return SessionModel.id;
    }

    });
});
