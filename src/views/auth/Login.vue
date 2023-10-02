<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          is-blur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
          btn-background="bg-gradient-success"
          :dark-mode="true"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Login</h4>
                  <p class="mb-0">
                    Masukkan nama pengguna dan kata sandi untuk masuk
                  </p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="login">
                    <div class="mb-3">
                      <argon-input
                        v-model="input.username"
                        id="username"
                        type="text"
                        placeholder="Nama pengguna"
                        name="username"
                        size="lg"
                        :isAutoFocus="true"
                        :isRequired="true"
                      />
                    </div>
                    <div class="mb-2">
                      <argon-input
                        v-model="input.password"
                        id="password"
                        class="mb-2"
                        type="password"
                        placeholder="Kata sandi"
                        name="password"
                        size="lg"
                        :isRequired="true"
                      />
                    </div>
                    <!-- <div class="text-end me-2">
                      <router-link
                        :to="{ name: 'Reset' }"
                        class="text-sm text-primary"
                        >Lupa password?</router-link
                      >
                    </div> -->
                    <div class="text-center">
                      <argon-button
                        class="mt-3"
                        variant="gradient"
                        color="success"
                        full-width
                        size="lg"
                        type="submit"
                        >Login</argon-button
                      >
                    </div>
                  </form>
                </div>
                <!-- <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Belum punya akun?
                    <router-link
                      :to="{ name: 'Register' }"
                      class="text-success text-gradient font-weight-bold"
                      >Daftar</router-link
                    >
                  </p>
                </div> -->
              </div>
            </div>
            <div
              class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column"
            >
              <div
                class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                :style="{
                  backgroundImage:
                    'url(' + require('@/assets/img/logos/wp.jpg') + ')',
                  backgroundSize: 'cover',
                }"
              >
                <span class="mask bg-gradient-success opacity-6"></span>

                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >
                  Kuliah Kerja Nyata Universitas Diponegoro
                </h4>
                <!-- <p class="text-white position-relative">
                  The more effortless the writing looks, the more effort the
                  writer actually put into the process.
                </p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapActions, mapState } from "pinia";
import d$auth from "@/store/auth";
import d$presensi from "@/store/presensi";
import Navbar from "@/views/partials/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(d$auth, ["g$infoUser"]),
  },
  components: {
    Navbar,
    ArgonInput,
    ArgonButton,
  },
  created() {
    this.checkError();

    this.$store.state.hideConfigButton = true;
    this.toggleDefaultLayout();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.toggleDefaultLayout();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapActions(d$auth, ["a$login", "a$getUser"]),
    ...mapMutations(["toggleDefaultLayout"]),
    ...mapActions(d$presensi, ["a$updateStatusJadwalPresensi"]),

    async login() {
      this.showSwal("loading");

      try {
        await this.a$login(this.input);
        await this.a$getUser();
        this.$router.push(this.$route.query.redirect || { name: "Dashboard" });
        this.showSwal(
          "success-message",
          "Login Berhasil!",
          "Selamat datang " + this.g$infoUser.nama
        );
        await this.a$updateStatusJadwalPresensi();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Login gagal! " + msg);
      }
    },

    checkError() {
      const error = this.$route.params.error;

      if (error) {
        if (error === "unauthenticated")
          this.showSwal(
            "failed-message",
            "Sesi anda telah berakhir",
            "Silahkan login terlebih dahulu!"
          );
      }
    },

    showSwal(type, title, text) {
      if (type === "success-message") {
        this.$swal({
          icon: "success",
          title: "Login Berhasil!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else if (type === "failed-message") {
        this.$swal({
          icon: "error",
          title: title,
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else if (type === "auto-close") {
        let timerInterval;
        this.$swal({
          title: "Auto close alert!",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            this.$swal.showLoading();
            const b = this.$swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = this.$swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      } else if (type === "loading") {
        this.$swal({
          title: "Memuat...",
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            this.$swal.showLoading();
          },
          didDestroy: () => {
            this.$swal.hideLoading();
          },
        });
      } else if (type === "close") {
        this.$swal.close();
      }
    },
  },
};
</script>
