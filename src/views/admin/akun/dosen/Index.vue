<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <table-content-loader v-if="isLoading" />
        <div class="bg-white card mt-4" :hidden="isLoading">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Data Dosen</h5>
                <p class="text-sm mb-0">Data dosen terdaftar</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto d-flex flex-wrap">
                  <div class="my-0">
                    <router-link
                      class="mb-0 btn bg-gradient-success btn-sm"
                      :to="{ name: 'Tambah Dosen' }"
                      >+&nbsp; Tambah Dosen
                    </router-link>
                  </div>
                  <div class="my-0">
                    <button
                      type="button"
                      class="mx-2 mb-0 btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#import-dosen"
                    >
                      Impor
                    </button>
                  </div>
                  <div
                    id="import-dosen"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                    :key="indexComponent"
                  >
                    <div class="modal-dialog mt-lg-10">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title text-wrap">
                            Impor Data Dosen via File Excel
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
                            href="../others/Format Import Dosen - KKN UNDIP.xlsx"
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
                            id="form-import-dosen"
                            @submit.prevent="importDosen()"
                            enctype="multipart/form-data"
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
                            form="form-import-dosen"
                            type="submit"
                            class="btn bg-gradient-primary btn-sm"
                          >
                            Unggah
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="button-table"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-1 mt-4 card-body">
            <div class="table-responsive" :key="indexComponent">
              <table id="dosen-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      No.
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      Nama
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      NIP
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                      hidden
                    >
                      Jenis Kelamin
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                      hidden
                    >
                      Tanggal Lahir
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                      hidden
                    >
                      No. Telepon
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                      hidden
                    >
                      Alamat
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(dosen, index) in listDosen"
                    :key="dosen.id_dosen"
                    class="align-middle"
                    height="46px"
                  >
                    <td class="ps-4 text-sm">{{ index + 1 }}</td>
                    <td>
                      <h6 class="ps-3 my-auto">{{ dosen.nama }}</h6>
                    </td>
                    <td class="ps-4 text-sm">{{ dosen.nip }}</td>
                    <td class="ps-4 text-sm" hidden>
                      {{
                        dosen.jenis_kelamin == 1
                          ? "Laki-laki"
                          : dosen.jenis_kelamin == 2
                          ? "Perempuan"
                          : ""
                      }}
                    </td>
                    <td class="ps-4 text-sm" hidden>
                      {{
                        dosen.ttl
                          ? moment(dosen.ttl).format("DD MMMM YYYY")
                          : ""
                      }}
                    </td>
                    <td class="ps-4 text-sm" hidden>{{ dosen.no_hp }}</td>
                    <td class="ps-4 text-sm" hidden>{{ dosen.alamat }}</td>
                    <td class="ps-4 text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#detail_' + dosen.id_dosen"
                        title="Detail Dosen"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + dosen.id_dosen"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-lg mt-lg-5">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title text-wrap">
                                Detail Dosen {{ dosen.nama }}
                              </h5>
                              <button
                                type="button"
                                class="btn-close text-dark mb-0"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                <font-awesome-icon icon="fa-solid fa-xmark" />
                              </button>
                            </div>
                            <div class="modal-body p-4">
                              <div class="row">
                                <div
                                  class="col-lg-6 col-12 pt-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark"
                                    >Nama Lengkap:</strong
                                  >
                                  &nbsp;
                                  {{ dosen.nama }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 pt-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark">NIP:</strong>
                                  &nbsp;
                                  {{ dosen.nip }}
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark"
                                    >Jenis Kelamin:</strong
                                  >
                                  &nbsp;
                                  <span v-if="dosen.jenis_kelamin == 1"
                                    >Laki-laki</span
                                  >
                                  <span v-else-if="dosen.jenis_kelamin == 2"
                                    >Perempuan</span
                                  >
                                  <span v-else>-</span>
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark"
                                    >Tanggal Lahir:</strong
                                  >
                                  &nbsp;
                                  {{
                                    dosen.ttl
                                      ? moment(dosen.ttl).format("DD MMMM YYYY")
                                      : ""
                                  }}
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark">No Telepon:</strong>
                                  &nbsp;
                                  {{ dosen.no_hp }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark">Alamat:</strong>
                                  &nbsp;
                                  {{ dosen.alamat }}
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                      <a
                        :id="dosen.id_dosen"
                        href="#"
                        class="mx-3 edit"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Dosen"
                        title="Edit Dosen"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        :id="dosen.id_dosen"
                        :name="dosen.nama"
                        class="delete"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Dosen"
                        title="Hapus Dosen"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
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
import moment from "moment";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import d$dosen from "@/store/dosen";
import { mapActions, mapState } from "pinia";
import DataTable from "datatables.net-vue3";
import DataTableLib from "datatables.net-bs5";
import Buttons from "datatables.net-buttons-bs5";
import ButtonHtml5 from "datatables.net-buttons/js/buttons.html5";
import print from "datatables.net-buttons/js/buttons.print";
import pdfmake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "datatables.net-responsive-bs5";
import JsZip from "jszip";
pdfmake.vfs = pdfFonts.pdfMake.vfs;
window.JsZip = JsZip;
DataTable.use(DataTableLib);
DataTable.use(pdfmake);
DataTable.use(Buttons);
DataTable.use(ButtonHtml5);
DataTable.use(print);

export default {
  name: "IndexDosen",
  components: {
    HeaderProfileCard,
    TableContentLoader,
  },
  data() {
    return {
      indexComponent: 0,
      listDosen: [],
      isLoading: true,
      dataTable: undefined,
      body: {
        file: "",
      },
      moment,
      loader: undefined,
    };
  },
  computed: {
    ...mapState(d$dosen, ["g$listDosen"]),
  },
  async created() {
    moment.locale("id");

    await this.getInitData();
  },
  methods: {
    ...mapActions(d$dosen, ["a$listDosen", "a$importDosen", "a$deleteDosen"]),

    async getInitData() {
      this.isLoading = true;
      this.indexComponent++;

      try {
        await this.a$listDosen();
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

      this.listDosen = this.g$listDosen;

      setTimeout(() => {
        this.setupDataTable();
        this.setupTableAction();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async importDosen() {
      this.showSwal("loading");

      this.body.file = this.$refs.file.files[0];
      document.getElementById("button-close-modal").click();

      try {
        await this.a$importDosen(this.body);
        await this.getInitData();
        this.showSwal("success-message", "Data dosen berhasil diimpor!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat mengunggah data! " + msg
        );
      }
    },

    async deleteDosen(id_dosen) {
      this.showSwal("loading");

      try {
        await this.a$deleteDosen(parseInt(id_dosen));
        await this.getInitData();
        this.showSwal("success-message", "Data dosen berhasil dihapus!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }
    },

    setupDataTable() {
      if (this.dataTable) {
        this.dataTable.clear();
        this.dataTable.destroy();
      }

      if (document.getElementById("dosen-list")) {
        const dataTableSearch = $("#dosen-list").DataTable({
          pageLength: 5,
          lengthChange: true,
          lengthMenu: [5, 10, 25, 50, 75, 100],
          language: {
            paginate: {
              next: "&#155;", // or '→'
              previous: "&#139;", // or '←'
            },
          },
          // language: {
          //   url: "{{ url('/json/dataTable-id.json') }}",
          // },
          responsive: true,
          autoWidth: false,
          initComplete: function () {
            var api = this.api();

            new $.fn.dataTable.Buttons(api, {
              buttons: [
                {
                  extend: "csv",
                  text: "Ekspor",
                  title: "Data Dosen | KKN UNDIP",
                  exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6],
                  },
                  attr: {
                    class: "btn btn-outline-success btn-sm",
                    style: "height: 32px;",
                  },
                },
              ],
            });

            api.buttons().container().appendTo("#button-table");
          },
        });

        this.dataTable = dataTableSearch;
      }
    },

    // setupDataTable() {
    //   if (this.dataTable) {
    //     this.dataTable.clear();
    //     this.dataTable.destroy();
    //   }

    //   if (document.getElementById("dosen-list")) {
    //     const dataTableSearch = new DataTable("#dosen-list", {
    //       searchable: true,
    //       fixedHeight: false,
    //       perPage: 5,
    //     });

    //     document.querySelectorAll(".export").forEach(function (el) {
    //       el.addEventListener("click", function () {
    //         var type = el.dataset.type;

    //         var data = {
    //           type: type,
    //           filename: "Data Dosen",
    //         };

    //         // if (type === "csv") {
    //         //   data.columnDelimiter = "|";
    //         // }

    //         dataTableSearch.export(data);
    //       });
    //     });

    //     this.dataTable = dataTableSearch;
    //   }
    // },

    setupTableAction() {
      let outerThis = this;
      // edit
      $("#dosen-list").on("click", `.edit`, function (e) {
        let dosen = this;
        outerThis.$router.push({
          name: "Edit Dosen",
          params: {
            id_dosen: dosen.id,
          },
        });
        e.preventDefault();
      });

      // delete
      $("#dosen-list").on("click", `.delete`, function (e) {
        let dosen = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus akun dosen ${dosen.name}?`,
          "Berhasil menghapus data",
          dosen.id
        );
        e.preventDefault();
      });
    },

    showSwal(type, text, toastText, id_dosen) {
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
            this.deleteDosen(id_dosen);
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
