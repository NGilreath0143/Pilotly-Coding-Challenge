import React from "react";


const AddressInputs = (props) => {
  return (
    <>
      <input
        type="text"
        placeholder="Address"
        value={props.address}
        onChange={(e) => props.setAddress(e.target.value)}
      />
    </>
  );
};

export default AddressInputs;
