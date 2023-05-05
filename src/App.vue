<template>
  <div
    v-show="layout === 'landing'"
    class="landing-bg h-100 bg-gradient-primary position-fixed w-100"
  ></div>
  <sidenav v-if="showSidenav" />
  <main class="main-content position-relative max-height-vh-100 h-100">
    <navbar v-if="showNavbar" />
    <router-view />
    <app-footer v-show="showFooter" />
    <configurator
      :class="[showConfig ? 'show' : '', hideConfigButton ? 'd-none' : '']"
    />
  </main>
</template>
<script>
import Sidenav from "@/views/dashboards/partials/Sidenav/index.vue";
import Configurator from "@/views/dashboards/components/Configurator.vue";
import Navbar from "@/views/dashboards/partials/Navbars/Navbar.vue";
import AppFooter from "@/views/dashboards/partials/Footer.vue";
import { mapState } from "vuex";
import d$auth from "@/store/auth";
import certCookies from "@/utils/cookies";

export default {
  name: "App",
  components: {
    Sidenav,
    Configurator,
    Navbar,
    AppFooter,
  },
  computed: {
    ...mapState([
      "layout",
      "showSidenav",
      "showNavbar",
      "showFooter",
      "showConfig",
      "hideConfigButton",
    ]),
  },
  setup() {
    const authStore = d$auth();

    return {
      authStore,
    };
  },
};
</script>
