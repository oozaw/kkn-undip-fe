<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              type="button"
              :onclick="() => $router.push({ name: 'Gelombang' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-gelombang"
              class="mb-0 me-lg-2"
              color="primary"
              variant="gradient"
              size="sm"
              >Simpan Gelombang</argon-button
            >
          </template>
        </HeaderProfileCard>
        <div class="card mt-4">
          <div class="card-header pb-0">
            <h5>Edit Gelombang</h5>
          </div>
          <form
            role="form"
            id="form-gelombang"
            @submit.prevent="editGelombang()"
          >
            <div class="card-body pt-0">
              <div class="row mt-2">
                <div class="col-12">
                  <label class="form-label">Nama</label>
                  <input
                    class="form-control"
                    id="nama"
                    name="nama"
                    type="text"
                    placeholder="Masukkan nama gelombang"
                    v-model="body.nama"
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
              <div class="row mt-3">
                <div class="col-sm-6 col-12">
                  <label for="choices-halaman" class="form-label"
                    >Halaman</label
                  >
                  <select
                    id="choices-halaman"
                    class="form-control"
                    name="choices-halaman"
                    v-model="body.id_tema_halaman"
                  >
                    <!-- <option
                      v-if="hal in g$listHalaman"
                      :key="hal.id_halaman"
                      :value="hal.id_halaman"
                    >
                      {{ hal.nama }}
                    </option> -->
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
              <div class="row mt-4">
                <div
                  class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-center"
                >
                  <argon-button
                    type="button"
                    :onclick="() => $router.push({ name: 'Gelombang' })"
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    type="submit"
                    form="form-gelombang"
                    class="mb-0 me-lg-2"
                    color="primary"
                    variant="gradient"
                    size="sm"
                    >Simpan Gelombang</argon-button
                  >
                </div>
              </div>
            </div>
          </form>
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
import d$gelombang from "@/store/gelombang";

export default {
  name: "EditGelombang",
  components: {
    HeaderProfileCard,
    VueDatePicker,
    ArgonButton,
  },
  data() {
    return {
      id_gelombang: parseInt(this.$route.params.id_gelombang),
      id_tema: parseInt(this.$route.params.id_tema),
      statusDate: false,
      body: {
        nama: "",
        id_tema_halaman: "",
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
    ...mapState(d$halaman, ["g$listHalaman"]),
    ...mapState(d$gelombang, ["g$gelombang"]),
  },
  async created() {
    await this.getInitData();

    this.choicesOptionTgl = this.getChoices("choices-option-tgl");
    if (!(this.body.tgl_akhir && this.body.tgl_mulai))
      this.choicesStatus = this.getChoices("choices-status");
  },
  mounted() {
    this.choicesHalaman = this.getChoices("choices-halaman");
  },
  beforeUnmount() {
    if (this.choicesOptionTgl) this.choicesOptionTgl.destroy();
    if (this.choicesHalaman) this.choicesHalaman.destroy();
    if (this.choicesStatus) this.choicesStatus.destroy();
  },
  methods: {
    ...mapActions(d$halaman, ["a$listHalaman"]),
    ...mapActions(d$gelombang, ["a$getGelombang", "a$editGelombang"]),

    async editGelombang() {
      this.showSwal("loading");

      // validation
      if (
        this.body.nama == "" ||
        !this.body.nama ||
        this.body.id_tema_halaman == "" ||
        !this.body.id_tema_halaman ||
        this.body.status == "" ||
        !this.body.status
      ) {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      try {
        this.body.id_tema_halaman = parseInt(this.body.id_tema_halaman);
        this.body.status = parseInt(this.body.status);

        if (this.optionTgl == "0") {
          this.body.tgl_mulai = null;
          this.body.tgl_akhir = null;
        }

        await this.a$editGelombang(this.id_gelombang, this.body);
        this.$router.push({ name: "Gelombang" });
        this.showSwal("success-message", "Gelombang berhasil disimpan!");
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
        await this.a$listHalaman(this.id_tema);
        await this.a$getGelombang(this.id_gelombang);

        this.body.nama = this.g$gelombang.nama;
        this.body.id_tema_halaman = this.g$gelombang.id_tema_halaman;
        this.body.status = this.g$gelombang.status ? "1" : "0";
        this.body.tgl_mulai = this.g$gelombang.tgl_mulai;
        this.body.tgl_akhir = this.g$gelombang.tgl_akhir;

        if (this.body.tgl_mulai && this.body.tgl_akhir) {
          this.optionTgl = "1";
          this.checkStatus();
        }

        this.setChoices(this.choicesHalaman, this.g$listHalaman);
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

    setChoices(choices, option) {
      if (choices) {
        choices.clearChoices();
        let newOption = [];
        option.forEach((item) => {
          newOption.push({
            value: Object.values(item)[0],
            label: item.halaman.nama,
            selected: Object.values(item)[0] == this.body.id_tema_halaman,
          });
        });
        choices.setChoices(newOption);
      }
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
