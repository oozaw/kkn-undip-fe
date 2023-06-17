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
              form="form-edit-reportase"
              class="mb-0 me-lg-2"
              color="primary"
              variant="gradient"
              size="sm"
              >Simpan Reportase</argon-button
            >
          </template>
        </header-profile-card>
        <div class="bg-white pb-2 card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <h5 class="mb-2">Edit Reportase</h5>
            </div>
          </div>
          <div class="ms-2 pt-1 ps-3 card-body">
            <form
              role="form"
              id="form-edit-reportase"
              @submit.prevent="updateReportase()"
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
                    form="form-edit-reportase"
                    color="primary"
                    variant="gradient"
                    size="sm"
                    >Simpan Reportase</argon-button
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
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$auth from "@/store/auth";
import d$reportase from "@/store/reportase";

export default {
  name: "EditReportase",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      id_reportase: parseInt(this.$route.params.id_reportase),
      quill: undefined,
      body: {
        id_tema: "",
        judul: "",
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
    ...mapState(d$reportase, ["g$reportase"]),
  },
  async created() {
    await this.getReportase();

    this.setupQuill();
  },
  methods: {
    ...mapActions(d$reportase, ["a$editReportase", "a$getReportase"]),

    async updateReportase() {
      this.showSwal("loading");

      try {
        this.body.isi =
          document.getElementById("isi-editor").children[0].innerHTML;

        if (
          !this.body.judul ||
          this.body.judul == "" ||
          this.isQuillEmpty(this.body.isi)
        ) {
          this.showSwal(
            "warning-message",
            "Data belum lengkap, lengkapi semua data terlebih dahulu!"
          );
          return;
        }

        this.body.id_tema = parseInt(this.g$infoUser.id_tema);

        // const size =
        //   encodeURI(JSON.stringify(this.body)).split(/%..|./).length - 1;
        // console.log(size);

        console.log(this.body);
        await this.a$editReportase(this.id_reportase, this.body);
        this.showSwal("success-message", "Data reportase berhasil disimpan");
        this.$router.push({ name: "Reportase" });
      } catch (error) {
        this.showSwal("failed-message", "Data reportase gagal disimpan");
        console.log(error);
      }
    },

    async getReportase() {
      this.showSwal("loading");

      try {
        await this.a$getReportase(this.id_reportase);
        this.body.judul = this.g$reportase.judul;
        document.getElementById("isi-editor").innerHTML = this.g$reportase.isi;
        this.showSwal("close");
      } catch (error) {
        this.showSwal("failed-message", "Data reportase gagal dimuat");
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
