<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard>
          <template #button>
            <argon-button
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
              <div class="row mt-4">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Tanggal Mulai</label>
                  <flat-pickr
                    id="tanggal-mulai"
                    name="tanggal-mulai"
                    v-model="body.tgl_mulai"
                    class="form-control datetimepicker"
                    placeholder="Pilih tanggal mulai"
                    :config="config"
                  ></flat-pickr>
                </div>
                <div class="col-sm-6 col-12">
                  <label class="form-label">Tanggal Berakhir</label>
                  <flat-pickr
                    id="tanggal-berakhir"
                    name="tanggal-berakhir"
                    v-model="body.tgl_akhir"
                    class="form-control datetimepicker"
                    placeholder="Pilih tanggal berakhir"
                    :config="config"
                  ></flat-pickr>
                </div>
              </div>
              <div class="row mt-4">
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
                <div class="col-sm-6 col-12">
                  <label for="choices-status" class="form-label">Status</label>
                  <select
                    id="choices-status"
                    class="form-control"
                    name="choices-status"
                    v-model="body.status"
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
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/material_blue.css";
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
    flatPickr,
    ArgonButton,
  },
  data() {
    return {
      id_gelombang: parseInt(this.$route.params.id_gelombang),
      id_tema: parseInt(this.$route.params.id_tema),
      body: {
        nama: "",
        id_tema_halaman: "",
        tgl_mulai: "",
        tgl_akhir: "",
        status: "",
      },
      choicesHalaman: undefined,
      choicesStatus: undefined,
      config: {
        allowInput: true,
        dateFormat: "Z",
        enableTime: true,
      },
    };
  },
  computed: {
    ...mapState(d$halaman, ["g$listHalaman"]),
    ...mapState(d$gelombang, ["g$gelombang"]),
  },
  async created() {
    await this.getInitData();

    this.choicesStatus = this.getChoices("choices-status");
  },
  mounted() {
    this.choicesHalaman = this.getChoices("choices-halaman");
  },
  beforeUnmount() {
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
        await this.a$editGelombang(this.id_gelombang, this.body);
        this.$router.push({ name: "Gelombang" });
        this.showSwal("success-message", "Gelombang berhasil disimpan!");
      } catch (error) {
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat menyimpan gelombang! " + error.error
        );
        console.log(error);
      }
    },

    async getInitData() {
      try {
        await this.a$listHalaman(this.id_tema);
        await this.a$getGelombang(this.id_gelombang);

        this.body.nama = this.g$gelombang.nama;
        this.body.id_tema_halaman = this.g$gelombang.id_tema_halaman;
        this.body.status = this.g$gelombang.status ? "1" : "0";
        this.body.tgl_mulai = this.g$gelombang.tgl_mulai;
        this.body.tgl_akhir = this.g$gelombang.tgl_akhir;

        this.setChoices(this.choicesHalaman, this.g$listHalaman);
      } catch (error) {
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat memuat data! " + error
        );
        console.log(error);
      }
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
