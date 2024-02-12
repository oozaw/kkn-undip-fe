<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <section v-if="g$statusHalaman">
          <header-profile-card />
          <div class="bg-white pb-2 card mt-4">
            <!-- Card header -->
            <div class="pb-0 card-header">
              <div class="d-lg-flex">
                <h5 class="mb-2">Edit LPK</h5>
              </div>
            </div>
            <form
              role="form"
              id="form-add-lpk"
              enctype="multipart/form-data"
              @submit.prevent="addLPK()"
            >
              <div class="ms-2 pt-1 ps-3 card-body">
                <div class="mt-2 row">
                  <div class="col-12">
                    <label>Program Kerja</label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="body.program"
                      readonly
                    />
                    <div class="invalid-feedback">Judul tidak boleh kosong</div>
                  </div>
                </div>
                <div class="mt-3 row">
                  <div class="col-12">
                    <label>Kategori Program Kerja</label>
                    <select
                      class="form-select"
                      name="choices-kategori"
                      id="choices-kategori"
                      v-model="body.kategori"
                      disabled
                    >
                      <option value="1">Monodisiplin</option>
                      <option value="2">Multidisiplin</option>
                    </select>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label>1. Potensi atau Masalah</label>
                    <quill-editor
                      class="bg-light"
                      :options="options"
                      id="potensi-editor"
                      style="height: 200px"
                      v-model:content="body.potensi"
                      contentType="html"
                      theme="snow"
                    ></quill-editor>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label>2. Sasaran Program</label>
                    <quill-editor
                      class="bg-light"
                      :options="options"
                      id="sasaran-editor"
                      style="height: 200px"
                      v-model:content="body.sasaran"
                      contentType="html"
                      theme="snow"
                    ></quill-editor>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label>3. Metode IPTEKS yang Digunakan</label>
                    <quill-editor
                      class="bg-light"
                      :options="options"
                      id="metode-editor"
                      style="height: 200px"
                      v-model:content="body.metode"
                      contentType="html"
                      theme="snow"
                    ></quill-editor>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label>4. Luaran Program</label>
                    <quill-editor
                      class="bg-light"
                      :options="options"
                      id="output-editor"
                      style="height: 200px"
                      v-model:content="body.luaran"
                      contentType="html"
                      theme="snow"
                    ></quill-editor>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label>5. Pelaksanaan Program</label>
                    <quill-editor
                      id="pelaksanaan-editor"
                      style="height: 180px"
                      v-model:content="body.pelaksanaan"
                      contentType="html"
                      theme="snow"
                      :placeholder="
                        !body.pelaksanaan ? 'Isi dengan realisasi program' : ''
                      "
                    ></quill-editor>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label>6. Capaian</label>
                    <quill-editor
                      id="capaian-editor"
                      style="height: 180px"
                      v-model:content="body.capaian"
                      contentType="html"
                      theme="snow"
                      :placeholder="
                        !body.capaian
                          ? 'Isi dengan capaian dari pelaksanaan program'
                          : ''
                      "
                    ></quill-editor>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label>7. Hambatan</label>
                    <quill-editor
                      id="hambatan-editor"
                      style="height: 180px"
                      v-model:content="body.hambatan"
                      contentType="html"
                      theme="snow"
                      :placeholder="
                        !body.hambatan
                          ? 'Isi dengan hambatan yang dilalui selama pelaksanaan program'
                          : ''
                      "
                    ></quill-editor>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label>8. Keberlanjutan Program</label>
                    <quill-editor
                      id="keberlanjutan-editor"
                      style="height: 180px"
                      v-model:content="body.kelanjutan"
                      contentType="html"
                      theme="snow"
                      :placeholder="
                        !body.kelanjutan
                          ? 'Isi dengan rencana keberlanjutan program yang telah dilaksanakan'
                          : ''
                      "
                    ></quill-editor>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label class="mb-0 pb-0">9. Link File Dokumentasi</label>
                    <div class="mt-0 pt-0 mb-3 text-xs">
                      <span
                        class="text-xs ms-3 mt-0 mb-2 form-text text-muted d-inline"
                      >
                        <i>
                          Dapat berupa link Google Drive, OneDrive, atau cloud
                          storage lainnya
                        </i>
                      </span>
                    </div>
                    <input
                      class="form-control"
                      type="text"
                      name="dokumentasi"
                      id="dokumentasi"
                      placeholder="Link dokumentasi program kerja"
                      v-model="body.dokumentasi"
                    />
                  </div>
                </div>
                <div class="row mt-4">
                  <div
                    class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-end"
                  >
                    <argon-button
                      type="button"
                      :onclick="() => $router.push({ name: 'LPK' })"
                      class="mb-0 me-2"
                      color="secondary"
                      size="sm"
                      >Batal</argon-button
                    >
                    <argon-button
                      type="submit"
                      form="form-add-lpk"
                      class="mb-0 me-lg-2"
                      color="primary"
                      variant="gradient"
                      size="sm"
                      >Simpan LPK</argon-button
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
        <InactiveHalaman v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import InactiveHalaman from "@/views/dashboards/components/InactiveHalaman.vue";
import { mapActions, mapState } from "pinia";
import d$laporan from "@/store/laporan";
import d$auth from "@/store/auth";
import d$halaman from "@/store/halaman";

export default {
  name: "EditLPK",
  components: {
    HeaderProfileCard,
    ArgonButton,
    QuillEditor,
    InactiveHalaman,
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
        id_tema: "",
        kategori: "",
        potensi: "",
        program: "",
        file: "",
        sasaran: "",
        metode: "",
        luaran: "",
        dokumentasi: "",
        pelaksanaan: "",
        capaian: "",
        hambatan: "",
        kelanjutan: "",
      },
    };
  },
  computed: {
    ...mapState(d$laporan, ["g$getLaporan"]),
    ...mapState(d$auth, ["g$user", "g$infoUser"]),
    ...mapState(d$halaman, ["g$statusHalaman"]),
  },
  async created() {
    this.showSwal("loading");

    await this.a$checkHalaman(
      parseInt(this.g$infoUser.id_tema),
      this.id_halaman
    );

    if (this.g$statusHalaman) await this.getLaporan();
    this.showSwal("close");
  },
  methods: {
    ...mapActions(d$laporan, ["a$getLaporan", "a$addLPK"]),
    ...mapActions(d$halaman, ["a$checkHalaman"]),

    async addLPK() {
      this.showSwal("loading");

      if (
        this.isQuillEmpty(this.body.pelaksanaan) ||
        this.isQuillEmpty(this.body.capaian) ||
        this.isQuillEmpty(this.body.hambatan) ||
        this.isQuillEmpty(this.body.kelanjutan)
      ) {
        this.showSwal(
          "warning-message",
          "Data LPK belum lengkap, lengkapi data terlebih dahulu!"
        );
        return;
      }

      try {
        let data = {
          id_tema: parseInt(this.g$infoUser.id_tema),
          id_laporan: parseInt(this.$route.params.id_laporan),
          pelaksanaan: this.body.pelaksanaan,
          capaian: this.body.capaian,
          hambatan: this.body.hambatan,
          kelanjutan: this.body.kelanjutan,
          metode: this.body.metode,
        };

        await this.a$addLPK(data);
        this.$router.push({ name: "LPK" });
        this.showSwal("success-message", "Data LPK berhasil disimpan!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal ditambahkan! " + msg);
      }
    },

    async getLaporan() {
      this.showSwal("loading");

      try {
        await this.a$getLaporan(parseInt(this.$route.params.id_laporan));
        this.body.kategori = this.g$getLaporan.kategori;
        this.body.potensi = this.g$getLaporan.potensi;
        this.body.program = this.g$getLaporan.program;
        this.body.sasaran = this.g$getLaporan.sasaran;
        this.body.metode = this.g$getLaporan.metode;
        this.body.luaran = this.g$getLaporan.luaran;
        this.body.pelaksanaan = this.g$getLaporan.pelaksanaan;
        this.body.capaian = this.g$getLaporan.capaian;
        this.body.hambatan = this.g$getLaporan.hambatan;
        this.body.kelanjutan = this.g$getLaporan.kelanjutan;
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

      this.showSwal("close");
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
