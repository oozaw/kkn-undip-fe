<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <div class="bg-white card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Ekspor Area</h5>
                <p class="text-sm mb-0">
                  Ekspor data aplikasi ke dalam file xlsx
                </p>
              </div>
            </div>
          </div>
          <div class="pt-3 pb-4 card-body">
            <div class="row">
              <div class="col-12 col-sm-6">
                <label>Tema</label>
                <select
                  id="choices-tema"
                  class="form-control"
                  name="choices-tema"
                  v-model="id_tema"
                  @change="checkTema()"
                >
                  <option value="0" disabled>-- Pilih tema --</option>
                  <option
                    :value="tema.id_tema"
                    v-for="tema in g$listTemaActive"
                    :key="tema.id_tema"
                  >
                    {{ tema.nama }}
                  </option>
                </select>
              </div>
              <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                <label>Data</label>
                <select
                  id="choices-data"
                  class="form-control"
                  name="choices-data"
                  @change="checkFilterJenis(), disableButtonToggle()"
                  v-model="data"
                >
                  <option value="" disabled selected>-- Pilih data --</option>
                  <option value="mahasiswa-terdaftar">
                    Mahasiswa Terdaftar
                  </option>
                  <option value="dosen-terdaftar">Dosen Terdaftar</option>
                  <option value="nilai">Nilai</option>
                  <!-- <option value="lokasi">Lokasi</option>
                  <option value="laporan">Laporan</option>
                  <option value="reportase">Reportase</option> -->
                </select>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12 col-sm-6" v-if="filterData == '1'">
                <label>Lokasi</label>
                <select
                  id="choices-lokasi"
                  class="form-control"
                  name="choices-lokasi"
                  v-model="lokasi"
                  @change="disableButtonToggle()"
                >
                  <option value="0" disabled>-- Pilih lokasi --</option>
                  <option
                    :value="kec.id_kecamatan"
                    v-for="kec in g$listKecamatanAccepted"
                    :key="kec.id_kecamatan"
                  >
                    {{ kec.nama }}
                  </option>
                </select>
              </div>
              <div
                class="col-12 mt-3 mt-sm-0 d-flex justify-content-end align-items-end"
                :class="filterData == '1' ? 'col-sm-6' : 'pt-4'"
              >
                <div>
                  <argon-button
                    type="button"
                    :onclick="() => $router.go(-1)"
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    type="submit"
                    id="submit-button"
                    form="form-add-pengumuman"
                    class="mb-0"
                    color="success"
                    variant="gradient"
                    size="sm"
                    @click="exportToExcel()"
                    disabled
                    >Export Data</argon-button
                  >
                  <a href="#" hidden id="file-placeholder"></a>
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
import { ref } from "vue";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$wilayah from "@/store/wilayah";
import d$tema from "@/store/tema";
import d$export from "@/store/export";

export default {
  name: "Export",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    const filterData = ref("");

    return {
      isLoading: true,
      id_tema: 0,
      data: "",
      lokasi: 0,
      filterData,
      choicesData: undefined,
      choicesLokasi: undefined,
      choicesTema: undefined,
    };
  },
  computed: {
    ...mapState(d$wilayah, ["g$listKecamatanAccepted"]),
    ...mapState(d$tema, ["g$listTemaActive"]),
    ...mapState(d$export, ["g$exportData"]),
  },
  async created() {
    await this.getInitData();

    this.choicesTema = this.getChoices("choices-tema");
    this.choicesData = this.getChoices("choices-data").disable();
  },
  beforeUnmount() {
    if (this.choicesData) this.choicesData.destroy();
    if (this.choicesLokasi) this.choicesLokasi.destroy();
    if (this.choicesTema) this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$wilayah, ["a$listKabupaten"]),
    ...mapActions(d$tema, ["a$listTema"]),
    ...mapActions(d$export, [
      "a$excelPendaftaranMhsKecamatan",
      "a$excelPendaftaranDosenTema",
      "a$excelNilaiMhsKecamatan",
    ]),

    async getInitData() {
      try {
        await this.a$listTema();
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

    async exportToExcel() {
      this.showSwal("loading");

      const button = document.getElementById("file-placeholder");

      try {
        let namaTema =
          document.getElementById("choices-tema").selectedOptions[0].innerHTML;

        namaTema = namaTema.replace(/\//g, "-");

        let namaFile = "";

        if (
          this.data === "mahasiswa-terdaftar" ||
          this.data === "nilai" ||
          this.data === "laporan" ||
          this.data === "reportase"
        ) {
          const kecamatan = this.g$listKecamatanAccepted.find(
            (kecamatan) => kecamatan.id_kecamatan == this.lokasi
          );

          const namaKecamatan = kecamatan.nama;
          const namaKabupaten = kecamatan.nama_kabupaten;

          if (this.data === "mahasiswa-terdaftar") {
            await this.a$excelPendaftaranMhsKecamatan(this.lokasi);
            namaFile = `Data Pendaftaran Mahasiswa Kec. ${namaKecamatan}, Kab. ${namaKabupaten} - ${namaTema}.xlsx`;
          } else if (this.data === "nilai") {
            await this.a$excelNilaiMhsKecamatan(this.lokasi);
            namaFile = `Data Nilai Mahasiswa Kec. ${namaKecamatan}, Kab. ${namaKabupaten} - ${namaTema}.xlsx`;
          } else if (this.data === "laporan") {
            // await this.a$excelLaporanMhsKecamatan(this.lokasi);
            namaFile = `Data Laporan Mahasiswa Kec. ${namaKecamatan}, Kab. ${namaKabupaten} - ${namaTema}.xlsx`;
          } else if (this.data === "reportase") {
            // await this.a$excelReportaseMhsKecamatan(this.lokasi);
            namaFile = `Data Reportase Mahasiswa Kec. ${namaKecamatan}, Kab. ${namaKabupaten} - ${namaTema}.xlsx`;
          }
        } else if (this.data === "dosen-terdaftar") {
          await this.a$excelPendaftaranDosenTema(this.id_tema);
          namaFile = `Data Pendaftaran Dosen - ${namaTema}.xlsx`;
        }

        const fileURL = window.URL.createObjectURL(
          new Blob([this.g$exportData], { type: "application/xlsx" })
        );

        button.href = fileURL;
        button.download = namaFile;

        button.click();

        this.showSwal("close");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diunduh! " + msg);
      }
    },

    disableButtonToggle() {
      const button = document.getElementById("submit-button");

      if (
        (this.data === "mahasiswa-terdaftar" ||
          this.data === "nilai" ||
          this.data === "laporan" ||
          this.data === "reportase") &&
        this.lokasi != 0
      ) {
        button.removeAttribute("disabled");
      } else if (this.data === "dosen-terdaftar") {
        button.removeAttribute("disabled");
      } else {
        button.setAttribute("disabled", true);
      }
    },

    async getLokasi() {
      try {
        await this.a$listKabupaten(this.id_tema);
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

    checkTema() {
      if (this.id_tema != 0) {
        this.choicesData.enable();
      } else {
        this.choicesData.disable();
      }
    },

    async checkFilterJenis() {
      const data = document.getElementById("choices-data").value;

      if (
        data === "mahasiswa-terdaftar" ||
        data === "nilai" ||
        data === "laporan" ||
        data === "reportase"
      ) {
        this.filterData = "1";
        await this.getLokasi();
        setTimeout(() => {
          if (this.choicesLokasi) this.choicesLokasi.destroy();
          this.choicesLokasi = this.getChoices("choices-lokasi", true);
        }, 1);
      } else if (data === "dosen-terdaftar") {
        this.filterData = "2";
      }
    },

    setChoices(choices, option) {
      if (choices) {
        choices.clearChoices();
        choices.removeActiveItems();

        let newOption = [
          {
            value: "",
            label: "-- Pilih lokasi --",
            selected: true,
            disabled: true,
          },
        ];

        option.forEach((item) => {
          newOption.push({
            value: Object.values(item)[0],
            label: Object.values(item)[3],
            selected: false,
          });
        });
        choices.setChoices(newOption);
      }
    },

    getChoices(id, isSort = false) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: isSort,
          allowHTML: true,
          shouldSort: isSort,
        });
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
