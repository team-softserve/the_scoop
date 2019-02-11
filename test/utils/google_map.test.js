const { getLocation, getPlaces } = require('../../lib/utils/google_map');

jest.mock('../../lib/utils/google_map');

describe('google map integration', () => {

  describe('google location integration', () => {
    it('retrieves lat, lng from zipcode', () => {
      return getLocation(97205)
        .then(({ lat, lng }) => {
          expect(lat).toEqual(45.522540);
          expect(lng).toEqual(-122.683141);
        });
    });
  });
  
  describe('google places integration', () => {
    it('retrieves results from location query', () => {
      return getPlaces({ lat: 45.522540, lng: -122.683141 }, 'ice cream', ['delicious', 'portland'])
        .then((res) => {
          expect(res).toBeTruthy();
        });
    });
  });
  
});
