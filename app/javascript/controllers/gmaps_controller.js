import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["mapDiv", "carouselItem"];
  static values = {
    apiKey: String,
    location: String,
    venues: Array
  }

  connect() {
    const initMap = async () => {
      try {
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        const { Geocoder } = await google.maps.importLibrary("geocoding");

        const geocoder = new Geocoder();
        const bounds = new google.maps.LatLngBounds();

        const mapOptions = {
          zoom: 11,
          disableDefaultUI: true,
          mapId: "8920b6736ae8305a"
        };

        const map = new Map(this.mapDivTarget, mapOptions);

        const locationResponse = await geocoder.geocode({ address: this.locationValue });
        if (locationResponse.results[0]) {
          map.setCenter(locationResponse.results[0].geometry.location);
        } else {
          window.alert("No results for postcode found");
        }

        for (const venue of this.venuesValue) {
          const address = `${venue.street}, ${venue.city}, ${venue.state}, ${venue.postcode}`;

          const venueResponse = await geocoder.geocode({ address: address });
          if (venueResponse.results[0]) {
            const position = venueResponse.results[0].geometry.location;

            const markerImg = document.createElement("img");
            markerImg.src = "https://res.cloudinary.com/dp0apr6y4/image/upload/v1718612885/chicken-marker_rivnug.svg";
            markerImg.style.width = "50px";
            markerImg.style.height = "50px";
            const marker = new AdvancedMarkerElement({
              map,
              position: position,
              content: markerImg,
              title: venue.name,
              gmpClickable: true
            });

            marker.addListener("click", () => {
              map.setZoom(15);
              map.setCenter(marker.position);

              document.querySelector(".active").classList.toggle("active");
              const venueDiv = document.querySelector(`[data-venue-title="${venue.name}"]`);
              if (venueDiv) {
                venueDiv.classList.toggle("active");
              }
            });

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

    this.clickMarkerByVenue = (venueName) => {
      const markers = this.mapInstance.getMarkers(); // Ensure mapInstance is correctly initialized
      console.log(markers);
      markers.forEach(marker => {
        if (marker.getTitle() === venueName) {
          google.maps.event.trigger(marker, "click");
        }
      });
    };

    initMap();

    console.log(this.carouselItemTargets)
    this.carouselItemTargets.forEach(item => {
      item.addEventListener("click", () => {
        const venueName = item.dataset.venueTitle;
        this.clickMarkerByVenue(venueName);
      });
    });
  }
}
