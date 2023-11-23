<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard />
        <table-content-loader v-if="isLoading" />
        <div class="bg-white card mt-4" :hidden="isLoading">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Pengumuman Kegiatan KKN</h5>
                <p class="text-sm mb-0">Daftar Pengumuman Kegiatan KKN</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto d-flex flex-wrap">
                  <div class="my-0">
                    <router-link
                      class="mb-0 btn btn-success btn-sm mt-sm-0 me-2"
                      :to="{ name: 'Tambah Pengumuman' }"
                    >
                      + Tambah Pengumuman
                    </router-link>
                  </div>
                  <div id="button-table"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="ms-2 pt-1 mt-4 card-body">
            <div class="table-responsive" :key="indexComponent">
              <table id="pengumuman-list" class="table table-flush">
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
                      Judul
                    </th>
                    <th hidden>Isi</th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      Tanggal Dibuat
                    </th>
                    <th hidden>Peruntukan</th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(pengumuman, i) in listPengumuman"
                    :key="pengumuman.id_pengumuman"
                    class="align-middle"
                    height="46px"
                  >
                    <td class="ps-4 text-sm">{{ i + 1 }}</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto ps-3">{{ pengumuman.judul }}</h6>
                    </td>
                    <td class="ps-4 text-sm" hidden>{{ pengumuman.isi }}</td>
                    <td class="ps-4 text-sm">
                      {{ moment(pengumuman.created_at).format("DD MMMM YYYY") }}
                    </td>
                    <td class="ps-4 text-sm" hidden>
                      {{ pengumuman.peruntukan }}
                    </td>
                    <td class="ps-4 text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#detail_' + pengumuman.id_pengumuman"
                        title="Detail Pengumuman"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + pengumuman.id_pengumuman"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-8">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title text-wrap">
                                Detail {{ pengumuman.judul }}
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
                                  <strong class="text-dark">Judul:</strong>
                                  &nbsp;
                                  {{ pengumuman.judul }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Isi:</strong>
                                  &nbsp;
                                  {{ pengumuman.isi }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark"
                                    >Tanggal Dibuat:</strong
                                  >
                                  &nbsp;
                                  {{
                                    pengumuman.created_at
                                      ? moment(pengumuman.created_at).format(
                                          "dddd, DD MMMM YYYY"
                                        )
                                      : "-"
                                  }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark"
                                    >Ditujukan Untuk:</strong
                                  >
                                  &nbsp;
                                  {{ pengumuman.peruntukan }}
                                </li>
                              </ul>
                            </div>
                            <div class="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                      <a
                        :id="pengumuman.id_pengumuman"
                        href="#"
                        class="mx-3 edit"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Kegiatan"
                        title="Edit Kegiatan"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        :id="pengumuman.id_pengumuman"
                        :name="pengumuman.judul"
                        class="delete"
                        href="#"
                        data-bs-toggle="tooltip delete"
                        data-bs-original-title="Hapus Kegiatan"
                        title="Hapus Kegiatan"
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
import { mapActions, mapState } from "pinia";
import d$pengumuman from "@/store/pengumuman";
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
  name: "IndexPengumuman",
  components: {
    HeaderProfileCard,
    TableContentLoader,
  },
  data() {
    return {
      indexComponent: 0,
      moment,
      listPengumuman: [],
      isLoading: true,
      loader: undefined,
    };
  },
  computed: {
    ...mapState(d$pengumuman, ["g$listPengumuman"]),
  },
  async created() {
    moment.locale("id");

    await this.getInitData();
  },
  methods: {
    ...mapActions(d$pengumuman, ["a$listAllPengumuman", "a$deletePengumuman"]),

    async getInitData() {
      this.isLoading = true;
      this.indexComponent++;

      try {
        await this.a$listAllPengumuman();
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

      this.listPengumuman = this.g$listPengumuman;

      setTimeout(() => {
        this.setupDataTable();
        this.setupTableAction();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async deletePengumuman(id_pengumuman) {
      this.showSwal("loading");

      this.indexComponent++;

      try {
        await this.a$deletePengumuman(id_pengumuman);
        // this.showSwal("success-message", "Berhasil menghapus data");
        this.getInitData();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }
    },

    setupTableAction() {
      let outerThis = this;

      // edit
      $("#pengumuman-list").on("click", `.edit`, function (e) {
        let pengumuman = this;
        outerThis.$router.push({
          name: "Edit Pengumuman",
          params: { id_pengumuman: pengumuman.id },
        });
        e.preventDefault();
      });

      // delete
      $("#pengumuman-list").on("click", `.delete`, function (e) {
        let pengumuman = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus pengumuman ${pengumuman.name}?`,
          "Berhasil menghapus data",
          pengumuman.id
        );
        e.preventDefault();
      });
    },

    setupDataTable() {
      if (this.dataTable) {
        this.dataTable.clear();
        this.dataTable.destroy();
      }

      if (document.getElementById("pengumuman-list")) {
        const dataTableSearch = $("#pengumuman-list").DataTable({
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
                  title: "Data Pengumuman | KKN UNDIP",
                  exportOptions: {
                    columns: [0, 1, 2, 3, 4],
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

    showSwal(type, text, toastText, id_pengumuman) {
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
            this.deletePengumuman(id_pengumuman);
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
