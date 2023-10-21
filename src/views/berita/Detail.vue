<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card>
          <template #button>
            <argon-button
              @click="() => $router.push({ name: 'Landing Berita' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              ><font-awesome-icon
                class="text-white me-2"
                icon="fa-solid fa-arrow-left"
                size="lg"
              />Kembali</argon-button
            >
            <argon-button
              @click="
                showSwal(
                  'warning-confirmation',
                  `Hapus berita ini?`,
                  'Berhasil menghapus data'
                )
              "
              class="mb-0 me-2"
              color="danger"
              size="sm"
              ><i class="fas fa-trash text-white me-2"></i>Hapus</argon-button
            >
            <argon-button
              @click="
                () =>
                  $router.push({
                    name: 'Landing Edit Berita',
                    params: { id_berita: id_berita },
                  })
              "
              class="mb-0 me-lg-2"
              color="primary"
              size="sm"
              ><i class="fas fa-user-edit text-white me-2"></i
              >Edit</argon-button
            >
          </template>
        </header-profile-card>
        <div class="bg-white pb-2 card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <h5 class="mb-2">Detail Berita</h5>
            </div>
          </div>
          <div class="ms-2 pt-1 px-4 card-body">
            <div class="mt-2 row">
              <h4 class="mb-2">{{ g$berita?.judul }}</h4>
              <p>
                <small
                  >{{ moment(g$berita?.created_at).format("DD, MMMM YYYY") }} |
                  {{ g$berita?.author }}
                  <br />
                  {{ g$berita?.kategori }}
                </small>
              </p>

              <div style="max-height: 500px; overflow: hidden">
                <img
                  id="thumbnail-placeholder"
                  class="img-fluid mt-3 rounded"
                  alt="thumbnail"
                />
              </div>

              <article class="mt-4" v-html="g$berita?.body"></article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$berita from "@/store/berita";

export default {
  name: "DetailBerita",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      id_berita: parseInt(this.$route.params.id_berita),
      moment,
      thumbnail: "",
    };
  },
  computed: {
    ...mapState(d$berita, ["g$berita", "g$thumbnail"]),
  },
  async created() {
    moment.locale("id");
    await this.a$getBerita(this.id_berita);
    await this.getThumbnail();
  },
  methods: {
    ...mapActions(d$berita, [
      "a$getBerita",
      "a$deleteBerita",
      "a$getThumbnail",
    ]),

    async deleteBerita() {
      this.showSwal("loading");

      try {
        await this.a$deleteBerita(this.id_berita);
        this.showSwal("success-message", "Data berhasil dihapus!");
        this.$router.push({ name: "Landing Berita" });
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }
    },

    async getThumbnail() {
      try {
        const thumbnailPlaceholder = document.getElementById(
          "thumbnail-placeholder"
        );

        await this.a$getThumbnail(this.id_berita);
        this.thumbnail = window.URL.createObjectURL(this.g$thumbnail);

        thumbnailPlaceholder.src = this.thumbnail;
      } catch (error) {
        console.log(error);
      }
    },

    showSwal(type, text, toastText) {
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
      } else if (type === "warning-confirmation") {
        this.$swal({
          title: "Apakah Anda yakin?",
          text: text,
          showCancelButton: true,
          confirmButtonText: "Ya!",
          cancelButtonText: "Batal!",
          customClass: {
            confirmButton: "btn bg-gradient-success",
            cancelButton: "btn bg-gradient-secondary",
          },
          buttonsStyling: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteBerita();
            this.$swal({
              toast: true,
              position: "top-end",
              title: toastText,
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                this.$swal.hideLoading();
              },
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            this.$swal.close();
          }
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
