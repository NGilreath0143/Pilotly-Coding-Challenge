import React from "react";

import { LatitudeInputField, LongitudeInputField } from './styles'
import { checkErrorBucketForError } from '../helpers';
import { AddressConstants } from '../../../utils/constants';

const CoordinateInputs = (props) => {
  return (
    <>
      <label>Latitude</label>
      <LatitudeInputField
      className={checkErrorBucketForError(props.errorBucket, AddressConstants.AddressFormFields.LATITUDE)
          ? "error"
          : ""
      }
        name={AddressConstants.AddressFormFields.LATITUDE}
        type="text"
        placeholder="Latitude"
        value={props.latitude}
        onChange={(e) => props.setLatitude(e.target.value)}
      />
      <br/>
      <label>Longitude</label>
      <LongitudeInputField
      className={checkErrorBucketForError(props.errorBucket, AddressConstants.AddressFormFields.LONGITUDE)
          ? "error"
          : ""
      }
        name={AddressConstants.AddressFormFields.LONGITUDE}
        type="text"
        placeholder="Longitude"
        value={props.longitude}
        onChange={(e) => props.setLongitude(e.target.value)}
      />
    </>
  );
};

export default CoordinateInputs;
