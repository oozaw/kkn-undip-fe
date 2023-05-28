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
      </div>
      <div id="card-section" class="row pe-0" :key="indexComponent">
        <div
          class="col-lg-6 pe-0"
          v-for="gel in g$listGelombang"
          :key="gel.id_gelombang"
        >
          <card
            :title="gel.nama"
            :status="gel.status"
            deadline="31 Juni 2023 | 11:00 AM"
            :action="{
              route: {
                name: 'Index Lokasi',
                params: { id_gelombang: gel.id_gelombang },
              },
              label: 'Lihat',
              color: 'primary',
            }"
          >
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import Card from "@/views/dashboards/components/Cards/GelombangCard.vue";
import { mapActions, mapState } from "pinia";
import d$gelombang from "@/store/gelombang";
import d$tema from "@/store/tema";

import slackLogo from "@/assets/img/small-logos/logo-slack.svg";

export default {
  name: "IndexGelombangDaftarLokasi",
  components: {
    HeaderProfileCard,
    Card,
  },
  data() {
    return {
      id_halaman: 2,
      slackLogo,
      tema: "",
      choicesTema: undefined,
      indexComponent: 0,
      idGelombang: "",
      listGelombang: [],
    };
  },
  computed: {
    ...mapState(d$gelombang, ["g$listGelombang"]),
    ...mapState(d$tema, ["g$listTemaActive"]),
  },
  async created() {
    await this.a$listTema();
    this.tema = this.g$listTemaActive[0].id_tema;
    await this.getListGelombang();

    this.choicesTema = this.getChoices("choices-tema");
  },
  methods: {
    ...mapActions(d$gelombang, ["a$listGelombang"]),
    ...mapActions(d$tema, ["a$listTema"]),

    async getListGelombang() {
      this.indexComponent++;
      this.tema = parseInt(this.tema);

      try {
        await this.a$listGelombang(this.tema, this.id_halaman);
      } catch (error) {
        this.showSwal(
          "failed-message",
          error ?? "Terjadi kesalahan saat memuat data"
        );
        console.log(error);
      }
    },

    async getListGelombangStatis() {
      this.indexComponent++;
      this.tema = parseInt(this.tema);
      this.listGelombang = [];
      if (this.tema === 1) {
        this.listGelombang.push(
          {
            id_gelombang: 1,
            id_tema: 1,
            nama: "Gelombang 1 Dosen",
            status: 1,
          },
          {
            id_gelombang: 3,
            id_tema: 1,
            nama: "Gelombang 3 Dosen",
            status: 0,
          }
        );
      } else if (this.tema === 2) {
        this.listGelombang.push(
          {
            id_gelombang: 2,
            id_tema: 2,
            nama: "Gelombang 2 Dosen",
            status: -1,
          },
          {
            id_gelombang: 4,
            id_tema: 2,
            nama: "Gelombang 4 Dosen",
            status: 1,
          }
        );
      }

      var newListGelombang = [];
      this.listGelombang.forEach((gelombang) => {
        if (gelombang.status === 0) {
          gelombang.status = "Sedang diproses";
          let newGelombang = Object.assign({}, gelombang, {
            status_color: "secondary",
          });
          newListGelombang.push(newGelombang);
        } else if (gelombang.status === 1) {
          gelombang.status = "Diterima";
          let newGelombang = Object.assign({}, gelombang, {
            status_color: "success",
          });
          newListGelombang.push(newGelombang);
        } else {
          gelombang.status = "Ditolak";
          let newGelombang = Object.assign({}, gelombang, {
            status_color: "danger",
          });
          newListGelombang.push(newGelombang);
        }
      });

      this.listGelombang = newListGelombang;

      console.log(this.listGelombang);
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
            this.$swal.isLoading();
            if (this.$swal.isLoading()) this.$swal.showLoading();
          },
          didDestroy: () => {
            !this.$swal.isLoading();
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
