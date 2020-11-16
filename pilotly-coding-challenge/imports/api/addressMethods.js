import { check } from "meteor/check";
import { AddressCollection } from "./collections";
import {
  calculateDistance,
  convertKilometersToMiles,
} from "../ui/utils/coordinateUtils";
import { AddressConstants } from "../ui/utils/constants";

Meteor.methods({
  "address.getAddressesWithinRange": function (
    latitude,
    longitude,
    maxDistance,
    distanceUnits
  ) {
    check(latitude, Number);
    check(longitude, Number);
    check(maxDistance, Number);
    check(distanceUnits, String);
    var addressList = AddressCollection.find({
      $where: function (address) {
        var distance = calculateDistance(
          address.latitude,
          address.longitude,
          latitude,
          longitude
        );
        console.log(distance);
        if (distanceUnits === AddressConstants.MetricUnits.MILES) {
          return (
            convertKilometersToMiles(distance) < maxDistance && distance !== -1
          );
        }
        return distance < maxDistance && distance !== -1;
      },
    }).fetch();
    addressList.forEach((address) => {
      address.distance = calculateDistance(
        address.latitude,
        address.longitude,
        latitude,
        longitude
      );
    });
    addressList.sort((address1, address2) => {
      return address1.distance - address2.distance;
    });
    addressList = addressList.filter((address) => {
      if (distanceUnits === AddressConstants.MetricUnits.MILES) {
        return (
          convertKilometersToMiles(address.distance) < maxDistance &&
          address.distance !== -1
        );
      }
      return address.distance < maxDistance && address.distance !== -1;
    });
    return addressList;
  },
});
