// imports
import { Controller } from "@hotwired/stimulus";
// import { Loader } from "@googlemaps/js-api-loader";

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
    let map;
    // url for chicken marker
    const markerURL = "https://res.cloudinary.com/dp0apr6y4/image/upload/v1718612885/chicken-marker_rivnug.svg";

    const initMap = async () => {
      // initialise gmaps import libraries
      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
      const { Geocoder } = await google.maps.importLibrary("geocoding");

      // geocoder variable (used multiple times)
      const geocoder = new Geocoder();
      // empty latngnbounds object for gmaps api
      const bounds = new google.maps.LatLngBounds();

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
        disableDefaultUI: true,
        mapId: "8920b6736ae8305a"
      };

      // create map, div for placement, options
      const map = new Map(this.mapDivTarget, mapOptions);

      // geocode location (parameter/postcode), set map center, output error if no results
      geocoder.geocode({ address: this.locationValue }).then((response) => {
        if (response.results[0]) {
          map.setCenter(response.results[0].geometry.location);
        } else {
          window.alert("No results for postcode found");
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
            const marker = new AdvancedMarkerElement({
              map: map,
              options: markerOptions
            });

              // extend maps boundary
            bounds.extend(marker.getPosition());
          } else {
            window.alert("No results for venue found");
          };
        });
      });
      map.fitBounds(bounds);
    };
  };
};
