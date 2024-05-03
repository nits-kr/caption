import React, { useState } from "react";
import LocationPicker from "react-location-picker";

const defaultPosition = {
  lat: 27.9878,
  lng: 86.925,
};

const LocationPickerExample = () => {
  const [address, setAddress] = useState("Greece");
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  const handleMarkerDragEnd = (position) => {
    console.log("handleMarkerDragEnd called");
    console.log("position:", position);
    setPosition(position);
  };

  const handleLocationChange = ({ position, address, places }) => {
    console.log("handleLocationChange called");
    console.log("position:", position);
    console.log("address:", address);
    setPosition(position);
    setAddress(address);
  };

  return (
    <div>
      <h1>{address}</h1>
      <div>
        <LocationPicker
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "400px" }} />}
          defaultPosition={defaultPosition}
          onDragEnd={handleMarkerDragEnd}
          onChange={handleLocationChange}
          draggableMarker={true}
        />
      </div>
    </div>
  );
};

export default LocationPickerExample;
