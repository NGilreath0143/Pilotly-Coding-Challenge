  
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http'
 
Meteor.methods({
  'geolocation.getCoordinates': function(address) {
    check(address, String);
    return HTTP.call('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${Meteor.settings.google.maps.apiKey}`);
  }
});