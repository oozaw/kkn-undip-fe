<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <section v-if="g$statusHalaman">
          <header-profile-card>
            <template #button>
              <argon-button
                type="button"
                :onclick="() => $router.push({ name: 'LRK' })"
                class="mb-0 me-2"
                color="secondary"
                size="sm"
                >Batal</argon-button
              >
              <argon-button
                type="submit"
                form="form-add-lrk"
                class="mb-0 me-lg-2"
                color="success"
                variant="gradient"
                size="sm"
                >Tambah LRK</argon-button
              >
            </template>
          </header-profile-card>
          <div class="bg-white pb-2 card mt-4">
            <!-- Card header -->
            <div class="pb-0 card-header">
              <div class="d-lg-flex">
                <h5 class="mb-2">Tambah LRK</h5>
              </div>
            </div>
            <form
              class="was-validated"
              role="form"
              id="form-add-lrk"
              enctype="multipart/form-data"
              @submit.prevent="addLRK()"
            >
              <div class="ms-2 pt-1 ps-3 card-body">
                <div class="mt-2 row">
                  <div class="col-12">
                    <label>Program Kerja</label>
                    <input
                      class="form-control"
                      type="text"
                      required
                      placeholder="eg. Program Edukasi Kesehatan pada Masyarakat Desa Kedungkandang"
                      v-model="body.program"
                    />
                    <div class="invalid-feedback">
                      Program tidak boleh kosong
                    </div>
                  </div>
                </div>
                <div class="mt-3 row">
                  <div class="col-12">
                    <label>Kategori Program Kerja</label>
                    <select
                      class="form-control"
                      name="choices-kategori"
                      id="choices-kategori"
                      v-model="body.kategori"
                    >
                      <option value="" disabled>-- Pilih kategori --</option>
                      <option value="1">Monodisiplin</option>
                      <option value="2">Multidisiplin</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <label class="pt-4">1. Potensi atau Masalah</label>
                    <quill-editor
                      id="potensi-editor"
                      style="height: 180px"
                      v-model:content="body.potensi"
                      contentType="html"
                      theme="snow"
                      placeholder="Isi dengan potensi atau permasalahan yang ingin diselesaikan"
                    ></quill-editor>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <label class="pt-4">2. Sasaran Program</label>
                    <quill-editor
                      id="sasaran-editor"
                      style="height: 180px"
                      v-model:content="body.sasaran"
                      contentType="html"
                      theme="snow"
                      placeholder="Isi dengan sasaran dari program yang diajukan"
                    ></quill-editor>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label>3. Metode IPTEKS yang Digunakan</label>
                    <quill-editor
                      id="metode-editor"
                      style="height: 180px"
                      v-model:content="body.metode"
                      contentType="html"
                      theme="snow"
                      placeholder="Isi dengan metode yang digunakan"
                    ></quill-editor>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <label class="pt-4">4. Luaran Program</label>
                    <quill-editor
                      id="output-editor"
                      style="height: 180px"
                      v-model:content="body.luaran"
                      contentType="html"
                      theme="snow"
                      placeholder="Isi dengan keluaran yang diharapkan"
                    ></quill-editor>
                  </div>
                </div>
                <div class="row mt-4">
                  <div
                    class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-end"
                  >
                    <argon-button
                      type="button"
                      :onclick="() => $router.push({ name: 'LRK' })"
                      class="mb-0 me-2"
                      color="secondary"
                      size="sm"
                      >Batal</argon-button
                    >
                    <argon-button
                      type="submit"
                      form="form-add-lrk"
                      class="mb-0 me-lg-2"
                      color="success"
                      variant="gradient"
                      size="sm"
                      >Tambah LRK</argon-button
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
        <inactive-halaman v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import InactiveHalaman from "@/views/dashboards/components/InactiveHalaman.vue";
import d$laporan from "@/store/laporan";
import d$halaman from "@/store/halaman";
import { mapActions, mapState } from "pinia";

export default {
  name: "AddLRK",
  components: {
    HeaderProfileCard,
    ArgonButton,
    QuillEditor,
    InactiveHalaman,
  },
  data() {
    return {
      id_halaman: 3,
      body: {
        id_tema: parseInt(this.$route.params.id_tema),
        kategori: "",
        potensi: "",
        program: "",
        sasaran: "",
        metode: "",
        luaran: "",
      },
    };
  },
  computed: {
    ...mapState(d$halaman, ["g$statusHalaman"]),
  },
  async created() {
    this.showSwal("loading");

    await this.a$checkHalaman(
      parseInt(this.$route.params.id_tema),
      parseInt(this.id_halaman)
    );

    this.choicesKategori = this.getChoices("choices-kategori");

    this.showSwal("close");
  },
  mounted() {},
  methods: {
    ...mapActions(d$laporan, ["a$addLRK"]),
    ...mapActions(d$halaman, ["a$checkHalaman"]),

    async addLRK() {
      this.showSwal("loading");

      if (
        this.body.program == "" ||
        this.body.kategori == "" ||
        this.isQuillEmpty(this.body.potensi) ||
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
          id_tema: this.body.id_tema,
          kategori: Number(this.body.kategori),
          potensi: this.body.potensi,
          program: this.body.program,
          sasaran: this.body.sasaran,
          metode: this.body.metode,
          luaran: this.body.luaran,
        };

        await this.a$addLRK(data);
        this.$router.push({ name: "LRK" });
        this.showSwal("success-message", "Data LRK berhasil ditambahkan!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal ditambahkan! " + msg);
      }
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
