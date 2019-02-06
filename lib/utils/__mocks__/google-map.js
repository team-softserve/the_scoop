/* eslint-disable no-unused-vars */
const getLocation = address => {
  return Promise.resolve({
    // Ruby Jewel SW Portland
    lat: 45.522540, 
    lng: -122.683141
  });
};

const getPlaces = (location, type, keywords) => {
  return Promise.resolve([
    {
      placeId: '1234',
      types: [type],
      name: 'ice scream you scream',
      price: 2
    },
    {
      placeId: '12345',
      types: [type],
      name: 'moon pie ice cream',
      price: 2
    },
    {
      placeId: '123456',
      types: [type],
      name: 'frozen cow',
      price: 1
    },
  ]);
};

module.exports = {
  getLocation,
  getPlaces
};
