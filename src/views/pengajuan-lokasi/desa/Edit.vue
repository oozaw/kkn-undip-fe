<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              type="button"
              :onclick="() => $router.push({ name: 'Pengajuan Lokasi' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-desa"
              class="mb-0 me-lg-2"
              color="primary"
              variant="gradient"
              size="sm"
              >Simpan Perubahan</argon-button
            >
          </template>
        </HeaderProfileCard>
        <div id="card-profile-wilayah" class="card mt-4 pb-2">
          <div class="card-header">
            <h5>Edit Desa</h5>
          </div>
          <div class="card-body pt-0">
            <form id="form-desa" role="form" @submit.prevent="editDesa()">
              <div class="row">
                <div class="col-12">
                  <label class="form-label">Tema</label>
                  <input
                    id="tema"
                    name="tema"
                    class="form-control"
                    type="text"
                    placeholder="Nama tema"
                    v-model="tema"
                    readonly
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Kecamatan</label>
                  <input
                    id="kecamatan"
                    name="kecamatan"
                    class="form-control"
                    type="text"
                    placeholder="Nama kecamatan"
                    v-model="kecamatan"
                    readonly
                  />
                </div>
                <div class="col-sm-6 col-12 mt-3 mt-sm-0">
                  <label class="form-label">Nama Desa</label>
                  <input
                    id="desa"
                    name="desa"
                    class="form-control"
                    type="text"
                    placeholder="Nama desa"
                    v-model="desa"
                    required
                  />
                </div>
              </div>
              <div class="row mt-4">
                <div
                  class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-end"
                >
                  <argon-button
                    type="button"
                    :onclick="() => $router.push({ name: 'Pengajuan Lokasi' })"
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    type="submit"
                    form="form-desa"
                    class="mb-0 me-lg-2"
                    color="primary"
                    variant="gradient"
                    size="sm"
                    >Simpan Perubahan</argon-button
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$wilayah from "@/store/wilayah";

export default {
  name: "AddDesa",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      id_desa: this.$route.params.id_desa,
      tema: "",
      kecamatan: "",
      desa: "",
    };
  },
  computed: {
    ...mapState(d$wilayah, ["g$desa"]),
  },
  async created() {
    await this.getInitData();
  },
  methods: {
    ...mapActions(d$wilayah, ["a$editDesa", "a$getDesa"]),

    async getInitData() {
      this.showSwal("loading");

      try {
        await this.a$getDesa(Number(this.id_desa));
        this.tema = this.g$desa.nama_tema;
        this.kecamatan = this.g$desa.nama_kecamatan;
        this.desa = this.g$desa.nama;
        this.showSwal("close");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat memuat data! " + msg
        );
      }
    },

    async editDesa() {
      this.showSwal("loading");

      // validation
      if (
        this.tema == "" ||
        this.tema == undefined ||
        this.tema == 0 ||
        this.tema == null ||
        this.kecamatan == "" ||
        this.kecamatan == undefined ||
        this.kecamatan == 0 ||
        this.kecamatan == null ||
        this.desa == "" ||
        this.desa == undefined ||
        this.desa == null ||
        this.desa == "-"
      ) {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      try {
        await this.a$editDesa(Number(this.id_desa), { nama: this.desa });
        this.$router.push({ name: "Pengajuan Lokasi" });
        this.showSwal("success-message", "Data desa berhasil disimpan!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat menyimpan data desa! " + msg
        );
      }
    },

    showSwal(type, text, toastText) {
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
