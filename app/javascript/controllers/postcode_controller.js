import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["input"]

  connect() {
    console.log("hello from the postcode controller!")
  }

  submit(event) {
    event.preventDefault();
    const inputValue = this.inputTarget.value;
    const form = this.element;
    form.action = `/map`;
    form.method = "post";
    form.submit();
  }
}
