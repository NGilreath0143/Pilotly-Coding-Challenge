import React, { useState } from "react";

import AddressList from "./components/AddressList";
import AddressForm from "./components/AddressForm";
import { AddressConstants } from "./utils/constants";
import { isValidCoordinates } from "./utils/coordinateUtils";

export const App = () => {
  const [userLatitude, setUserLatitude] = useState("");
  const [userLongitude, setUserLongitude] = useState("");
  const [maxDistance, setMaxDistance] = useState(1000);
  const [distanceUnits, setDistanceUnits] = useState(
    AddressConstants.MetricUnits.KILOMETER
  );
  const [searchedAddress, setSearchedAddress] = useState("");
  const [searchedType, setSearchedType] = useState(
    AddressConstants.SearchByType.COORDINATES
  );

  return (
    <div>
      <AddressForm
        distanceUnits={distanceUnits}
        maxDistance={maxDistance}
        setDistanceUnits={setDistanceUnits}
        setMaxDistance={setMaxDistance}
        setSearchedAddress={setSearchedAddress}
        setUserLatitude={setUserLatitude}
        setUserLongitude={setUserLongitude}
        setSearchedType={setSearchedType}
      />
      {isValidCoordinates(userLatitude, userLongitude) && (
        <AddressList
          distanceUnits={distanceUnits}
          maxDistance={maxDistance}
          userLatitude={userLatitude}
          userLongitude={userLongitude}
          searchedAddress={searchedAddress}
          searchedType={searchedType}
        />
      )}
    </div>
  );
};
