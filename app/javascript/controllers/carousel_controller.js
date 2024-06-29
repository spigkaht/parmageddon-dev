import { Controller } from "@hotwired/stimulus"
let currentIndex = 0;

// Connects to data-controller="carousel"
export default class extends Controller {
  static targets = [ "card "]

  connect() {
  }

  // prev() {
  //   currentIndex = (currentIndex + 1) % items.length;
  //   showSlide(currentIndex);
  // }

  // next() {
  //   currentIndex = (currentIndex - 1 + items.length) % items.length;
  //   showSlide(currentIndex);
  // }
}

// function showSlide(index) {
//   this.cardTargets.forEach((item, i) => {
//     item.classList.toggle('active', i === index);
//   });
// }
