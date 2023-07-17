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
                <h5 class="mb-2">Data Reviewers</h5>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link
                    class="mb-0 btn bg-gradient-success btn-sm"
                    :to="{ name: 'Tambah Reviewer' }"
                    >+&nbsp; Tambah Reviewer
                  </router-link>
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
                            Impor Data Reviewer via File Excel
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
              <table id="reviewer-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Nama</th>
                    <th>NIP</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(rev, index) in g$listReviewer"
                    :key="rev.id_reviewer"
                  >
                    <td class="text-sm">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto">{{ rev.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ rev.nip }}</td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#detail_' + rev.id_reviewer"
                        title="Detail Reviewer"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + rev.id_reviewer"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-lg mt-lg-5">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title">
                                Detail Reviewer {{ rev.nama }}
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
                                <div class="col-lg-6 col-12 pt-0 text-sm">
                                  <strong class="text-dark"
                                    >Nama Lengkap:</strong
                                  >
                                  &nbsp;
                                  {{ rev.nama }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 pt-0 text-sm"
                                >
                                  <strong class="text-dark">NIP:</strong>
                                  &nbsp;
                                  {{ rev.nip }}
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col-lg-6 col-12 text-sm">
                                  <strong class="text-dark"
                                    >Jenis Kelamin:</strong
                                  >
                                  &nbsp;
                                  <span v-if="rev.jenis_kelamin == 1"
                                    >Laki-laki</span
                                  >
                                  <span v-else-if="rev.jenis_kelamin == 2"
                                    >Perempuan</span
                                  >
                                  <span v-else>-</span>
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm"
                                >
                                  <strong class="text-dark"
                                    >Tanggal Lahir:</strong
                                  >
                                  &nbsp;
                                  {{
                                    rev.ttl
                                      ? moment(rev.ttl).format("DD MMMM YYYY")
                                      : ""
                                  }}
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col-lg-6 col-12 text-sm">
                                  <strong class="text-dark">No Telepon:</strong>
                                  &nbsp;
                                  {{ rev.no_hp }}
                                </div>
                                <div
                                  class="col-lg-6 col-12 mt-2 mt-lg-0 text-sm"
                                >
                                  <strong class="text-dark">Alamat:</strong>
                                  &nbsp;
                                  {{ rev.alamat }}
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
                        :data-bs-target="`#edit-reviewer-${rev.id_reviewer}`"
                        title="Edit Pimpinan"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <div
                        :id="`edit-reviewer-${rev.id_reviewer}`"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                        :key="indexComponent"
                      >
                        <div class="modal-dialog mt-lg-10">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title">
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
                                :id="`form-edit-reviewer-${rev.id_reviewer}`"
                                @submit.prevent="editReviewer(this.id)"
                              >
                                <label class="form-label">Nama Lengkap</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="nama"
                                  :id="`nama-${rev.id_reviewer}`"
                                  placeholder="Nama reviewer"
                                  :value="rev.nama"
                                  required
                                />
                                <label class="form-label">NIP</label>
                                <input
                                  class="form-control"
                                  type="number"
                                  name="nip"
                                  :id="`nip-${rev.id_reviewer}`"
                                  placeholder="NIP"
                                  :value="rev.nip"
                                  required
                                />
                              </form>
                            </div>
                            <div class="modal-footer">
                              <button
                                :id="`button-close-modal-${rev.id_reviewer}`"
                                type="button"
                                class="btn bg-gradient-secondary btn-sm"
                                data-bs-dismiss="modal"
                              >
                                Batal
                              </button>
                              <button
                                :id="rev.id_reviewer"
                                :form="`form-edit-reviewer-${rev.id_reviewer}`"
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
                        :id="rev.id_reviewer"
                        :name="rev.nama"
                        class="delete"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Reviewer"
                        title="Hapus Reviewer"
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
                    <th>NIP</th>
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
import { DataTable } from "simple-datatables";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import d$reviewer from "@/store/reviewer";
import { mapActions, mapState } from "pinia";

export default {
  name: "IndexReviewer",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      body: {
        file: "",
      },
      indexComponent: 0,
      dataTable: undefined,
      moment,
      loader: undefined,
    };
  },
  computed: {
    ...mapState(d$reviewer, ["g$listReviewer"]),
  },
  async created() {
    moment.locale("id");

    await this.getInitData();
  },
  methods: {
    ...mapActions(d$reviewer, [
      "a$listReviewer",
      "a$importReviewer",
      "a$editReviewer",
      "a$deleteReviewer",
    ]),

    async getInitData() {
      this.showLoading(true);
      this.indexComponent++;

      try {
        await this.a$listReviewer();
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

      this.setupDataTable();
      this.setupTableAction();

      this.showLoading(false);
    },

    async editPimpinan(id) {
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
        await this.a$editReviewer(id, data);
        this.showSwal("success-message", "Data reviewer berhasil disimpan!");

        await this.getInitData();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal disimpan! " + msg);
      }
    },

    async deleteReviewer(id_reviewer) {
      this.showSwal("loading");

      this.indexComponent++;

      try {
        await this.a$deleteReviewer(parseInt(id_reviewer));
        await this.a$listReviewer();
        this.showSwal("success-message", "Data reviewer berhasil dihapus!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }

      this.setupDataTable();
      this.setupTableAction();
    },

    async importReviewer() {
      this.showSwal("loading");

      this.body.file = this.$refs.file.files[0];
      this.indexComponent++;
      document.getElementById("button-close-modal").click();

      try {
        await this.a$importReviewer(this.body);
        await this.a$listReviewer();
        this.showSwal("success-message", "Data reviewer berhasil diimpor!");
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

      this.setupDataTable();
      this.setupTableAction();
    },

    setupDataTable() {
      if (this.dataTable) {
        this.dataTable.clear();
        this.dataTable.destroy();
      }

      if (document.getElementById("reviewer-list")) {
        const dataTableSearch = new DataTable("#reviewer-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Reviewer",
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
      $("#reviewer-list").on("click", `.edit`, function (e) {
        let reviewer = this;
        outerThis.editPimpinan(reviewer.id);
        e.preventDefault();
      });

      // delete
      $("#reviewer-list").on("click", `.delete`, function (e) {
        let reviewer = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus akun reviewer ${reviewer.name}?`,
          "Berhasil menghapus data",
          reviewer.id
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

    showSwal(type, text, toastText, id_reviewer) {
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
            this.deleteReviewer(id_reviewer);
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
