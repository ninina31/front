define([
  'backbone',
  'collections/BaseCollection',
  'models/CompanyModel',
  'config/paths'
],
function( Backbone, BaseCollection, CompanyModel , Paths) {
    'use strict';

  /* Return a collection class definition */
  return BaseCollection.extend({

    model: CompanyModel,

    url: function() {return Paths.url + '/company';}
    
  });
});
