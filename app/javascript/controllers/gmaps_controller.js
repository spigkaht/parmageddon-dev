// imports
import { Controller } from "@hotwired/stimulus";
import { Loader } from "@googlemaps/js-api-loader";

export default class extends Controller {
  // targets: maps div for view
  static targets = [ "mapDiv" ];
  // values: gmaps api key, location (params/postcode), venues (list of venues from db)
  static values = {
    apiKey: String,
    location: String,
    venues: Array
  }

  connect() {
    // google maps api loader
    const loader = new Loader({
      apiKey: this.apiKeyValue,
      version: "weekly",
      libraries: ["places"]
    });

    loader
      .importLibrary('maps')
      .then(({ Map }) => {
        // geocoder variable (used multiple times)
        const geocoder = new google.maps.Geocoder();
        console.log("geocoder: ", geocoder)
        // empty latngnbounds object for gmaps api
        const bounds = new google.maps.LatLngBounds();
        // url for chicken marker
        const markerURL = "https://res.cloudinary.com/dp0apr6y4/image/upload/v1718612885/chicken-marker_rivnug.svg";

        // sets icon for gmaps api
        const icon = {
          url: markerURL,
          scaledSize: new google.maps.Size(50, 50), // Scale the SVG
          anchor: new google.maps.Point(25, 50), // Anchor point of the marker (center bottom)
          labelOrigin: new google.maps.Point(25, -15)
        };

        // sets options for gmaps api map instance
        const mapOptions = {
          zoom: 11,
        };

        // create map, div for placement, options
        const map = new Map(this.mapDivTarget, mapOptions);
        console.log(this.locationValue);
        // geocode location (parameter/postcode), set map center, output error if no results
        geocoder.geocode({ address: this.locationValue }).then((response) => {
          if (response.results[0]) {
            map.setCenter(response.results[0].geometry.location);
          } else {
            window.alert("No results for venue found");
          }
        }).catch((e) => {
          console.log("address: ", this.locationValue);
          window.alert("Geocoding error for location: " + e.message);
        })

        // geocode each instance of @venues
        const geocodePromises = this.venuesValue.map(venue => {
          // build address
          const address = `${venue.street}, ${venue.city}, ${venue.state}, ${venue.postcode}`;
          // geocode address, return response to 'geocodePromises' for catch
          return geocoder.geocode({ address: address }).then((response) => {
            // only if results exist
            if (response.results[0]) {
              // marker options for creating marker for each venue
              const markerOptions = {
                label: {
                  text: venue.name,
                  className: "gmaps-marker",
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "Roboto"
                },
                position: response.results[0].geometry.location,
                icon: icon,
                map: map
              };
              // create marker, place on map
              const marker = new google.maps.Marker(markerOptions);
              // extend maps boundary
              bounds.extend(marker.getPosition());
            } else {
              window.alert("No results for venue found");
            }
          });
        });

        // catch all marker promises, fit map around markers. else error
        Promise.all(geocodePromises)
          .then(() => {
            map.fitBounds(bounds);
          })
          .catch((e) => window.alert("Error geocoding due to " + e));
      })
      .catch((e) => { console.log("Error loading maps due to ", e) });
  }
}
