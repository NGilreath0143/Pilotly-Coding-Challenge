import React from "react";

import { AddressInputField } from "./styles";
import { checkErrorBucketForError } from '../helpers';
import { AddressConstants } from '../../../utils/constants';

const AddressInputs = (props) => {
  return (
    <>
      <label>Address</label>
      <AddressInputField
        className={
          checkErrorBucketForError(
            props.errorBucket,
            AddressConstants.AddressFormFields.ADDRESS
          )
            ? "error"
            : ""
        }
        type="text"
        placeholder="Address"
        value={props.address}
        onChange={(e) => props.setAddress(e.target.value)}
      />
    </>
  );
};

export default AddressInputs;
