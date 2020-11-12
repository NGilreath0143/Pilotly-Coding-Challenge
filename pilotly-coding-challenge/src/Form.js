import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <form>
          <label>Address</label>
          <input type="text" id="address1" name="address1"/>
          <label>Apartment, suite, etc.</label>
          <input type="text" id="address" name="address"/>
          <label>City</label>
          <input type="text" id="address" name="address"/>
          <br/>
          <label>State/province</label>
          <input type="text" id="address" name="address"/>
          <label>Country/region (Turn this into a dropdown)</label>
          <input type="text" id="address" name="address"/>
          <label>Zip/postal code</label>
          <input type="text" id="address" name="address"/>
          <p>OR</p>
          <label>Latitude</label>
          <input type="text" id="coordinates" name="coordinates"/>
          <label>Longitude</label>
          <input type="text" id="address" name="address"/>
          <br/>
          <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default Form;