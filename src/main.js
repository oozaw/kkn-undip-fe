import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "./assets/css/index.css";
import VueTilt from "vue-tilt.js";
import VueSweetalert2 from "vue-sweetalert2";
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import ArgonDashboard from "./argon-dashboard";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import icon from "@/assets/js/font-awesome-icon";
import SimpleWebWorker from "simple-web-worker";

library.add(icon);

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const appInstance = createApp(App);
appInstance.use(pinia);
appInstance.use(store);
appInstance.use(router);
appInstance.config.globalProperties.$worker = SimpleWebWorker;
appInstance.use(VueTilt);
appInstance.use(VueSweetalert2);
appInstance.use(
  LoadingPlugin,
  {
    // props
    color: "#2DCE89",
    opacity: 0.5,
    height: 100,
    width: 100,
    isFullPage: false,
  },
  {
    // slots
    // default: "Loading...",
  }
);
appInstance.use(ArgonDashboard);
appInstance.component("font-awesome-icon", FontAwesomeIcon);
appInstance.mount("#app");
