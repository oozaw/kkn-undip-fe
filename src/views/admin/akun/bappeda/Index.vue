<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <div class="bg-white card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Data BAPPEDA</h5>
                <p class="text-sm mb-0">Data BAPPEDA terdaftar</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link
                    class="mb-0 btn bg-gradient-success btn-sm"
                    :to="{ name: 'Tambah Bappeda' }"
                    >+&nbsp; Tambah BAPPEDA
                  </router-link>
                  <button
                    type="button"
                    class="mx-2 mb-0 btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#import-bappeda"
                  >
                    Impor
                  </button>
                  <div
                    id="import-bappeda"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                    :key="indexComponent"
                  >
                    <div class="modal-dialog mt-lg-10">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title">
                            Impor Data BAPPEDA via File Excel
                          </h5>
                          <i class="fas fa-upload ms-3"></i>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <p class="mb-1">
                            Silahkan download dan isi format file di bawah ini!
                          </p>
                          <a
                            href="../others/Format Import BAPPEDA - KKN UNDIP.xlsx"
                            target="_blank"
                            class="btn btn-success d-inline-block"
                          >
                            <font-awesome-icon
                              class="me-1"
                              icon="fa-solid fa-file-arrow-down"
                            />
                            Download Format File
                          </a>
                          <form
                            role="form"
                            id="form-import-bappeda"
                            enctype="multipart/form-data"
                            @submit.prevent="importBappeda()"
                          >
                            <input
                              id="file"
                              name="file"
                              ref="file"
                              type="file"
                              placeholder="Browse file..."
                              class="mb-1 form-control"
                              required
                            />
                          </form>
                          <div>
                            <small class="text-danger text-sm-start">
                              <i class="fas fa-info-circle"></i>
                              File yang diizinkan hanya file excel dengan
                              ekstensi .xls atau .xlsx
                            </small>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            id="button-close-modal"
                            type="button"
                            class="btn bg-gradient-secondary btn-sm"
                            data-bs-dismiss="modal"
                          >
                            Batal
                          </button>
                          <button
                            form="form-import-bappeda"
                            type="submit"
                            class="btn bg-gradient-primary btn-sm"
                          >
                            Unggah
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    class="mt-1 mb-0 btn btn-outline-success btn-sm export mt-sm-0"
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
          <div class="pt-1 px-0 pb-0 card-body">
            <div class="table-responsive" :key="indexComponent">
              <table id="bappeda-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Nama</th>
                    <th>Nomor BAPPEDA</th>
                    <th>Daerah (Kecamatan/Desa)</th>
                    <th>Penanggung Jawab</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(bappeda, index) in g$listBappeda"
                    :key="bappeda.id_bappeda"
                  >
                    <td class="text-sm">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto">{{ bappeda.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ bappeda.nb }}</td>
                    <td class="text-sm">3/8</td>
                    <td class="text-sm">{{ bappeda.nama_pj }}</td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail BAPPEDA"
                        title="Detail BAPPEDA"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit BAPPEDA"
                        title="Edit BAPPEDA"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        :id="bappeda.id_bappeda"
                        :name="bappeda.nama"
                        class="delete"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus BAPPEDA"
                        title="Hapus BAPPEDA"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Nama</th>
                    <th>Nomor BAPPEDA</th>
                    <th>Daerah (Kecamatan/Desa)</th>
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
import Choices from "choices.js";
import { DataTable } from "simple-datatables";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import d$bappeda from "@/store/bappeda";
import { mapActions, mapState } from "pinia";

export default {
  name: "IndexBappeda",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      indexComponent: 0,
      body: {
        file: "",
      },
      choicesTema: undefined,
      dataTable: undefined,
    };
  },
  computed: {
    ...mapState(d$bappeda, ["g$listBappeda"]),
  },
  async created() {
    await this.getInitData();

    // this.choicesTema = this.getChoices("choices-tema");
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$bappeda, [
      "a$listBappeda",
      "a$importBappeda",
      "a$deleteBappeda",
    ]),

    async getInitData() {
      try {
        await this.a$listBappeda();
      } catch (error) {
        if (error) this.showSwal("failed-message", error);
        else
          this.showSwal(
            "failed-message",
            "Terjadi kesalahan saat memuat data!"
          );
        console.log(error);
      }

      this.setupDataTable();
      this.setupTableAction();
    },

    async importBappeda() {
      this.showSwal("loading");

      this.body.file = this.$refs.file.files[0];
      this.indexComponent++;
      document.getElementById("button-close-modal").click();

      try {
        await this.a$importBappeda(this.body);
        await this.a$listBappeda();
        this.showSwal("success-message", "Data BAPPEDA berhasil diimpor!");
      } catch (error) {
        if (error) this.showSwal("failed-message", error);
        else
          this.showSwal(
            "failed-message",
            "Terjadi kesalahan saat mengimpor data!"
          );
        console.log(error);
      }

      this.setupDataTable();
      this.setupTableAction();
    },

    async deleteBappeda(id_bappeda) {
      this.showSwal("loading");

      this.indexComponent++;

      try {
        await this.a$deleteBappeda(parseInt(id_bappeda));
        await this.a$listBappeda();
        this.showSwal("success-message", "Data bappeda berhasil dihapus!");
      } catch (error) {
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat memperbarui data! " + error.error
        );
        console.log(error);
      }

      this.setupDataTable();
      this.setupTableAction();
    },

    setupDataTable() {
      if (this.dataTable) {
        this.dataTable.clear();
        this.dataTable.destroy();
      }

      if (document.getElementById("bappeda-list")) {
        const dataTableSearch = new DataTable("#bappeda-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Bappeda",
            };

            // if (type === "csv") {
            //   data.columnDelimiter = "|";
            // }

            dataTableSearch.export(data);
          });
        });

        this.dataTable = dataTableSearch;
      }
    },

    setupTableAction() {
      let outerThis = this;
      // delete
      $("#bappeda-list").on("click", `.delete`, function (e) {
        let bappeda = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus akun bappeda ${bappeda.name}?`,
          "Berhasil menghapus data",
          bappeda.id
        );
        e.preventDefault();
      });
    },

    showSwal(type, text, toastText, id_bappeda) {
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
            this.deleteBappeda(id_bappeda);
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

    getChoices(id) {
      var element = document.getElementById(id);
      if (element) {
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
        });
      }
    },
  },
};
</script>
