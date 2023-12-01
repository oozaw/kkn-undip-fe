<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard> </HeaderProfileCard>
        <div class="card mt-4">
          <div class="card-header">
            <h5>Tambah Kegiatan Baru</h5>
          </div>
          <div class="card-body pt-0">
            <form
              role="form"
              id="form-add-kegiatan"
              @submit.prevent="addEvent()"
            >
              <div class="row">
                <div class="col-12 col-sm-6">
                  <label class="form-label">Judul</label>
                  <input
                    class="form-control"
                    id="judul"
                    name="judul"
                    type="text"
                    placeholder="Masukkan judul kegiatan"
                    required
                    v-model="body.judul"
                  />
                </div>
                <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                  <label class="form-label">Tempat Pelaksanaan</label>
                  <input
                    class="form-control"
                    id="tempat"
                    name="tempat"
                    type="text"
                    placeholder="Masukkan tempat pelaksanaan kegiatan"
                    required
                    v-model="body.tempat"
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Tanggal Mulai</label>
                  <VueDatePicker
                    id="tgl_mulai"
                    name="tgl_mulai"
                    v-model="body.tgl_mulai"
                    placeholder="Pilih tanggal awal kegiatan"
                    locale="id"
                    cancel-text="Batal"
                    select-text="Pilih"
                    :format="'dd MMMM yyyy'"
                    :enable-time-picker="false"
                    :format-locale="id"
                    required
                  ></VueDatePicker>
                </div>
                <div class="col-sm-6 col-12">
                  <label class="form-label">Tanggal Berakhir</label>
                  <VueDatePicker
                    id="tgl_akhir"
                    name="tgl_akhir"
                    v-model="body.tgl_akhir"
                    placeholder="Pilih tanggal akhir kegiatan"
                    locale="id"
                    cancel-text="Batal"
                    select-text="Pilih"
                    :format="'dd MMMM yyyy'"
                    :enable-time-picker="false"
                    :format-locale="id"
                    :min-date="body.tgl_mulai"
                    required
                  ></VueDatePicker>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label class="form-label">Keterangan</label>
                  <textarea
                    class="form-control"
                    name="keterangan"
                    id="keterangan"
                    cols="30"
                    rows="4"
                    placeholder="Masukkan keterangan kegiatan"
                    v-model="body.keterangan"
                  ></textarea>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label class="form-label">Ditujukan Untuk</label>
                  <div class="form-check ms-1">
                    <input
                      class="form-check-input all"
                      type="checkbox"
                      name="all"
                      id="all"
                      value="all"
                      @change="checkAllOrNot"
                    />
                    <label class="form-check-label" for="all"
                      >Semua Pengguna</label
                    >
                  </div>
                  <div class="form-check ms-1">
                    <input
                      class="form-check-input peruntukan"
                      type="checkbox"
                      name="peruntukan"
                      id="dosen"
                      value="DOSEN"
                      @change="checkAllOnAnother()"
                    />
                    <label class="form-check-label" for="dosen">Dosen</label>
                  </div>
                  <div class="form-check ms-1">
                    <input
                      class="form-check-input peruntukan"
                      type="checkbox"
                      name="peruntukan"
                      id="mahasiswa"
                      value="MAHASISWA"
                      @change="checkAllOnAnother()"
                    />
                    <label class="form-check-label" for="mahasiswa"
                      >Mahasiswa</label
                    >
                  </div>
                  <div class="form-check ms-1">
                    <input
                      class="form-check-input peruntukan"
                      type="checkbox"
                      name="peruntukan"
                      id="bappeda"
                      value="BAPPEDA"
                      @change="checkAllOnAnother()"
                    />
                    <label class="form-check-label" for="bappeda"
                      >BAPPEDA</label
                    >
                  </div>
                </div>
              </div>
              <div class="row mt-4">
                <div
                  class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-center"
                >
                  <argon-button
                    type="button"
                    :onclick="() => $router.push({ name: 'Kalender' })"
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    type="submit"
                    form="form-add-kegiatan"
                    class="mb-0 me-lg-2"
                    color="success"
                    variant="gradient"
                    size="sm"
                    >Tambah Kegiatan</argon-button
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
import d$event from "@/store/event";
import { mapActions } from "pinia";

export default {
  name: "TambahKalender",
  components: {
    HeaderProfileCard,
    VueDatePicker,
    ArgonButton,
  },
  data() {
    return {
      body: {
        judul: "",
        tgl_mulai: "",
        tgl_akhir: "",
        keterangan: "",
        tempat: "",
        peruntukan: "",
      },
      id,
    };
  },
  methods: {
    ...mapActions(d$event, ["a$addEvent"]),

    async addEvent() {
      this.showSwal("loading");

      // validation peruntukan
      if (!this.checkValidationCheckbox()) {
        this.showSwal(
          "warning-message",
          "Pilih peruntukan kegiatan terlebih dahulu"
        );
        return;
      }

      this.body.peruntukan = this.getValuePeruntukan();

      // validation
      if (
        this.body.judul == "" ||
        this.body.tgl_mulai == "" ||
        this.body.tgl_akhir == "" ||
        this.body.tempat == "" ||
        this.body.peruntukan == ""
      ) {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu");
        return;
      }

      try {
        await this.a$addEvent(this.body);
        this.showSwal("success-message", "Data kegiatan berhasil ditambahkan!");
        this.$router.push({ name: "Kalender" });
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal ditambahkan! " + msg);
      }
    },

    getValuePeruntukan() {
      var checkboxes = document.getElementsByName("peruntukan");
      var result = "";
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          result += checkboxes[i].value + ", ";
        }
      }

      return result;
    },

    checkAllOrNot() {
      let data = document.querySelector(".form-check-input").checked;

      let dosen = document.getElementById("dosen");
      let mahasiswa = document.getElementById("mahasiswa");
      let bappeda = document.getElementById("bappeda");

      if (data) {
        dosen.disabled = true;
        mahasiswa.disabled = true;
        bappeda.disabled = true;

        dosen.checked = true;
        mahasiswa.checked = true;
        bappeda.checked = true;
      } else {
        dosen.disabled = false;
        mahasiswa.disabled = false;
        bappeda.disabled = false;

        dosen.checked = false;
        mahasiswa.checked = false;
        bappeda.checked = false;
      }
    },

    checkAllOnAnother() {
      let dosen = document.getElementById("dosen");
      let mahasiswa = document.getElementById("mahasiswa");
      let bappeda = document.getElementById("bappeda");

      if (dosen.checked && mahasiswa.checked && bappeda.checked) {
        document.getElementById("all").checked = true;

        dosen.disabled = true;
        mahasiswa.disabled = true;
        bappeda.disabled = true;
      } else {
        document.getElementById("all").checked = false;
      }
    },

    checkValidationCheckbox() {
      let allUserStatus = document.querySelector(".form-check-input").checked;

      let isDosenSelected = document.getElementById("dosen").checked;
      let isMahasiswaSelected = document.getElementById("mahasiswa").checked;
      let isBappedaSelected = document.getElementById("bappeda").checked;

      if (
        !allUserStatus &&
        !isDosenSelected &&
        !isMahasiswaSelected &&
        !isBappedaSelected
      ) {
        return false;
      } else {
        return true;
      }
    },

    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
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

    showLoading(isLoading) {
      if (isLoading && !this.loader) {
        this.loader = this.$loading.show();
      } else if (!isLoading && this.loader) {
        setTimeout(() => {
          this.loader.hide();
          this.loader = undefined;
        }, 400);
      }
    },

    showSwal(type, text, toastText, id_event) {
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
            this.deleteDosen(id_event);
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
