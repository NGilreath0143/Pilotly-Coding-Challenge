import React, { useState } from "react";

import {
  DistanceField,
  DistanceUnitSelect,
  ErrorText,
  FormContainer,
  SearchByTypeSelect,
  SubmitButton,
} from "./styles";
import { checkErrorBucketForError } from "./helpers";
import AddressInputs from "./AddressInputs";
import CoordinateInputs from "./CoordinateInputs";
import { AddressConstants } from "../../utils/constants";
import {
  isValidCoordinate,
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
    AddressConstants.SearchByType.COORDINATES
  );
  const [errorBucket, setErrorBucket] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorBucket([]);

    var validationResults = validateFormFields();
    if (!validationResults.success) {
      setErrorBucket(validationResults.error);
      return;
    }

    if (searchByType === AddressConstants.SearchByType.ADDRESS) {
      Meteor.call(
        "geolocation.getCoordinates",
        encodeHTML(address),
        (error, response) => {
          if (
            !error &&
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

            setAddress(encodeHTML(response.data.results[0].formatted_address));
            props.setSearchedAddress(
              encodeHTML(response.data.results[0].formatted_address)
            );
            updateResultParameters(responseLatitude, responseLongitude);
          } else {
            setErrorBucket({
              errors: ["Unable to find address. Double check and try again."],
              errorSources: [AddressConstants.AddressFormFields.ADDRESS],
            });
          }
        }
      );
    } else {
      updateResultParameters(latitude, longitude);
    }
  };

  const updateResultParameters = (newLatitude, newLongitude) => {
    props.setSearchedType(searchByType);
    props.setMaxDistance(Number(distance));
    props.setUserLatitude(Number(newLatitude));
    props.setUserLongitude(Number(newLongitude));
  };

  const onSearchByTypeChangeEventHandler = (event) => {
    setLatitude("");
    setLongitude("");
    setAddress("");
    setErrorBucket([]);
    setDistance(Number(props.maxDistance));
    setSearchByType(event.target.value);
  };

  const validateFormFields = () => {
    var tempLatitude = Number(latitude);
    var tempLongitude = Number(longitude);
    var result = { success: true, error: { errors: [], errorSources: [] } };
    if (searchByType === AddressConstants.SearchByType.COORDINATES) {
      if (
        !isValidCoordinate(latitude) ||
        tempLatitude > 90 ||
        tempLatitude < -90
      ) {
        result.success = false;
        result.error.errors.push(
          "Invalid latitude. Value must be between -90 and 90"
        );
        result.error.errorSources.push(
          AddressConstants.AddressFormFields.LATITUDE
        );
      }

      if (
        !isValidCoordinate(longitude) ||
        tempLongitude > 180 ||
        tempLongitude < -180
      ) {
        result.success = false;
        result.error.errors.push(
          "Invalid longitude. Value must be between -180 and 180"
        );
        result.error.errorSources.push(
          AddressConstants.AddressFormFields.LONGITUDE
        );
      }
    }

    if (!isValidDistance(distance)) {
      result.success = false;
      result.error.errors.push("Invalid distance. Enter a valid number");
      result.error.errorSources.push(
        AddressConstants.AddressFormFields.DISTANCE
      );
    }

    return result;
  };

  return (
    <FormContainer>
      {errorBucket.length === 0
        ? null
        : errorBucket.errors.map((error, key) => (
            <ErrorText key={key}>{error}</ErrorText>
          ))}
      <form onSubmit={handleSubmit}>
        <label>Search by </label>
        <SearchByTypeSelect
          defaultValue={searchByType}
          onChange={onSearchByTypeChangeEventHandler}
        >
          <option value={AddressConstants.SearchByType.ADDRESS}>Address</option>
          <option value={AddressConstants.SearchByType.COORDINATES}>
            Coordinates
          </option>
        </SearchByTypeSelect>
        <br />
        {searchByType === AddressConstants.SearchByType.ADDRESS ? (
          <AddressInputs
            address={address}
            errorBucket={errorBucket}
            setAddress={setAddress}
          />
        ) : (
          <CoordinateInputs
            errorBucket={errorBucket}
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        )}
        <br />
        <label>Distance</label>
        <DistanceField
          className={
            checkErrorBucketForError(
              errorBucket,
              AddressConstants.AddressFormFields.DISTANCE
            )
              ? "error"
              : ""
          }
          name={AddressConstants.AddressFormFields.DISTANCE}
          type="text"
          placeholder="Maximum Distance"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <DistanceUnitSelect
          defaultValue={props.distantUnits}
          onChange={(e) => props.setDistanceUnits(e.target.value)}
        >
          <option value={AddressConstants.MetricUnits.KILOMETER}>km</option>
          <option value={AddressConstants.MetricUnits.MILES}>mi</option>
        </DistanceUnitSelect>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default AddressForm;
