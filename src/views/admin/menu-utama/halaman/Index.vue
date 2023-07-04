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
                  <!-- <button
                    type="button"
                    class="me-2 mb-0 btn btn-success btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#add-halaman"
                  >
                    + Tambah Halaman
                  </button>
                  <div
                    id="add-halaman"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                    :key="indexComponent"
                  >
                    <div class="modal-dialog mt-lg-10">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title">
                            Tambah Halaman
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
                            id="form-add-halaman"
                            @submit.prevent="addHalaman()"
                          >
                            <label class="form-label">Judul</label>
                            <input
                              class="form-control"
                              type="text"
                              name="nama"
                              id="nama"
                              placeholder="Judul halaman"
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
                            form="form-add-halaman"
                            type="submit"
                            class="btn bg-gradient-success btn-sm"
                          >
                            Tambah
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> -->
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
                    <td class="text-sm">1 Desember 2023</td>
                    <td class="text-sm">15 Desember 2023</td>
                    <td class="text-sm">
                      <span v-if="halaman.status" class="badge badge-success"
                        >Aktif</span
                      >
                      <span v-else class="badge badge-danger">Tidak Aktif</span>
                    </td>
                    <td class="text-sm">
                      <router-link
                        :to="{ name: 'Edit Halaman' }"
                        class="me-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Halaman"
                        title="Edit Halaman"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </router-link>
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
                      <a
                        href="javascript"
                        class="me-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Halaman"
                        title="Hapus Halaman"
                      >
                        <i class="fas fa-trash text-danger"></i>
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
import Choices from "choices.js";
import setTooltip from "@/assets/js/tooltip.js";
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
      choicesAktor: undefined,
      indexComponent: 0,
      body: {
        nama: "",
      },
    };
  },
  computed: {
    ...mapState(d$halaman, ["g$listHalaman"]),
    ...mapState(d$tema, ["g$listTema"]),
  },
  async created() {
    await this.getInitData();

    this.choicesTema = this.getChoices("choices-tema");
    this.choicesAktor = this.getChoices("choices-aktor");

    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
    if (this.choicesAktor) this.choicesAktor.destroy();
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
        this.showSwal("failed-message", "Terjadi kesalahan saat memuat data");
        console.log(error.error);
      }
    },

    async getListHalaman() {
      this.indexComponent++;

      try {
        await this.a$listHalaman(parseInt(this.tema));
      } catch (error) {
        this.showSwal("failed-message", "Terjadi kesalahan saat memuat data");
        console.log(error.error);
      }

      this.setupDataTable();
      this.setupTableAction();
    },

    async addHalaman() {
      this.showSwal("loading");

      try {
        document.getElementById("button-close-modal").click();
        await this.a$addHalaman(this.body);
        await this.getListHalaman();
        this.showSwal("success-message", "Data halaman berhasil ditambahkan");
        // this.indexComponent++;
        this.body.nama = "";
      } catch (error) {
        this.showSwal(
          "failed-message",
          error.error ?? "Gagal menambahkan data halaman"
        );
        console.log(error);
      }
    },

    async switchHalaman(id_halaman) {
      this.showSwal("loading");

      try {
        await this.a$switchHalaman(id_halaman);
        await this.getListHalaman();
      } catch (error) {
        this.showSwal(
          "failed-message",
          error.error ?? "Gagal mengubah data halaman"
        );
        console.log(error);
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
      this.g$listHalaman.forEach((halaman) => {
        if (document.getElementById(`aktif-${halaman.id_halaman}`)) {
          document
            .getElementById(`aktif-${halaman.id_halaman}`)
            .addEventListener("click", (e) => {
              this.showSwal(
                "warning-confirmation",
                `Mengaktifkan halaman ${halaman.nama}?`,
                "Berhasil memperbarui data",
                halaman.id_halaman
              );
              e.preventDefault();
            });
        }

        if (document.getElementById(`non-aktif-${halaman.id_halaman}`)) {
          document
            .getElementById(`non-aktif-${halaman.id_halaman}`)
            .addEventListener("click", (e) => {
              this.showSwal(
                "warning-confirmation",
                `Menonaktifkan halaman ${halaman.nama}?`,
                "Berhasil memperbarui data",
                halaman.id_halaman
              );
              e.preventDefault();
            });
        }
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
            this.switchHalaman(id_halaman);
            this.$swal({
              toast: true,
              position: "top-end",
              title: toastText,
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
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
            this.$swal.isLoading();
            if (this.$swal.isLoading()) this.$swal.showLoading();
          },
          didDestroy: () => {
            !this.$swal.isLoading();
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
