define([
  'config/oauth2'
],
function( Config ) {
  'use strict';

  class authGoogle {

    constructor () {
      gapi.client.load('gmail', 'v1', function() { /* Loaded */ });
      _.bindAll(this, 'handleAuthClick', 'handleClientLoad', 'checkAuth', 'handleAuthResult', 'makeApiCall');
    }

    handleClientLoad () {
      gapi.client.setApiKey(Config.apikey);
      window.setTimeout(this.checkAuth,1);
    }

    checkAuth () {
      gapi.auth.authorize({client_id: Config.client_id, scope: Config.scope, immediate: true}, this.handleAuthResult);
    }

    handleAuthResult (authResult) {
      var authorizeButton = document.getElementById('authorize-button');
      if (authResult && !authResult.error) {
        authorizeButton.style.visibility = 'hidden';
        this.makeApiCall();
      } else {
        authorizeButton.style.visibility = '';
        authorizeButton.onclick = this.handleAuthClick;
      }
    }

    handleAuthClick (event) {
      gapi.auth.authorize({client_id: Config.client_id, scope: Config.scope, immediate: false}, this.handleAuthResult);
      return false;
    }

    makeApiCall () {
      gapi.client.load('plus', 'v1').then(function() {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
              });
        request.then(function(resp) {
          debugger
          // mandar a servidor de login esto
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
      });
    }
    
  };
  
  return new authGoogle();
  
});
