<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard />
        <div class="bg-white card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Kalender Kegiatan KKN</h5>
                <p class="text-sm mb-0">Jadwal Kegiatan KKN</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link
                    class="mb-0 btn btn-success btn-sm mt-sm-0 me-2"
                    :to="{ name: 'Tambah Kalender' }"
                  >
                    + Tambah Kegiatan
                  </router-link>
                  <button
                    class="mt-2 mb-0 btn btn-outline-success btn-sm export-kalendar mt-sm-0"
                    data-type="csv"
                    type="button"
                    name="button"
                  >
                    Expor
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="ms-2 pt-1 px-0 pb-0 card-body">
            <div class="table-responsive" :key="indexComponent">
              <table id="event-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="col-4">Judul</th>
                    <th>Tanggal Mulai</th>
                    <th>Tanggal Berakhir</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(event, i) in g$listEvent" :key="event.id_event">
                    <td class="text-sm ps-3">{{ i + 1 }}</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">{{ event.judul }}</h6>
                    </td>
                    <td class="text-sm">
                      {{ moment(event.tgl_mulai).format("DD MMMM YYYY") }}
                    </td>
                    <td class="text-sm">
                      {{ moment(event.tgl_akhir).format("DD MMMM YYYY") }}
                    </td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#detail_' + event.id_event"
                        title="Detail Kegiatan"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + event.id_event"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-8">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title text-wrap">
                                Detail {{ event.judul }}
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
                                  {{ event.judul }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Tempat:</strong>
                                  &nbsp;
                                  {{ event.tempat }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark"
                                    >Tanggal Dimulai:</strong
                                  >
                                  &nbsp;
                                  {{
                                    event.tgl_mulai
                                      ? moment(event.tgl_mulai).format(
                                          "dddd, DD MMMM YYYY"
                                        )
                                      : "-"
                                  }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark"
                                    >Tanggal Berakhir:</strong
                                  >
                                  &nbsp;
                                  {{
                                    event.tgl_akhir
                                      ? moment(event.tgl_akhir).format(
                                          "dddd, DD MMMM YYYY"
                                        )
                                      : "-"
                                  }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap text-wrap"
                                >
                                  <strong class="text-dark">Keterangan:</strong>
                                  &nbsp;
                                  {{ event.keterangan }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark"
                                    >Ditujukan Untuk:</strong
                                  >
                                  &nbsp;
                                  {{ event.peruntukan }}
                                </li>
                              </ul>
                            </div>
                            <div class="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                      <a
                        :id="event.id_event"
                        href="#"
                        class="mx-3 edit"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Kegiatan"
                        title="Edit Kegiatan"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        :id="event.id_event"
                        :name="event.judul"
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
                <tfoot>
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="col-4">Judul</th>
                    <th>Tanggal Mulai</th>
                    <th>Tanggal Berakhir</th>
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
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$event from "@/store/event";

export default {
  name: "IndexKalender",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      indexComponent: 0,
      moment,
      loader: undefined,
    };
  },
  computed: {
    ...mapState(d$event, ["g$listEvent"]),
  },
  async created() {
    moment.locale("id");

    await this.getInitData();
  },
  methods: {
    ...mapActions(d$event, ["a$listAllEvent", "a$deleteEvent"]),

    async getInitData() {
      this.showLoading(true);

      this.indexComponent++;

      try {
        await this.a$listAllEvent();
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

    async deleteEvent(id_event) {
      this.showSwal("loading");

      this.indexComponent++;

      try {
        await this.a$deleteEvent(id_event);
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
      $("#event-list").on("click", `.edit`, function (e) {
        let event = this;
        outerThis.$router.push({
          name: "Edit Kalender",
          params: { id_event: event.id },
        });
        e.preventDefault();
      });

      // delete
      $("#event-list").on("click", `.delete`, function (e) {
        let event = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus kegiatan ${event.name}?`,
          "Berhasil menghapus data",
          event.id
        );
        e.preventDefault();
      });
    },

    setupDataTable() {
      if (document.getElementById("event-list")) {
        const dataTableSearch = new DataTable("#event-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export-kalendar").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Kalendar Kegiatan",
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

    showSwal(type, text, toastText, id_event) {
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
            this.deleteEvent(id_event);
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
