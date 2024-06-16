import { Controller } from "@hotwired/stimulus";
import { Loader } from "@googlemaps/js-api-loader";

export default class extends Controller {
  static targets = [ "mapDiv" ];
  static values = {
    markers: String,
    apiKey: String,
    locationLat: Number,
    locationLng: Number,
    venueLat: Number,
    venueLng: Number
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
    .then(({Map}) => {
      new Map(this.mapDivTarget, mapOptions);
    })
    .catch((e) => {
      console.log("Error loading de-maps")
    });

    console.log(this.venueLats)
  };
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//   const breweries = document.querySelectorAll("li.brewery-list-item");
//   breweries.forEach(brewery => {
//     const marker = new google.maps.Marker({
//       position: {
//         lat: brewery.getAttribute("data-latitude"),
//         lng: brewery.getAttribute("data-longitude")
//       },
//       map: map
//     });
//   }
// }

// window.initMap = initMap;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Connects to data-controller="google-map"
// export default class extends Controller {
//   static targets = ['myMap', 'lat', 'lng', 'locationName']

//   connect() {
//     let lat = 34.87
//     let lng = -111.82

//     //this.latTarget.value = lat
//     //this.lngTarget.value = lng
//     this.initMap(lat, lng)
//   }


//   async initMap(lat, lng) {
//     // The location of Uluru
//     const position = {lat: lat, lng: lng};
//     let mapId = this.myMapTarget

//     const {Map} = await google.maps.importLibrary("maps");
//     // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//     let map = new Map(mapId, {
//       center: position,
//       zoom: 10,
//       mapId: mapId
//     });

//     // The marker, positioned at Uluru
//     // const marker = new AdvancedMarkerElement({
//     //   map: map,
//     //   position: position,
//     //   title: "Uluru",
//     // });

//     this.addSingleMarker(position, map)
//     // this.addMultipleMarker(map)
//   }

//   addSingleMarker(position, map) {
//     const marker = new google.maps.Marker({
//       position,
//       map,
//       title: `This is single marker`,
//       label: `1`,
//     });

//     marker.setAnimation(google.maps.Animation.BOUNCE); //bouncing animation of marker
//   }

//   updateCordinate() {
//     if (event.currentTarget.dataset.googleMapTarget = 'lat') {
//       this.initMap(parseFloat(event.currentTarget.value), parseFloat(this.lngTarget.value))
//     } else {
//       this.initMap(parseFloat(this.latTarget.value), parseFloat(event.currentTarget.value))
//     }
//   }
// }

// addMultipleMarker(map) {
//   const tourStops = [
//     [{lat: 34.8791806, lng: -111.8265049}, "Boynton Pass"],
//     [{lat: 34.8559195, lng: -111.7988186}, "Airport Mesa"],
//     [{lat: 34.832149, lng: -111.7695277}, "Chapel of the Holy Cross"],
//     [{lat: 34.823736, lng: -111.8001857}, "Red Rock Crossing"],
//     [{lat: 34.800326, lng: -111.7665047}, "Bell Rock"],
//   ];

//   // The marker, positioned at Uluru
//   tourStops.forEach(([position, title], i) => {
//     const marker = new google.maps.Marker({
//       position,
//       map,
//       title: `${i + 1}. ${title}`,
//       label: `${i + 1}`,
//     });
//   });
// }
