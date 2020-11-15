import React, { useState } from 'react';
import { AddressList } from './components/AddressList.jsx';
import { AddressForm } from './components/AddressForm.jsx';

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
      <AddressList  
        maxDistance={maxDistance}
        userLatitude={userLatitude} 
        userLongitude={userLongitude} 
      />
    </div>
  );
}
