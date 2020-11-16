import React from "react";


const CoordinateInputs = (props) => {
  return (
    <>
      <input
        type="text"
        placeholder="Latitude"
        value={props.latitude}
        onChange={(e) => props.setLatitude(e.target.value)}
      />
      <input
        type="text"
        placeholder="Longitude"
        value={props.longitude}
        onChange={(e) => props.setLongitude(e.target.value)}
      />
    </>
  );
};

export default CoordinateInputs;
