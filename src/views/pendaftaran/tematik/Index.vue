<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <div class="bg-white card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">KKN Tematik</h5>
                <p class="text-sm mb-0">List Tema KKN Tematik</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link
                    class="mb-0 btn bg-gradient-success btn-sm me-2"
                    :to="{ name: 'Tambah Tema KKN Tematik' }"
                    >+&nbsp; Daftarkan KKN Baru
                  </router-link>
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
              <table id="kkn-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Tema KKN</th>
                    <th>Jenis</th>
                    <th>Lokasi</th>
                    <th>Periode</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tema, index) in g$listTema" :key="tema.id_tema">
                    <td class="text-sm">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto">{{ tema.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ tema.nama }}</td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#lokasi-kkn"
                      >
                        Lihat
                      </a>
                      <div
                        id="lokasi-kkn"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-10">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title">
                                Lokasi KKN Reguler Tim 1
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
                            <div class="modal-body">
                              <p>
                                Silahkan cari dan pilih file excel berisi data
                                mahasiswa
                              </p>
                              <input
                                type="file"
                                placeholder="Browse file..."
                                class="mb-1 form-control"
                              />
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
                                type="button"
                                class="btn bg-gradient-secondary btn-sm"
                                data-bs-dismiss="modal"
                              >
                                Batal
                              </button>
                              <button
                                type="button"
                                class="btn bg-gradient-success btn-sm"
                              >
                                Unggah
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="text-sm">{{ tema.periode }}</td>
                    <td>
                      <span
                        v-if="tema.status"
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
                        href="javascript:;"
                        class="me-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Preview product"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        href="#"
                        :id="tema.id_tema"
                        class="me-3 edit"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Tema"
                        title="Edit Tema"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        class="me-3"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                      <a
                        v-if="tema.status"
                        :id="tema.id_tema"
                        :name="tema.nama"
                        class="me-3 non-aktif"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Non-aktifkan Tema"
                        title="Non-aktifkan Tema"
                      >
                        <font-awesome-icon
                          class="text-danger"
                          icon="fa-solid fa-square-xmark"
                          size="xl"
                        />
                      </a>
                      <a
                        v-else
                        :id="tema.id_tema"
                        :name="tema.nama"
                        class="me-3 aktif"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Aktifkan Tema"
                        title="Aktifkan Tema"
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
                    <th>Tema KKN</th>
                    <th>Jenis</th>
                    <th>Lokasi</th>
                    <th>Periode</th>
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
import setTooltip from "@/assets/js/tooltip.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$tema from "@/store/tema";

export default {
  name: "IndexTemaKKNTematik",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      indexComponent: 0,
    };
  },
  computed: {
    ...mapState(d$tema, ["g$listTema"]),
  },
  async created() {
    await this.getListTema();
    setTooltip(this.$store.state.bootstrap);
  },
  methods: {
    ...mapActions(d$tema, ["a$listTema", "a$switchTema"]),

    async switchTema(id_tema) {
      this.showSwal("loading");

      try {
        await this.a$switchTema(id_tema);
        await this.getListTema();
      } catch (error) {
        this.showSwal(
          "failed-message",
          error ?? "Terjadi kesalahan saat memperbarui data"
        );
        // console.log(error);
      }
    },

    async getListTema() {
      this.indexComponent++;

      try {
        await this.a$listTema();
      } catch (error) {
        this.showSwal(
          "failed-message",
          error ?? "Terjadi kesalahan saat memuat data"
        );
        // console.log(error);
      }

      this.setupDataTable();
      this.setupTableAction();
    },

    setupTableAction() {
      let outerThis = this;
      $("#kkn-list").on("click", `.aktif`, function (e) {
        let tema = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Mengaktifkan tema ${tema.name}?`,
          "Berhasil memperbarui data",
          tema.id
        );
        e.preventDefault();
      });

      $("#kkn-list").on("click", `.non-aktif`, function (e) {
        let tema = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menonaktifkan tema ${tema.name}?`,
          "Berhasil memperbarui data",
          tema.id
        );
        e.preventDefault();
      });

      $("#kkn-list").on("click", `.edit`, function (e) {
        let tema = this;
        outerThis.$router.push({
          name: "Edit Tema KKN",
          params: { id_tema: tema.id },
        });
        e.preventDefault();
      });
    },

    setupDataTable() {
      if (document.getElementById("kkn-list")) {
        const dataTableSearch = new DataTable("#kkn-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Tema KKN Terdaftar",
            };

            //  if (type === "csv") {
            //    data.columnDelimiter = "|";
            //  }

            dataTableSearch.export(data);
          });
        });
      }
    },

    showSwal(type, text, toastText, id_tema) {
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
            this.switchTema(id_tema);
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
