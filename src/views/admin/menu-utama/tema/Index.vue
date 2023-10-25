<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <table-content-loader v-if="isLoading" />
        <div class="bg-white card mt-4" :hidden="isLoading">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Tema KKN</h5>
                <p class="text-sm mb-0">List Tema KKN Terdaftar</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link
                    v-if="g$user.role === 'ADMIN'"
                    class="mb-0 btn bg-gradient-success btn-sm me-2"
                    :to="{ name: 'Tambah Tema KKN' }"
                    >+&nbsp; Daftarkan KKN Baru
                  </router-link>
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
                  <tr v-for="(tema, index) in listTema" :key="tema.id_tema">
                    <td class="text-sm">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto">{{ tema.nama }}</h6>
                    </td>
                    <td class="text-sm">
                      {{ tema.jenis == 1 ? "Reguler" : "Tematik" }}
                    </td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="`#lokasi-kkn-${tema.id_tema}`"
                      >
                        Lihat
                      </a>
                      <div
                        :id="`lokasi-kkn-${tema.id_tema}`"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title text-wrap">
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
                              <ul class="list-group">
                                <li
                                  class="pt-0 text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark mb-1"
                                    >Kabupaten - Kecamatan - Desa</strong
                                  >
                                  &nbsp;
                                  <ol class="list-group list-group-numbered">
                                    <li
                                      v-for="(kab, ikab) in tema.kabupaten"
                                      :key="ikab"
                                      class="mb-2"
                                    >
                                      {{ kab.nama }}:
                                      <ol class="ms-2">
                                        <li
                                          v-for="(kec, ikec) in kab.kecamatan"
                                          :key="ikec"
                                        >
                                          Kec. {{ kec.nama }}:
                                          <ol class="ms-1">
                                            <li
                                              v-for="(desa, idesa) in kec.desa"
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
                            <div class="modal-footer"></div>
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
                        href="#"
                        :id="tema.id_tema"
                        class="me-3 detail"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Tema"
                        title="Detail Tema"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <span v-if="g$user.role === 'ADMIN'">
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
                          :id="tema.id_tema"
                          :name="tema.nama"
                          href="#"
                          data-bs-toggle="tooltip"
                          class="me-3 delete"
                          data-bs-original-title="Delete product"
                        >
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                        <a
                          v-if="tema.status && g$user.role === 'ADMIN'"
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
                      </span>
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
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import { mapActions, mapState } from "pinia";
import d$tema from "@/store/tema";
import d$auth from "@/store/auth";

export default {
  name: "IndexTemaKKN",
  components: {
    HeaderProfileCard,
    TableContentLoader,
  },
  data() {
    return {
      indexComponent: 0,
      listTema: [],
      isLoading: true,
      loader: undefined,
    };
  },
  computed: {
    ...mapState(d$tema, ["g$listTema"]),
    ...mapState(d$auth, ["g$user"]),
  },
  async created() {
    await this.getListTema();
  },
  methods: {
    ...mapActions(d$tema, ["a$listTema", "a$switchTema", "a$deleteTema"]),

    async switchTema(id_tema) {
      this.showSwal("loading");

      try {
        await this.a$switchTema(id_tema);
        await this.getListTema();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diperbarui! " + msg);
      }
    },

    async deleteTema(id_tema) {
      this.showSwal("loading");

      try {
        await this.a$deleteTema(id_tema);
        await this.getListTema();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }
    },

    async getListTema() {
      this.isLoading = true;
      this.indexComponent++;

      try {
        await this.a$listTema();
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

      this.listTema = this.g$listTema;

      setTimeout(() => {
        this.setupDataTable();
        this.setupTableAction();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    setupTableAction() {
      let outerThis = this;

      // activate
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

      // deactivate
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

      // detail
      $("#kkn-list").on("click", `.detail`, function (e) {
        let tema = this;
        outerThis.$router.push({
          name: "Detail Tema KKN",
          params: { id_tema: tema.id },
        });
        e.preventDefault();
      });

      // edit
      $("#kkn-list").on("click", `.edit`, function (e) {
        let tema = this;
        outerThis.$router.push({
          name: "Edit Tema KKN",
          params: { id_tema: tema.id },
        });
        e.preventDefault();
      });

      // delete
      $("#kkn-list").on("click", `.delete`, function (e) {
        let tema = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menghapus tema ${tema.name}? Semua data terkait tema ini akan dihapus!`,
          "Berhasil menghapus data",
          tema.id,
          true
        );
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

    showSwal(type, text, toastText, id_tema, isDelete = false) {
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
            if (isDelete) this.deleteTema(id_tema);
            else this.switchTema(id_tema);
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
