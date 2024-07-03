// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import { Application } from "@hotwired/stimulus"
import GmapsController from "./controllers/gmaps_controller"
import CarouselController from "./controllers/carousel_controller"

const application = Application.start()
application.register("gmaps", GmapsController)
application.register("carousel", CarouselController)
