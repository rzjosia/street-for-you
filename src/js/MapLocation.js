import firebase from "firebase";
import GreenMarkerIcon from "../img/marker-icon-green.png";
import OrangeMarkerIcon from "../img/marker-icon-orange.png";
import ShadowMarker from "../img/marker-shadow.png";
import L from "leaflet";
import {getLocation, getLocationByAddress, getAddressByLocation} from "./fetchLocation";

let StreetSpeechRecognition;

try {
    StreetSpeechRecognition = webkitSpeechRecognition ? webkitSpeechRecognition : SpeechRecognition;
} catch (error) {
    StreetSpeechRecognition = Object;
}

export const recognition = new StreetSpeechRecognition();
export const descriptionRecognition = new StreetSpeechRecognition();
descriptionRecognition.continuous = true;
export const ZOOM = 15;
export const rzMap = L.map("mapid").setView([51.505, -0.09], ZOOM);
export const COMFORTABLE = 'COMFORTABLE';
export const UNCOMFORTABLE = 'UNCOMFORTABLE';
export const MAP_TOKEN =
    "pk.eyJ1Ijoicnpqb3NpYSIsImEiOiJja2dqZHdwdGYwZmxvMnBuNDNvbm16dHR5In0.BYovotHxlYRLns01BpYTJQ";
export const WEATHER_TOKEN = "d4354106a2ca9ab50eebfc808698467f";
export const cityInput = document.querySelector("#city");
export const popup = L.popup();
export let isStreetMicOpen = false;

export const toggleSpeech = (value) => {
    const micIcon = document.querySelector('#mic-icon');

    if (value) {
        recognition.start();
        micIcon.innerHTML = "mic_off";
    }
    else {
        recognition.stop();
        micIcon.innerHTML = "mic";
    }

    isStreetMicOpen = value;
}

export const defaultIconParams = {
    iconSize: [25, 47],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: ShadowMarker,
    shadowSize: [1, 34],
    shadowAnchor: [41, 41]
}

export const comfortableMarkerIcon = L.icon({
    iconUrl: GreenMarkerIcon,
    ...defaultIconParams
});

export const uncomfortableMarkerIcon = L.icon({
    iconUrl: OrangeMarkerIcon,
    ...defaultIconParams
});

export const initTileLayer = () => {
    L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/" target="_blank">Mapbox</a>',
            maxZoom: 20,
            id: "rzjosia/ckgjiei9u7ghh19qks3ffeyk4",
            tileSize: 512,
            zoomOffset: -1,
            accessToken: MAP_TOKEN,
        }
    ).addTo(rzMap);
}

export const geoLocate = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            rzMap.setView([position.coords.latitude, position.coords.longitude], ZOOM);
            M.updateTextFields();
        });
    }
}

export const addMarker = (data) => {
    const icon = data.situation === COMFORTABLE ? comfortableMarkerIcon : uncomfortableMarkerIcon;
    const markerPoint = L.marker([data.geoPoint.latitude, data.geoPoint.longitude], { icon }).addTo(rzMap);
    markerPoint.bindPopup(`<b>${data.situation === UNCOMFORTABLE ? 'Inconfortale' : 'Confortable'}</b><br/>${data.description}`);
}

export const addPlace = async (e, options = {}) => {
    const content = document.createElement('div');
    content.innerHTML = '<div class="input-field col s12">' +
        '<select id="situation">' +
        '<option value="" disabled selected>Selectionner la situation</option>' +
        '<option value="COMFORTABLE">Confortable</option>' +
        '<option value="UNCOMFORTABLE">Inconfortable</option>' +
        '<label>Situation</label>' +
        '</select>' +
        '</div>' +
        '<div class="input-field col s12">' +
        '<textarea id="description" class="materialize-textarea"' +
        'placeholder="Qu\'avez-vous contasté ?"></textarea>' +
        '<button class="btn waves-effect waves-light" id="description-mic-button">' +
        '<i id="description-mic-icon" class="material-icons">mic</i>' +
        '</button>' +
        '</div>';

    if (!options.location) {
        options.location = await getLocation(e.latlng.lat, e.latlng.lng)
    }

    const title = getAddressByLocation(options.location);
    const modal = swal({
        title,
        content,
        buttons: {
            cancel: "Annuler",
            confirm: {
                text: "Ajouter",
                value: "add"
            }
        }
    });

    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    document.querySelector('#situation').value = options.situation ? options.situation : '';
    document.querySelector('#description').value = options.description ? options.description : '';
    let isDescriptionOpen = false;

    const descriptionToggleSpeech = (value) => {
        const micIcon = document.querySelector('#description-mic-icon');
    
        if (value) {
            descriptionRecognition.start();
            micIcon.innerHTML = "mic_off";
        }
        else {
            descriptionRecognition.stop();
            micIcon.innerHTML = "mic";
        }
    }

    descriptionRecognition.onspeechend = function () {
        console.log("Speech end");
        descriptionToggleSpeech(false)
    }
    
    descriptionRecognition.onresult = (event) => {
        document.querySelector("#description").value = "";
        console.log(event);

        for (const result of event.results) {
            document.querySelector("#description").value += result[0].transcript;
        }
       
        M.textareaAutoResize(document.querySelector("#description"));
    };

    console.log(M)

    document.querySelector('#description-mic-icon').addEventListener('click', function() {
        isDescriptionOpen = !isDescriptionOpen;
        descriptionToggleSpeech(isDescriptionOpen);
    })

    await modal.then(async (modal) => {
        switch (modal) {
            case 'add':
                if (!options.situation || options.situation.trim().length === 0) {
                    options.situation = document.querySelector('#situation').value
                }

                if (!options.description || options.situation.trim().length === 0) {
                    options.description = document.querySelector('#description').value.trim();
                }

                if (options.situation.length === 0) {
                    M.toast({ html: "Oups ! La situation est requise pour ajouter un lieu", classes: 'toast-error' });
                    addPlace(e, options);
                    return;
                }

                addMarker({
                    geoPoint: new firebase.firestore.GeoPoint(e.latlng.lat, e.latlng.lng),
                    situation: options.situation,
                    description: options.description
                });

                await addLocation(
                    e.latlng.lat,
                    e.latlng.lng,
                    options.situation,
                    options.description,
                )
                break;
            default:
                console.log('marker canceled')
        }
    });

    M.updateTextFields();
}