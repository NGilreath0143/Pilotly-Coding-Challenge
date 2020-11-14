import { check } from 'meteor/check';
import { AddressCollection } from './collections';
 
Meteor.methods({
  'addresses.searchAddressesInRangeByAddress': function(text) {
    check(text, String);
 
    log(text)
 
    // TasksCollection.insert({
    //   text,
    //   createdAt: new Date,
    //   userId: this.userId,
    // })
    AddressCollection.insert({
      "latitude":  37.331967,
      "longitude":  -122.030306,
      "street_number": "1122",
      "route": "Boogey Boogey Avenue",
      "locality": "Southfield",
      "administrativeArea": "MI",
      "country": "United States",
      "postalCode": "48076"
    });
  },
  'addresses.searchAddressesInRangeByCoordinates': function(latitude, longitude) {
    check(latitude, Number)
    check(longitude, Number)
  }
});