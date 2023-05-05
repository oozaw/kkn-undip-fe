<template>
  <!-- Navbar -->
  <nav
    class="navbar navbar-expand-lg top-0 z-index-3 position-absolute mt-4"
    :class="isBlur ? isBlur : 'shadow-none my-2 navbar-transparent w-100'"
  >
    <div class="container ps-1 pe-0">
      <router-link class="navbar-brand ms-lg-0 me-0 w-25" to="/home">
        <img
          :src="logo"
          class="navbar-brand-img"
          style="height: 20px; width: auto"
          alt="main_logo"
        />
        <span
          class="font-weight-bolder ms-1"
          :class="darkMode ? 'text-black' : 'text-white'"
        >
          KKN Universitas Diponegoro
        </span>
      </router-link>
      <button
        class="shadow-none navbar-toggler ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="mt-2 navbar-toggler-icon">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div
        id="navigation"
        class="pt-3 pb-2 collapse navbar-collapse w-100 py-lg-0"
      >
        <ul class="ms-auto navbar-nav d-lg-block d-none">
          <li class="nav-item">
            <router-link
              to="/home"
              class="mb-0 btn btn-sm me-1"
              :class="btnBackground ? btnBackground : 'bg-white text-dark'"
              >Home</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import downArrWhite from "@/assets/img/down-arrow-white.svg";
import downArrBlack from "@/assets/img/down-arrow-dark.svg";
import logo from "@/assets/img/logos/undip.png";
import curved8 from "@/assets/img/curved-images/curved8.jpg";

export default {
  name: "Navbar",
  props: {
    btnBackground: {
      type: String,
      default: "",
    },
    isBlur: {
      type: String,
      default: "",
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      downArrWhite,
      downArrBlack,
      logo,
      curved8,
    };
  },
  computed: {
    darkModes() {
      return {
        "text-dark": this.darkMode,
      };
    },
  },
};
</script>
