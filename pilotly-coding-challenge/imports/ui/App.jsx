import React, { useState } from 'react';
import { AddressList } from './components/AddressList.jsx';
import { AddressForm } from './components/AddressForm.jsx';

export const App = () =>{
  const [userLongitude, setUserLongitude] = useState("");
  const [userLatitude, setUserLatitude] = useState("");

  return (
    <div>
      <AddressForm  setUserLongitude={setUserLongitude} setUserLatitude={setUserLatitude}/>
      <AddressList  userLongitude={userLongitude} userLatitude={userLatitude} />
    </div>
  );
}
