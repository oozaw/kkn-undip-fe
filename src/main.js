import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import VueTilt from "vue-tilt.js";
import VueSweetalert2 from "vue-sweetalert2";
import ArgonDashboard from "./argon-dashboard";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import icon from "@/assets/js/font-awesome-icon";

library.add(icon);

const appInstance = createApp(App);
appInstance.use(createPinia());
appInstance.use(store);
appInstance.use(router);
appInstance.use(VueTilt);
appInstance.use(VueSweetalert2);
appInstance.use(ArgonDashboard);
appInstance.component("font-awesome-icon", FontAwesomeIcon);
appInstance.mount("#app");
