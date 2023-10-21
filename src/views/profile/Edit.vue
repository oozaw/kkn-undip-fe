<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card>
          <template #button>
            <div class="my-auto ms-auto">
              <button
                @click="
                  () => {
                    $router.push({ name: 'Landing Profile' });
                  }
                "
                class="mb-0 me-2 btn bg-secondary btn-sm text-white"
              >
                Batal
              </button>
              <button
                type="submit"
                form="form-edit-profile"
                class="mb-0 me-2 btn bg-gradient-primary btn-sm text-white"
              >
                Simpan Perubahan
              </button>
            </div>
          </template>
        </header-profile-card>
        <section id="mhs-section">
          <div class="bg-white pb-2 card mt-4">
            <!-- Card header -->
            <div class="pb-0 card-header">
              <div class="d-lg-flex">
                <h5 class="mb-2">Edit Profil P2KKN</h5>
              </div>
            </div>
            <form
              role="form"
              id="form-edit-profile"
              enctype="multipart/form-data"
              @submit.prevent="editProfile()"
            >
              <div class="ms-2 pt-1 ps-3 card-body">
                <div class="mt-2 row">
                  <div class="col-12">
                    <label for="profile">Profil</label>
                    <quill-editor
                      id="profile-editor"
                      style="height: 180px"
                      v-model:content="body.profile"
                      contentType="html"
                      theme="snow"
                      placeholder="Masukkan profil P2KKN"
                    ></quill-editor>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label for="visi">Visi</label>
                    <quill-editor
                      id="visi-editor"
                      style="height: 180px"
                      v-model:content="body.visi"
                      contentType="html"
                      theme="snow"
                      placeholder="Masukkan visi P2KKN"
                    ></quill-editor>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label for="misi">Misi</label>
                    <quill-editor
                      id="misi-editor"
                      style="height: 180px"
                      v-model:content="body.misi"
                      contentType="html"
                      theme="snow"
                      placeholder="Masukkan misi P2KKN"
                    ></quill-editor>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label for="alamat">Alamat</label>
                    <quill-editor
                      id="alamat-editor"
                      style="height: 100px"
                      v-model:content="body.alamat"
                      contentType="html"
                      theme="snow"
                      placeholder="Masukkan alamat kantor P2KKN"
                    ></quill-editor>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12 col-md-6">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      name="email"
                      v-model="body.email"
                      placeholder="Masukkan alamat email P2KKN"
                      required
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="no_hp">No. Telepon</label>
                    <input
                      type="text"
                      class="form-control"
                      id="no_hp"
                      name="no_hp"
                      v-model="body.no_hp"
                      placeholder="Masukkan nomor telepon kantor P2KKN"
                      required
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12 col-md-6">
                    <label for="instagram">Instagram</label>
                    <input
                      type="text"
                      class="form-control"
                      id="instagram"
                      name="instagram"
                      v-model="body.instagram"
                      placeholder="Masukkan akun Instagram P2KKN"
                      required
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="facebook">Facebook</label>
                    <input
                      type="text"
                      class="form-control"
                      id="facebook"
                      name="facebook"
                      v-model="body.facebook"
                      placeholder="Masukkan akun Facebook P2KKN"
                      required
                    />
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-12 col-md-6">
                    <label for="twiiter">Twitter</label>
                    <input
                      type="text"
                      class="form-control"
                      id="twiiter"
                      name="twiiter"
                      v-model="body.twitter"
                      placeholder="Masukkan akun Twitter P2KKN"
                      required
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="youtube">Youtube</label>
                    <input
                      type="text"
                      class="form-control"
                      id="youtube"
                      name="youtube"
                      v-model="body.youtube"
                      placeholder="Masukkan akun Youtube P2KKN"
                      required
                    />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-12 mt-3 d-flex justify-content-end">
                    <argon-button
                      type="button"
                      :onclick="() => $router.go(-1)"
                      class="mb-0 me-2"
                      color="secondary"
                      size="sm"
                      >Batal</argon-button
                    >
                    <argon-button
                      class="mb-0 me-lg-2"
                      form="form-edit-profile"
                      color="primary"
                      variant="gradient"
                      size="sm"
                      >Simpan Perubahan</argon-button
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import ArgonButton from "@/components/ArgonButton.vue";
import d$auth from "@/store/auth";
import d$profile from "@/store/profile";

export default {
  name: "EditLandingProfile",
  components: {
    HeaderProfileCard,
    ArgonButton,
    QuillEditor,
  },
  data() {
    return {
      body: {
        profile: "",
        visi: "",
        misi: "",
        alamat: "",
        no_hp: "",
        instagram: "",
        twitter: "",
        email: "",
        youtube: "",
        facebook: "",
      },
    };
  },
  computed: {
    ...mapState(d$auth, ["g$user"]),
    ...mapState(d$profile, ["g$profile"]),
  },
  async created() {
    await this.getInitData();
  },
  methods: {
    ...mapActions(d$auth, ["a$getUser"]),
    ...mapActions(d$profile, ["a$getProfile", "a$editProfile"]),

    async getInitData() {
      this.showSwal("loading");

      try {
        await this.a$getProfile();
        this.body = {
          profile: this.g$profile.profile,
          visi: this.g$profile.visi,
          misi: this.g$profile.misi,
          alamat: this.g$profile.alamat,
          no_hp: this.g$profile.no_hp,
          instagram: this.g$profile.instagram,
          twitter: this.g$profile.twitter,
          email: this.g$profile.email,
          youtube: this.g$profile.youtube,
          facebook: this.g$profile.facebook,
        };
      } catch (error) {
        console.log(error);
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat memuat data! " + msg
        );
      }

      setTimeout(() => {
        this.showSwal("close");
      }, 400);
    },

    async editProfile() {
      this.showSwal("loading");

      try {
        await this.a$editProfile(this.body);
        this.showSwal("success-message", "Data berhasil disimpan!");
        this.$router.push({ name: "Landing Profile" });
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat menyimpan data! " + msg
        );
      }
    },

    showSwal(type, text) {
      if (type === "success-message") {
        this.$swal({
          icon: "success",
          title: "Berhasil!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
        });
      } else if (type === "warning-message") {
        this.$swal({
          icon: "warning",
          title: "Peringatan!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
        });
      } else if (type === "failed-message") {
        this.$swal({
          icon: "error",
          title: "Gagal!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
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
