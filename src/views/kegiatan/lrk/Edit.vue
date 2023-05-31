<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card>
          <template #button>
            <argon-button
              :onclick="() => $router.push({ name: 'LRK' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-edit-lrk"
              class="mb-0 me-lg-2"
              color="success"
              variant="gradient"
              size="sm"
              >Simpan LRK</argon-button
            >
          </template>
        </header-profile-card>
        <div class="bg-white pb-2 card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <h5 class="mb-2">Edit LRK</h5>
            </div>
          </div>
          <form
            class="was-validated"
            role="form"
            id="form-edit-lrk"
            enctype="multipart/form-data"
            @submit.prevent="editLRK()"
          >
            <div class="ms-2 pt-1 ps-3 card-body">
              <div class="mt-2 row">
                <div class="col-12">
                  <label>Judul Program Kerja</label>
                  <input
                    class="form-control"
                    type="text"
                    required
                    v-model="body.judul"
                  />
                  <div class="invalid-feedback">Judul tidak boleh kosong</div>
                </div>
              </div>
              <div class="mt-3 row">
                <div class="col-12">
                  <label>Kategori Program Kerja</label>
                  <select
                    name="choices-kategori"
                    id="choices-kategori"
                    v-model="body.kategori"
                  >
                    <option value="mono">Monodisiplin</option>
                    <option value="multi">Multidisiplin</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="mt-4">1. Latar Belakang</label>
                  <quill-editor
                    id="latar-belakang-editor"
                    style="height: 180px"
                    v-model:content="body.latar_belakang"
                    contentType="html"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="pt-4">2. Potensi atau Masalah</label>
                  <quill-editor
                    id="potensi-editor"
                    style="height: 180px"
                    v-model:content="body.potensi"
                    contentType="html"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="pt-4">3. Usulan Program</label>
                  <quill-editor
                    id="usulan-editor"
                    style="height: 180px"
                    v-model:content="body.program"
                    contentType="html"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="pt-4">4. Sasaran Program</label>
                  <quill-editor
                    id="sasaran-editor"
                    style="height: 180px"
                    v-model:content="body.sasaran"
                    contentType="html"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="pt-4">5. Rencana Pelaksanaan</label>
                  <input
                    class="form-control"
                    type="file"
                    name="file-rencana-pelaksanaan"
                    id="file-rencana-pelaksanaan"
                    required
                  />
                  <div class="invalid-feedback">
                    Pilih dan unggah file rencana pelaksaan program
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label>6. Metode IPTEKS yang Digunakan</label>
                  <quill-editor
                    id="metode-editor"
                    style="height: 180px"
                    v-model:content="body.metode"
                    contentType="html"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="pt-4">7. Luaran Program</label>
                  <quill-editor
                    id="output-editor"
                    style="height: 180px"
                    v-model:content="body.luaran"
                    contentType="html"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="pt-4">8. Dokumentasi</label>
                  <p class="text-xs form-text text-muted ms-1 d-inline">
                    (*.rar)
                  </p>
                  <input
                    class="form-control"
                    type="file"
                    name="file-dokumentasi"
                    id="file-dokumentasi"
                  />
                </div>
              </div>
              <div class="row mt-4">
                <div
                  class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-end"
                >
                  <argon-button
                    :onclick="() => $router.push({ name: 'LRK' })"
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    type="submit"
                    form="form-edit-lrk"
                    class="mb-0 me-lg-2"
                    color="success"
                    variant="gradient"
                    size="sm"
                    >Simpan LRK</argon-button
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
import { QuillEditor } from "@vueup/vue-quill";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import d$laporan from "@/store/laporan";
import d$auth from "@/store/auth";
import { mapActions, mapState } from "pinia";

export default {
  name: "EditLRK",
  components: {
    HeaderProfileCard,
    ArgonButton,
    QuillEditor,
  },
  data() {
    return {
      body: {
        id_tema: "",
        judul: "JUDULLLL",
        kategori: "multi",
        latar_belakang: "LABAAAKANG",
        potensi: "",
        program: "",
        file: "",
        sasaran: "",
        metode: "",
        luaran: "",
        dokumentasi: "",
      },
    };
  },
  computed: {
    ...mapState(d$laporan, ["g$getLaporan"]),
    ...mapState(d$auth, ["g$infoUser"]),
  },
  async created() {
    await this.getLaporan();
  },
  mounted() {
    this.choicesKategori = this.getChoices("choices-kategori");
  },
  methods: {
    ...mapActions(d$laporan, ["a$addLRK", "a$getLaporan", "a$editLRK"]),

    async editLRK() {
      this.showSwal("loading");

      if (
        this.body.judul == "" ||
        this.body.kategori == "" ||
        this.isQuillEmpty(this.body.latar_belakang) ||
        this.isQuillEmpty(this.body.potensi) ||
        this.isQuillEmpty(this.body.program) ||
        this.isQuillEmpty(this.body.sasaran) ||
        this.isQuillEmpty(this.body.metode) ||
        this.isQuillEmpty(this.body.luaran)
      ) {
        this.showSwal(
          "warning-message",
          "Data LRK belum lengkap, lengkapi data terlebih dahulu!"
        );
        return;
      }

      try {
        let data = {
          id_tema: parseInt(this.g$infoUser.id_tema),
          id_laporan: parseInt(this.$route.params.id_laporan),
          potensi: this.body.potensi,
          program: this.body.program,
          sasaran: this.body.sasaran,
          metode: this.body.metode,
          luaran: this.body.luaran,
        };

        console.log(data);
        await this.a$editLRK(data);
        this.$router.push({ name: "LRK" });
        this.showSwal("success-message", "Data LRK berhasil disimpan!");
      } catch (error) {
        this.showSwal("failed-message", "Data LRK gagal disimpan!");
        console.log(error.error);
      }
    },

    async getLaporan() {
      this.showSwal("loading");

      try {
        await this.a$getLaporan(parseInt(this.$route.params.id_laporan));
        // this.body.latar_belakang = this.g$getLaporan.latar_belakang
        console.log(this.g$getLaporan);
        this.body.potensi = this.g$getLaporan.potensi;
        this.body.program = this.g$getLaporan.program;
        this.body.sasaran = this.g$getLaporan.sasaran;
        this.body.metode = this.g$getLaporan.metode;
        this.body.luaran = this.g$getLaporan.luaran;
      } catch (error) {
        this.showSwal("failed-message", "Terjadi kesalahan saat memuat data");
        console.log(error.error);
      }

      this.showSwal("close");
    },

    isQuillEmpty(input) {
      if (input == "" || input == "<p><br></p>") return true;
      else return false;
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
