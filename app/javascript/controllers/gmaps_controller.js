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
      libraries: ["maps"]
    });

    const mapOptions = {
      center: { lat: city.lat, lng: city.lng },
      zoom: 10,
    };

    loader
    .importLibrary('maps')
    .then(({ Map, Marker }) => {
      const bounds = new google.maps.LatLngBounds();
      const markerURL = "https://res.cloudinary.com/dp0apr6y4/image/upload/v1718612885/chicken-marker_rivnug.svg"
      const icon = {
        url: markerURL,
        scaledSize: new google.maps.Size(50, 50), // Scale the SVG
        anchor: new google.maps.Point(25, 50), // Anchor point of the marker (center bottom)
        labelOrigin: new google.maps.Point(25, -15)
      };

      const map = new Map(this.mapDivTarget, mapOptions);
      console.log("position INCORRECT: ", this.markersValue);

      this.markersValue.forEach(marker => {
        const markerOptions = {
          position: {
            lat: parseFloat(marker.lat),
            lng: parseFloat(marker.lng)
          },
          label: {
            text: marker.name,
            className: "gmaps-marker",
            fontSize: "16px",
            fontWeight: "700",
            fontFamily: "Roboto"
          },
          icon: icon,
          map: map
        };
        console.log("position INCORRECT: ", markerOptions.position);
        const gmapsMarker = new google.maps.Marker(markerOptions);
        bounds.extend(gmapsMarker.getPosition());
      })
      map.fitBounds(bounds);
    })
    .catch((e) => {
      console.log("Error loading de-maps", e);
    });
  };
};
