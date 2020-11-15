import React, { useState } from 'react';

import { isValidCoordinates } from '../utils/coordinateUtils'

export const AddressForm = (props) => {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [maxDistance, setMaxDistance] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (!isValidCoordinates(longitude, latitude)) {
      return;
    }

    props.setUserLongitude(longitude);
    props.setUserLatitude(latitude);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <input
        type="text"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <input
        type="text"
        placeholder="Maximum Distance"
        value={maxDistance}
        onChange={(e) => setMaxDistance(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};