import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="carousel"
export default class extends Controller {
  static targets = [ "card" ]

  connect() {
    this.currentIndex = 0;
    this.showSlide(this.currentIndex);
  }

  showSlide(index) {
    this.cardTargets.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.cardTargets.length) % this.cardTargets.length;
    this.showSlide(this.currentIndex);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.cardTargets.length;
    this.showSlide(this.currentIndex);
  }
}
