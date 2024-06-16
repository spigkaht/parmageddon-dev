import { Controller } from "@hotwired/stimulus";
import { Loader } from "@googlemaps/js-api-loader";

export default class extends Controller {
  static targets = [ "mapDiv" ];
  static values = {
    apiKey: String,
    locationLat: Number,
    locationLng: Number,
    markers: Array,
    venues: Array
  }

  connect() {
    const city = {
      lat: this.locationLatValue,
      lng: this.locationLngValue
    };

    const loader = new Loader({
      apiKey: this.apiKeyValue,
      version: "weekly",
      libraries: ["maps", "geocoding", "marker", "elevation"]
    });

    const mapOptions = {
      center: { lat: city.lat, lng: city.lng },
      zoom: 10,
    };

    loader
    .importLibrary('maps')
    .then(({ Map, Marker }) => {
      const map = new Map(this.mapDivTarget, mapOptions);

      this.venuesValue.forEach(venue => {
        const markerOptions = {
          position: {
            lat: venue.latitude,
            lng: venue.longitude
          },
          map: map
        };
        new Marker(markerOptions);
      })
    })
    .catch((e) => {
      console.log("Error loading de-maps")
    });

    // this.venuesValue.forEach(venue => {
    //   console.log(venue.latitude, venue.longitude);
    //   console.log(venuesMap);
    //   loader
    //   .importLibrary('marker')
    //   .then(({Marker}) => {
    //     new Marker({
    //       position: {
    //         lat: venue.latitude,
    //         lng: venue.longitude
    //       },
    //       map: venuesMap
    //     })
    //     })
    //     .catch((e) => {
    //       console.log("Error loading de-maps")
    //     });
    // });
  };
};

// import { Loader } from "@googlemaps/js-api-loader";

// const loader = new Loader({
//     apiKey: 'YOUR_API_KEY', // Your API key
//     version: 'weekly', // or a specific version
// });

// const mapOptions = {
//     center: { lat: -34.397, lng: 150.644 }, // Coordinates for the map's center
//     zoom: 8
// };

// loader.importLibrary('maps')
//     .then(({ Map, Marker }) => {
//         const mapDivTarget = document.getElementById('map');
//         const map = new Map(mapDivTarget, mapOptions);

//         const markerOptions = {
//             position: { lat: -34.397, lng: 150.644 }, // Coordinates for the marker
//             map: map
//         };
//         const marker = new Marker(markerOptions);
//     })
//     .catch(e => {
//         console.error(e);
//     });
