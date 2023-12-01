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
                <h5 class="mb-2">Data Administrator</h5>
                <p class="text-sm mb-0">Data administrator terdaftar</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto d-flex flex-wrap">
                  <div class="my-0 me-2">
                    <router-link
                      class="mb-0 btn bg-gradient-success btn-sm"
                      :to="{ name: 'Tambah Administrator' }"
                      >+&nbsp; Tambah Administrator
                    </router-link>
                  </div>
                  <div id="button-table"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-1 mt-4 card-body">
            <div class="table-responsive" :key="indexComponent">
              <table id="admin-list" class="table table-flush">
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
                    v-for="(admin, index) in listAdmin"
                    :key="admin.id_admin"
                    class="align-middle"
                    height="46px"
                  >
                    <td class="text-sm ps-4">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto ps-3">{{ admin.nama }}</h6>
                    </td>
                    <td class="text-sm ps-4">{{ admin.nip }}</td>
                    <td class="ps-4 text-sm" hidden>
                      {{
                        admin.jenis_kelamin == 1
                          ? "Laki-laki"
                          : admin.jenis_kelamin == 2
                          ? "Perempuan"
                          : ""
                      }}
                    </td>
                    <td class="ps-4 text-sm" hidden>
                      {{
                        admin.ttl
                          ? moment(admin.ttl).format("DD MMMM YYYY")
                          : ""
                      }}
                    </td>
                    <td class="ps-4 text-sm" hidden>{{ admin.no_hp }}</td>
                    <td class="ps-4 text-sm" hidden>{{ admin.alamat }}</td>
                    <td class="ps-4 text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#detail_' + admin.id_admin"
                        title="Detail Admin"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + admin.id_admin"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-lg mt-lg-5">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title text-wrap">
                                Detail Admin {{ admin.nama }}
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
                                  {{ admin.nama }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 pt-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark">NIP:</strong>
                                  &nbsp;
                                  {{ admin.nip }}
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark"
                                    >Jenis Kelamin:</strong
                                  >
                                  &nbsp;
                                  <span v-if="admin.jenis_kelamin == 1"
                                    >Laki-laki</span
                                  >
                                  <span v-else-if="admin.jenis_kelamin == 2"
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
                                    admin.ttl
                                      ? moment(admin.ttl).format("DD MMMM YYYY")
                                      : ""
                                  }}
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark">No Telepon:</strong>
                                  &nbsp;
                                  {{ admin.no_hp }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark">Alamat:</strong>
                                  &nbsp;
                                  {{ admin.alamat }}
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                      <a
                        type="button"
                        class="mx-3 mb-0"
                        data-bs-toggle="modal"
                        :data-bs-target="`#edit-admin-${admin.id_admin}`"
                        title="Edit Pimpinan"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <div
                        :id="`edit-admin-${admin.id_admin}`"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                        :key="indexComponent"
                      >
                        <div class="modal-dialog mt-lg-10">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title text-wrap">
                                Edit Pimpinan
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
                                :id="`form-edit-admin-${admin.id_admin}`"
                                @submit.prevent="editAdmin(this.id)"
                              >
                                <label class="form-label">Nama Lengkap</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="nama"
                                  :id="`nama-${admin.id_admin}`"
                                  placeholder="Nama admin"
                                  :value="admin.nama"
                                  required
                                />
                                <label class="form-label">NIP</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="nip"
                                  :id="`nip-${admin.id_admin}`"
                                  placeholder="NIP"
                                  :value="admin.nip"
                                  required
                                />
                              </form>
                            </div>
                            <div class="modal-footer">
                              <button
                                :id="`button-close-modal-${admin.id_admin}`"
                                type="button"
                                class="btn bg-gradient-secondary btn-sm"
                                data-bs-dismiss="modal"
                              >
                                Batal
                              </button>
                              <button
                                :id="admin.id_admin"
                                :form="`form-edit-admin-${admin.id_admin}`"
                                type="submit"
                                class="btn bg-gradient-primary btn-sm edit"
                              >
                                Simpan
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Administrator"
                        title="Hapus Administrator"
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
import d$admin from "@/store/admin";
import { mapState, mapActions } from "pinia";
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
  name: "IndexAdministrator",
  components: {
    HeaderProfileCard,
    TableContentLoader,
  },
  computed: {
    ...mapState(d$admin, ["g$listAdmin"]),
  },
  data() {
    return {
      indexComponent: 0,
      moment,
      listAdmin: [],
      isLoading: true,
      loader: undefined,
    };
  },
  async created() {
    await this.getInitData();
  },
  methods: {
    ...mapActions(d$admin, ["a$listAdmin", "a$editAdmin"]),

    async getInitData() {
      this.isLoading = true;
      this.indexComponent++;

      try {
        await this.a$listAdmin();
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

      this.listAdmin = this.g$listAdmin;

      setTimeout(() => {
        this.setupDataTable();
        this.setupTableAction();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async editAdmin(id) {
      this.showSwal("loading");

      id = parseInt(id);
      let data = {
        nama: $(`#nama-${id}`).val(),
        nip: $(`#nip-${id}`).val(),
      };

      if (data.nama === "" || data.nip === "") {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      data.nip = data.nip.toString();

      try {
        document.getElementById(`button-close-modal-${id}`).click();
        await this.a$editAdmin(id, data);
        this.showSwal("success-message", "Data reviewer berhasil disimpan!");

        await this.getInitData();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data reviewer gagal disimpan! " + msg);
      }
    },

    setupTableAction() {
      let outerThis = this;
      // edit
      $("#admin-list").on("click", `.edit`, function (e) {
        let admin = this;
        outerThis.editAdmin(admin.id);
        e.preventDefault();
      });

      // delete
      // $("#admin-list").on("click", `.delete`, function (e) {
      //   let admin = this;
      //   outerThis.showSwal(
      //     "warning-confirmation",
      //     `Hapus akun admin ${admin.name}?`,
      //     "Berhasil menghapus data",
      //     admin.id
      //   );
      //   e.preventDefault();
      // });
    },

    setupDataTable() {
      if (this.dataTable) {
        this.dataTable.clear();
        this.dataTable.destroy();
      }

      if (document.getElementById("admin-list")) {
        const dataTableSearch = $("#admin-list").DataTable({
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
                  title: "Data Admin | KKN UNDIP",
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

    getChoices(id) {
      var element = document.getElementById(id);
      if (element) {
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
        });
      }
    },

    showSwal(type, text, toastText, id_admin) {
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
            this.deleteReviewer(id_admin);
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
  },
};
</script>
