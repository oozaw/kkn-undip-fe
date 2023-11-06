<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard />
        <ChoicesContentLoader v-if="isLoadingOnInit" />
        <div class="bg-white card mt-4" :hidden="isLoadingOnInit">
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
                v-model="id_tema"
                @change="getListProposal()"
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
        <TableContentLoader v-if="isLoading" />
        <div class="bg-white card mt-4" :hidden="isLoading">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Data Pendaftaran & Lokasi</h5>
                <p class="text-sm mb-0">
                  Data Pendaftaran Serta Lokasi KKN Dosen
                </p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    class="mt-2 mb-0 btn btn-outline-success btn-sm export-pendaftaran mt-sm-0"
                    data-type="csv"
                    type="button"
                    name="button"
                  >
                    Ekspor
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="ms-2 pt-1 px-0 pb-0 card-body">
            <div class="table-responsive" :key="indexComponent">
              <table id="pendaftaran-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th>Nama</th>
                    <th>NIP</th>
                    <th>Lokasi Dipilih</th>
                    <th>Proposal</th>
                    <th>Status</th>
                    <th>Rekomendasi</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(proposal, index) in listProposal"
                    :key="proposal.id_proposal"
                  >
                    <td class="text-sm ps-3">{{ index + 1 }}</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">{{ proposal.dosen.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ proposal.dosen.nip }}</td>
                    <td class="text-sm">
                      {{
                        `${proposal.kecamatan.kabupaten.nama}, ${proposal.kecamatan.nama}`
                      }}
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
                        >Sedang diproses</span
                      >
                      <span v-else class="badge badge-danger">Ditolak</span>
                    </td>
                    <td class="text-sm">
                      <span
                        v-if="proposal.rekomendasi == 1"
                        class="badge badge-success"
                        >Direkomendasikan</span
                      >
                      <span v-else class="badge badge-danger"
                        >Tidak Direkomendasikan</span
                      >
                    </td>
                    <td class="text-sm d-block">
                      <a
                        :id="proposal.id_proposal"
                        class="me-3 detail"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Dosen"
                        title="Detail Dosen"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        v-if="g$user.role === 'REVIEWER'"
                        :id="proposal.id_proposal"
                        :name="proposal.dosen.nama"
                        href="#"
                        class="me-3 edit"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Evaluasi Proposal"
                        title="Evaluasi Proposal"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <div
                        v-if="g$user.role === 'ADMIN'"
                        id="admin-action-section"
                        class="d-inline"
                      >
                        <a
                          v-if="proposal.status == 1"
                          :id="proposal.id_proposal"
                          :name="proposal.dosen.nama"
                          class="me-3 tolak"
                          href=""
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Tolak Kecamatan"
                          title="Tolak"
                        >
                          <font-awesome-icon
                            class="text-danger"
                            icon="fa-solid fa-square-xmark"
                            size="xl"
                          />
                        </a>
                        <a
                          v-else
                          :id="proposal.id_proposal"
                          :name="proposal.dosen.nama"
                          class="me-3 terima"
                          href=""
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Terima Kecamatan"
                          title="Terima"
                        >
                          <font-awesome-icon
                            class="text-success"
                            icon="fa-solid fa-square-check"
                            size="xl"
                          />
                        </a>
                        <a
                          :id="proposal.id_proposal"
                          :name="proposal.dosen.nama"
                          class="me-3 delete"
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Hapus Dosen"
                          title="Hapus Dosen"
                        >
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th>Nama</th>
                    <th>NIP</th>
                    <th>Lokasi Dipilih</th>
                    <th>Status</th>
                    <th></th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { DataTable } from "simple-datatables";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import ChoicesContentLoader from "@/views/dashboards/components/ChoicesContentLoader.vue";
import { mapActions, mapState } from "pinia";
import d$dokumen from "@/store/dokumen";
import d$proposal from "@/store/proposal";
import d$tema from "@/store/tema";
import d$auth from "@/store/auth";

export default {
  name: "IndexPendaftaranDosenAdmin",
  components: {
    HeaderProfileCard,
    TableContentLoader,
    ChoicesContentLoader,
  },
  data() {
    return {
      id_tema: 1,
      isLoadingOnInit: true,
      isLoading: true,
      listProposal: [],
      indexComponent: 0,
      choicesTema: undefined,
      choicesBappeda: undefined,
    };
  },
  computed: {
    ...mapState(d$tema, ["g$listTemaActive"]),
    ...mapState(d$proposal, ["g$listProposal"]),
    ...mapState(d$auth, ["g$user"]),
    ...mapState(d$dokumen, ["g$dokumenLink"]),
  },
  async created() {
    await this.getInitData();
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
    if (this.choicesBappeda) this.choicesBappeda.destroy();
  },
  methods: {
    ...mapActions(d$proposal, [
      "a$listProposal",
      "a$accProposal",
      "a$decProposal",
      "a$deleteProposal",
    ]),
    ...mapActions(d$tema, ["a$listTema"]),
    ...mapActions(d$dokumen, ["a$getDokumenLink"]),

    async getInitData() {
      this.isLoadingOnInit = true;

      try {
        await this.a$listTema();
        this.id_tema = this.g$listTemaActive[0].id_tema;
        await this.getListProposal();
        this.choicesTema = this.getChoices("choices-tema");
        this.choicesBappeda = this.getChoices("choices-bappeda");
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
        this.isLoadingOnInit = false;
      }, 50);
    },

    async getListProposal() {
      this.isLoading = true;

      this.indexComponent++;
      this.id_tema = parseInt(this.id_tema);

      try {
        await this.a$listProposal(this.id_tema);
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

      this.listProposal = this.g$listProposal;

      setTimeout(() => {
        this.setupDataTable();
        this.setupTableAction();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async accProposal(id_proposal) {
      this.showSwal("loading");

      try {
        await this.a$accProposal(id_proposal);
        await this.getListProposal();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diperbarui! " + msg);
      }
    },

    async decProposal(id_proposal) {
      this.showSwal("loading");

      try {
        await this.a$decProposal(id_proposal);
        await this.getListProposal();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diperbarui! " + msg);
      }
    },

    async deleteProposal(id_proposal) {
      this.showSwal("loading");

      try {
        await this.a$deleteProposal(id_proposal);
        await this.getListProposal();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }
    },

    getChoices(id) {
      var element = document.getElementById(id);
      if (element) {
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
        });
      }
    },

    setupDataTable() {
      if (document.getElementById("pendaftaran-list")) {
        const dataTableSearch = new DataTable("#pendaftaran-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export-pendaftaran").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              // tambah nama yang lebih spesifik, cth: nama bappeda / daerah
              filename: "Data Pendaftaran & Lokasi Dosen",
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
      // proposal detail
      $("#pendaftaran-list").on("click", `.detail`, function (e) {
        let proposal = this;
        outerThis.$router.push({
          name: "Detail Pendaftaran Dosen Admin",
          params: { id_proposal: proposal.id },
        });
        e.preventDefault();
      });

      // proposal download link
      $("#pendaftaran-list").on("click", `.proposal-download`, function (e) {
        let proposal = this;
        outerThis.a$getDokumenLink(proposal.id).then((res) => window.open(res));
        e.preventDefault();
      });

      // evaluate proposal page
      $("#pendaftaran-list").on("click", ".edit", function (e) {
        let proposal = this;
        outerThis.$router.push({
          name: "Evaluasi Proposal",
          params: { id_proposal: proposal.id },
        });
        e.preventDefault();
      });

      // acc proposal event
      $("#pendaftaran-list").on("click", `.terima`, function (e) {
        let proposal = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menerima pendaftaran ${proposal.name}?`,
          "Berhasil memperbarui data",
          proposal.id,
          false,
          true
        );
        e.preventDefault();
      });

      // dec proposal event
      $("#pendaftaran-list").on("click", `.tolak`, function (e) {
        let proposal = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menolak pendaftaran ${proposal.name}?`,
          "Berhasil memperbarui data",
          proposal.id,
          false,
          false
        );
        e.preventDefault();
      });

      // dec proposal event
      $("#pendaftaran-list").on("click", `.tolak`, function (e) {
        let proposal = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menolak pendaftaran ${proposal.name}?`,
          "Berhasil memperbarui data",
          proposal.id,
          false,
          false
        );
        e.preventDefault();
      });

      // delete
      $("#pendaftaran-list").on("click", `.delete`, function (e) {
        let proposal = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menghapus pendaftaran ${proposal.name}?`,
          "Berhasil menghapus data",
          proposal.id,
          true
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

    showSwal(type, text, toastText, id_proposal, isDelete = false, status) {
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
            if (isDelete) this.deleteProposal(id_proposal);
            else if (!isDelete && status) this.accProposal(id_proposal);
            else this.decProposal(id_proposal);
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
