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
                <h5 class="mb-2">Data Koordinator Wilayah</h5>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    type="button"
                    class="mb-0 btn btn-success btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#add-korwil"
                  >
                    + Tambah Koordinator Wilayah
                  </button>
                  <div
                    id="add-korwil"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                    :key="indexComponent"
                  >
                    <div class="modal-dialog mt-lg-10">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title">
                            Tambah Koordinator Wilayah
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
                          <form
                            role="form"
                            id="form-add-korwil"
                            @submit.prevent="addKorwil()"
                          >
                            <label class="form-label">Nama</label>
                            <input
                              class="form-control"
                              type="text"
                              name="nama"
                              id="nama"
                              placeholder="Nama koordinator wilayah"
                              required
                              v-model="body.nama"
                            />
                            <label class="form-label mt-3"
                              >Nomor Induk Korwil</label
                            >
                            <input
                              class="form-control"
                              type="text"
                              name="nomor"
                              id="nomor"
                              placeholder="Nomor induk koordinator wilayah"
                              required
                              v-model="body.nk"
                            />
                          </form>
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
                            form="form-add-korwil"
                            type="submit"
                            class="btn bg-gradient-success btn-sm"
                          >
                            Tambah
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="mx-2 mb-0 btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#import-reviewer"
                  >
                    Impor
                  </button>
                  <div
                    id="import-reviewer"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                    :key="indexComponent"
                  >
                    <div class="modal-dialog mt-lg-10">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title">
                            Impor Data Korwil via File Excel
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
                            href="../others/Format Import Reviewer - KKN UNDIP.xlsx"
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
                            id="form-import-reviewer"
                            enctype="multipart/form-data"
                            @submit.prevent="importReviewer()"
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
                            form="form-import-reviewer"
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
              <table id="korwil-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Nama</th>
                    <th>Nomor Induk</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(korwil, index) in g$listKorwil"
                    :key="korwil.id_korwil"
                  >
                    <td class="text-sm">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto">{{ korwil.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ korwil.nk }}</td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Korwil"
                        title="Detail Korwil"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Korwil"
                        title="Edit Korwil"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        :id="korwil.id_korwil"
                        :name="korwil.nama"
                        class="delete"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Korwil"
                        title="Hapus Korwil"
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
                    <th>Nomor Induk</th>
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
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$korwil from "@/store/korwil";

export default {
  name: "IndexKorwil",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      body: {
        nama: "",
        nk: "",
      },
      indexComponent: 0,
      dataTable: undefined,
    };
  },
  computed: {
    ...mapState(d$korwil, ["g$listKorwil"]),
  },
  async created() {
    await this.getListKorwil();
  },
  methods: {
    ...mapActions(d$korwil, ["a$listKorwil", "a$addKorwil", "a$deleteKorwil"]),

    async addKorwil() {
      this.showSwal("loading");

      // validation
      if (this.body.nama == "" || this.body.nk == "") {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      try {
        document.getElementById("button-close-modal").click();
        await this.a$addKorwil(this.body);
        await this.getListKorwil();
        this.showSwal("success-message", "Data korwil berhasil ditambahkan!");
        this.body.nama = "";
        this.body.nk = "";
      } catch (error) {
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat menyimpan data! " + error.error
        );
        console.log(error.error);
      }
    },

    async getListKorwil() {
      this.indexComponent++;

      try {
        await this.a$listKorwil();
      } catch (error) {
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat memuat data!" + error
        );
        console.log(error);
      }

      this.setupDataTable();
      this.setupTableAction();
    },

    async deleteKorwil(id_korwil) {
      this.showSwal("loading");

      this.indexComponent++;

      try {
        await this.a$deleteKorwil(parseInt(id_korwil));
        await this.a$listKorwil();
        this.showSwal("success-message", "Data korwil berhasil dihapus!");
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

      if (document.getElementById("korwil-list")) {
        const dataTableSearch = new DataTable("#korwil-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Koordinator Wilayah",
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
      $("#korwil-list").on("click", `.delete`, function (e) {
        let korwil = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus akun korwil ${korwil.name}?`,
          "Berhasil menghapus data",
          korwil.id
        );
        e.preventDefault();
      });
    },

    showSwal(type, text, toastText, id_korwil) {
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
            this.deleteKorwil(id_korwil);
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
