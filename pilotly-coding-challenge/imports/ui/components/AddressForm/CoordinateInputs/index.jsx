import React from "react";

import { LatitudeInputField, LongitudeInputField } from './styles'


const CoordinateInputs = (props) => {
  return (
    <>
      <label>Latitude</label>
      <LatitudeInputField
        type="text"
        placeholder="Latitude"
        value={props.latitude}
        onChange={(e) => props.setLatitude(e.target.value)}
      />
      <br/>
      <label>Longitude</label>
      <LongitudeInputField
        type="text"
        placeholder="Longitude"
        value={props.longitude}
        onChange={(e) => props.setLongitude(e.target.value)}
      />
    </>
  );
};

export default CoordinateInputs;
