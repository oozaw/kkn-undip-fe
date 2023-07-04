<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card>
          <template #button>
            <argon-button
              :onclick="() => $router.push({ name: 'Reportase' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-add-reportase"
              class="mb-0 me-lg-2"
              color="success"
              variant="gradient"
              size="sm"
              >Tambah Reportase</argon-button
            >
          </template>
        </header-profile-card>
        <div class="bg-white pb-2 card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <h5 class="mb-2">Tambah Reportase</h5>
            </div>
          </div>
          <div class="ms-2 pt-1 ps-3 card-body">
            <form
              role="form"
              id="form-add-reportase"
              @submit.prevent="addReportase()"
            >
              <div class="mt-2 row">
                <div class="col-12">
                  <label>Judul Reportase</label>
                  <input
                    id="judul"
                    name="judul"
                    class="form-control"
                    type="text"
                    required
                    placeholder="Judul reportase"
                    v-model="body.judul"
                  />
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
                      <option value="">-- Pilih kategori --</option>
                      <option value="1">Monodisiplin</option>
                      <option value="2">Multidisiplin</option>
                    </select>
                  </div>
                </div>
              <div class="row pb-7">
                <div class="col-12">
                  <label class="mt-4">Isi Reportase</label>
                  <div id="isi-editor" class="h-100"></div>
                  <!-- <quill-editor
                    id="isi-editor"
                    :options="options"
                    style="height: 280px"
                    v-model:content="body.isi"
                    contentType="html"
                    theme="snow"
                    placeholder="Isi dengan konten reportase program kerja"
                    ref="isiEditor"
                  ></quill-editor> -->
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-12 mt-3 d-flex justify-content-end">
                  <argon-button
                    :onclick="() => $router.push({ name: 'Reportase' })"
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    class="mb-0 me-lg-2"
                    form="form-add-reportase"
                    color="success"
                    variant="gradient"
                    size="sm"
                    >Tambah Reportase</argon-button
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
import d$reportase from "@/store/reportase";

export default {
  name: "AddReportase",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      quill: undefined,
      body: {
        id_tema: "",
        judul: "",
        kategori: "",
        isi: "",
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
    };
  },
  computed: {
    ...mapState(d$auth, ["g$infoUser"]),
  },
  mounted() {
    this.setupQuill();
    this.choicesKategori = this.getChoices("choices-kategori");
  },
  methods: {
    ...mapActions(d$reportase, ["a$addReportase"]),

    async addReportase() {
      this.showSwal("loading");

      try {
        this.body.isi =
          document.getElementById("isi-editor").children[0].innerHTML;

        if (
          !this.body.judul ||
          this.body.judul == "" ||
          this.body.kategori == "" ||
          this.isQuillEmpty(this.body.isi)
        ) {
          this.showSwal(
            "warning-message",
            "Data belum lengkap, lengkapi semua data terlebih dahulu!"
          );
          return;
        }

        this.body.id_tema = parseInt(this.g$infoUser.id_tema);
        this.body.kategori = parseInt(this.body.kategori);

        // const size =
        //   encodeURI(JSON.stringify(this.body)).split(/%..|./).length - 1;
        // console.log(size);

        await this.a$addReportase(this.body);
        this.showSwal("success-message", "Data reportase berhasil ditambahkan");
        this.$router.push({ name: "Reportase" });
      } catch (error) {
        this.showSwal("failed-message", "Data reportase gagal ditambahkan");
        console.log(error);
      }
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
      var value = prompt("please copy paste the image url here.");
      if (value) {
        this.quill.insertEmbed(range, "image", value);
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
