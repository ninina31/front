define([
  'backbone',
  'underscore',
  'classes/store',
  'models/BaseModel',
  'config/paths'
],
function( Backbone, _, Store, BaseModel, Paths ) {
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

    // fetch: function (options) {
    //   options.data = this._getApiKey();
    //   return Backbone.prototype.fetch(this, options);
    // },

    // _getApiKey: function () {
    //   return Store.get('apikey');
    // }

    });
});
