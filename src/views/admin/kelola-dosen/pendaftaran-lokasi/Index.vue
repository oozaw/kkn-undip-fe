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
          <div class="card-header pb-0 pt-0">
            <p class="font-weight-bold text-dark mb-2">Pilih BAPPEDA</p>
          </div>
          <div class="pb-3 pt-0 card-body">
            <div class="col-12 align-self-center">
              <select
                id="choices-bappeda"
                class="form-control"
                name="choices-bappeda"
              >
                <option value="dosen">BAPPEDA A</option>
                <option value="Dosen">BAPPEDA B</option>
                <option value="bappeda">BAPPEDA C</option>
              </select>
            </div>
          </div>
        </div>
        <div class="bg-white card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Data Pendaftaran & Lokasi</h5>
                <p class="text-sm mb-0">
                  Data pendaftaran serta lokasi kkn dosen
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
                    <th>Gelombang</th>
                    <th>Lokasi Dipilih</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(proposal, index) in g$listProposal"
                    :key="proposal.id_proposal"
                  >
                    <td class="text-sm ps-3">{{ index + 1 }}</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">{{ proposal.dosen.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ proposal.dosen.nip }}</td>
                    <td class="text-sm">{{ proposal.gelombang.nama }}</td>
                    <td class="text-sm">
                      {{
                        `${proposal.kecamatan.kabupaten.nama}, ${proposal.kecamatan.nama}`
                      }}
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
                      <a
                        class="me-3 detail"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Dosen"
                        title="Detail Dosen"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        class="me-3 hapus"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Dosen"
                        title="Hapus Dosen"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                      <a
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
                      <!-- <a
                        class="me-3"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Verifikasi Kecamatan"
                        title="Verifikasi"
                      >
                        <font-awesome-icon
                          class="text-warning"
                          icon="fa-solid fa-square-minus"
                          size="xl"
                        />
                      </a> -->
                      <a
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
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th>Nama</th>
                    <th>NIP</th>
                    <th>Gelombang</th>
                    <th>Lokasi Dipilih</th>
                    <th>Status</th>
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
import setTooltip from "@/assets/js/tooltip.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$proposal from "@/store/proposal";
import d$tema from "@/store/tema";

export default {
  name: "IndexPendaftaranDosenAdmin",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      id_tema: 1,
      indexComponent: 0,
      choicesTema: undefined,
      choicesBappeda: undefined,
    };
  },
  computed: {
    ...mapState(d$tema, ["g$listTemaActive"]),
    ...mapState(d$proposal, ["g$listProposal"]),
  },
  async created() {
    await this.a$listTema();
    this.id_tema = this.g$listTemaActive[0].id_tema;
    await this.getListProposal();

    this.choicesTema = this.getChoices("choices-tema");
    this.choicesBappeda = this.getChoices("choices-bappeda");

    setTooltip(this.$store.state.bootstrap);
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
    ]),
    ...mapActions(d$tema, ["a$listTema"]),

    async getListProposal() {
      this.indexComponent++;
      this.id_tema = parseInt(this.id_tema);

      try {
        await this.a$listProposal(this.id_tema);
      } catch (error) {
        this.showSwal("failed-message", "Terjadi kesalahan saat memuat data");
        console.log(error);
      }

      this.setupDataTable();
      this.setupTableAction();
    },

    async accProposal(id_proposal) {
      this.showSwal("loading");

      try {
        await this.a$accProposal(id_proposal);
        await this.getListProposal();
      } catch (error) {
        this.showSwal(
          "failed-message",
          error ?? "Terjadi kesalahan saat mengubah data"
        );
        // console.log(error);
      }

      // this.showSwal("close");
    },

    async decProposal(id_proposal) {
      this.showSwal("loading");

      try {
        await this.a$decProposal(id_proposal);
        await this.getListProposal();
      } catch (error) {
        this.showSwal(
          "failed-message",
          error ?? "Terjadi kesalahan saat mengubah data"
        );
        // console.log(error);
      }

      // this.showSwal("close");
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
      $("#pendaftaran-list").on("click", `.terima`, function (e) {
        let proposal = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menerima pengajuan kecamatan ${proposal.name}?`,
          "Berhasil memperbarui data",
          proposal.id,
          true
        );
        e.preventDefault();
      });
      $("#pendaftaran-list").on("click", `.tolak`, function (e) {
        let proposal = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menolak pengajuan kecamatan ${proposal.name}?`,
          "Berhasil memperbarui data",
          proposal.id,
          false
        );
        e.preventDefault();
      });
    },

    showSwal(type, text, toastText, id_proposal, status) {
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
            if (status) this.accProposal(id_proposal);
            else this.decProposal(id_proposal);
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
