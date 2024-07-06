import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["card"];

  connect() {
    this.currentCardIndex = 0;

    document.addEventListener("gmaps:connected", this.onGmapsConnected.bind(this));
  }

  onGmapsConnected(event) {
    const gmapsController = event.detail.controller;
    if (gmapsController) {
      this.gmapsController = gmapsController;
      // this.updateMapForCurrentCard();
    } else {
      console.error("gmaps controller not found.");
    }
  }

  next() {
    this.showCard(this.currentCardIndex + 1);
  }

  prev() {
    this.showCard(this.currentCardIndex - 1);
  }

  showCard(index) {
    const totalCards = this.cardTargets.length;
    this.currentCardIndex = (index + totalCards) % totalCards;
    this.cardTargets.forEach((card, idx) => {
      card.classList.toggle("active", idx === this.currentCardIndex);
    });
    this.updateMapForCurrentCard();
  }

  updateMapForCurrentCard() {
    if (this.gmapsController) {
      const activeCard = this.cardTargets[this.currentCardIndex];
      const venueTitle = activeCard.dataset.venueTitle;
      this.gmapsController.clickMarker(venueTitle);
    } else {
      console.error("gmaps controller not available.");
    }
  }
}
