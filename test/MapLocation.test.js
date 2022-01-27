import { getLocationByAddress } from "../src/js/fetchLocation";

describe("Check location by address", () => {
    test("at Valenciennes", async () => {
        const location = await getLocationByAddress("Valenciennes");
        expect(location).toEqual(
            expect.objectContaining({
                latLng: {
                    lat: 50.359489,
                    lng: 3.526666,
                },
            })
        );
    });

    test("without address", async () => {
        const location = await getLocationByAddress("");
        expect(location).toBe(undefined);
    });
});
