import { getLocationByAddress } from "../src/js/fetchLocation";

describe('When I check adress', () => {
    test('at Valenciennes', async () => {
        const location = await getLocationByAddress('Valenciennes');
        expect(location).toEqual(expect.objectContaining(
            {
                latLng: {
                    lat: 50.359489,
                    lng: 3.526666
                }
            })
        )
    })
})