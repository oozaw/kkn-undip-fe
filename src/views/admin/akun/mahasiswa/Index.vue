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
                <h5 class="mb-2">Data Mahasiswa</h5>
                <p class="text-sm mb-0">Data mahasiswa terdaftar</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto d-flex flex-wrap">
                  <div class="my-0">
                    <router-link
                      class="mb-0 btn bg-gradient-success btn-sm"
                      :to="{ name: 'Tambah Mahasiswa' }"
                      >+&nbsp; Tambah Mahasiswa
                    </router-link>
                  </div>
                  <div class="my-0">
                    <button
                      type="button"
                      class="mx-2 mb-0 btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#import-mhs"
                    >
                      Impor
                    </button>
                  </div>
                  <div
                    id="import-mhs"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                    :key="indexComponent"
                  >
                    <div class="modal-dialog mt-lg-10">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title text-wrap">
                            Impor Data Mahasiswa via File Excel
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
                          <button
                            type="button"
                            name="button"
                            class="btn btn-success d-inline-block"
                            @click="downloadFormatImport()"
                          >
                            <font-awesome-icon
                              class="me-1"
                              icon="fa-solid fa-file-arrow-down"
                            />
                            Download Format File
                          </button>
                          <a href="#" id="file-placeholder" hidden></a>
                          <form
                            role="form"
                            id="form-import-mhs"
                            @submit.prevent="importMahasiswa()"
                            enctype="multipart/form-data"
                          >
                            <input
                              id="file"
                              ref="file"
                              type="file"
                              name="file"
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
                            form="form-import-mhs"
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
            <div
              style="position: relative"
              class="table-responsive"
              :key="indexComponent"
              ref="container"
            >
              <table id="mhs-list" class="table table-flush">
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
                      NIM
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
                    >
                      Fakultas
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      Prodi
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      Status
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                      hidden
                    >
                      Gelombang
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                      hidden
                    >
                      Lokasi
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
                      hidden
                    >
                      Riwayat Penyakit
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                      hidden
                    >
                      Nama Ortu
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                      hidden
                    >
                      No. Telp. Ortu
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                      hidden
                    >
                      Alamat Ortu
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                      hidden
                    >
                      Nama CP Darurat
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                      hidden
                    >
                      No. Telp. CP Darurat
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                      hidden
                    >
                      Alamat CP Darurat
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                      hidden
                    >
                      Hubungan
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
                    v-for="(mhs, index) in listMhs"
                    :key="mhs.id_mahasiswa"
                    class="align-middle"
                    height="46px"
                  >
                    <td class="text-sm ps-4">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto ps-3">{{ mhs.nama }}</h6>
                    </td>
                    <td class="text-sm ps-4">{{ mhs.nim }}</td>
                    <td class="text-sm ps-4" hidden>
                      {{
                        mhs.jenis_kelamin == 1
                          ? "Laki-laki"
                          : mhs.jenis_kelamin == 2
                          ? "Perempuan"
                          : ""
                      }}
                    </td>
                    <td class="text-sm ps-4" hidden>
                      {{
                        mhs.ttl ? moment(mhs.ttl).format("DD MMMM YYYY") : ""
                      }}
                    </td>
                    <td class="text-sm ps-4">
                      {{ mhs.prodi?.fakultas?.singkatan }}
                    </td>
                    <td class="text-sm ps-4">{{ mhs.prodi?.nama }}</td>
                    <td class="ps-4">
                      <span
                        v-if="mhs.status == '2'"
                        class="badge badge-success badge-sm"
                        >Terdaftar</span
                      >
                      <span
                        v-else-if="mhs.status == '1'"
                        class="badge badge-primary badge-sm"
                        >Proses Pendaftaran</span
                      >
                      <span v-else class="badge badge-secondary badge-sm"
                        >Belum Mendaftar</span
                      >
                    </td>
                    <td class="text-sm ps-4" hidden>
                      {{ mhs.gelombang ?? "" }}
                    </td>
                    <td class="text-sm ps-4" hidden>{{ mhs.lokasi ?? "" }}</td>
                    <td class="text-sm ps-4" hidden>{{ mhs.no_hp ?? "" }}</td>
                    <td class="text-sm ps-4" hidden>{{ mhs.alamat ?? "" }}</td>
                    <td class="text-sm ps-4" hidden>
                      {{ mhs.riwayat_penyakit ?? "" }}
                    </td>
                    <td class="text-sm ps-4" hidden>
                      {{ mhs.nama_ortu ?? "" }}
                    </td>
                    <td class="text-sm ps-4" hidden>
                      {{ mhs.no_hp_ortu ?? "" }}
                    </td>
                    <td class="text-sm ps-4" hidden>
                      {{ mhs.alamat_ortu ?? "" }}
                    </td>
                    <td class="text-sm ps-4" hidden>
                      {{ mhs.nama_cp_urgent ?? "" }}
                    </td>
                    <td class="text-sm ps-4" hidden>
                      {{ mhs.no_hp_cp_urgent ?? "" }}
                    </td>
                    <td class="text-sm ps-4" hidden>
                      {{ mhs.alamat_cp_urgent ?? "" }}
                    </td>
                    <td class="text-sm ps-4" hidden>
                      {{ mhs.hubungan ?? "" }}
                    </td>
                    <td class="text-sm ps-4">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#detail_' + mhs.id_mahasiswa"
                        title="Detail Mahasiswa"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + mhs.id_mahasiswa"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-lg mt-lg-5">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title text-wrap">
                                Detail Mahasiswa {{ mhs.nama }}
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
                                  {{ mhs.nama }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 pt-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark">NIM:</strong>
                                  &nbsp;
                                  {{ mhs.nim }}
                                </div>
                              </div>
                              <div class="row mt-2">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark">Fakultas:</strong>
                                  &nbsp;
                                  {{ mhs.prodi?.fakultas?.nama }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark">Prodi:</strong>
                                  &nbsp;
                                  {{ mhs.prodi?.nama }}
                                </div>
                              </div>
                              <div class="row mt-2">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark">Lokasi:</strong>
                                  &nbsp;
                                  {{ mhs.lokasi }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark">Gelombang:</strong>
                                  &nbsp;
                                  {{ mhs.gelombang ?? "" }}
                                </div>
                              </div>
                              <div class="row mt-2">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark"
                                    >Jenis Kelamin:</strong
                                  >
                                  &nbsp;
                                  <span v-if="mhs.jenis_kelamin == 1"
                                    >Laki-laki</span
                                  >
                                  <span v-else-if="mhs.jenis_kelamin == 2"
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
                                    mhs.ttl
                                      ? moment(mhs.ttl).format("DD MMMM YYYY")
                                      : ""
                                  }}
                                </div>
                              </div>
                              <div class="row mt-2">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark">No Telepon:</strong>
                                  &nbsp;
                                  {{ mhs.no_hp }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark">Alamat:</strong>
                                  &nbsp;
                                  {{ mhs.alamat }}
                                </div>
                              </div>
                              <div class="row mt-2">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark"
                                    >Riwayat Penyakit:</strong
                                  >
                                  &nbsp;
                                  {{ mhs.riwayat_penyakit }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark">Nama Ortu:</strong>
                                  &nbsp;
                                  {{ mhs.nama_ortu }}
                                </div>
                              </div>
                              <div class="row mt-2">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark"
                                    >No Telp Ortu:</strong
                                  >
                                  &nbsp;
                                  {{ mhs.no_hp_ortu }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark"
                                    >Alamat Ortu:</strong
                                  >
                                  &nbsp;
                                  {{ mhs.alamat_ortu }}
                                </div>
                              </div>
                              <div class="row mt-2">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark"
                                    >Nama CP Darurat:</strong
                                  >
                                  &nbsp;
                                  {{ mhs.nama_cp_urgent }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark"
                                    >No Telp CP Darurat:</strong
                                  >
                                  &nbsp;
                                  {{ mhs.no_hp_cp_urgent }}
                                </div>
                              </div>
                              <div class="row mt-2">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark"
                                    >Alamat CP Darurat:</strong
                                  >
                                  &nbsp;
                                  {{ mhs.alamat_cp_urgent }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark">Hubungan:</strong>
                                  &nbsp;
                                  {{ mhs.hubungan }}
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                      <a
                        :id="mhs.id_mahasiswa"
                        href="#"
                        class="mx-3 edit"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Mahasiswa"
                        title="Edit Mahasiswa"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        :id="mhs.id_mahasiswa"
                        :name="mhs.nama"
                        class="delete"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Mahasiswa"
                        title="Hapus Mahasiswa"
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
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import d$mahasiswa from "@/store/mahasiswa";
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
  name: "IndexMahasiswa",
  components: {
    HeaderProfileCard,
    TableContentLoader,
  },
  computed: {
    ...mapState(d$mahasiswa, ["g$listMahasiswa", "g$formatFile"]),
  },
  data() {
    return {
      indexComponent: 0,
      // tema: "1",
      body: {
        file: "",
        // id_periode: "",
      },
      dataTable: undefined,
      moment,
      loader: undefined,
      isLoading: true,
      listMhs: [],
    };
  },
  async created() {
    moment.locale("id");

    await this.getListMahasiswa();
  },
  methods: {
    ...mapActions(d$mahasiswa, [
      "a$listMahasiswa",
      "a$importMahasiswa",
      "a$deleteMahasiswa",
      "a$downloadFormatImport",
    ]),

    async getListMahasiswa() {
      this.isLoading = true;
      this.indexComponent++;

      try {
        await this.a$listMahasiswa();
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

      this.listMhs = this.g$listMahasiswa;

      setTimeout(() => {
        this.setupDataTable();
        this.setupTableAction();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async importMahasiswa() {
      this.showSwal("loading");

      this.body.file = this.$refs.file.files[0];
      // this.body.id_periode = this.tema;
      document.getElementById("button-close-modal").click();

      try {
        await this.a$importMahasiswa(this.body);
        await this.getListMahasiswa();
        this.showSwal("success-message", "Data mahasiswa berhasil diimpor!");
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

    async downloadFormatImport() {
      this.showSwal("loading");

      const button = document.getElementById("file-placeholder");

      try {
        await this.a$downloadFormatImport();
        const fileURL = window.URL.createObjectURL(
          new Blob([this.g$formatFile], { type: "application/xlsx" })
        );

        button.href = fileURL;
        button.download = `Format Impor Mahasiswa - KKN UNDIP.xlsx`;

        button.click();

        this.showSwal("close");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat mengunduh format file! " + msg
        );
      }
    },

    async deleteMahasiswa(id_mahasiswa) {
      this.showSwal("loading");

      this.indexComponent++;

      try {
        await this.a$deleteMahasiswa(parseInt(id_mahasiswa));
        await this.getListMahasiswa();
        this.showSwal("success-message", "Data mahasiswa berhasil dihapus!");
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
          shouldSort: false,
        });
      }
    },

    setupDataTable() {
      if (this.dataTable) {
        this.dataTable.clear();
        this.dataTable.destroy();
      }

      if (document.getElementById("mhs-list")) {
        const dataTableSearch = $("#mhs-list").DataTable({
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
                  title: "Data Mahasiswa | KKN UNDIP",
                  exportOptions: {
                    columns: [
                      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                      17, 18, 19,
                    ],
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

    //   if (document.getElementById("mhs-list")) {
    //     const dataTableSearch = new DataTable("#mhs-list", {
    //       searchable: true,
    //       fixedHeight: false,
    //       perPage: 5,
    //     });

    //     document.querySelectorAll(".export").forEach(function (el) {
    //       el.addEventListener("click", function () {
    //         var type = el.dataset.type;
    //         var data = {
    //           type: type,
    //           filename: "Data Mahasiswa",
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
      $("#mhs-list").on("click", `.edit`, function (e) {
        let mahasiswa = this;
        outerThis.$router.push({
          name: "Edit Mahasiswa",
          params: {
            id_mahasiswa: mahasiswa.id,
          },
        });
        e.preventDefault();
      });

      // delete
      $("#mhs-list").on("click", `.delete`, function (e) {
        let mahasiswa = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus akun mahasiswa ${mahasiswa.name}?`,
          "Berhasil menghapus data",
          mahasiswa.id
        );
        e.preventDefault();
      });
    },

    showLoading(isLoading) {
      if (isLoading && !this.loader) {
        this.isLoading = true;
        this.loader = this.$loading.show({
          isFullPage: false,
          container: this.$refs.container,
        });
      } else if (!isLoading && this.loader) {
        setTimeout(() => {
          this.isLoading = false;
          this.loader.hide();
          this.loader = undefined;
        }, 400);
      }
    },

    showSwal(type, text, toastText, id_mahasiswa) {
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
            this.deleteMahasiswa(id_mahasiswa);
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
