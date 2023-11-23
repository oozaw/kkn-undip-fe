<template>
  <nav
    id="navbarBlur"
    :class="`${
      !isNavFixed
        ? 'navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl shadow-none'
        : `navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl shadow-none position-sticky ${
            darkMode ? 'bg-default' : 'bg-white'
          } left-auto top-2 z-index-sticky`
    } ${isRTL ? 'top-0 position-sticky z-index-sticky' : ''}`"
    v-bind="$attrs"
    data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs
        :current-page="currentRouteName"
        :current-directory="currentDirectory"
      />
      <div
        class="sidenav-toggler sidenav-toggler-inner d-xl-block d-none"
        :class="isRTL ? 'me-3' : ''"
      >
        <a
          href="#"
          class="p-0 nav-link text-body"
          @click.prevent="navbarMinimize"
        >
          <div class="sidenav-toggler-inner">
            <i
              class="sidenav-toggler-line"
              :class="
                isNavFixed && !darkMode ? ' opacity-8 bg-dark' : 'bg-white'
              "
            ></i>
            <i
              class="sidenav-toggler-line"
              :class="
                isNavFixed && !darkMode ? ' opacity-8 bg-dark' : 'bg-white'
              "
            ></i>
            <i
              class="sidenav-toggler-line"
              :class="
                isNavFixed && !darkMode ? ' opacity-8 bg-dark' : 'bg-white'
              "
            ></i>
          </div>
        </a>
      </div>
      <div
        id="navbar"
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="isRTL ? 'px-0' : 'me-sm-4'"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="isRTL ? 'me-md-auto' : 'ms-md-auto'"
        ></div>
        <ul class="navbar-nav justify-content-end">
          <!-- User name -->
          <li class="nav-item d-flex align-items-center me-3">
            <router-link
              v-if="g$user.id"
              :to="{ name: 'Edit Data Diri' }"
              class="px-0 nav-link font-weight-bold"
              :class="
                isNavFixed && !darkMode ? ' opacity-8 text-dark' : 'text-white'
              "
            >
              <i class="fa fa-user" :class="isRTL ? 'ms-sm-2' : 'me-sm-1'"></i>
              <span v-if="isRTL" class="d-sm-inline d-none">
                {{ g$infoUser.nama }}</span
              >
              <span v-else class="d-sm-inline d-none">{{
                g$infoUser.nama
              }}</span>
            </router-link>
            <router-link
              v-else
              :to="{ name: 'Login' }"
              class="px-0 nav-link font-weight-bold"
              :class="
                isNavFixed && !darkMode ? ' opacity-8 text-dark' : 'text-white'
              "
            >
              <i class="fa fa-user" :class="isRTL ? 'ms-sm-2' : 'me-sm-1'"></i>
              <span v-if="isRTL" class="d-sm-inline d-none">يسجل دخول</span>
              <span v-else class="d-sm-inline d-none">Login</span>
            </router-link>
          </li>
          <!-- Logout -->
          <li
            class="nav-item dropdown d-flex align-items-center"
            :class="isRTL ? 'ps-2' : 'pe-2'"
          >
            <a
              href="#"
              class="px-0 nav-link font-weight-bold"
              :class="
                isNavFixed && !darkMode ? ' opacity-8 text-dark' : 'text-white'
              "
              data-bs-toggle="modal"
              data-bs-target="#logout-modal"
            >
              <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
              Logout
            </a>
            <div
              id="logout-modal"
              class="modal fade"
              tabindex="-1"
              aria-hidden="true"
              :key="indexComponent"
            >
              <div class="modal-dialog mt-lg-6">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 id="ModalLabel" class="modal-title text-wrap text-2xl">
                      Logout
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <p class="mb-1 text-lg">
                      Apakah Anda yakin ingin keluar dari aplikasi?
                    </p>
                  </div>
                  <div class="modal-footer">
                    <button
                      id="button-close-modal"
                      type="button"
                      class="btn bg-gradient-secondary btn-sm"
                      data-bs-dismiss="modal"
                    >
                      Batal
                    </button>
                    <button
                      @click.prevent="logout()"
                      type="submit"
                      class="btn bg-gradient-danger btn-sm"
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import { mapState as mapStatePinia } from "pinia";
import d$auth from "@/store/auth";
import { mapActions as mapActionsPinia } from "pinia";

export default {
  name: "Navbar",
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    ...mapState(["isRTL", "isNavFixed", "darkMode"]),
    currentRouteName() {
      return this.$route.name;
    },
    currentDirectory() {
      let dir = this.$route.path.split("/")[1];
      return dir.charAt(0).toUpperCase() + dir.slice(1);
    },

    ...mapStatePinia(d$auth, ["g$user", "g$infoUser"]),
  },
  created() {
    this.minNav;
  },
  beforeUpdate() {
    this.toggleNavigationOnMobile();
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),
    toggleNavigationOnMobile() {
      if (window.innerWidth < 1200) {
        this.navbarMinimize();
      }
    },

    ...mapActionsPinia(d$auth, ["a$logout"]),

    async logout() {
      try {
        await this.a$logout();
        this.$router.push({ name: "Login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
