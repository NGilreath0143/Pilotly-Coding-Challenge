import { Meteor } from 'meteor/meteor';
import { AddressCollection } from '/imports/api/collections';

function insertAddress({ latitude, longitude, street_number, route, locality, administrativeArea, country, postalCode }) {
  AddressCollection.insert({latitude, longitude, street_number, route, locality, administrativeArea, country, postalCode, createdAt: new Date()});
}

Meteor.startup(() => {
  // If the Address collection is empty, add some data.
  if (AddressCollection.find().count() === 0) {
    insertAddress({
      "latitude":  37.331967,
      "longitude":  -122.030306,
      "street_number": "1",
      "route": "Infinite Loop",
      "locality": "Cupertino",
      "administrativeArea": "CA",
      "country": "United States",
      "postalCode": "95014"
    });

    insertAddress({
      "latitude":  33.941856,
      "longitude":  -118.408541,
      "street_number": "1",
      "route": "World Way",
      "locality": "Los Angeles",
      "administrativeArea": "CA",
      "country": "United States",
      "postalCode": "90045"
    });

    insertAddress({
      "latitude":  37.784676,
      "longitude":  -122.404979,
      "street_number": "814",
      "route": "Mission St",
      "locality": "San Francisco",
      "administrativeArea": "CA",
      "country": "United States",
      "postalCode": "94103"
    });

    insertAddress({
      "latitude":  40.394140,
      "longitude":  -111.588857,
      "street_number": "8942",
      "route": "Aspen Way",
      "locality": "Sundance",
      "administrativeArea": "UT",
      "country": "United States",
      "postalCode": "84604"
    });

    insertAddress({
      "latitude":  40.713187,
      "longitude":  -74.013026,
      "street_number": "285",
      "route": "Fulton St",
      "locality": "New York",
      "administrativeArea": "NY",
      "country": "United States",
      "postalCode": "10006"
    });

    insertAddress({
      "latitude":  43.646331,
      "longitude":  -79.391697,
      "street_number": "370",
      "route": "King St W",
      "locality": "Toronto",
      "administrativeArea": "ON",
      "country": "Canada",
      "postalCode": "M5V 1J9"
    });

    insertAddress({
      "latitude":  51.503554,
      "longitude":  -0.12763,
      "street_number": "10",
      "route": "Downing Street",
      "locality": "London",
      "administrativeArea": "England",
      "country": "United Kingdom",
      "postalCode": "SW1A 2AA"
    });

    insertAddress({
      "latitude":  -33.860074,
      "longitude":  151.208935,
      "street_number": "134",
      "route": "George Street",
      "locality": "Sydney",
      "administrativeArea": "NSW",
      "country": "Australia",
      "postalCode": "2000"
    });
  }
});
