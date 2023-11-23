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
                <h5 class="mb-2">Data Koordinator Wilayah</h5>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto d-flex flex-wrap">
                  <div class="my-0">
                    <button
                      v-if="g$user.role === 'ADMIN'"
                      type="button"
                      class="mb-0 btn btn-success btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#add-korwil"
                    >
                      + Tambah Koordinator Wilayah
                    </button>
                  </div>
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
                          <h5 id="ModalLabel" class="modal-title text-wrap">
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
                            id="button-close-modal-add"
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
                  <div class="my-0">
                    <button
                      v-if="g$user.role === 'ADMIN'"
                      type="button"
                      class="mx-2 mb-0 btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#import-korwil"
                    >
                      Impor
                    </button>
                  </div>
                  <div
                    id="import-korwil"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                    :key="indexComponent"
                  >
                    <div class="modal-dialog mt-lg-10">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title text-wrap">
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
                            href="../others/Format Import Korwil - KKN UNDIP.xlsx"
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
                            id="form-import-korwil"
                            enctype="multipart/form-data"
                            @submit.prevent="importKorwil()"
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
                            id="button-close-modal-impor"
                            type="button"
                            class="btn bg-gradient-secondary btn-sm"
                            data-bs-dismiss="modal"
                          >
                            Batal
                          </button>
                          <button
                            form="form-import-korwil"
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
              <table id="korwil-list" class="table table-flush">
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
                      Nomor Induk
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
                    v-for="(korwil, index) in listKorwil"
                    :key="korwil.id_korwil"
                    class="align-middle"
                    height="46px"
                  >
                    <td class="ps-4 text-sm">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto">{{ korwil.nama }}</h6>
                    </td>
                    <td class="ps-4 text-sm">{{ korwil.nk }}</td>
                    <td class="ps-4 text-sm" hidden>
                      {{
                        korwil.jenis_kelamin == 1
                          ? "Laki-laki"
                          : korwil.jenis_kelamin == 2
                          ? "Perempuan"
                          : ""
                      }}
                    </td>
                    <td class="ps-4 text-sm" hidden>
                      {{
                        korwil.ttl
                          ? moment(korwil.ttl).format("DD MMMM YYYY")
                          : ""
                      }}
                    </td>
                    <td class="ps-4 text-sm" hidden>{{ korwil.no_hp }}</td>
                    <td class="ps-4 text-sm" hidden>{{ korwil.alamat }}</td>
                    <td class="ps-4 text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#detail_' + korwil.id_korwil"
                        title="Detail Korwil"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + korwil.id_korwil"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-lg mt-lg-5">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title">
                                Detail Korwil {{ korwil.nama }}
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
                                  {{ korwil.nama }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 pt-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark">NIP:</strong>
                                  &nbsp;
                                  {{ korwil.nk }}
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark"
                                    >Jenis Kelamin:</strong
                                  >
                                  &nbsp;
                                  <span v-if="korwil.jenis_kelamin == 1"
                                    >Laki-laki</span
                                  >
                                  <span v-else-if="korwil.jenis_kelamin == 2"
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
                                    korwil.ttl
                                      ? moment(korwil.ttl).format(
                                          "DD MMMM YYYY"
                                        )
                                      : ""
                                  }}
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark">No Telepon:</strong>
                                  &nbsp;
                                  {{ korwil.no_hp }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark">Alamat:</strong>
                                  &nbsp;
                                  {{ korwil.alamat }}
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                      <a
                        v-if="g$user.role === 'ADMIN'"
                        type="button"
                        class="mx-3 mb-0"
                        data-bs-toggle="modal"
                        :data-bs-target="`#edit-korwil-${korwil.id_korwil}`"
                        title="Edit Korwil"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <div
                        :id="`edit-korwil-${korwil.id_korwil}`"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                        :key="indexComponent"
                      >
                        <div class="modal-dialog mt-lg-10">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title text-wrap">
                                Edit Korwil
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
                                :id="`form-edit-korwil-${korwil.id_korwil}`"
                                @submit.prevent="editKorwil(this.id)"
                              >
                                <label class="form-label">Nama Lengkap</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="nama"
                                  :id="`nama-${korwil.id_korwil}`"
                                  placeholder="Nama korwil"
                                  :value="korwil.nama"
                                  required
                                />
                                <label class="form-label"
                                  >Nomor Induk Korwil</label
                                >
                                <input
                                  class="form-control"
                                  type="text"
                                  name="nk"
                                  :id="`nk-${korwil.id_korwil}`"
                                  placeholder="Nomor induk korwil"
                                  :value="korwil.nk"
                                  required
                                />
                              </form>
                            </div>
                            <div class="modal-footer">
                              <button
                                :id="`button-close-modal-${korwil.id_korwil}`"
                                type="button"
                                class="btn bg-gradient-secondary btn-sm"
                                data-bs-dismiss="modal"
                              >
                                Batal
                              </button>
                              <button
                                :id="korwil.id_korwil"
                                :form="`form-edit-korwil-${korwil.id_korwil}`"
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
                        v-if="g$user.role === 'ADMIN'"
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
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import { mapActions, mapState } from "pinia";
import d$korwil from "@/store/korwil";
import d$auth from "@/store/auth";
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
  name: "IndexKorwil",
  components: {
    HeaderProfileCard,
    TableContentLoader,
  },
  data() {
    return {
      body: {
        nama: "",
        nk: "",
      },
      listKorwil: [],
      isLoading: true,
      indexComponent: 0,
      dataTable: undefined,
      moment,
      loader: undefined,
    };
  },
  computed: {
    ...mapState(d$korwil, ["g$listKorwil"]),
    ...mapState(d$auth, ["g$user"]),
  },
  async created() {
    await this.getListKorwil();
  },
  methods: {
    ...mapActions(d$korwil, [
      "a$listKorwil",
      "a$addKorwil",
      "a$importKorwil",
      "a$editKorwil",
      "a$deleteKorwil",
    ]),

    async addKorwil() {
      this.showSwal("loading");

      // validation
      if (this.body.nama == "" || this.body.nk == "") {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      try {
        document.getElementById("button-close-modal-add").click();
        await this.a$addKorwil(this.body);
        await this.getListKorwil();
        this.showSwal("success-message", "Data korwil berhasil ditambahkan!");
        this.body.nama = "";
        this.body.nk = "";
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal ditambahkan! " + msg);
      }
    },

    async importKorwil() {
      this.showSwal("loading");

      let formData = {
        file: this.$refs.file.files[0],
      };

      document.getElementById("button-close-modal-impor").click();

      try {
        await this.a$importKorwil(formData);
        await this.getListKorwil();
        this.showSwal("success-message", "Data Korwil berhasil diimpor!");
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

    async getListKorwil() {
      this.isLoading = true;

      this.indexComponent++;

      try {
        await this.a$listKorwil();
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

      this.listKorwil = this.g$listKorwil;

      setTimeout(() => {
        this.setupDataTable();
        this.setupTableAction();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async editKorwil(id) {
      this.showSwal("loading");

      id = parseInt(id);
      let data = {
        nama: $(`#nama-${id}`).val(),
        nk: $(`#nk-${id}`).val(),
      };

      if (data.nama === "" || data.nk === "") {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      data.nk = data.nk.toString();

      try {
        document.getElementById(`button-close-modal-${id}`).click();
        await this.a$editKorwil(id, data);
        this.showSwal("success-message", "Data korwil berhasil disimpan!");

        await this.getListKorwil();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal disimpan! " + msg);
      }
    },

    async deleteKorwil(id_korwil) {
      this.showSwal("loading");

      try {
        await this.a$deleteKorwil(parseInt(id_korwil));
        await this.getListKorwil();
        this.showSwal("success-message", "Data korwil berhasil dihapus!");
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

      if (document.getElementById("korwil-list")) {
        const dataTableSearch = $("#korwil-list").DataTable({
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
                  title: "Data Koordinator Wilayah | KKN UNDIP",
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

    setupTableAction() {
      let outerThis = this;
      // edit
      $("#korwil-list").on("click", `.edit`, function (e) {
        let korwil = this;
        outerThis.editKorwil(korwil.id);
        e.preventDefault();
      });

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
