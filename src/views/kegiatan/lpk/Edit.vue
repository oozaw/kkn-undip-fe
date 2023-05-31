<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card>
          <template #button>
            <argon-button
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
              color="success"
              variant="gradient"
              size="sm"
              >Simpan LPK</argon-button
            >
          </template>
        </header-profile-card>
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
                  <label>Judul Program Kerja</label>
                  <input
                    class="form-control"
                    type="text"
                    value="Ini judul"
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
                    disabled
                  >
                    <option value="mono" selected>Monodisiplin</option>
                    <option value="multi">Multidisiplin</option>
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
                    v-model:content="body.latar_belakang"
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
                    v-model:content="body.potensi"
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
                    v-model:content="body.program"
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
                    v-model:content="body.sasaran"
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
                    v-model:content="body.metode"
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
                    v-model:content="body.luaran"
                    contentType="html"
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="pt-7">8. Pelaksanaan Program</label>
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
              <div class="row">
                <div class="col-12">
                  <label class="pt-4">9. Capaian</label>
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
              <div class="row">
                <div class="col-12">
                  <label class="pt-4">10. Hambatan</label>
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
              <div class="row">
                <div class="col-12">
                  <label class="pt-4">11. Keberlanjutan Program</label>
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
                    color="success"
                    variant="gradient"
                    size="sm"
                    >Simpan LPK</argon-button
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
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$laporan from "@/store/laporan";
import d$auth from "@/store/auth";

export default {
  name: "EditLPK",
  components: {
    HeaderProfileCard,
    ArgonButton,
    QuillEditor,
  },
  data() {
    return {
      options: {
        modules: {
          toolbar: false,
        },
        readOnly: true,
      },
      body: {
        id_tema: "",
        judul: "",
        kategori: "",
        latar_belakang: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Mollitia, consequuntur aspernatur similique amet quia
                    voluptatem quas temporibus! Eveniet laboriosam placeat quod
                    explicabo nobis, fugit autem sapiente, id blanditiis, sed
                    dolorem. Lorem, ipsum dolor sit amet consectetur adipisicing
                    elit. Sed inventore explicabo praesentium quod, quo omnis
                    autem sapiente eveniet consequatur ducimus porro
                    voluptatibus dolorum amet molestias, voluptas ipsum nostrum
                    vel iure. Eaque at culpa molestias inventore, ab
                    reprehenderit quae? Unde laborum, quis temporibus numquam
                    culpa delectus quisquam ad ullam provident velit
                    exercitationem asperiores nihil voluptates molestiae quidem
                    error eum vitae inventore ut laudantium. Inventore quasi
                    odio aliquid saepe, sed sit omnis, dolore veritatis,
                    officiis optio consectetur sequi. Labore ab accusantium,
                    fuga, dolorum fugiat sunt hic repellat obcaecati ea aliquid
                    aut amet ad ut eaque rem quas maiores fugit ullam dolor
                    quaerat veniam exercitationem laudantium a! Magnam non ab
                    harum voluptas commodi. Aliquam, esse illum eum, hic
                    eligendi quas at ipsum ex, est nihil sit veritatis eveniet
                    numquam molestias. Corporis commodi incidunt nesciunt
                    cupiditate, nemo voluptate! Ipsa quod, quibusdam ipsam eos,
                    quam ducimus voluptas eius minus magni perspiciatis illum
                    placeat dolorum dolores dolorem omnis delectus consectetur.
                    Laudantium dolorum libero voluptatibus et culpa, veniam quos
                    earum voluptas iusto sapiente labore, totam voluptates
                    explicabo nihil delectus saepe, numquam nam? Laborum, nobis
                    laboriosam ratione debitis libero ducimus incidunt provident
                    nemo repellendus impedit expedita ad perspiciatis labore
                    placeat ex quia consequuntur. Maxime ullam nesciunt aliquam
                    enim.`,
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
  },
  async created() {
    await this.getLaporan();
  },
  methods: {
    ...mapActions(d$laporan, ["a$getLaporan", "a$addLPK"]),

    async addLPK() {
      this.showSwal("loading");

      if (
        this.isQuillEmpty(this.body.metode) ||
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
          metode: this.body.metode,
          pelaksanaan: this.body.pelaksanaan,
          capaian: this.body.capaian,
          hambatan: this.body.hambatan,
          kelanjutan: this.body.kelanjutan,
        };

        await this.a$addLPK(data);
        this.$router.push({ name: "LPK" });
        this.showSwal("success-message", "Data LPK berhasil disimpan!");
      } catch (error) {
        this.showSwal("failed-message", "Data LPK gagal disimpan!");
        console.log(error.error);
      }
    },

    async getLaporan() {
      this.showSwal("loading");

      try {
        await this.a$getLaporan(parseInt(this.$route.params.id_laporan));
        // this.body.latar_belakang = this.g$getLaporan.latar_belakang
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
        this.showSwal("failed-message", "Terjadi kesalahan saat memuat data");
        console.log(error);
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
