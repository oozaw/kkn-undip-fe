<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
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
        <div class="bg-white card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Data Registrasi KKN</h5>
                <p class="text-sm mb-0">
                  Registrasi KKN, Submit Proposal, Daftar Lokasi
                </p>
              </div>
            </div>
          </div>
          <div class="ms-2 pt-1 px-0 pb-0 card-body">
            <div class="table-responsive" :key="indexComponent">
              <table id="registrasi-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Wilayah KKN</th>
                    <th>Periode</th>
                    <th>Proposal</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(proposal, index) in listProposalDosen"
                    :key="proposal.id_proposal"
                  >
                    <td class="text-sm">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto">{{ proposal.kecamatan.nama }}</h6>
                    </td>
                    <td class="text-sm">
                      {{ proposal.kecamatan.kabupaten.tema.periode }}
                    </td>
                    <td class="text-sm">
                      <a
                        :id="proposal.id_dokumen"
                        type="button"
                        class="mb-0 text-primary proposal-download"
                      >
                        Download
                      </a>
                    </td>
                    <td class="text-sm">
                      <span
                        v-if="proposal.status == 1"
                        class="badge badge-success"
                        >Diterima</span
                      >
                      <span
                        v-else-if="proposal.status == 0"
                        class="badge badge-primary"
                        >Sedang Diproses</span
                      >
                      <span v-else class="badge badge-danger">Ditolak</span>
                    </td>
                    <td class="text-sm">
                      <a
                        :id="proposal.id_proposal"
                        class="me-3 detail"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Proposal"
                        title="Detail Proposal"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        class="delete"
                        :id="proposal.id_proposal"
                        :name="proposal.kecamatan.nama"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Proposal"
                        title="Hapus Proposal"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Wilayah KKN</th>
                    <th>Periode</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div id="card-section" class="row" :key="indexComponent">
          <div
            class="col-lg-6"
            v-for="gel in g$listGelombang"
            :key="gel.id_gelombang"
          >
            <card
              :is-dosen="true"
              :title="gel.nama"
              :status="gel.status"
              :list-proposal="gel.proposal"
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
              <template #button v-if="gel.status">
                <router-link
                  :to="{
                    name: 'Tambah Registrasi',
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
import $ from "jquery";
import moment from "moment";
import Choices from "choices.js";
import { DataTable } from "simple-datatables";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import Card from "@/views/dashboards/components/Cards/GelombangCard.vue";
import { mapActions, mapState } from "pinia";
import d$proposal from "@/store/proposal";
import d$gelombang from "@/store/gelombang";
import d$tema from "@/store/tema";
import d$dokumen from "@/store/dokumen";
import d$auth from "@/store/auth";

export default {
  name: "IndexRegistrasiKKN",
  components: {
    HeaderProfileCard,
    Card,
  },
  data() {
    return {
      id_halaman: 1,
      tema: 1,
      namaTema: "",
      choicesTema: undefined,
      indexComponent: 0,
      listGelombang: [],
      listProposalDosen: [],
      moment,
      loader: undefined,
    };
  },
  computed: {
    ...mapState(d$auth, ["g$infoUser"]),
    ...mapState(d$proposal, ["g$listProposal"]),
    ...mapState(d$gelombang, ["g$listGelombang"]),
    ...mapState(d$tema, ["g$listTemaActive"]),
    ...mapState(d$dokumen, ["g$dokumenLink"]),
  },
  async created() {
    this.showLoading(true);

    moment.locale("id");

    await this.a$listTema();
    this.tema = this.g$listTemaActive[0].id_tema;

    await this.getListGelombang();

    this.choicesTema = this.getChoices("choices-tema");
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$proposal, ["a$listProposal", "a$deleteProposal"]),
    ...mapActions(d$gelombang, ["a$listGelombangDosen"]),
    ...mapActions(d$tema, ["a$listTema"]),
    ...mapActions(d$dokumen, ["a$getDokumenLink"]),

    async getListGelombang() {
      this.showLoading(true);

      this.indexComponent++;
      this.tema = parseInt(this.tema);

      try {
        await this.getTema();
        await this.a$listGelombangDosen(
          this.tema,
          this.id_halaman,
          this.g$infoUser.id_dosen
        );
        await this.getListProposal(this.tema);
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

      this.setupDataTable();

      this.showLoading(false);
    },

    async getListProposal(id_tema) {
      try {
        await this.a$listProposal(id_tema);
        this.listProposalDosen = [];
        await this.g$listProposal.forEach((proposal) => {
          if (proposal.id_dosen === this.g$infoUser.id_dosen)
            this.listProposalDosen.push(proposal);
        });
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

      this.setupDataTable();
      this.setupTableAction();
      this.setupDataTableGelombang();
    },

    async deleteProposal(id_proposal) {
      this.showSwal("loading");

      try {
        await this.a$deleteProposal(id_proposal);
        await this.getListGelombang();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }
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

    setupDataTableGelombang() {
      this.g$listGelombang.forEach((gel) => {
        if (document.getElementById(`pendaftaran-list-${gel.id_gelombang}`)) {
          return new DataTable(`#pendaftaran-list-${gel.id_gelombang}`, {
            searchable: false,
            fixedHeight: false,
            perPage: 5,
          });
        }
      });
    },

    setupDataTable() {
      if (document.getElementById("registrasi-list")) {
        const dataTableSearch = new DataTable("#registrasi-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Registrasi Dosen",
            };

            // if (type === "csv") {
            //   data.columnDelimiter = "|";
            // }

            dataTableSearch.export(data);
          });
        });
      }
    },

    setupTableAction() {
      let outerThis = this;
      $("#registrasi-list").on("click", `.proposal-download`, function (e) {
        let proposal = this;
        outerThis.a$getDokumenLink(proposal.id).then((res) => window.open(res));
        e.preventDefault();
      });

      $("#registrasi-list").on("click", `.detail`, function (e) {
        let proposal = this;
        outerThis.$router.push({
          name: "Detail Pendaftaran Dosen Admin",
          params: { id_proposal: proposal.id },
        });
        e.preventDefault();
      });

      // delete
      $("#registrasi-list").on("click", `.delete`, function (e) {
        let proposal = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menghapus pendaftaran di kecamatan ${proposal.name}?`,
          "Berhasil menghapus data",
          proposal.id
        );
        e.preventDefault();
      });
    },

    showLoading(isLoading) {
      if (isLoading && !this.loader) {
        this.loader = this.$loading.show();
      } else if (!isLoading && this.loader) {
        setTimeout(() => {
          this.loader.hide();
          this.loader = undefined;
        }, 400);
      }
    },

    showSwal(type, text, toastText, id_proposal) {
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
            this.deleteProposal(id_proposal);
            this.$swal({
              toast: true,
              position: "top-end",
              title: toastText,
              icon: "success",
              showConfirmButton: false,
              timer: 2500,
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
