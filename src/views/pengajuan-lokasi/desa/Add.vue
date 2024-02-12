<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard />
        <div id="card-profile-wilayah" class="card mt-4 pb-2">
          <div class="card-header">
            <h5>Tambah Desa</h5>
          </div>
          <div class="card-body pt-0">
            <form id="form-desa" role="form" @submit.prevent="addDesa()">
              <div class="row">
                <div class="col-12">
                  <label class="form-label">Tema</label>
                  <select
                    id="choices-tema"
                    class="form-control"
                    name="choices-tema"
                    v-model="id_tema"
                    @change="getListKecamatan()"
                  >
                    <option value="">-- Pilih tema --</option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Kecamatan</label>
                  <select
                    id="choices-kecamatan"
                    class="form-control"
                    name="choices-kecamatan"
                    v-model="id_kecamatan"
                  >
                    <option value="">-- Pilih kecamatan --</option>
                  </select>
                </div>
                <div class="col-sm-6 col-12 mt-3 mt-sm-0">
                  <label class="form-label">Nama Desa</label>
                  <argon-input
                    id="desa"
                    name="desa"
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
                    color="success"
                    variant="gradient"
                    size="sm"
                    >Tambah Desa</argon-button
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
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$tema from "@/store/tema";
import d$wilayah from "@/store/wilayah";
import d$auth from "@/store/auth";

export default {
  name: "AddDesa",
  components: {
    HeaderProfileCard,
    ArgonInput,
    ArgonButton,
  },
  data() {
    return {
      choicesKec: undefined,
      choicesTema: undefined,
      id_tema: "",
      id_kecamatan: "",
      desa: "",
      listKabupatenTerdaftar: [],
    };
  },
  computed: {
    ...mapState(d$tema, ["g$listTemaActive"]),
    ...mapState(d$wilayah, ["g$listKabupaten", "g$listKecamatan"]),
    ...mapState(d$auth, ["g$infoUser"]),
  },
  async created() {
    await this.getInitData();
  },
  mounted() {
    this.choicesTema = this.getChoices("choices-tema");
    this.choicesKec = this.getChoices("choices-kecamatan");
  },
  beforeUnmount() {
    if (this.choicesKec) this.choicesKec.destroy();
    if (this.choicesTema) this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$tema, ["a$listTema"]),
    ...mapActions(d$wilayah, [
      "a$listKabupatenTemaBappeda",
      "a$addDesa",
      "a$listKecamatanKabupaten",
    ]),

    async getInitData() {
      this.showSwal("loading");

      try {
        this.listKabupatenTerdaftar = [];
        await this.a$listTema();
        await this.g$listTemaActive.forEach((tema) => {
          this.getListKabupaten(tema.id_tema, tema.nama);
        });
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

    async addDesa() {
      this.showSwal("loading");

      // validation
      if (
        this.id_tema == "" ||
        this.id_tema == undefined ||
        this.id_tema == 0 ||
        this.id_tema == null ||
        isNaN(this.id_tema) ||
        this.id_kecamatan == "" ||
        this.id_kecamatan == undefined ||
        this.id_kecamatan == 0 ||
        this.id_kecamatan == null ||
        isNaN(this.id_kecamatan) ||
        this.desa == "" ||
        this.desa == undefined ||
        this.desa == null ||
        this.desa == "-"
      ) {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      try {
        await this.a$addDesa({
          id_kecamatan: this.id_kecamatan,
          nama: this.desa,
        });
        this.$router.push({ name: "Pengajuan Lokasi" });
        this.showSwal("success-message", "Desa berhasil ditambahkan!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat menambahkan desa! " + msg
        );
      }
    },

    async getListKabupaten(id_tema, nama_tema) {
      try {
        let temaData = {
          nama_tema,
        };
        await this.a$listKabupatenTemaBappeda(
          id_tema,
          this.g$infoUser.id_bappeda
        );
        await this.g$listKabupaten.forEach((kabupaten) => {
          let newData = {
            ...kabupaten,
            ...temaData,
          };
          this.listKabupatenTerdaftar.push(newData);
        });
        this.setChoicesTema(this.choicesTema, this.listKabupatenTerdaftar);
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

    async getListKecamatan() {
      try {
        await this.a$listKecamatanKabupaten(Number(this.id_tema));
        this.setChoicesKecamatan(this.choicesKec, this.g$listKecamatan);
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

    setChoicesTema(choices, option) {
      if (choices) {
        choices.clearChoices();
        let newOption = [];
        option.forEach((item) => {
          newOption.push({
            value: Object.values(item)[0], // id_kabupaten
            label: item.nama_tema,
          });
        });
        choices.setChoices(newOption);
      }
    },

    setChoicesKecamatan(choices, option) {
      if (choices) {
        choices.clearChoices();
        let newOption = [];
        option.forEach((item) => {
          newOption.push({
            value: Object.values(item)[0], // id_kecamatan
            label: item.nama,
          });
        });
        choices.setChoices(newOption);
      }
    },

    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
          shouldSort: false,
        });
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
