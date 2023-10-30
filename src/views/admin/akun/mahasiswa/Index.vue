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
                <div class="my-auto ms-auto">
                  <router-link
                    class="mb-0 btn bg-gradient-success btn-sm"
                    :to="{ name: 'Tambah Mahasiswa' }"
                    >+&nbsp; Tambah Mahasiswa
                  </router-link>
                  <button
                    type="button"
                    class="mx-2 mb-0 btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#import-mhs"
                  >
                    Impor
                  </button>
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
                  <!-- <button
                    class="mt-1 mb-0 btn btn-outline-success btn-sm export mt-sm-0"
                    data-type="csv"
                    type="button"
                    name="button"
                  >
                    Ekspor
                  </button> -->
                </div>
              </div>
            </div>
          </div>
          <div class="pt-1 px-0 pb-0 card-body">
            <div
              style="position: relative"
              class="table-responsive"
              :key="indexComponent"
              ref="container"
            >
              <table id="mhs-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>Fakultas</th>
                    <th>Prodi</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(mhs, index) in listMhs" :key="mhs.id_mahasiswa">
                    <td class="text-sm">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto">{{ mhs.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ mhs.nim }}</td>
                    <td class="text-sm">
                      {{ mhs.prodi?.fakultas?.singkatan }}
                    </td>
                    <td class="text-sm">{{ mhs.prodi?.nama }}</td>
                    <td>
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
                    <td class="text-sm">
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
                                  {{ mhs.gelombang }}
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
                <tfoot>
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>Fakultas</th>
                    <th>Prodi</th>
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
import moment from "moment";
import Choices from "choices.js";
import { DataTable } from "simple-datatables";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import d$mahasiswa from "@/store/mahasiswa";
import { mapActions, mapState } from "pinia";

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
        const dataTableSearch = new DataTable("#mhs-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;
            var data = {
              type: type,
              filename: "Data Mahasiswa",
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
