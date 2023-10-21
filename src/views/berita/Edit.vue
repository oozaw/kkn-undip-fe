<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card>
          <template #button>
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
              form="form-edit-data"
              class="mb-0 me-lg-2"
              color="primary"
              variant="gradient"
              size="sm"
              >Simpan Perubahan</argon-button
            >
          </template>
        </header-profile-card>
        <div class="bg-white pb-2 card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <h5 class="mb-2">Edit Berita</h5>
            </div>
          </div>
          <div class="ms-2 pt-1 ps-3 card-body">
            <form
              role="form"
              id="form-edit-data"
              enctype="multipart/form-data"
              @submit.prevent="editBerita()"
            >
              <div class="mt-2 row">
                <div class="col-12">
                  <label>Judul Berita</label>
                  <input
                    id="judul"
                    name="judul"
                    class="form-control"
                    type="text"
                    required
                    placeholder="Judul berita"
                    v-model="body.judul"
                  />
                </div>
              </div>
              <div class="mt-3 row">
                <div class="col-12">
                  <label>Kategori</label>
                  <select
                    class="form-select"
                    name="choices-kategori"
                    id="choices-kategori"
                    v-model="body.id_kategori"
                  >
                    <option value="">-- Pilih kategori --</option>
                  </select>
                </div>
              </div>
              <div class="row mt-3 pb-6">
                <div class="col-12">
                  <label>Isi Reportase</label>
                  <div id="isi-editor" class="h-100"></div>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-12">
                  <label class="mb-0">Thumbnail/ Header Berita</label>
                  <div class="mx-0 ms-1 mb-1">
                    <span class="text-xs text-danger">
                      Format file yang diizinkan: .jpg, .jpeg, .bmp, .png
                    </span>
                  </div>
                  <input
                    id="thumbnail"
                    name="thumbnail"
                    ref="file"
                    type="file"
                    placeholder="Browse file..."
                    class="mb-1 form-control"
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-12 mt-3 d-flex justify-content-end">
                  <argon-button
                    type="button"
                    :onclick="() => $router.go(-1)"
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    class="mb-0 me-lg-2"
                    form="form-edit-data"
                    color="primary"
                    variant="gradient"
                    size="sm"
                    >Simpan Perubahan</argon-button
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
import Quill from "quill";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$auth from "@/store/auth";
import d$berita from "@/store/berita";
import d$kategori from "@/store/kategori";

export default {
  name: "EditBerita",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      quill: undefined,
      id_berita: parseInt(this.$route.params.id_berita),
      berita: undefined,
      body: {
        judul: "",
        id_kategori: "",
        body: "",
        thumbnail: undefined,
      },
      options: {
        modules: {
          toolbar: {
            container: [["bold", "image"]],
            handlers: {
              image: "",
            },
          },
        },
      },
      choicesKategori: undefined,
    };
  },
  computed: {
    ...mapState(d$auth, ["g$infoUser"]),
    ...mapState(d$kategori, ["g$listKategori"]),
    ...mapState(d$berita, ["g$berita"]),
  },
  async created() {
    await this.getInitData();
    this.setupQuill();
  },
  beforeUnmount() {
    if (this.choicesKategori) this.choicesKategori.destroy();
  },
  methods: {
    ...mapActions(d$berita, ["a$editBerita", "a$getBerita"]),
    ...mapActions(d$kategori, ["a$listKategori"]),

    async getInitData() {
      this.showSwal("loading");

      try {
        await this.a$getBerita(this.id_berita);
        this.berita = this.g$berita;
        this.body.judul = this.berita.judul;
        this.body.id_kategori = this.berita.id_kategori;
        this.body.body = this.berita.body;
        document.getElementById("isi-editor").innerHTML = this.body.body;

        await this.a$listKategori();
        this.choicesKategori = this.getChoices("choices-kategori");
        this.setChoices(this.choicesKategori, this.g$listKategori);
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

      setTimeout(() => {
        this.showSwal("close");
      }, 50);
    },

    async editBerita() {
      this.showSwal("loading");

      try {
        this.body.body =
          document.getElementById("isi-editor").children[0].innerHTML;
        this.body.thumbnail = this.$refs.file.files[0];

        if (
          !this.body.judul ||
          this.body.judul == "" ||
          !this.body.id_kategori ||
          this.body.id_kategori == "" ||
          this.isQuillEmpty(this.body.body)
        ) {
          this.showSwal(
            "warning-message",
            "Data belum lengkap, lengkapi semua data terlebih dahulu!"
          );
          return;
        }

        this.body.id_kategori = parseInt(this.body.id_kategori);

        if (this.body.thumbnail) {
          if (!this.isImage(this.body.thumbnail.name)) {
            this.showSwal(
              "warning-message",
              "File yang diupload bukan gambar!"
            );
            return;
          }
        }

        await this.a$editBerita(this.id_berita, this.body);
        this.showSwal("success-message", "Berita berhasil disimpan");
        this.$router.go(-1);
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Berita gagal disimpan! " + msg);
      }
    },

    isImage(filename) {
      const ext = [".jpg", ".jpeg", ".bmp", ".png"];
      return ext.some((el) => filename.endsWith(el));
    },

    setupQuill() {
      this.quill = new Quill("#isi-editor", {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ font: [] }, { size: [] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ script: "super" }, { script: "sub" }],
              [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["direction", { align: [] }],
              ["link", "image", "video"],
              ["clean"],
            ],
            handlers: {
              image: this.imageHandler,
            },
          },
        },
      });
    },

    imageHandler() {
      var range = this.quill.getSelection(true);
      var value = prompt("Isi dengan link gambar");
      if (value) {
        this.quill.insertEmbed(range, "image", value);
      }
    },

    isQuillEmpty(input) {
      if (input == "" || input == "<p><br></p>") return true;
      else return false;
    },

    setChoices(choices, option) {
      if (choices) {
        choices.clearChoices();
        choices.removeActiveItems();

        let newOption = [
          {
            value: "",
            label: "-- Pilih prodi --",
            selected: true,
            disabled: true,
          },
        ];

        option.forEach((item) => {
          newOption.push({
            value: Object.values(item)[0],
            label: Object.values(item)[1],
            selected: Object.values(item)[0] == this.berita.id_kategori,
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
