import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["mapDiv"];
  static values = {
    apiKey: String,
    location: String,
    venues: Array
  }

  connect() {
    this.initMap().then(() => {
      const event = new CustomEvent("gmaps:connected", { detail: { controller: this } });
      document.dispatchEvent(event);
    }).catch(error => {
      console.log("Error initializing map: ", error);
    });
  }

  async initMap() {
    try {
      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
      const { Geocoder } = await google.maps.importLibrary("geocoding");

      const geocoder = new Geocoder();
      const bounds = new google.maps.LatLngBounds();

      const mapOptions = {
        zoom: 11,
        disableDefaultUI: true,
        mapId: "8920b6736ae8305a"
      };

      this.map = new Map(this.mapDivTarget, mapOptions);

      const locationResponse = await geocoder.geocode({ address: this.locationValue });
      if (locationResponse.results[0]) {
        this.map.setCenter(locationResponse.results[0].geometry.location);
      } else {
        window.alert("No results for postcode found");
      }

      this.markers = {};

      for (const venue of this.venuesValue) {
        const address = `${venue.street}, ${venue.city}, ${venue.state}, ${venue.postcode}`;
        const venueResponse = await geocoder.geocode({ address: address });

        if (venueResponse.results[0]) {
          const position = venueResponse.results[0].geometry.location;
          const markerImg = document.createElement("img");
          markerImg.src = "https://res.cloudinary.com/dp0apr6y4/image/upload/v1718612885/chicken-marker_rivnug.svg";
          markerImg.style.width = "50px";
          markerImg.style.height = "50px";
          markerImg.className = "markerImage";

          const marker = new AdvancedMarkerElement({
            map: this.map,
            position: position,
            content: markerImg,
            title: venue.name,
            gmpClickable: true
          });

          this.markers[venue.name] = marker;

          marker.addListener("click", () => {
            this.map.setZoom(15);
            this.map.setCenter(marker.position);

            document.querySelector(".active").classList.toggle("active");
            const venueDiv = document.querySelector(`[data-venue-title="${venue.name}"]`);
            if (venueDiv) {
              venueDiv.classList.toggle("active"); // Toggle the class "highlight"
            }
          });

          bounds.extend(marker.position);
        } else {
          window.alert("No results for venue found");
        }
      }
      this.map.fitBounds(bounds);
    } catch (error) {
      console.log("Geocoding error: ", error.message);
      window.alert("Geocoding error: " + error.message);
    }
  }

  clickMarker(venueName) {
    const marker = this.markers[venueName];
    if (marker) {
      google.maps.event.trigger(marker, "click");
    } else {
      console.log(`Marker for venue "${venueName}" not found.`);
    }
  }
}
