import { Controller } from "@hotwired/stimulus";
import { Loader } from "@googlemaps/js-api-loader";

export default class extends Controller {
  static targets = [ "mapDiv" ];
  static values = {
    apiKey: String,
    // locationLat: Number,
    // locationLng: Number,
    // markers: Array,
    venues: Array
  }

  connect() {
    const loader = new Loader({
      apiKey: this.apiKeyValue,
      version: "weekly",
      libraries: ["maps"]
    });

    loader
    .importLibrary('maps')
    .then(({ Map, Marker, Geocoder }) => {
      const bounds = new google.maps.LatLngBounds();
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(-37.8136, 144.9631)
      const markerURL = "https://res.cloudinary.com/dp0apr6y4/image/upload/v1718612885/chicken-marker_rivnug.svg"

      const icon = {
        url: markerURL,
        scaledSize: new google.maps.Size(50, 50), // Scale the SVG
        anchor: new google.maps.Point(25, 50), // Anchor point of the marker (center bottom)
        labelOrigin: new google.maps.Point(25, -15)
      };

      const mapOptions = {
        center: latlng,
        zoom: 10,
      };

      const map = new Map(this.mapDivTarget, mapOptions);

      this.venuesValue.forEach(venue => {
        const address = venue.street.concat(", ", venue.city, ", ", venue.state, ", ", venue.zip)
        geocoder.geocode({"address": address}, function(results, status) {
          if (status == "OK") {
            const center = results[0].geometry.location;
            console.log("address: ", address);
            console.log("results: ", results[0]);
            const markerOptions = {
              label: {
                text: venue.name,
                className: "gmaps-marker",
                fontSize: "16px",
                fontWeight: "700",
                fontFamily: "Roboto"
              },
              position: results[0].geometry.location,
              icon: icon,
              map: map
            };

            const marker = new google.maps.Marker(markerOptions);

            bounds.extend(marker.getPosition());
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
      })
      map.fitBounds(bounds);
    })
    .catch((e) => {
      console.log("Error loading de-maps", e);
    });
  };
};
