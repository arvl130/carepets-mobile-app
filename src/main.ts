import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { createPinia } from "pinia"
import { VueQueryPlugin } from "@tanstack/vue-query"

import { IonicVue } from "@ionic/vue"

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css"
import "@ionic/vue/css/structure.css"
import "@ionic/vue/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css"
import "@ionic/vue/css/float-elements.css"
import "@ionic/vue/css/text-alignment.css"
import "@ionic/vue/css/text-transformation.css"
import "@ionic/vue/css/flex-utils.css"
import "@ionic/vue/css/display.css"

/* Theme variables */
import "./theme/variables.css"
import "./theme/tailwind.css"

/* add fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

/* add some free styles */
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import {
  faUserSecret,
  faPaw,
  faCalendarDays,
  faScissors,
  faCircleInfo,
  faLocationDot,
  faPhone,
  faEnvelope,
  faSoap,
  faSyringe,
  faDog,
  faCat,
} from "@fortawesome/free-solid-svg-icons"

library.add(
  faTwitter,
  faUserSecret,
  faPaw,
  faCalendarDays,
  faScissors,
  faCircleInfo,
  faLocationDot,
  faPhone,
  faEnvelope,
  faSoap,
  faSyringe,
  faDog,
  faCat
)

const pinia = createPinia()
const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(pinia)
  .use(VueQueryPlugin)

router.isReady().then(() => {
  app.component("font-awesome-icon", FontAwesomeIcon)
  app.mount("#app")
})
