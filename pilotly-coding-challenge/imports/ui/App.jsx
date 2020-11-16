import React, { useState } from 'react';
import AddressList from './components/AddressList';
import AddressForm from './components/AddressForm';
import { isValidCoordinates } from './utils/coordinateUtils';

export const App = () =>{
  const [userLatitude, setUserLatitude] = useState("");
  const [userLongitude, setUserLongitude] = useState("");
  const [maxDistance, setMaxDistance] = useState(1000)

  return (
    <div>
      <AddressForm  
        maxDistance={maxDistance} 
        setMaxDistance={setMaxDistance}
        setUserLatitude={setUserLatitude}
        setUserLongitude={setUserLongitude} 
      />
      {isValidCoordinates(userLatitude, userLongitude) &&
        <AddressList  
          maxDistance={maxDistance}
          userLatitude={userLatitude} 
          userLongitude={userLongitude} 
        />
      }
    </div>
  );
}