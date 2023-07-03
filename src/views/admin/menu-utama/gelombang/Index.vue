<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
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
                @change="getListGelombang()"
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
        <div class="bg-white card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Gelombang Pendaftaran</h5>
                <p class="text-sm mb-0">Daftar gelombang pendaftaran KKN</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    type="button"
                    class="me-2 mb-0 btn btn-success btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#add-gelombang"
                  >
                    + Tambah Gelombang
                  </button>
                  <div
                    id="add-gelombang"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                    :key="indexComponent"
                  >
                    <div class="modal-dialog mt-lg-10">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title">
                            Tambah Gelombang
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
                            id="form-add-gelombang"
                            @submit.prevent="addGelombang()"
                          >
                            <!-- <label class="form-label">Tema</label>
                            <select
                              name="jenis"
                              id="choices-tema-modal"
                              class="choices-tema-modal form-select"
                              v-model="body.id_tema"
                            >
                              <option value="0" hidden>-- Pilih Tema --</option>
                              <option
                                v-for="tema in g$listTema"
                                :key="tema.id_tema"
                                :value="tema.id_tema"
                              >
                                {{ tema.nama }}
                              </option>
                            </select> -->
                            <label class="form-label">Halaman</label>
                            <select
                              name="jenis"
                              id="choices-halaman-modal"
                              class="choices-halaman-modal form-select"
                              v-model="body.id_tema_halaman"
                            >
                              <option value="0" selected hidden disabled>
                                -- Pilih Halaman --
                              </option>
                              <option
                                v-for="halaman in g$listHalaman"
                                :key="halaman.id_tema_halaman"
                                :value="halaman.id_tema_halaman"
                              >
                                {{ halaman.halaman.nama }}
                              </option>
                            </select>
                            <label class="form-label">Nama</label>
                            <input
                              class="form-control"
                              type="text"
                              name="nama"
                              id="nama"
                              placeholder="Nama gelombang"
                              required
                              v-model="body.nama"
                            />
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
                            form="form-add-gelombang"
                            type="submit"
                            class="btn bg-gradient-success btn-sm"
                          >
                            Tambah
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
          <div class="ms-2 pt-1 px-0 pb-0 card-body">
            <div class="table-responsive" :key="indexComponent">
              <table id="gelombang-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Nama</th>
                    <th>Halaman</th>
                    <th>Tema</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(gelombang, index) in g$listGelombang"
                    :key="gelombang.id_gelombang"
                  >
                    <td class="text-sm">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto">{{ gelombang.nama }}</h6>
                    </td>
                    <td class="text-sm">
                      {{ gelombang.tema_halaman.halaman.nama }}
                    </td>
                    <td class="text-sm">
                      {{ gelombang.tema_halaman.tema.nama }}
                    </td>
                    <td>
                      <span
                        id="delete-product"
                        v-if="gelombang.status"
                        class="badge badge-sm badge-success"
                      >
                        Aktif
                      </span>
                      <span v-else class="badge badge-danger badge-sm">
                        Tidak Aktif
                      </span>
                    </td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 me-3 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#detail_' + gelombang.id_gelombang"
                        title="Detail Gelombang"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + gelombang.id_gelombang"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-12">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title">
                                Detail {{ gelombang.nama }}
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
                                  class="pt-0 text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Nama:</strong>
                                  &nbsp;
                                  {{ gelombang.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Halaman:</strong>
                                  &nbsp;
                                  {{ gelombang.tema_halaman.halaman.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark"
                                    >Tanggal Dibuka:</strong
                                  >
                                  &nbsp;
                                  {{
                                    gelombang.tgl_mulai
                                      ? moment(gelombang.tgl_mulai).format(
                                          "dddd, DD MMMM YYYY HH:mm"
                                        )
                                      : "-"
                                  }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark"
                                    >Tanggal Ditutup:</strong
                                  >
                                  &nbsp;
                                  {{
                                    gelombang.tgl_akhir
                                      ? moment(gelombang.tgl_akhir).format(
                                          "dddd, DD MMMM YYYY HH:mm"
                                        )
                                      : "-"
                                  }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Status:</strong>
                                  &nbsp;
                                  <span
                                    v-if="gelombang.status"
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
                        :id="gelombang.id_gelombang"
                        href="#"
                        class="me-3 edit"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Gelombang"
                        title="Edit Gelombang"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        class="me-3"
                        data-bs-original-title="Hapus Gelombang"
                        title="Hapus Gelombang"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                      <a
                        v-if="gelombang.status"
                        :id="gelombang.id_gelombang"
                        :name="gelombang.nama"
                        class="me-3 non-aktif"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Nonaktifkan gelombang"
                        title="Nonaktifkan gelombang"
                      >
                        <font-awesome-icon
                          class="text-danger"
                          icon="fa-solid fa-square-xmark"
                          size="xl"
                        />
                      </a>
                      <a
                        v-else
                        :id="gelombang.id_gelombang"
                        :name="gelombang.nama"
                        class="me-3 aktif"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Aktifkan gelombang"
                        title="Aktifkan gelombang"
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
                    <th class="col-1">No.</th>
                    <th>Nama</th>
                    <th>Halaman</th>
                    <th>Tema</th>
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
import moment from "moment";
import { DataTable } from "simple-datatables";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$tema from "@/store/tema";
import d$gelombang from "@/store/gelombang";
import d$halaman from "@/store/halaman";

export default {
  name: "IndexGelombang",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      tema: "",
      indexComponent: 0,
      choicesTema: undefined,
      choicesTemaModal: undefined,
      choicesHalamanModal: undefined,
      dataTable: undefined,
      body: {
        id_tema_halaman: "",
        nama: "",
      },
      moment,
    };
  },
  computed: {
    ...mapState(d$tema, ["g$listTema"]),
    ...mapState(d$gelombang, ["g$listGelombang"]),
    ...mapState(d$halaman, ["g$listHalaman"]),
  },
  async created() {
    moment.locale("id");

    await this.a$listTema();
    this.tema = this.g$listTema[0].id_tema;

    await this.getListGelombang();

    this.setupChoices();
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
    // if (this.choicesTemaModal) this.choicesTemaModal.destroy();
    if (this.choicesHalamanModal) this.choicesHalamanModal.destroy();
  },
  methods: {
    ...mapActions(d$tema, ["a$listTema"]),
    ...mapActions(d$gelombang, [
      "a$listAllGelombang",
      "a$switchGelombang",
      "a$addGelombang",
    ]),
    ...mapActions(d$halaman, ["a$listHalaman"]),

    async addGelombang() {
      // validation
      if (!this.body.id_tema_halaman || this.body.id_tema_halaman === "0") {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      this.showSwal("loading");
      // this.body.id_tema = parseInt(this.body.id_tema);
      this.body.id_tema_halaman = parseInt(this.body.id_tema_halaman);

      try {
        document.getElementById("button-close-modal").click();
        await this.a$addGelombang(this.body);
        await this.getListGelombang();
        this.showSwal("success-message", "Berhasil menambahkan gelombang");
        // this.indexComponent++;
        // this.setupChoices();
        this.body.id_tema_halaman = "0";
        this.body.nama = "";
      } catch (error) {
        this.showSwal(
          "failed-message",
          error.error ?? "Terjadi kesalahan saat menambahkan gelombang"
        );
        // console.log(error);
      }
    },

    async switchGelombang(id_tema) {
      this.showSwal("loading");

      try {
        await this.a$switchGelombang(id_tema);
        await this.getListGelombang();
      } catch (error) {
        this.showSwal(
          "failed-message",
          error ?? "Terjadi kesalahan saat memperbarui data"
        );
        // console.log(error);
      }
    },

    async getListGelombang() {
      this.indexComponent++;

      try {
        await this.a$listHalaman(parseInt(this.tema));
        this.choicesHalamanModal = this.getChoices("choices-halaman-modal");

        await this.a$listAllGelombang(parseInt(this.tema));
      } catch (error) {
        this.showSwal("failed-message", "Terjadi kesalahan saat memuat data");
        console.log(error.error);
      }

      this.setupDataTable();
      this.setupTableAction();
    },

    setupTableAction() {
      let outerThis = this;
      $("#gelombang-list").on("click", `.aktif`, function (e) {
        let gelombang = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Mengaktifkan gelombang ${gelombang.name}?`,
          "Berhasil memperbarui data",
          gelombang.id
        );
        e.preventDefault();
      });

      $("#gelombang-list").on("click", `.non-aktif`, function (e) {
        let gelombang = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menonaktifkan gelombang ${gelombang.name}?`,
          "Berhasil memperbarui data",
          gelombang.id
        );
        e.preventDefault();
      });

      $("#gelombang-list").on("click", `.edit`, function (e) {
        let gelombang = this;
        outerThis.$router.push({
          name: "Edit Gelombang",
          params: {
            id_tema: parseInt(outerThis.tema),
            id_gelombang: gelombang.id,
          },
        });
        e.preventDefault();
      });
    },

    setupDataTable() {
      if (document.getElementById("gelombang-list")) {
        const dataTableSearch = new DataTable("#gelombang-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Gelombang KKN",
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
      // this.choicesTemaModal = this.getChoices("choices-tema-modal");
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

    showSwal(type, text, toastText, id_gelombang) {
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
            this.switchGelombang(id_gelombang);
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
