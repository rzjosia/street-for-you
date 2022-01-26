import firebase from "firebase";

firebase.initializeApp({
    apiKey: "AIzaSyAH4ds1z3dk-kLn4ckIEQVTVYG9AWfjGRA",
    authDomain: "street-for-you-741c8.firebaseapp.com",
    projectId: "street-for-you-741c8",
    storageBucket: "street-for-you-741c8.appspot.com",
    messagingSenderId: "1083836164126",
    appId: "1:1083836164126:web:fb56f4719d7165c5eae60f",
    measurementId: "G-RK6MDL95C2"
});

export const db = firebase.firestore();

export const addLocation = (lat, lng, situation, description) => {
    const geoPoint = new firebase.firestore.GeoPoint(lat, lng);
    return db.collection("location")
        .add({
            geoPoint,
            situation: situation,
            description: description,
        });
}

export const getLocations = () => {
    return db.collection("location").get();
}