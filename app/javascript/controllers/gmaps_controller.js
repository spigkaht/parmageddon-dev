// imports
import { Controller } from "@hotwired/stimulus";

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
      try {
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
              const marker = new AdvancedMarkerElement({
                map: map,
                position: position,
                icon: icon
              });

              // Create custom label element
              const label = document.createElement('div');
              label.className = 'gmaps-marker';
              label.style.position = 'absolute';
              label.style.transform = 'translate(-50%, -100%)';
              label.style.whiteSpace = 'nowrap';
              label.style.fontSize = '16px';
              label.style.fontWeight = '700';
              label.style.fontFamily = 'Roboto';
              label.innerText = venue.name;

              // Append label to map
              map.getDiv().appendChild(label);

              // Update label position
              const updateLabelPosition = () => {
                const projection = map.getProjection();
                const positionPoint = projection.fromLatLngToPoint(marker.position);
                const scale = Math.pow(2, map.getZoom());
                const worldCoordinate = new google.maps.Point(
                  positionPoint.x * scale,
                  positionPoint.y * scale
                );
                label.style.left = `${worldCoordinate.x}px`;
                label.style.top = `${worldCoordinate.y}px`;
              };

              // Listen for map events to update label position
              google.maps.event.addListener(map, 'bounds_changed', updateLabelPosition);
              google.maps.event.addListener(map, 'zoom_changed', updateLabelPosition);

              // Initial update for label position
              updateLabelPosition();

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
