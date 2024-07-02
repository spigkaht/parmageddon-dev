// imports
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  // targets: maps div for view
  static targets = ["mapDiv"];
  // values: gmaps api key, location (params/postcode), venues (list of venues from db)
  static values = {
    apiKey: String,
    location: String,
    venues: Array
  }

  connect() {
    const initMap = async () => {
      try {
        // initialise gmaps import libraries
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
        const { Geocoder } = await google.maps.importLibrary("geocoding");

        // geocoder variable (used multiple times)
        const geocoder = new Geocoder();
        // empty latngnbounds object for gmaps api
        const bounds = new google.maps.LatLngBounds();

        // sets options for gmaps api map instance
        const mapOptions = {
          zoom: 11,
          disableDefaultUI: true,
          mapId: "8920b6736ae8305a"
        };

        // create map, div for placement, options
        const map = new Map(this.mapDivTarget, mapOptions);

        // geocode location (parameter/postcode), set map center, output error if no results
        const locationResponse = await geocoder.geocode({ address: this.locationValue });
        if (locationResponse.results[0]) {
          map.setCenter(locationResponse.results[0].geometry.location);
        } else {
          window.alert("No results for postcode found");
        }

        // geocode each instance of @venues
        for (const venue of this.venuesValue) {
          // build address
          const address = `${venue.street}, ${venue.city}, ${venue.state}, ${venue.postcode}`;

          // geocode address
          const venueResponse = await geocoder.geocode({ address: address });
          // only if results exist
          if (venueResponse.results[0]) {
            // marker options for creating marker for each venue
            const position = venueResponse.results[0].geometry.location;

            // url for chicken marker
            const markerImg = document.createElement("img");
            markerImg.src = "https://res.cloudinary.com/dp0apr6y4/image/upload/v1718612885/chicken-marker_rivnug.svg";
            markerImg.style.width = "50px"; // Set the width of the marker
            markerImg.style.height = "50px"; // Set the height of the marker
            const marker = new AdvancedMarkerElement({
              map,
              position: position,
              content: markerImg,
              title: venue.name,
              gmpClickable: true
            });

            marker.addEventListener("click", () => {

            });

            // extend maps boundary
            bounds.extend(marker.position);
          } else {
            window.alert("No results for venue found");
          }
        }
        map.fitBounds(bounds);
      } catch (error) {
        console.log("Geocoding error: ", error.message);
        window.alert("Geocoding error: " + error.message);
      }
    };

    initMap();
  }
}
