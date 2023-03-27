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
  <main class="main-content mt-0">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto mt-5"
            >
              <div class="card card-plain">
                <div class="card-header pb-0 text-left mt-5">
                  <h4 class="font-weight-bolder">Register</h4>
                  <p class="mb-0">
                    Masukkan nama pengguna, email, dan kata sandi untuk
                    mendaftar
                  </p>
                </div>
                <div class="card-body pb-3">
                  <form role="form">
                    <label>Nama Pengguna</label>
                    <argon-input
                      id="username"
                      type="text"
                      placeholder="Nama pengguna (NIM)"
                      aria-label="username"
                    />
                    <label>Email</label>
                    <argon-input
                      id="email"
                      type="email"
                      placeholder="Email"
                      aria-label="Email"
                    />
                    <label class="mb-0">Verifikasi Email</label>
                    <argon-alert
                      type="fill"
                      color="danger"
                      class="text-sm mb-2"
                      icon="fas fa-info-circle"
                    >
                      <small
                        >Pastikan Email aktif dan tidak ada kesalahan penulisan.
                        Email yang didaftarkan akan melekat pada NIM sehingga
                        tidak bisa diganti setelah pendaftaran akun KKN.</small
                      >
                    </argon-alert>
                    <argon-input
                      id="email_verif"
                      type="email"
                      placeholder="Masukkan kembali email"
                      aria-label="Email"
                    />
                    <label>Kata Sandi</label>
                    <argon-input
                      id="password"
                      type="password"
                      placeholder="Kata sandi"
                      aria-label="Password"
                    />
                    <label>Verifikasi Kata Sandi</label>
                    <argon-input
                      id="password_verif"
                      type="password"
                      placeholder="Masukkan kembali kata sandi"
                      aria-label="Password"
                    />
                    <argon-checkbox>
                      <label
                        class="form-check-label"
                        for="flexCheckDefault"
                        checked
                      >
                        I agree the
                        <a
                          href="../../../pages/privacy.html"
                          class="text-dark font-weight-bolder"
                          >Terms and Conditions</a
                        >
                      </label>
                    </argon-checkbox>
                    <div class="text-center">
                      <argon-button
                        color="success"
                        variant="gradient"
                        full-width
                        class="mt-2 mb-0"
                        >Daftar</argon-button
                      >
                    </div>
                  </form>
                </div>
                <div class="card-footer text-center pt-0 px-sm-4 px-1">
                  <p class="mb-4 mx-auto text-sm">
                    Sudah punya akun?
                    <router-link
                      :to="{ name: 'Login' }"
                      class="text-success font-weight-bold"
                    >
                      Login
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
            <div
              class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-success h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-ill.jpg');
                  background-size: cover;
                "
              >
                <span class="mask bg-success opacity-4"></span>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >
                  Kuliah Kerja Nyata Universitas Diponegoro
                </h4>
                <p class="text-white position-relative">
                  Just as it takes a company to sustain a product, it takes a
                  community to sustain a protocol.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Navbar from "@/views/partials/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonCheckbox from "@/components/ArgonCheckbox.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";

export default {
  name: "SigninIllustration",
  components: {
    Navbar,
    ArgonInput,
    ArgonCheckbox,
    ArgonButton,
    ArgonAlert,
  },
  created() {
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
    ...mapMutations(["toggleDefaultLayout"]),
  },
};
</script>
