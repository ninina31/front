define([
  'backbone',
  'underscore',
  'models/BaseModel',
  'config/paths'
],
function( Backbone, _, BaseModel, Paths ) {
    'use strict';

  /* Return a model class definition */
  return Backbone.Model.extend({

    set: function (attributes, options) {
      if (_.isObject(attributes)) {
        _.each(attributes, function (value, key) {
          if (!_.isObject(value)) {
            attributes[key] = _.escape(value);
          }
        });
      } else {
        options = _.escape(options);
      }
      return Backbone.Model.prototype.set.call(this, attributes, options);
    }

    });
});
