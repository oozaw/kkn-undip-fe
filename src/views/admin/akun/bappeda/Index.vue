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
                          <h5 id="ModalLabel" class="modal-title text-wrap">
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
                    v-for="(bappeda, index) in listBappeda"
                    :key="bappeda.id_bappeda"
                  >
                    <td class="text-sm">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto">{{ bappeda.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ bappeda.nb }}</td>
                    <td class="text-sm">
                      {{ bappeda.total_kecamatan + "/" + bappeda.total_desa }}
                    </td>
                    <td class="text-sm">{{ bappeda.nama_pj }}</td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#detail_' + bappeda.id_bappeda"
                        title="Detail BAPPEDA"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + bappeda.id_bappeda"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-lg mt-lg-5">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title text-wrap">
                                Detail {{ bappeda.nama }}
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
                                  <strong class="text-dark">Nama :</strong>
                                  &nbsp;
                                  {{ bappeda.nama }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 pt-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark"
                                    >Nomor Induk:</strong
                                  >
                                  &nbsp;
                                  {{ bappeda.nb }}
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark"
                                    >Nama Kabupaten/ Kota:</strong
                                  >
                                  &nbsp;
                                  {{ bappeda.nama_kabupaten }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark"
                                    >Nama Penanggung Jawab:</strong
                                  >
                                  &nbsp;
                                  {{ bappeda.nama_pj }}
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col-lg-6 col-12 text-sm text-wrap">
                                  <strong class="text-dark">No Telepon:</strong>
                                  &nbsp;
                                  {{ bappeda.no_hp }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm text-wrap"
                                >
                                  <strong class="text-dark">Alamat:</strong>
                                  &nbsp;
                                  {{ bappeda.alamat }}
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col-12 text-sm text-wrap">
                                  <strong class="text-dark"
                                    >Wilayah (Kabupaten - Kecamatan -
                                    Desa):</strong
                                  >
                                  &nbsp;
                                  <ul class="list-group mt-2">
                                    <li
                                      class="pt-0 text-sm border-0 list-group-item ps-0"
                                    >
                                      <ol
                                        class="list-group list-group-numbered"
                                      >
                                        <li
                                          v-for="(
                                            kab, ikab
                                          ) in bappeda.kabupaten"
                                          :key="ikab"
                                          class="mb-2"
                                        >
                                          {{ kab.nama }}:
                                          <ol class="ms-2">
                                            <li
                                              v-for="(
                                                kec, ikec
                                              ) in kab.kecamatan"
                                              :key="ikec"
                                            >
                                              Kec.
                                              {{ kec.nama }}
                                              ({{
                                                kec.status == "1"
                                                  ? "Diterima"
                                                  : "Ditolak"
                                              }}):
                                              <ol class="ms-1">
                                                <li
                                                  v-for="(
                                                    desa, idesa
                                                  ) in kec.desa"
                                                  :key="idesa"
                                                >
                                                  Desa {{ desa.nama }}
                                                </li>
                                              </ol>
                                            </li>
                                          </ol>
                                        </li>
                                      </ol>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                      <a
                        :id="bappeda.id_bappeda"
                        href="#"
                        class="mx-3 edit"
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
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import d$bappeda from "@/store/bappeda";
import { mapActions, mapState } from "pinia";

export default {
  name: "IndexBappeda",
  components: {
    HeaderProfileCard,
    TableContentLoader,
  },
  data() {
    return {
      indexComponent: 0,
      body: {
        file: "",
      },
      listBappeda: [],
      isLoading: true,
      dataTable: undefined,
      loader: undefined,
    };
  },
  computed: {
    ...mapState(d$bappeda, ["g$listBappeda"]),
  },
  async created() {
    await this.getInitData();
  },
  methods: {
    ...mapActions(d$bappeda, [
      "a$listBappeda",
      "a$importBappeda",
      "a$deleteBappeda",
    ]),

    async getInitData() {
      this.isLoading = true;
      this.indexComponent++;

      try {
        await this.a$listBappeda();
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

      this.listBappeda = this.g$listBappeda;

      setTimeout(() => {
        this.setupDataTable();
        this.setupTableAction();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async importBappeda() {
      this.showSwal("loading");

      this.body.file = this.$refs.file.files[0];
      document.getElementById("button-close-modal").click();

      try {
        await this.a$importBappeda(this.body);
        this.showSwal("success-message", "Data BAPPEDA berhasil diimpor!");

        await this.getInitData();
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

    async deleteBappeda(id_bappeda) {
      this.showSwal("loading");

      try {
        await this.a$deleteBappeda(parseInt(id_bappeda));
        this.showSwal("success-message", "Data BAPPEDA berhasil dihapus!");

        await this.getInitData();
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
      // edit
      $("#bappeda-list").on("click", `.edit`, function (e) {
        let bappeda = this;
        outerThis.$router.push({
          name: "Edit Bappeda",
          params: {
            id_bappeda: bappeda.id,
          },
        });
        e.preventDefault();
      });

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

    showLoading(isLoading) {
      if (isLoading && (!this.loader || this.loader === undefined)) {
        this.loader = this.$loading.show();
      } else if (!isLoading && (this.loader || this.loader !== undefined)) {
        console.log(this.loader);
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
