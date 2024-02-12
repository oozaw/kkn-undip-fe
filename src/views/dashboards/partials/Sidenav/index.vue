<template>
  <div
    v-if="layout === 'custom'"
    class="position-absolute w-100 min-height-300 top-0"
    :style="{
      'background-image': 'url(' + image + ')',
      'background-position-y': '50%',
    }"
  >
    <span class="mask bg-success opacity-6"></span>
  </div>
  <div
    v-show="layout === 'default'"
    class="min-height-300 position-absolute w-100"
    :class="`${darkMode ? 'bg-trasnparent' : 'bg-success'}`"
  />

  <aside
    id="sidenav-main"
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 ms-4 z-index-0"
    :class="` ${sidebarType} ${
      isRTL ? 'fixed-end me-3 rotate-caret' : 'fixed-start ms-3'
    } ${layout === 'landing' ? 'bg-transparent shadow-none' : ''}`"
  >
    <div class="sidenav-header">
      <i
        id="iconSidenav"
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
      ></i>
      <router-link class="m-0 navbar-brand" to="/">
        <img :src="logo" class="navbar-brand-img h-100" alt="main_logo" />
        <span class="ms-2 font-weight-bold">P2KKN Undip</span> <br />
        <!-- <small class="ms-5">Mahasiswa</small> -->
      </router-link>
    </div>
    <hr class="mt-0 horizontal dark" />
    <sidenav-list />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logos/undip.png";
import image from "@/assets/img/profile-layout-header.jpg";

import { mapState } from "vuex";
export default {
  name: "Index",
  components: {
    SidenavList,
  },
  data() {
    return {
      logo,
      image,
    };
  },
  computed: {
    ...mapState(["layout", "isRTL", "sidebarType", "darkMode"]),
  },
  beforeUnmount() {
    this.$store.state.image;
  },
};
</script>
