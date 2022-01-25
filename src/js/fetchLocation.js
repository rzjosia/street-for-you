import 'cross-fetch/polyfill'

export const getLocation = (latitude, longitude) => {
    return fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`)
        .then(response => response.json())
        .then((data) => data)
        .catch((e) => console.log('Fetch error : ' . e));
}

export const getLocationByAddress = (address) => {
    return fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=rsqyf0EI5Am2rdQGwTEuNAzfGR0GpH0J&location=${address}`)
        .then(response => response.json())
        .then((data) => data.results[0].locations[0])
        .catch((e) => {
            console.log(e);
        });
}

export const getAddressByLocation = (location) => {
    const streeNumber = typeof (location.stnumber) === 'object' || !location.stnumber ? '' : location.stnumber + ' ';
    const address = typeof (location.staddress) === 'object' || !location.staddress ? '' : location.staddress + ', ';
    const zip = typeof (location.postal) === 'object' || !location.postal ? '' : location.postal + ', ';
    const city = typeof (location.city) === 'object' || !location.city ? '' : location.city;

    return location.success === false ? '' : `${streeNumber}${address}${zip}${city}`;
}