import React from "react";

import { AddressInputField } from "./styles"
const AddressInputs = (props) => {
  return (
    <>
      <label>Address</label>
      <AddressInputField
        type="text"
        placeholder="Address"
        value={props.address}
        onChange={(e) => props.setAddress(e.target.value)}
      />
    </>
  );
};

export default AddressInputs;
