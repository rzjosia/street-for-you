import "./materialize.min";
import "./mzbox.min";
import L from "leaflet";
import { db, addLocation, getLocations } from "./firebase";
import {
  recognition,
  descriptionRecognition,
  ZOOM,
  rzMap,
  COMFORTABLE,
  UNCOMFORTABLE,
  MAP_TOKEN,
  cityInput,
  popup,
  isStreetMicOpen,
  toggleSpeech,
  defaultParams,
  comfortableMarkerIcon,
  uncomfortableMarkerIcon,
  initTileLayer,
  geoLocate,
  addMarker,
  addPlace,
} from "./MapLocation";

import {
  getLocation,
  getLocationByAddress,
  getAddressByLocation,
} from "./fetchLocation";

rzMap.on("click", (e) => {
  addPlace(e);
});

cityInput.addEventListener("keyup", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (e.keyCode === 13 && city.length > 0) {
    try {
      const location = await getLocationByAddress(city);
      rzMap.setView([location.latLng.lat, location.latLng.lng], ZOOM);
      // fetch(
      //   "https://tomasz-test.ent.eu-west-1.aws.found.io/api/as/v1/engines/street4you/documents",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: "Bearer private-9jb78ume3t9yecwp15g2kbfa",
      //     },
      //     body: JSON.stringify({
      //       postal_code: location.postalCode,
      //       department: location.adminArea4,
      //       name: location.adminArea5,
      //       slug: location.adminArea5,
      //       gps_lat: location.latLng.lat,
      //       gps_lng: location.latLng.lng,
      //     }),
      //   }
      // )
      //   .then(response => response.json())
      //   .then(data => console.log("Response data", data))
      //   .catch((err) => {
      //     console.log(err);
      //   });
    } catch (error) {
      M.toast({
        html: "Oups ! Une erreur s'est produite",
        classes: "toast-error",
      });
    }
  }
});

initTileLayer();
geoLocate();

getLocations().then((querySnapshot) => {
  querySnapshot.forEach(async (marker) => {
    const data = marker.data();
    if (data.geoPoint && data.geoPoint.latitude && data.geoPoint.longitude) {
      addMarker(data);
    }
  });
});

recognition.onspeechend = function () {
  toggleSpeech(false);
};

recognition.onresult = async (event) => {
  const transcript = event.results[0][0].transcript;
  const confidence = event.results[0][0].confidence;
  try {
    const location = await getLocationByAddress(transcript);
    rzMap.setView([location.latLng.lat, location.latLng.lng], ZOOM);
    cityInput.value = transcript;
  } catch (error) {
    M.toast({
      html: "Oups ! Une erreur s'est produite",
      classes: "toast-error",
    });
  }
};

document.querySelector("#mic-icon").addEventListener("click", () => {
  isStreetMicOpen = !isStreetMicOpen;
  toggleSpeech(isStreetMicOpen);
});
