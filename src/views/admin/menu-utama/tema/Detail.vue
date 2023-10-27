<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              type="button"
              :onclick="() => $router.go(-1)"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Kembali</argon-button
            >
            <section v-if="g$user.role === 'ADMIN'">
              <argon-button
                type="button"
                class="mb-0 me-2"
                color="danger"
                size="sm"
                @click="
                  showSwal(
                    'warning-confirmation',
                    `Menghapus tema ${tema.nama}? Semua data terkait tema ini akan dihapus!`,
                    'Berhasil menghapus data',
                    id_tema,
                    true
                  )
                "
                >Hapus</argon-button
              >
              <argon-button
                type="button"
                :onclick="
                  () =>
                    $router.push({
                      name: 'Edit Tema KKN',
                      params: { id_tema: id_tema },
                    })
                "
                class="mb-0 me-2"
                color="primary"
                size="sm"
                >Edit</argon-button
              >
            </section>
            <!-- <argon-button
              type="button"
              class="mb-0 me-lg-2"
              color="success"
              size="sm"
              variant="outline"
              >Ekspor Data Tema</argon-button
            > -->
          </template>
        </HeaderProfileCard>
        <div class="card mt-4">
          <div class="card-header pb-1">
            <h5>Detail Tema</h5>
            <h5 class="mt-2">
              {{ tema.nama }}
              <span
                v-if="tema.status"
                class="ms-sm-2 badge badge-sm badge-success"
              >
                Aktif
              </span>
              <span v-else class="ms-2 badge badge-danger badge-sm">
                Tidak Aktif
              </span>
            </h5>
            <span>
              {{ moment(tema.tgl_mulai).format("dddd, DD MMMM YYYY") }}
              - {{ moment(tema.tgl_akhir).format("dddd, DD MMMM YYYY") }}
            </span>
          </div>
          <div class="card-body pt-3">
            <div class="d-flex flex-wrap">
              <div class="col-6 col-md-4">
                <label class="text-lg mb-1">Jenis KKN</label>
                <p class="font-weight-bold ms-1 text-lg">
                  {{ tema.jenis == "1" ? "Reguler" : "Tematik" }}
                </p>
              </div>
              <div class="col-6 col-md-4">
                <label class="text-lg mb-1">Periode</label>
                <p class="font-weight-bold ms-1 text-lg">
                  {{ tema.periode }}
                </p>
              </div>
              <div class="col-6 col-md-4 mt-2 mt-md-0">
                <label class="text-lg mb-1">Status</label>
                <p class="font-weight-bold ms-1 text-lg">
                  {{ tema.status ? "Aktif" : "Tidak Aktif" }}
                </p>
              </div>
              <div class="col-6 col-md-4 mt-2 mt-md-0" v-if="tema.jenis == '1'">
                <label class="text-lg mb-1">Kabupaten</label>
                <p class="font-weight-bold ms-1 text-lg">
                  {{ tema.jml_kabupaten }}
                </p>
              </div>
              <div class="col-6 col-md-4 mt-2 mt-md-0" v-if="tema.jenis == '1'">
                <label class="text-lg mb-1">Kecamatan</label>
                <p class="font-weight-bold ms-1 text-lg">
                  {{ tema.jml_kecamatan }}
                </p>
              </div>
              <div class="col-6 col-md-4 mt-2 mt-md-0" v-if="tema.jenis == '1'">
                <label class="text-lg mb-1">Desa</label>
                <p class="font-weight-bold ms-1 text-lg">
                  {{ tema.jml_desa }}
                </p>
              </div>
              <div class="col-6 col-md-4 mt-2 mt-md-0" v-if="tema.jenis == '1'">
                <label class="text-lg mb-1">BAPPEDA</label>
                <p class="font-weight-bold ms-1 text-lg">
                  {{ jmlBappeda }}
                </p>
              </div>
              <div class="col-6 col-md-4 mt-2 mt-md-0">
                <label class="text-lg mb-1">Mahasiswa</label>
                <p class="font-weight-bold ms-1 text-lg">
                  {{ jmlMahasiswa }}
                </p>
              </div>
              <div class="col-6 col-md-4 mt-2 mt-md-0">
                <label class="text-lg mb-1">Dosen</label>
                <p class="font-weight-bold ms-1 text-lg">
                  {{ jmlDosen }}
                </p>
              </div>
              <div class="col-6 col-md-4 mt-2 mt-md-0" v-if="tema.jenis == '2'">
                <label class="text-lg mb-1">Kabupaten</label>
                <p class="font-weight-bold ms-1 text-lg">
                  {{ tema.kab ?? "-" }}
                </p>
              </div>
              <div class="col-6 col-md-4 mt-2 mt-md-0" v-if="tema.jenis == '2'">
                <label class="text-lg mb-1">Kecamatan</label>
                <p class="font-weight-bold ms-1 text-lg">
                  {{ tema.kec ?? "-" }}
                </p>
              </div>
              <div class="col-6 col-md-4 mt-2 mt-md-0" v-if="tema.jenis == '2'">
                <label class="text-lg mb-1">Desa/ Kelurahan</label>
                <p class="font-weight-bold ms-1 text-lg">
                  {{ tema.desa ?? "-" }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Choices from "choices.js";
import moment from "moment";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$tema from "@/store/tema";
import d$bappeda from "@/store/bappeda";
import d$dosen from "@/store/dosen";
import d$mahasiswa from "@/store/mahasiswa";
import d$auth from "@/store/auth";

export default {
  name: "DetailTemaKKN",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      moment,
      id_tema: this.$route.params.id_tema,
      tema: {
        id: "",
        nama: "",
        jenis: "1",
        periode: "",
        status: "",
      },
      jmlBappeda: 0,
      jmlDosen: 0,
      jmlMahasiswa: 0,
    };
  },
  computed: {
    ...mapState(d$tema, ["g$tema"]),
    ...mapState(d$bappeda, ["g$listBappeda"]),
    ...mapState(d$dosen, ["g$listDosen"]),
    ...mapState(d$mahasiswa, ["g$listMahasiswa"]),
    ...mapState(d$auth, ["g$user"]),
  },
  async created() {
    moment.locale("id");
    await this.getInitData();
  },
  methods: {
    ...mapActions(d$tema, ["a$getTema", "a$deleteTema", "a$switchTema"]),
    ...mapActions(d$bappeda, ["a$listBappedaTema"]),
    ...mapActions(d$dosen, ["a$listDosenTema"]),
    ...mapActions(d$mahasiswa, ["a$listMahasiswaTema"]),

    async getInitData() {
      // this.showSwal("loading");

      try {
        await this.a$getTema(this.id_tema);
        this.tema = this.g$tema;

        await this.a$listBappedaTema(this.id_tema);
        this.jmlBappeda = this.g$listBappeda.length;

        await this.a$listDosenTema(this.id_tema);
        this.jmlDosen = this.g$listDosen.length;

        await this.a$listMahasiswaTema(this.id_tema);
        this.jmlMahasiswa = this.g$listMahasiswa.length;

        // this.showSwal("close");
      } catch (error) {
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat memuat data! " + msg
        );
      }
    },

    async deleteTema(id_tema) {
      this.showSwal("loading");

      try {
        await this.a$deleteTema(id_tema);
        this.$router.push({ name: "Tema KKN" });
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }
    },

    async switchTema(id_tema) {
      this.showSwal("loading");

      try {
        await this.a$switchTema(id_tema);
        await this.getInitData();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diperbarui! " + msg);
      }
    },

    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
        });
      }
    },

    removeAllOptions(id) {
      var element = document.getElementById(id);
      if (element) {
        while (element.options.length > 0) {
          element.remove(0);
        }
      }
    },

    checkJenisSelection() {
      var element = document.getElementById("choices-jenis");
      if (element) {
        this.filterJenis = element.value;
      }
    },

    showSwal(type, text, toastText, id_tema, isDelete = false) {
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
            if (isDelete) this.deleteTema(id_tema);
            else this.switchTema(id_tema);
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
