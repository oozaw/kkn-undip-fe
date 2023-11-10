<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card>
          <template #button>
            <button
              class="btn btn-sm mb-0 me-2"
              :class="[isNotEmpty ? 'btn-success' : 'btn-secondary']"
              @click="submitData()"
              :disabled="!isNotEmpty"
            >
              Unggah
            </button>
          </template>
        </header-profile-card>
        <div class="p-3 pt-3 mt-4 card bg-white">
          <h5 class="ms-2 mt-1">Submit Berkas</h5>
          <div class="mt-1 row">
            <div class="col-lg-6 col-12">
              <div
                class="card p-3 pt-0"
                :class="[isUserHaveFoto ? 'bg-primary' : 'bg-light']"
              >
                <div
                  class="card-header pb-0 px-2"
                  :class="[isUserHaveFoto ? 'bg-primary' : 'bg-light']"
                >
                  <h6
                    for="file-pas-photo"
                    :class="[isUserHaveFoto ? 'text-white' : '']"
                  >
                    Foto Resmi/ Pas Photo (
                    <span class="text-danger">*.jpg, .jpeg, .png</span>)
                  </h6>
                </div>
                <div class="card-body px-2" v-if="!isUserHaveFoto">
                  <input
                    class="form-control"
                    type="file"
                    id="foto"
                    ref="foto"
                    @change="checkInput()"
                  />
                </div>
                <div class="card-body px-2 pt-0 pb-2" v-else>
                  <h5 class="" :class="[isUserHaveFoto ? 'text-white' : '']">
                    Anda telah melengkapi berkas ini
                  </h5>
                  <button
                    @click="isUserHaveFoto = false"
                    class="btn btn-light mt-1 mb-0"
                  >
                    Unggah Berkas Baru
                  </button>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12 mt-3 mt-lg-0">
              <div
                class="card p-3 pt-0"
                :class="[isUserHaveKHS ? 'bg-primary' : 'bg-light']"
              >
                <div
                  class="card-header pb-0 px-2"
                  :class="[isUserHaveKHS ? 'bg-primary' : 'bg-light']"
                >
                  <h6
                    for="file-khs"
                    :class="[isUserHaveKHS ? 'text-white' : '']"
                  >
                    Kartu Hasil Studi (KHS) (
                    <span class="text-danger">*.pdf</span>)
                  </h6>
                </div>
                <div class="card-body px-2" v-if="!isUserHaveKHS">
                  <input
                    class="form-control"
                    type="file"
                    id="khs"
                    ref="khs"
                    @change="checkInput()"
                  />
                </div>
                <div class="card-body px-2 pt-0 pb-2" v-else>
                  <h5 class="" :class="[isUserHaveKHS ? 'text-white' : '']">
                    Anda telah melengkapi berkas ini
                  </h5>
                  <button
                    @click="isUserHaveKHS = false"
                    class="btn btn-light mt-1 mb-0"
                  >
                    Unggah Berkas Baru
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-lg-6 col-12">
              <div
                class="card p-3 pt-0"
                :class="[isUserHaveSuratPernyataan ? 'bg-primary' : 'bg-light']"
              >
                <div
                  class="card-header pb-0 px-2"
                  :class="[
                    isUserHaveSuratPernyataan ? 'bg-primary' : 'bg-light',
                  ]"
                >
                  <h6
                    for="file-sp"
                    :class="[isUserHaveSuratPernyataan ? 'text-white' : '']"
                  >
                    Surat Pernyataan ( <span class="text-danger">*.pdf</span>)
                  </h6>
                </div>
                <div class="card-body px-2" v-if="!isUserHaveSuratPernyataan">
                  <input
                    class="form-control"
                    type="file"
                    id="sp"
                    ref="sp"
                    @change="checkInput()"
                  />
                </div>
                <div class="card-body px-2 pt-0 pb-2" v-else>
                  <h5
                    class=""
                    :class="[isUserHaveSuratPernyataan ? 'text-white' : '']"
                  >
                    Anda telah melengkapi berkas ini
                  </h5>
                  <button
                    @click="isUserHaveSuratPernyataan = false"
                    class="btn btn-light mt-1 mb-0"
                  >
                    Unggah Berkas Baru
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$mahasiswa from "@/store/mahasiswa";
import d$auth from "@/store/auth";

export default {
  name: "EditBerkas",
  components: {
    HeaderProfileCard,
  },
  computed: {
    ...mapState(d$auth, ["g$infoUser"]),
  },
  data() {
    return {
      bodyKHS: {},
      bodySuratPernyataan: {},
      bodyFoto: {},
      isNotEmpty: false,
      isUserHaveKHS: false,
      isUserHaveFoto: false,
      isUserHaveSuratPernyataan: false,
    };
  },
  created() {
    this.getInitData();
  },
  methods: {
    ...mapActions(d$mahasiswa, [
      "a$addKHS",
      "a$addSuratPernyataan",
      "a$addFoto",
    ]),

    getInitData() {
      if (this.g$infoUser.khs) this.isUserHaveKHS = true;
      if (this.g$infoUser.surat_pernyataan)
        this.isUserHaveSuratPernyataan = true;
      if (this.g$infoUser.foto_profile) this.isUserHaveFoto = true;
    },

    async submitData() {
      this.showSwal("loading");

      try {
        this.bodyKHS.file = this.$refs.khs?.files[0];
        this.bodyFoto.file = this.$refs.foto?.files[0];
        this.bodySuratPernyataan.file = this.$refs.sp?.files[0];

        if (this.bodyKHS.file) await this.a$addKHS(this.bodyKHS);
        if (this.bodyFoto.file) await this.a$addFoto(this.bodyFoto);
        if (this.bodySuratPernyataan.file)
          await this.a$addSuratPernyataan(this.bodySuratPernyataan);

        this.showSwal("success-message", "Berkas berhasil diunggah");
        this.getInitData();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat mengunggah data! " + msg
        );
      }
    },

    checkInput() {
      const fileKHS = this.$refs.khs?.files[0];
      const fileFoto = this.$refs.foto?.files[0];
      const fileSuratPernyataan = this.$refs.sp?.files[0];

      if (fileKHS || fileFoto || fileSuratPernyataan) this.isNotEmpty = true;
      else this.isNotEmpty = false;
    },

    async addKHS() {
      try {
        await this.a$addKHS(this.bodyKHS);
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat mengunggah data! " + msg
        );
      }
    },

    showSwal(type, text, toastText, id_mahasiswa) {
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
      } else if (type === "warning-confirmation") {
        this.$swal({
          title: "Apakah Anda yakin?",
          text: text,
          showCancelButton: true,
          confirmButtonText: "Ya!",
          cancelButtonText: "Batal!",
          customClass: {
            confirmButton: "btn bg-gradient-success",
            cancelButton: "btn bg-gradient-secondary",
          },
          buttonsStyling: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteMahasiswa(id_mahasiswa);
            this.$swal({
              toast: true,
              position: "top-end",
              title: toastText,
              icon: "success",
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
              didOpen: () => {
                this.$swal.hideLoading();
              },
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            this.$swal.close();
          }
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
