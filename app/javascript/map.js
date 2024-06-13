// initMap = () => {
//   const coords = document.querySelector('#venues');
//   const city = {
//     lat: coords.getAttribute('data-latitude'),
//     lng: coords.getAttribute('data-longitude')
//   };

//   const map = new google.maps.Map(document.querySelector('#map'), {
//     zoom: 10,
//     center: city
//   });

//   const venues = document.querySelectorAll('li.venue-list-item');
//   venues.forEach(venue => {
//     const marker = new google.maps.Marker({
//       position: {
//         lat: venue.getAttribute('data-latitude'),
//         lng: venue.getAttribute('data-longitude')
//       },
//       map: map
//     });
//   });
// }

// window.initMap = initMap
