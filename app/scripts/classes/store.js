define([
],
function( ) {
  'use strict';

  var store = {
    get: function(key) {
      return localStorage.getItem(key);
    },

    set: function(key, data) {
      return localStorage.setItem(key, JSON.stringify(data));
    },

    "delete": function(key) {
      return localStorage.removeItem(key);
    }
  };
  
  return store;
  
});
