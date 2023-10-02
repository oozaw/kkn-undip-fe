<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <choices-content-loader v-if="isLoadingOnInit" />
        <div class="bg-white card mt-4" :hidden="isLoadingOnInit">
          <div class="card-header pb-0 pt-3">
            <p class="font-weight-bold text-dark mb-2">
              Pilih Tema KKN Terdaftar
            </p>
          </div>
          <div class="pb-4 pt-0 card-body">
            <div class="col-12 align-self-center">
              <select
                id="choices-tema"
                class="form-control"
                name="choices-tema"
                v-model="tema"
                @change="getListJadwalPresensi()"
              >
                <option
                  v-for="tema in g$listTema"
                  :value="tema.id_tema"
                  :key="tema.id_tema"
                >
                  {{ tema.nama }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <table-content-loader v-if="isLoading" />
        <div class="bg-white card mt-4" :hidden="isLoading">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Jadwal Presensi</h5>
                <p class="text-sm mb-0">Daftar Jadwal Presensi Tema KKN</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    type="button"
                    class="me-2 mb-0 btn btn-success btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#add-jadwal"
                  >
                    + Tambah Jadwal
                  </button>
                  <div
                    id="add-jadwal"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                    :key="indexComponent"
                  >
                    <div class="modal-dialog mt-lg-6">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title text-wrap">
                            Tambah Jadwal Presensi
                          </h5>
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
                            id="form-add-jadwal"
                            @submit.prevent="addPresensi()"
                          >
                            <label class="form-label">Tanggal</label>
                            <VueDatePicker
                              id="tgl"
                              name="tgl"
                              v-model="body.tgl"
                              placeholder="Pilih tanggal"
                              locale="id"
                              cancel-text="Batal"
                              select-text="Pilih"
                              :format="'dd MMMM yyyy'"
                              :enable-time-picker="false"
                              :format-locale="id"
                              required
                            ></VueDatePicker>
                          </form>
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
                            form="form-add-jadwal"
                            type="submit"
                            class="btn bg-gradient-success btn-sm"
                          >
                            Tambah
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    id="edit-jadwal-button-modal"
                    type="button"
                    class="me-3"
                    data-bs-toggle="modal"
                    data-bs-target="#edit-jadwal"
                    hidden
                  >
                    <i class="fas fa-user-edit text-primary"></i>
                  </a>
                  <div
                    id="edit-jadwal"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                    :key="indexComponent"
                  >
                    <div class="modal-dialog mt-lg-6">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title text-wrap">
                            Edit Jadwal Presensi {{ edit.judul }}
                          </h5>
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
                            id="form-edit-jadwal"
                            @submit.prevent="editJadwalPresensi()"
                          >
                            <label class="form-label">Tanggal</label>
                            <VueDatePicker
                              id="tgl-edit"
                              name="tgl-edit"
                              v-model="edit.tgl"
                              placeholder="Pilih tanggal"
                              locale="id"
                              cancel-text="Batal"
                              select-text="Pilih"
                              :format="'dd MMMM yyyy'"
                              :enable-time-picker="false"
                              :format-locale="id"
                            ></VueDatePicker>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button
                            id="button-close-modal-edit"
                            type="button"
                            class="btn bg-gradient-secondary btn-sm"
                            data-bs-dismiss="modal"
                          >
                            Batal
                          </button>
                          <button
                            form="form-edit-jadwal"
                            type="submit"
                            class="btn bg-gradient-success btn-sm edit"
                          >
                            Tambah
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Ekspor Button -->
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
          <div class="ms-2 pt-1 px-0 pb-0 card-body">
            <div class="table-responsive" :key="indexComponent">
              <table id="jadwal-presensi-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th>No.</th>
                    <th>Tanggal</th>
                    <th>Tema</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(presensi, index) in listPresensi"
                    :key="presensi.id_presensi"
                  >
                    <td class="text-sm">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto">
                        {{ moment(presensi.tgl).format("dddd, DD MMMM YYYY") }}
                      </h6>
                    </td>
                    <td class="text-sm">{{ presensi.tema?.nama }}</td>
                    <td>
                      <span
                        v-if="presensi.status == 1"
                        class="badge badge-sm badge-success"
                      >
                        Dibuka
                      </span>
                      <span
                        v-else-if="presensi.status == 0"
                        class="badge badge-secondary badge-sm"
                      >
                        Belum dibuka
                      </span>
                      <span v-else class="badge badge-danger badge-sm">
                        Ditutup
                      </span>
                    </td>
                    <td class="text-sm">
                      <a
                        :id="presensi.id_presensi"
                        :name="presensi.tgl"
                        href="#"
                        class="me-3 edit"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Presensi"
                        title="Edit Presensi"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        :id="presensi.id_presensi"
                        :name="
                          moment(presensi.tgl).format('dddd, DD MMMM YYYY')
                        "
                        href="#"
                        data-bs-toggle="tooltip"
                        class="me-3 delete"
                        data-bs-original-title="Hapus Presensi"
                        title="Hapus Presensi"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                      <!-- <a
                        v-if="presensi.status"
                        :id="presensi.id_presensi"
                        :name="presensi.nama"
                        class="me-3 non-aktif"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Nonaktifkan presensi"
                        title="Nonaktifkan presensi"
                      >
                        <font-awesome-icon
                          class="text-danger"
                          icon="fa-solid fa-square-xmark"
                          size="xl"
                        />
                      </a>
                      <a
                        v-else
                        :id="presensi.id_presensi"
                        :name="presensi.nama"
                        class="me-3 aktif"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Aktifkan presensi"
                        title="Aktifkan presensi"
                      >
                        <font-awesome-icon
                          class="text-success"
                          icon="fa-solid fa-square-check"
                          size="xl"
                        />
                      </a> -->
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>No.</th>
                    <th>Tanggal</th>
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
import { id } from "date-fns/locale";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Choices from "choices.js";
import moment from "moment";
import { DataTable } from "simple-datatables";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import ChoicesContentLoader from "@/views/dashboards/components/ChoicesContentLoader.vue";
import { mapActions, mapState } from "pinia";
import d$tema from "@/store/tema";
import d$presensi from "@/store/presensi";

export default {
  name: "IndexJadwalPresensi",
  components: {
    HeaderProfileCard,
    TableContentLoader,
    ChoicesContentLoader,
    VueDatePicker,
  },
  data() {
    return {
      id,
      tema: "",
      indexComponent: 0,
      listPresensi: [],
      isLoadingOnInit: true,
      isLoading: true,
      choicesTema: undefined,
      dataTable: undefined,
      body: {
        id_tema: "",
        tgl: "",
      },
      edit: {
        id_presensi: "",
        tgl: "",
        judul: "",
      },
      moment,
    };
  },
  computed: {
    ...mapState(d$tema, ["g$listTema"]),
    ...mapState(d$presensi, ["g$listPresensi"]),
  },
  async created() {
    moment.locale("id");

    await this.getInitData();
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$tema, ["a$listTema"]),
    ...mapActions(d$presensi, [
      "a$listJadwalPresensiTema",
      "a$addJadwalPresensi",
      "a$deleteJadwalPresensi",
      "a$editJadwalPresensi",
    ]),

    async getInitData() {
      this.isLoadingOnInit = true;
      this.isLoading = true;

      try {
        await this.a$listTema();
        this.tema = this.g$listTema[0].id_tema;
        await this.getListJadwalPresensi();
        this.setupChoices();
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

      setTimeout(() => {
        this.isLoadingOnInit = false;
      }, 50);
    },

    async getListJadwalPresensi() {
      this.isLoading = true;
      this.indexComponent++;

      try {
        await this.a$listJadwalPresensiTema(parseInt(this.tema));
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

      this.listPresensi = this.g$listPresensi;

      setTimeout(() => {
        this.setupDataTable();
        this.setupTableAction();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async addPresensi() {
      // validation
      if (!this.body.tgl || this.body.tgl === "") {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      this.showSwal("loading");
      this.body.id_tema = parseInt(this.tema);

      try {
        document.getElementById("button-close-modal").click();
        await this.a$addJadwalPresensi(this.body);
        await this.getListJadwalPresensi();
        this.showSwal("success-message", "Berhasil menambahkan presensi");
        this.body.tgl = "";
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal ditambahkan! " + msg);
      }
    },

    async editJadwalPresensi() {
      // validation
      if (!this.edit.tgl || this.edit.tgl === "") {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      this.showSwal("loading");

      const body = {
        tgl: this.edit.tgl,
      };

      try {
        document.getElementById("button-close-modal-edit").click();
        await this.a$editJadwalPresensi(this.edit.id_presensi, body);
        await this.getListJadwalPresensi();
        this.showSwal("success-message", "Berhasil mengubah jadwal presensi");
        this.edit.tgl = "";
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diubah! " + msg);
      }
    },

    async deleteJadwalPresensi(id_presensi) {
      this.showSwal("loading");

      try {
        await this.a$deleteJadwalPresensi(id_presensi);
        await this.getListJadwalPresensi();
        this.showSwal("success-message", "Berhasil menghapus jadwal presensi");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }
    },

    getEditTgl() {
      const data = Object.assign({}, this.edit);
      this.edit.judul = moment(data.tgl).format("dddd, DD MMMM YYYY");
    },

    setupTableAction() {
      let outerThis = this;

      $("#jadwal-presensi-list").on("click", `.edit`, function (e) {
        let presensi = this;
        outerThis.edit.id_presensi = presensi.id;
        outerThis.edit.tgl = presensi.name;
        outerThis.getEditTgl();
        document.getElementById("edit-jadwal-button-modal").click();
        e.preventDefault();
      });

      $("#jadwal-presensi-list").on("click", `.delete`, function (e) {
        let presensi = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus jadwal presensi ${presensi.name}? Semua riwayat presensi mahasiswa pada tanggal tersebut akan dihapus!`,
          presensi.id
        );
        e.preventDefault();
      });
    },

    setupDataTable() {
      if (document.getElementById("jadwal-presensi-list")) {
        const dataTableSearch = new DataTable("#jadwal-presensi-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Presensi KKN",
            };

            //  if (type === "csv") {
            //    data.columnDelimiter = "|";
            //  }

            dataTableSearch.export(data);
          });
        });

        this.dataTable = dataTableSearch;
      }
    },

    setupChoices() {
      this.choicesTema = this.getChoices("choices-tema");
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

    showSwal(type, text, idPresensi) {
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
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteJadwalPresensi(idPresensi);
            // this.$swal({
            //   toast: true,
            //   position: "top-end",
            //   title: toastText,
            //   icon: "success",
            //   showConfirmButton: false,
            //   timer: 2000,
            //   timerProgressBar: true,
            //   didOpen: () => {
            //     this.$swal.hideLoading();
            //   },
            // });
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
