<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard />
        <div class="bg-white card mt-4">
          <div class="card-header pb-0 pt-3">
            <p class="font-weight-bold text-dark mb-2">
              Pilih Tema KKN Terdaftar
            </p>
          </div>
          <div class="pb-3 pt-0 card-body">
            <div class="col-12 align-self-center">
              <select
                id="choices-tema"
                class="form-control"
                name="choices-tema"
                v-model="tema"
                @change="getListGelombang()"
              >
                <option
                  v-for="tema in g$listTemaActive"
                  :key="tema.id_tema"
                  :value="tema.id_tema"
                >
                  {{ tema.nama }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div id="card-section" class="row" :key="indexComponent">
          <div
            class="col-lg-6"
            v-for="gel in listGelombang"
            :key="gel.id_gelombang"
          >
            <card
              :is-dosen="false"
              :title="gel.nama"
              :status="gel.status"
              :status-pendaftaran="
                gel.jumlah_pendaftaran != 0
                  ? gel.mahasiswa_kecamatan[0]?.status
                  : -2
              "
              :nama-kecamatan="
                gel.jumlah_pendaftaran != 0
                  ? gel.mahasiswa_kecamatan[0]?.kecamatan.nama
                  : ''
              "
              :nama-tema="namaTema"
              :id-gelombang="gel.id_gelombang"
              :nama-gelombang="gel.nama"
              :jumlah-gelombang="g$listGelombang.length"
              :deadline="
                gel.tgl_akhir
                  ? moment(gel.tgl_akhir).format('dddd, DD MMMM YYYY HH:mm')
                  : '-'
              "
            >
              <template
                #button
                v-if="
                  !gel.mahasiswa_kecamatan[0]?.status &&
                  gel.status &&
                  gel.mahasiswa_kecamatan[0]?.status != 0 &&
                  !g$infoUser.id_tema
                "
              >
                <router-link
                  :to="{
                    name: 'Daftar Lokasi',
                    params: {
                      id_tema: tema,
                      id_gelombang: gel.id_gelombang,
                    },
                  }"
                  type="button"
                  class="mb-0 btn btn-sm bg-gradient-success"
                >
                  Daftar
                </router-link>
              </template>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DataTable } from "simple-datatables";
import moment from "moment";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import Card from "@/views/dashboards/components/Cards/GelombangCard.vue";
import { mapActions, mapState } from "pinia";
import d$gelombang from "@/store/gelombang";
import d$tema from "@/store/tema";
import d$auth from "@/store/auth";

import slackLogo from "@/assets/img/small-logos/logo-slack.svg";

export default {
  name: "IndexDaftarLokasi",
  components: {
    HeaderProfileCard,
    Card,
  },
  data() {
    return {
      id_halaman: 2,
      slackLogo,
      tema: 1,
      namaTema: "",
      choicesTema: undefined,
      indexComponent: 0,
      idGelombang: "",
      listGelombang: [],
      moment,
    };
  },
  computed: {
    ...mapState(d$gelombang, ["g$listGelombang"]),
    ...mapState(d$tema, ["g$listTemaActive"]),
    ...mapState(d$auth, ["g$infoUser"]),
  },
  async created() {
    moment.locale("id");

    await this.getInitData();

    this.choicesTema = this.getChoices("choices-tema");
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$gelombang, ["a$listGelombangMahasiswa"]),
    ...mapActions(d$tema, ["a$listTema"]),

    async getInitData() {
      // this.showSwal("loading");

      try {
        await this.a$listTema();
        this.tema = this.g$listTemaActive[0].id_tema;
        await this.getListGelombang();
        // this.showSwal("close");
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
    },

    async getListGelombang() {
      this.indexComponent++;
      this.tema = parseInt(this.tema);

      try {
        await this.getTema();
        await this.a$listGelombangMahasiswa(
          this.tema,
          this.id_halaman,
          this.g$infoUser.id_mahasiswa
        );
        this.listGelombang = this.g$listGelombang;
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
        this.setupDataTable();
      }, 10);
    },

    async getTema() {
      await this.g$listTemaActive.forEach((tema) => {
        if (tema.id_tema == this.tema) {
          this.namaTema = tema.nama;
          return;
        }
      });
    },

    getChoices(id) {
      var element = document.getElementById(id);
      if (element) {
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
          shouldSort: false,
        });
      }
    },

    setupDataTable() {
      this.listGelombang.forEach((gel) => {
        if (document.getElementById(`pendaftaran-list-${gel.id_gelombang}`)) {
          return new DataTable(`#pendaftaran-list-${gel.id_gelombang}`, {
            searchable: false,
            fixedHeight: false,
            perPage: 1,
          });
        }
      });
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
            this.$swal({
              toast: true,
              position: "top-end",
              title: toastText,
              icon: "success",
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
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
