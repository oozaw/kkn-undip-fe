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
              form="form-eval-lrk"
              class="mb-0 me-lg-2"
              color="primary"
              variant="gradient"
              size="sm"
              >Simpan Evaluasi</argon-button
            >
          </template>
        </header-profile-card>
        <div class="bg-white pb-2 card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <h5 class="mb-2">Evaluasi LRK</h5>
            </div>
          </div>
          <form
            role="form"
            id="form-eval-lrk"
            enctype="multipart/form-data"
            @submit.prevent="evalLRK()"
          >
            <div class="ms-2 pt-1 ps-3 card-body">
              <div class="mt-2 row">
                <div class="col-12">
                  <label>Judul Program Kerja</label>
                  <input
                    class="form-control"
                    type="text"
                    :value="getOutOfTagP(g$getLaporan.program)"
                    readonly
                  />
                </div>
              </div>
              <div class="mt-3 row">
                <div class="col-12">
                  <label>Kategori Program Kerja</label>
                  <select
                    class="form-select"
                    name="choices-kategori"
                    id="choices-kategori"
                    v-model="g$getLaporan.kategori"
                    disabled
                  >
                    <option value="1">Monodisiplin</option>
                    <option value="2">Multidisiplin</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="mt-4">1. Latar Belakang</label>
                  <quill-editor
                    class="bg-light"
                    :options="options"
                    id="latar-belakang-editor"
                    v-model:content="g$getLaporan.latar_belakang"
                    contentType="html"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="pt-6">2. Potensi atau Masalah</label>
                  <quill-editor
                    class="bg-light"
                    :options="options"
                    id="potensi-editor"
                    v-model:content="g$getLaporan.potensi"
                    contentType="html"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="pt-7">3. Usulan Program</label>
                  <quill-editor
                    class="bg-light"
                    :options="options"
                    id="usulan-editor"
                    v-model:content="g$getLaporan.program"
                    contentType="html"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="pt-8">4. Sasaran Program</label>
                  <quill-editor
                    class="bg-light"
                    :options="options"
                    id="sasaran-editor"
                    v-model:content="g$getLaporan.sasaran"
                    contentType="html"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="pt-9">5. Rencana Pelaksanaan</label>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label>6. Metode IPTEKS yang Digunakan</label>
                  <quill-editor
                    class="bg-light"
                    :options="options"
                    id="metode-editor"
                    v-model:content="g$getLaporan.metode"
                    contentType="html"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="pt-5">7. Luaran Program</label>
                  <quill-editor
                    class="bg-light"
                    :options="options"
                    id="output-editor"
                    v-model:content="g$getLaporan.luaran"
                    contentType="html"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="pt-7">Evaluasi LRK</label>
                  <quill-editor
                    id="evaluasi-editor"
                    style="height: 180px"
                    v-model:content="body.komentar"
                    contentType="html"
                    theme="snow"
                    :placeholder="
                      !body.komentar
                        ? 'Isi dengan rencana keberlanjutan program yang telah dilaksanakan'
                        : ''
                    "
                  ></quill-editor>
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
                    form="form-eval-lrk"
                    class="mb-0 me-lg-2"
                    color="primary"
                    variant="gradient"
                    size="sm"
                    >Simpan Evaluasi</argon-button
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
import $ from "jquery";
import { QuillEditor } from "@vueup/vue-quill";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$laporan from "@/store/laporan";
import d$auth from "@/store/auth";
import d$halaman from "@/store/halaman";

export default {
  name: "EvaluasiLRK",
  components: {
    HeaderProfileCard,
    ArgonButton,
    QuillEditor,
  },
  data() {
    return {
      id_halaman: 4,
      options: {
        modules: {
          toolbar: false,
        },
        readOnly: true,
      },
      body: {
        id_laporan: parseInt(this.$route.params.id_laporan),
        komentar: "",
      },
    };
  },
  computed: {
    ...mapState(d$laporan, ["g$getLaporan"]),
    ...mapState(d$auth, ["g$user", "g$infoUser"]),
    ...mapState(d$halaman, ["g$statusHalaman"]),
  },
  async created() {
    await this.getLaporan();
  },
  methods: {
    ...mapActions(d$laporan, ["a$getLaporan", "a$evaluateLaporan"]),
    ...mapActions(d$halaman, ["a$checkHalaman"]),

    async evalLRK() {
      this.showSwal("loading");

      if (this.isQuillEmpty(this.body.komentar) || !this.body.komentar) {
        this.showSwal("warning-message", "Data belum lengkap!");
        return;
      }

      try {
        await this.a$evaluateLaporan(this.body);
        this.$router.push({ name: "LPK" });
        this.showSwal("success-message", "Evaluasi berhasil disimpan!");
      } catch (error) {
        this.showSwal("failed-message", "Evaluasi gagal disimpan! " + error);
        console.log(error.error);
      }
    },

    async getLaporan() {
      this.showSwal("loading");

      try {
        await this.a$getLaporan(parseInt(this.$route.params.id_laporan));
        this.body.komentar = this.g$getLaporan.komentar;
      } catch (error) {
        this.showSwal("failed-message", "Terjadi kesalahan saat memuat data");
        console.log(error);
      }

      this.showSwal("close");
    },

    getOutOfTagP(element) {
      var temp = $("<div>").html(element);
      temp.find("p").each(function () {
        $(this).replaceWith(this.childNodes);
      });

      var output = temp.html();
      return output;
      // var div = document.createElement("div");
      // div.innerHTML = element;
      // var text = div.textContent || div.innerHTML || "";
      // return text;
    },

    isQuillEmpty(input) {
      if (input == "" || input == "<p><br></p>") return true;
      else return false;
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
