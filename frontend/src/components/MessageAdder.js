import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "../App.css";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import netLine from "../controllers/netLine";

const defaultCenter = [38.9072, -77.0369];
const defaultZoom = 8;
const disneyWorldLatLng = [28.3852, -81.5639];
const disneyLandLatLng = [33.8121, -117.919];

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  cursor: default;
  width: 38vw;
  z-index: 100000;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  padding: 25px;
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  gap: 25px;
  border-radius: 10px 0 0 10px;
  color: #fff;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1``;

const Input = styled.textarea`
  background-color: rgba(0, 0, 0, 0.1);
  resize: none;
  border-radius: 10px;
  border: none;
  padding: 10px;
  color: #fff;
  font-family: "Raleway";

  &::placeholder {
    color: #fff6;
  }
`;

const Button = styled.div`
  border: 1px solid #fff;
  padding: 10px 20px;
  font-size: 15px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

function MessageAdder({ messages, setMessages }) {
  const [message, setMessage] = useState();
  const [findingLocation, setFindingLocation] = useState(false);

  window.findingLocation = findingLocation;
  window.message = message;
  window.messages = messages;

  useMapEvents({
    click: (e) => {
      if (window.findingLocation) {
        let location = [e.latlng.lat, e.latlng.lng];

        setMessages([
          ...window.messages,
          { location, message: window.message },
        ]);

        setMessage("");
        setFindingLocation(false);

        netLine.post(
          `message/?message=${window.message}&location=${JSON.stringify(
            location
          )}`
        );
        // alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
      }

      // map.locate()
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });

  return (
    <Container>
      <Title>Map Chat</Title>

      <InputSection>
        <Input
          value={message}
          onChange={({ target }) => {
            setMessage(target.value);
          }}
          placeholder="Type Your Message Here"
        />

        <Button onClick={publish}>Publish</Button>
      </InputSection>
    </Container>
  );

  function publish() {
    setFindingLocation(true);
    window.doAlert("Please select a location");
  }
}

export default MessageAdder;
