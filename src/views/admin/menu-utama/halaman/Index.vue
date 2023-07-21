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
                v-model="tema"
                @change="getListHalaman()"
              >
                <option
                  v-for="tema in g$listTema"
                  :key="tema.id_tema"
                  :value="tema.id_tema"
                >
                  {{ tema.nama }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="bg-white card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Halaman Aplikasi</h5>
                <p class="text-sm mb-0">Pengaturan Halaman Aplikasi</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    class="mt-2 mb-0 btn btn-outline-success btn-sm export-halaman mt-sm-0"
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
              <table id="halaman-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="col-3">Judul</th>
                    <th>Tanggal Mulai</th>
                    <th>Tanggal Berakhir</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(halaman, index) in g$listHalaman"
                    :key="halaman.id_tema_halaman"
                  >
                    <td class="text-sm ps-3">{{ index + 1 }}</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">{{ halaman.halaman.nama }}</h6>
                    </td>
                    <td class="text-sm">
                      {{
                        halaman.tgl_mulai
                          ? moment(halaman.tgl_mulai).format(
                              "DD MMMM YYYY HH:mm"
                            )
                          : "-"
                      }}
                    </td>
                    <td class="text-sm">
                      {{
                        halaman.tgl_akhir
                          ? moment(halaman.tgl_akhir).format(
                              "DD MMMM YYYY HH:mm"
                            )
                          : "-"
                      }}
                    </td>
                    <td class="text-sm">
                      <span v-if="halaman.status" class="badge badge-success"
                        >Aktif</span
                      >
                      <span v-else class="badge badge-danger">Tidak Aktif</span>
                    </td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 me-3 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#detail_' + halaman.id_halaman"
                        title="Detail Halaman"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + halaman.id_halaman"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-8">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title">
                                Detail {{ halaman.halaman.nama }}
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
                              <ul class="list-group">
                                <li
                                  class="pt-0 text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Nama:</strong>
                                  &nbsp;
                                  {{ halaman.halaman.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Tema:</strong>
                                  &nbsp;
                                  {{ halaman.tema.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark"
                                    >Tanggal Dibuka:</strong
                                  >
                                  &nbsp;
                                  {{
                                    halaman.tgl_mulai
                                      ? moment(halaman.tgl_mulai).format(
                                          "dddd, DD MMMM YYYY HH:mm"
                                        )
                                      : "-"
                                  }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark"
                                    >Tanggal Ditutup:</strong
                                  >
                                  &nbsp;
                                  {{
                                    halaman.tgl_akhir
                                      ? moment(halaman.tgl_akhir).format(
                                          "dddd, DD MMMM YYYY HH:mm"
                                        )
                                      : "-"
                                  }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Status:</strong>
                                  &nbsp;
                                  <span
                                    v-if="halaman.status"
                                    class="badge badge-success"
                                  >
                                    Aktif
                                  </span>
                                  <span v-else class="badge badge-danger">
                                    Tidak Aktif
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div class="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                      <a
                        :id="halaman.id_tema_halaman"
                        href="#"
                        class="me-3 edit"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Halaman"
                        title="Edit Halaman"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        v-if="halaman.status"
                        :id="halaman.id_tema_halaman"
                        :name="halaman.halaman.nama"
                        class="me-3 non-aktif"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Non-aktifkan halaman"
                        title="Non-aktifkan halaman"
                      >
                        <font-awesome-icon
                          class="text-danger"
                          icon="fa-solid fa-square-xmark"
                          size="xl"
                        />
                      </a>
                      <a
                        v-else
                        :id="halaman.id_tema_halaman"
                        :name="halaman.halaman.nama"
                        class="me-3 aktif"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Aktifkan halaman"
                        title="Aktifkan halaman"
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
                    <th class="col-3">Judul</th>
                    <th>Tanggal Mulai</th>
                    <th>Tanggal Berakhir</th>
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
import moment from "moment";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$halaman from "@/store/halaman";
import d$tema from "@/store/tema";

export default {
  name: "IndexKelolaHalaman",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      tema: "",
      choicesTema: undefined,
      indexComponent: 0,
      moment,
      loader: undefined,
    };
  },
  computed: {
    ...mapState(d$halaman, ["g$listHalaman"]),
    ...mapState(d$tema, ["g$listTema"]),
  },
  async created() {
    moment.locale("id");

    await this.getInitData();

    this.choicesTema = this.getChoices("choices-tema");
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$halaman, [
      "a$listHalaman",
      "a$addHalaman",
      "a$switchHalaman",
    ]),
    ...mapActions(d$tema, ["a$listTema"]),

    async getInitData() {
      try {
        await this.a$listTema();
        this.tema = this.g$listTema[0].id_tema;
        await this.getListHalaman();
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
    },

    async getListHalaman() {
      this.showLoading(true);
      this.indexComponent++;

      try {
        await this.a$listHalaman(parseInt(this.tema));
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

    async switchHalaman(id_halaman) {
      this.showSwal("loading");

      try {
        await this.a$switchHalaman(id_halaman);
        await this.getListHalaman();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diperbarui! " + msg);
      }
    },

    setupTableAction() {
      let outerThis = this;
      $("#halaman-list").on("click", `.aktif`, function (e) {
        let halaman = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Mengaktifkan halaman ${halaman.name}?`,
          "Berhasil memperbarui data",
          halaman.id
        );
        e.preventDefault();
      });

      $("#halaman-list").on("click", `.non-aktif`, function (e) {
        let halaman = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menonaktifkan halaman ${halaman.name}?`,
          "Berhasil memperbarui data",
          halaman.id
        );
        e.preventDefault();
      });

      $("#halaman-list").on("click", `.edit`, function (e) {
        let halaman = this;
        outerThis.$router.push({
          name: "Edit Halaman",
          params: {
            id_tema_halaman: halaman.id,
          },
        });
        e.preventDefault();
      });
    },

    setupDataTable() {
      if (document.getElementById("halaman-list")) {
        const dataTableSearch = new DataTable("#halaman-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export-halaman").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Halaman",
            };

            // if (type === "csv") {
            //   data.columnDelimiter = "|";
            // }

            dataTableSearch.export(data);
          });
        });
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

    showSwal(type, text, toastText, id_halaman) {
      if (type === "success-message") {
        this.$swal({
          icon: "success",
          title: "Berhasil!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
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
            this.switchHalaman(id_halaman);
            this.$swal({
              toast: true,
              position: "top-end",
              title: toastText,
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
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
