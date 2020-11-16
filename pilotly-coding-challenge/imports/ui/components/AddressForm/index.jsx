import React, { useState, useEffect } from "react";

import AddressInputs from "./AddressInputs";
import CoordinateInputs from "./CoordinateInputs";
import { AddressConstants } from "../../utils/constants";
import {
  isValidCoordinates,
  isValidDistance,
} from "../../utils/coordinateUtils";
import { encodeHTML } from "../../utils/helpers";

const AddressForm = (props) => {
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState(props.maxDistance);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [searchByType, setSearchByType] = useState(
    AddressConstants.SearchByType.ADDRESS
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(address);

    if (!isValidDistance(distance)) {
      setDistance(props.maxDistance);
    } else {
      props.setMaxDistance(Number(distance));
    }

    if (searchByType === AddressConstants.SearchByType.ADDRESS) {
      Meteor.call(
        "geolocation.getCoordinates",
        encodeHTML(address),
        (error, response) => {
          console.log("resp", response);
          console.log("err", error);

          if (
            response &&
            response.data &&
            response.data.results &&
            response.data.results.length > 0 &&
            response.data.results[0].geometry &&
            response.data.results[0].geometry.location &&
            response.data.results[0].geometry.location.lat &&
            response.data.results[0].geometry.location.lng
          ) {
            var responseLatitude =
              response.data.results[0].geometry.location.lat;
            var responseLongitude =
              response.data.results[0].geometry.location.lng;
            if (!isValidCoordinates(responseLatitude, responseLongitude)) {
              return;
            }
            setLatitude(Number(responseLatitude));
            setLongitude(Number(responseLongitude));
            setAddress(encodeHTML(response.data.results[0].formatted_address));
            updateResultParameters(responseLatitude, responseLongitude);
          }
        }
      );
    } else {
      if (!isValidCoordinates(latitude, longitude)) {
        return;
      }

      updateResultParameters(latitude, longitude);
    }
  };

  const updateResultParameters = (newLatitude, newLongitude) => {
    if (!isValidDistance(distance)) {
      setDistance(props.maxDistance);
    } else {
      props.setMaxDistance(Number(distance));
    }

    props.setUserLatitude(newLatitude);
    props.setUserLongitude(newLongitude);
  } 

  const onSearchByTypeChangeEventHandler = (event) => {
    setSearchByType(event.target.value);
    console.log(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Search by </label>
      <select
        defaultValue={searchByType}
        onChange={onSearchByTypeChangeEventHandler}
      >
        <option value={AddressConstants.SearchByType.ADDRESS}>Address</option>
        <option value={AddressConstants.SearchByType.COORDINATES}>
          Coordinates
        </option>
      </select>
      <br />
      {searchByType === AddressConstants.SearchByType.ADDRESS ? (
        <AddressInputs address={address} setAddress={setAddress} />
      ) : (
        <CoordinateInputs
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
      )}
      <br />
      <input
        type="text"
        placeholder="Maximum Distance"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddressForm;
