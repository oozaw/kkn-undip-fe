<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard>
          <template #button>
            <router-link
              class="btn btn-success btn-sm mt-sm-0 me-2 mb-0"
              :to="{ name: 'Tambah Kecamatan' }"
            >
              + Tambah Kecamatan
            </router-link>
            <router-link
              class="mb-0 btn btn-success btn-sm mt-sm-0 me-2 mb-0"
              :to="{ name: 'Tambah Desa' }"
            >
              + Tambah Desa
            </router-link>
          </template>
        </HeaderProfileCard>
        <ChoicesContentLoader v-if="isLoadingOnInit" />
        <div class="bg-white card mt-4" :hidden="isLoadingOnInit">
          <div class="card-header pb-0 pt-3">
            <p class="font-weight-bold text-dark mb-2">
              Pilih Tema KKN Terdaftar
              <span class="ms-1 text-xxs badge badge-success" v-if="temaStatus"
                >Aktif</span
              >
              <span class="ms-1 text-xxs badge badge-danger" v-else
                >Tidak Aktif</span
              >
            </p>
          </div>
          <div class="pb-3 pt-0 card-body">
            <div class="col-12 align-self-center">
              <select
                id="choices-tema"
                class="form-control"
                name="choices-tema"
                v-model="tema"
                @change="getListKecamatan()"
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
        <TableContentLoader v-if="isLoading" />
        <div class="bg-white card mt-4" :hidden="isLoading">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Pengajuan Lokasi Kecamatan KKN</h5>
                <p class="text-sm mb-0">
                  Daftar Lokasi Kecataman KKN Beserta Potensi
                </p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    class="mt-2 mb-0 btn btn-outline-success btn-sm export-kec mt-sm-0"
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
              <table id="kecamatan-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="col-4 ps-0">Kecamatan</th>
                    <th class="ps-0">Total Desa</th>
                    <th>Potensi</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(kec, index) in g$listKecamatan"
                    v-bind:key="kec.id_kecamatan"
                  >
                    <td class="text-sm ps-3">{{ index + 1 }}</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">{{ kec.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ kec.desa.length }}</td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#potensi_' + kec.id_kecamatan"
                      >
                        Lihat
                      </a>
                      <div
                        :id="'potensi_' + kec.id_kecamatan"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-10">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title text-wrap">
                                Potensi Kecamatan {{ kec.nama }}
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
                            <div class="modal-body text-wrap">
                              <span v-html="kec.potensi"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="text-sm">
                      <span v-if="kec.status == 1" class="badge badge-success"
                        >Diterima</span
                      >
                      <span
                        v-else-if="kec.status == 0"
                        class="badge badge-secondary"
                        >Sedang diproses</span
                      >
                      <span v-else class="badge badge-danger">Ditolak</span>
                    </td>
                    <td class="text-sm">
                      <a
                        :id="kec.id_kecamatan"
                        :name="kec.nama"
                        href="javascript:;"
                        class="detail-kecamatan"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail kecamatan"
                        title="Detail kecamatan"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        :id="kec.id_kecamatan"
                        :name="kec.nama"
                        href="javascript:;"
                        class="mx-3 edit-kecamatan"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit kecamatan"
                        title="Edit kecamatan"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        v-if="kec.status == 0"
                        :id="kec.id_kecamatan"
                        :name="kec.nama"
                        href="javascript:;"
                        class="delete-kecamatan"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus kecamatan"
                        title="Hapus kecamatan"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="ps-0">Kecamatan</th>
                    <th>Total Desa</th>
                    <th>Potensi</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <TableContentLoader v-if="isLoading" />
        <div
          class="bg-white card mt-4"
          :key="indexComponent"
          :hidden="isLoading"
        >
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Pengajuan Lokasi Desa KKN</h5>
                <p class="text-sm mb-0">Daftar Lokasi Desa KKN Terdaftar</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    class="mt-2 mb-0 btn btn-outline-success btn-sm export-desa mt-sm-0"
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
            <div class="table-responsive">
              <table id="desa-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="ps-0">Desa</th>
                    <th>Kecamatan</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(desa, index) in listDesa" :key="desa.id_desa">
                    <td class="text-sm ps-3">{{ index + 1 }}</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">{{ desa.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ desa.nama_kecamatan }}</td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Preview product"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit product"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="ps-0">Desa</th>
                    <th>Kecamatan</th>
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
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import ChoicesContentLoader from "@/views/dashboards/components/ChoicesContentLoader.vue";
import { mapActions, mapState } from "pinia";
import d$wilayah from "@/store/wilayah";
import d$auth from "@/store/auth";
import d$tema from "@/store/tema";

export default {
  name: "IndexPengajuanLokasi",
  components: {
    HeaderProfileCard,
    TableContentLoader,
    ChoicesContentLoader,
  },
  data() {
    return {
      isLoadingOnInit: true,
      isLoading: true,
      tema: "",
      temaStatus: "",
      indexComponent: 0,
      choicesTema: undefined,
      dataTableKec: undefined,
      dataTableDesa: undefined,
      listDesa: [],
    };
  },
  computed: {
    ...mapState(d$wilayah, ["g$listKabupaten", "g$listKecamatan"]),
    ...mapState(d$auth, ["g$infoUser"]),
    ...mapState(d$tema, ["g$listTema", "g$listTemaActive"]),
  },
  async created() {
    await this.getInitData();
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$wilayah, [
      "a$listKabupatenTemaBappeda",
      "a$deleteKecamatan",
    ]),
    ...mapActions(d$tema, ["a$listTema"]),

    async getInitData() {
      this.isLoadingOnInit = true;

      try {
        await this.a$listTema();
        this.tema = this.g$listTemaActive[0].id_tema;
        await this.getListKecamatan();
        this.choicesTema = this.getChoices("choices-tema");
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

    async getListKecamatan() {
      this.isLoading = true;

      this.indexComponent++;

      try {
        await this.a$listKabupatenTemaBappeda(
          this.tema,
          this.g$infoUser.id_bappeda
        );
        await this.getListDesa();
        await this.getTemaStatus();
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

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async getTemaStatus() {
      this.tema = parseInt(this.tema);
      await this.g$listTema.forEach((tema) => {
        if (tema.id_tema === this.tema) {
          this.temaStatus = tema.status;
        }
      });
    },

    async deleteKecamatan(id_kecamatan) {
      this.showSwal("loading");

      this.indexComponent++;

      try {
        await this.a$deleteKecamatan(parseInt(id_kecamatan));
        await this.getListKecamatan();
        this.showSwal("success-message", "Data mahasiswa berhasil dihapus!");
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

    getChoices(id) {
      var element = document.getElementById(id);
      if (element) {
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
          shouldSort: false,
        });
      }
    },

    setupDataTable() {
      // if (this.dataTableKec) {
      //   this.dataTableKec.clear();
      //   this.dataTableKec.destroy();
      // }

      // if (this.dataTableDesa) {
      //   this.dataTableDesa.clear();
      //   this.dataTableDesa.destroy();
      // }

      if (document.getElementById("kecamatan-list")) {
        const dataTableSearchKec = new DataTable("#kecamatan-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export-kec").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Kecamatan",
            };

            // if (type === "csv") {
            //   data.columnDelimiter = "|";
            // }

            dataTableSearchKec.export(data);
          });
        });

        this.dataTableKec = dataTableSearchKec;
      }

      if (document.getElementById("desa-list")) {
        const dataTableSearchDesa = new DataTable("#desa-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export-desa").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Desa",
            };

            // if (type === "csv") {
            //   data.columnDelimiter = "|";
            // }

            dataTableSearchDesa.export(data);
          });
        });

        this.dataTableDesa = dataTableSearchDesa;
      }
    },

    setupTableAction() {
      let outerThis = this;
      $("#kecamatan-list").on("click", `.edit-kecamatan`, function (e) {
        let kec = this;
        outerThis.$router.push({
          name: "Edit Kecamatan",
          params: { id_kecamatan: kec.id },
        });
        e.preventDefault();
      });

      // delete
      $("#kecamatan-list").on("click", `.delete-kecamatan`, function (e) {
        let kec = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus kecamatan ${kec.name}?`,
          "Berhasil menghapus data",
          kec.id
        );
        e.preventDefault();
      });

      // $("#lpk-dosen-section-list").on("click", `.delete`, function (e) {
      //   let laporan = this;
      //   outerThis.showSwal(
      //     "warning-confirmation",
      //     `Hapus laporan mahasiswa ${laporan.name}? Semua data LRK dan LPK mahasiswa tersebut akan dihapus permanen!`,
      //     "Berhasil menghapus data",
      //     laporan.id
      //   );
      //   e.preventDefault();
      // });
    },

    async getListDesa() {
      this.listDesa = [];
      await this.g$listKecamatan.forEach((kec) => {
        var elementKec = {
          nama_kecamatan: kec.nama,
        };
        kec.desa.forEach((desa) => {
          var newDesaWithKecamatan = Object.assign({}, desa, elementKec);
          this.listDesa.push(newDesaWithKecamatan);
        });
      });
    },

    showSwal(type, text, toastText, id_kecamatan) {
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
            this.deleteKecamatan(id_kecamatan);
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
