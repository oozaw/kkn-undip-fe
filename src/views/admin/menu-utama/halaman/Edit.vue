<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              type="button"
              :onclick="() => $router.push({ name: 'Halaman' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-edit-halaman"
              class="mb-0 me-lg-2"
              color="primary"
              variant="gradient"
              size="sm"
              >Simpan Halaman</argon-button
            >
          </template>
        </HeaderProfileCard>
        <div class="card mt-4">
          <div class="card-header">
            <h5>Edit Halaman</h5>
          </div>
          <div class="card-body pt-0">
            <form
              role="form"
              id="form-edit-halaman"
              @submit.prevent="editHalaman()"
            >
              <div class="row">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Nama Halaman</label>
                  <input
                    class="form-control"
                    id="nama"
                    name="nama"
                    type="text"
                    v-model="namaHalaman"
                    readonly
                  />
                </div>
                <div class="col-sm-6 col-12 mt-sm-0 mt-3">
                  <label class="form-label">Tema</label>
                  <input
                    class="form-control"
                    id="tema"
                    name="tema"
                    type="text"
                    v-model="namaTema"
                    readonly
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-sm-6 col-12">
                  <label for="choices-option-tgl" class="form-label"
                    >Tambah Tanggal?</label
                  >
                  <select
                    id="choices-option-tgl"
                    class="form-control"
                    name="choices-option-tgl"
                    v-model="optionTgl"
                  >
                    <option value="1">Ya</option>
                    <option value="0">Tidak</option>
                  </select>
                </div>
                <div class="col-sm-6 col-12 mt-sm-0 mt-3">
                  <label for="choices-status" class="form-label">Status</label>
                  <select
                    id="choices-status"
                    class="form-control"
                    name="choices-status"
                    v-model="body.status"
                    :disabled="statusDate"
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Non-Aktif</option>
                  </select>
                </div>
              </div>
              <div v-if="optionTgl === '1'" class="row mt-3">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Tanggal Mulai</label>
                  <VueDatePicker
                    id="ttl"
                    name="ttl"
                    v-model="body.tgl_mulai"
                    placeholder="Pilih tanggal awal"
                    locale="id"
                    cancel-text="Batal"
                    select-text="Pilih"
                    :format="'dd MMMM yyyy, HH:mm'"
                    :format-locale="id"
                    @update:model-value="checkStatus()"
                    required
                  ></VueDatePicker>
                </div>
                <div class="col-sm-6 col-12 mt-sm-0 mt-3">
                  <label class="form-label">Tanggal Berakhir</label>
                  <VueDatePicker
                    id="ttl"
                    name="ttl"
                    v-model="body.tgl_akhir"
                    placeholder="Pilih tanggal akhir"
                    locale="id"
                    cancel-text="Batal"
                    select-text="Pilih"
                    :format="'dd MMMM yyyy, HH:mm'"
                    :format-locale="id"
                    @update:model-value="checkStatus()"
                    required
                  ></VueDatePicker>
                </div>
              </div>
              <div class="row mt-4">
                <div
                  class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-center"
                >
                  <argon-button
                    type="button"
                    :onclick="() => $router.push({ name: 'Halaman' })"
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    type="submit"
                    form="form-edit-halaman"
                    class="mb-0 me-lg-2"
                    color="primary"
                    variant="gradient"
                    size="sm"
                    >Simpan Halaman</argon-button
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
import { id } from "date-fns/locale";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$halaman from "@/store/halaman";

export default {
  name: "EditHalaman",
  components: {
    HeaderProfileCard,
    ArgonButton,
    VueDatePicker,
  },
  data() {
    return {
      idTemaHalaman: parseInt(this.$route.params.id_tema_halaman),
      statusDate: false,
      namaHalaman: "",
      namaTema: "",
      body: {
        tgl_mulai: "",
        tgl_akhir: "",
        status: "",
      },
      choicesHalaman: undefined,
      choicesStatus: undefined,
      choicesOptionTgl: undefined,
      id,
      optionTgl: "0",
    };
  },
  computed: {
    ...mapState(d$halaman, ["g$halaman"]),
  },
  async created() {
    await this.getInitData();

    this.choicesOptionTgl = this.getChoices("choices-option-tgl");
    if (!(this.body.tgl_akhir && this.body.tgl_mulai))
      this.choicesStatus = this.getChoices("choices-status");
  },
  beforeUnmount() {
    if (this.choicesOptionTgl) this.choicesOptionTgl.destroy();
    if (this.choicesStatus) this.choicesStatus.destroy();
  },
  methods: {
    ...mapActions(d$halaman, ["a$getHalaman", "a$editHalaman"]),

    async editHalaman() {
      this.showSwal("loading");

      // validation
      if (this.body.status == "" || !this.body.status) {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      try {
        this.body.status = parseInt(this.body.status);

        if (this.optionTgl == "0") {
          this.body.tgl_mulai = null;
          this.body.tgl_akhir = null;
        }

        await this.a$editHalaman(this.idTemaHalaman, this.body);
        this.$router.push({ name: "Halaman" });
        this.showSwal("success-message", "Data halaman berhasil disimpan!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal disimpan! " + msg);
      }
    },

    async getInitData() {
      this.showSwal("loading");

      try {
        await this.a$getHalaman(this.idTemaHalaman);

        this.namaHalaman = this.g$halaman.nama;
        this.namaTema = this.g$halaman.nama_tema;
        this.body.status = this.g$halaman.status ? "1" : "0";
        this.body.tgl_mulai = this.g$halaman.tgl_mulai;
        this.body.tgl_akhir = this.g$halaman.tgl_akhir;

        if (this.body.tgl_mulai && this.body.tgl_akhir) {
          this.optionTgl = "1";
          this.checkStatus();
        }

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

    checkStatus() {
      if (this.choicesStatus) this.choicesStatus.destroy();
      const date = new Date();
      const tgl_akhir = new Date(this.body.tgl_akhir);
      const tgl_mulai = new Date(this.body.tgl_mulai);

      if (tgl_mulai <= date && date <= tgl_akhir) {
        this.body.status = "1";
        this.statusDate = false;
      } else {
        this.body.status = "0";
        this.statusDate = true;
      }

      setTimeout(() => {
        this.choicesStatus = this.getChoices("choices-status");
      }, 100);
    },

    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
          shouldSort: false,
        });
      }
    },

    removeAllOptions(id) {
      var element = document.getElementById(id);
      if (element) {
        while (element.options.length > 0) {
          element.remove(0);
        }
      }
    },

    showSwal(type, text, toastText, id_gelombang) {
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
        }).then((result) => {
          if (result.isConfirmed) {
            this.switchGelombang(id_gelombang);
            this.$swal({
              toast: true,
              position: "top-end",
              title: toastText,
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
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
