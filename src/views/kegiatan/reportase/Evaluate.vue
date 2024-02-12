<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <div class="bg-white pb-2 card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <h5 class="mb-2">Evaluasi Reportase</h5>
            </div>
          </div>
          <div class="ms-2 pt-1 ps-3 card-body">
            <form
              role="form"
              id="form-edit-reportase"
              @submit.prevent="evalReportase()"
            >
              <div class="mt-2 row">
                <div class="col-6">
                  <label>Nama Mahasiswa</label>
                  <input
                    id="nama-mhs"
                    name="nama-mhs"
                    class="form-control"
                    type="text"
                    :value="data.nama_mhs"
                    readonly
                  />
                </div>
                <div class="col-6">
                  <label>NIM</label>
                  <input
                    id="nim-mhs"
                    name="nim-mhs"
                    class="form-control"
                    type="text"
                    :value="data.nim"
                    readonly
                  />
                </div>
              </div>
              <div class="mt-3 row">
                <div class="col-6">
                  <label>Fakultas</label>
                  <input
                    class="form-control"
                    type="text"
                    :value="data.fakultas"
                    readonly
                  />
                </div>
                <div class="col-6">
                  <label>Prodi</label>
                  <input
                    class="form-control"
                    type="text"
                    :value="data.prodi"
                    readonly
                  />
                </div>
              </div>
              <div class="mt-3 row">
                <div class="col-4">
                  <label>Tema</label>
                  <input
                    class="form-control"
                    type="text"
                    :value="data.tema"
                    readonly
                  />
                </div>
                <div class="col-4">
                  <label>Kabupaten</label>
                  <input
                    class="form-control"
                    type="text"
                    :value="data.kabupaten"
                    readonly
                  />
                </div>
                <div class="col-4">
                  <label>Kecamatan</label>
                  <input
                    class="form-control"
                    type="text"
                    :value="data.kecamatan"
                    readonly
                  />
                </div>
              </div>
              <div class="mt-3 row">
                <div class="col-12">
                  <label>Judul Reportase</label>
                  <input
                    id="judul"
                    name="judul"
                    class="form-control"
                    type="text"
                    placeholder="Judul reportase"
                    :value="data.judul"
                    readonly
                  />
                </div>
              </div>
              <div class="mt-3 row">
                <div class="col-6">
                  <label>Kategori Program Kerja</label>
                  <select
                    class="form-select"
                    name="choices-kategori"
                    id="choices-kategori"
                    v-model="data.kategori"
                    disabled
                  >
                    <option value="1">Monodisiplin</option>
                    <option value="2">Multidisiplin</option>
                  </select>
                </div>
                <div class="col-6">
                  <label>Tanggal Unggah</label>
                  <input
                    class="form-control"
                    type="text"
                    :value="
                      moment(data.tgl).format('dddd, DD MMMM YYYY HH:mm:ss')
                    "
                    readonly
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label>Link Publikasi</label>
                  <div class="ms-2 text-sm">
                    <a :href="data.link_publikasi" target="_blank">
                      <i>
                        {{ data.link_publikasi }}
                      </i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label>Isi Reportase</label>
                  <quill-editor
                    class="bg-white p-2"
                    :options="options"
                    id="isi-editor"
                    style="height: 200px"
                    v-model:content="data.isi"
                    contentType="html"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label>Komentar</label>
                  <quill-editor
                    id="latar-belakang-editor"
                    style="height: 180px"
                    v-model:content="body.komentar"
                    contentType="html"
                    toolbar="essential"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-12 mt-3 d-flex justify-content-end">
                  <argon-button
                    type="button"
                    :onclick="() => $router.push({ name: 'Reportase' })"
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    class="mb-0 me-lg-2"
                    form="form-edit-reportase"
                    color="primary"
                    variant="gradient"
                    size="sm"
                    >Simpan Evaluasi</argon-button
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
import { QuillEditor } from "@vueup/vue-quill";
import Choices from "choices.js";
import moment from "moment";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$reportase from "@/store/reportase";

export default {
  name: "EditReportase",
  components: {
    HeaderProfileCard,
    ArgonButton,
    QuillEditor,
  },
  data() {
    return {
      id_reportase: parseInt(this.$route.params.id_reportase),
      quill: undefined,
      data: {
        nama_mhs: "",
        nim: "",
        fakultas: "",
        prodi: "",
        tema: "",
        kecamatan: "",
        kabupaten: "",
        judul: "",
        kategori: "",
        link_publikasi: "",
        isi: "",
        tgl: "",
      },
      body: {
        id_reportase: parseInt(this.$route.params.id_reportase),
        komentar: "",
      },
      options: {
        modules: {
          toolbar: false,
        },
        readOnly: true,
      },
      moment,
    };
  },
  computed: {
    ...mapState(d$reportase, ["g$reportase"]),
  },
  async created() {
    moment.locale("id");
    await this.getReportase();
  },
  methods: {
    ...mapActions(d$reportase, ["a$evalReportase", "a$getReportase"]),

    async evalReportase() {
      this.showSwal("loading");

      try {
        if (this.isQuillEmpty(this.body.komentar)) {
          this.showSwal(
            "warning-message",
            "Data belum lengkap, lengkapi semua data terlebih dahulu!"
          );
          return;
        }

        await this.a$evalReportase(this.body);
        this.showSwal(
          "success-message",
          "Evaluasi reportase berhasil disimpan"
        );
        this.$router.push({ name: "Reportase" });
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal disimpan! " + msg);
      }
    },

    async getReportase() {
      this.showSwal("loading");

      try {
        await this.a$getReportase(this.id_reportase);
        this.data.nama_mhs = this.g$reportase.mahasiswa.nama;
        this.data.nim = this.g$reportase.mahasiswa.nim;
        this.data.prodi = this.g$reportase.prodi;
        this.data.fakultas = this.g$reportase.fakultas;
        this.data.tema = this.g$reportase.tema;
        this.data.kecamatan = this.g$reportase.kecamatan;
        this.data.kabupaten = this.g$reportase.kabupaten;
        this.data.judul = this.g$reportase.judul;
        this.data.kategori = this.g$reportase.kategori;
        this.data.link_publikasi = this.g$reportase.link_publikasi;
        this.data.isi = this.g$reportase.isi;
        this.data.tgl = this.g$reportase.created_at;
        this.body.komentar = this.g$reportase.komentar;

        document.getElementById("isi-editor").innerHTML = this.data.isi;
        this.setChoices(this.choicesKategori);
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

    isQuillEmpty(input) {
      if (input == "" || input == "<p><br></p>") return true;
      else return false;
    },

    setChoices(choices) {
      if (choices) {
        choices.clearChoices();
        choices.removeActiveItems();

        let option = {
          value: "",
          label: "-- Pilih kategori --",
          selected: true,
          disabled: true,
        };

        if (this.body.kategori === "") option.selected = true;
        else option.selected = false;

        choices.setChoices([
          option,
          {
            value: "1",
            label: "Monodisiplin",
            selected: this.body.kategori === "1",
            disabled: false,
          },
          {
            value: "2",
            label: "Multidisiplin",
            selected: this.body.kategori === "2",
            disabled: false,
          },
        ]);
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
