const request = require('superagent');
const apiKey = process.env.PLACES_API_KEY;

if(!apiKey) {
  // eslint-disable-next-line
  console.log('No API key present!');
  process.exit(1);
}

const getGeocodeUrl = address => `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
const getPlacesUrl = ({ lat, lng }, type, keyword) => `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat} ${lng}&radius=2000&type=${type}&keyword=${keyword}&key=${apiKey}`;

const get = url => request.get(url).then(res => res.body);

const processGeocode = data => {
  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
};

const processPlaces = data => {
  const { results } = data;
  return results.map(place => ({
    placeId: place.place_id,
    types: place.types,
    name: place.name,
    price: place.price_level
  }));
};

const getLocation = address =>  {
  return get(getGeocodeUrl(address))
    .then(processGeocode);
};

const getPlaces = (location, type, keywords) => {
  const keyword = keywords.join(',');
  const url = getPlacesUrl(location, type, keyword);

  return get(url)
    .then(data => {
      return processPlaces(data);
    });
};

module.exports = {
  getLocation,
  getPlaces
};
