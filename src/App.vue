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
  </main>
</template>

<style>
@import "datatables.net-bs5";
</style>

<script>
import Sidenav from "@/views/dashboards/partials/Sidenav/index.vue";
import Navbar from "@/views/dashboards/partials/Navbars/Navbar.vue";
import AppFooter from "@/views/dashboards/partials/Footer.vue";
import { mapState } from "vuex";
import d$auth from "@/store/auth";

export default {
  name: "App",
  components: {
    Sidenav,
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

    authStore.a$setUser();

    return {
      authStore,
    };
  },
};
</script>
