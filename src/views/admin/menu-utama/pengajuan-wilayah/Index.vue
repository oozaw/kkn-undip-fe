<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard />
        <choices-content-loader v-if="isLoadingOnInit" />
        <div class="bg-white card mt-4" :hidden="isLoadingOnInit">
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
                @change="getListKecamatan()"
                v-model="tema"
              >
                <option
                  v-for="tema in g$listTemaActive"
                  :key="tema.id_tema"
                  :value="tema.id_tema"
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
                <h5 class="mb-2">Pengajuan Lokasi Kecamatan KKN</h5>
                <p class="text-sm mb-0">
                  Daftar Lokasi Kecataman KKN Beserta Potensi
                </p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <!-- <button
                    class="mt-2 mb-0 btn btn-outline-success btn-sm export-kec mt-sm-0"
                    data-type="csv"
                    type="button"
                    name="button"
                  >
                    Expor
                  </button> -->
                </div>
              </div>
            </div>
          </div>
          <div class="ms-2 pt-1 px-0 pb-0 card-body">
            <div class="table-responsive" :key="indexComponent">
              <table id="wilayah-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="col-3 ps-0">Kecamatan</th>
                    <th class="ps-0">Total Desa</th>
                    <th>BAPPEDA</th>
                    <th>Potensi</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(kec, index) in listKecamatan"
                    :key="kec.id_kecamatan"
                  >
                    <td class="text-sm ps-3">{{ index + 1 }}</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">{{ kec.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ kec.desa.length }}</td>
                    <td class="text-sm">{{ kec.nama_kabupaten }}</td>
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
                            <div class="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="text-sm">
                      <span class="badge badge-primary" v-if="kec.status === 0"
                        >Sedang diproses</span
                      >
                      <span
                        class="badge badge-success"
                        v-else-if="kec.status === 1"
                        >Diterima</span
                      >
                      <span class="badge badge-danger" v-else>Ditolak</span>
                    </td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 me-3 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#detail_' + kec.id_kecamatan"
                        title="Detail Kecamatan"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + kec.id_kecamatan"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-8">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title text-wrap">
                                Detail {{ kec.nama }}
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
                                  {{ kec.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Kabupaten:</strong>
                                  &nbsp;
                                  {{ kec.nama_kabupaten }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Desa:</strong>
                                  &nbsp;
                                  <ol class="ms-1">
                                    <li
                                      v-for="(desa, idesa) in kec.desa"
                                      :key="idesa"
                                    >
                                      Desa {{ desa.nama }}
                                    </li>
                                  </ol>
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Potensi:</strong>
                                  &nbsp;
                                  <span v-html="kec.potensi"></span>
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Status:</strong>
                                  &nbsp;
                                  <span
                                    class="badge badge-primary"
                                    v-if="kec.status === 0"
                                    >Sedang diproses</span
                                  >
                                  <span
                                    class="badge badge-success"
                                    v-else-if="kec.status === 1"
                                    >Diterima</span
                                  >
                                  <span class="badge badge-danger" v-else
                                    >Ditolak</span
                                  >
                                </li>
                              </ul>
                            </div>
                            <div class="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                      <span v-if="g$user.role === 'ADMIN'">
                        <a
                          :id="kec.id_kecamatan"
                          :name="kec.nama"
                          class="me-3 delete"
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Hapus Kecamatan"
                          title="Hapus Kecamatan"
                        >
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                        <a
                          v-if="kec.status == 0 || kec.status == 1"
                          :id="kec.id_kecamatan"
                          :name="kec.nama"
                          class="me-3 tolak"
                          href=""
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Tolak Kecamatan"
                          title="Tolak"
                        >
                          <font-awesome-icon
                            class="text-danger"
                            icon="fa-solid fa-square-xmark"
                            size="xl"
                          />
                        </a>
                        <a
                          v-if="kec.status == 0 || kec.status != 1"
                          :id="kec.id_kecamatan"
                          :name="kec.nama"
                          class="me-3 terima"
                          href=""
                          data-bs-toggle="modal"
                          :data-bs-target="'#terima_' + kec.id_kecamatan"
                          title="Terima"
                        >
                          <font-awesome-icon
                            class="text-success"
                            icon="fa-solid fa-square-check"
                            size="xl"
                          />
                        </a>
                        <div
                          :id="'terima_' + kec.id_kecamatan"
                          class="modal fade"
                          tabindex="-1"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog modal-lg mt-lg-10">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5
                                  id="ModalLabel"
                                  class="modal-title text-wrap"
                                >
                                  Terima Pengajuan Kecamatan {{ kec.nama }}?
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
                                <label class="form-label"
                                  >Koordinator Wilayah</label
                                >
                                <select
                                  :id="`choices-korwil-${kec.id_kecamatan}`"
                                  class="form-control"
                                  :name="`choices-korwil-${kec.id_kecamatan}`"
                                >
                                  <option value="" selected>
                                    -- Pilih korwil --
                                  </option>
                                  <option
                                    v-for="korwil in g$listKorwil"
                                    :key="korwil.id_korwil"
                                    :value="korwil.id_korwil"
                                  >
                                    {{ korwil.nama }}
                                  </option>
                                </select>
                              </div>
                              <div class="modal-footer mb-0">
                                <button
                                  :id="`button-close-modal-${kec.id_kecamatan}`"
                                  type="button"
                                  class="btn bg-gradient-secondary btn-sm"
                                  data-bs-dismiss="modal"
                                >
                                  Batal
                                </button>
                                <button
                                  :id="kec.id_kecamatan"
                                  type="button"
                                  class="btn bg-gradient-success btn-sm submit-acc-kecamatan"
                                >
                                  Ya, terima
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="ps-0">Kecamatan</th>
                    <th>Total Desa</th>
                    <th>BAPPEDA</th>
                    <th>Potensi</th>
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
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import ChoicesContentLoader from "@/views/dashboards/components/ChoicesContentLoader.vue";
import { mapActions, mapState } from "pinia";
import d$wilayah from "@/store/wilayah";
import d$tema from "@/store/tema";
import d$korwil from "@/store/korwil";
import d$auth from "@/store/auth";

export default {
  name: "IndexPengajuanWilayah",
  components: {
    HeaderProfileCard,
    TableContentLoader,
    ChoicesContentLoader,
  },
  data() {
    return {
      indexComponent: 0,
      listKecamatan: [],
      isLoading: true,
      isLoadingOnInit: true,
      body: {
        id_korwil: "",
      },
      choicesTema: undefined,
      tema: "",
      loader: undefined,
      korwilChoices: [],
    };
  },
  computed: {
    ...mapState(d$wilayah, ["g$listKecamatan"]),
    ...mapState(d$tema, ["g$listTemaActive"]),
    ...mapState(d$korwil, ["g$listKorwil"]),
    ...mapState(d$auth, ["g$user"]),
  },
  async created() {
    await this.getInitData();
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$wilayah, [
      "a$listKabupaten",
      "a$accKecamatan",
      "a$decKecamatan",
      "a$deleteKecamatan",
    ]),
    ...mapActions(d$tema, ["a$listTema"]),
    ...mapActions(d$korwil, ["a$listKorwil"]),

    async getInitData() {
      this.isLoadingOnInit = true;
      this.indexComponent++;

      try {
        await this.a$listTema();
        this.tema = this.g$listTemaActive[0].id_tema;
        await this.a$listKorwil();
        this.clearKorwilChoices();
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

    async deleteKecamatan(id_kecamatan) {
      this.showSwal("loading");

      try {
        await this.a$deleteKecamatan(id_kecamatan);
        await this.getListKecamatan();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }
    },

    async getListKecamatan() {
      this.isLoading = true;
      this.tema = parseInt(this.tema);
      this.indexComponent++;

      try {
        await this.a$listKabupaten(this.tema);
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

      this.listKecamatan = this.g$listKecamatan;

      setTimeout(() => {
        this.setupDataTable();
        this.setupTableAction();

        this.g$listKecamatan.forEach((kec) => {
          this.korwilChoices = [];
          this.korwilChoices.push(
            this.getChoices(`choices-korwil-${kec.id_kecamatan}`)
          );
        });
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async accKecamatan(id_kecamatan) {
      this.showSwal("loading");
      let id_korwil = $(`#choices-korwil-${id_kecamatan}`).val();
      this.body.id_korwil = parseInt(id_korwil);

      if (!this.body.id_korwil || this.body.id_korwil === "") {
        this.showSwal("warning-message", "Pilih koordinator wilayah!");
        return;
      }

      try {
        document.getElementById(`button-close-modal-${id_kecamatan}`).click();
        await this.a$accKecamatan(id_kecamatan, this.body);
        this.showSwal("toast", "Berhasil mengubah data");
        await this.getListKecamatan();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diperbarui! " + msg);
      }
    },

    async decKecamatan(id_kecamatan) {
      this.showSwal("loading");

      try {
        await this.a$decKecamatan(id_kecamatan);
        await this.getListKecamatan();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diperbarui! " + msg);
      }
    },

    clearKorwilChoices() {
      this.korwilChoices.forEach((choice) => {
        choice.destroy();
      });
      this.korwilChoices = [];
    },

    setupDataTable() {
      if (document.getElementById("wilayah-list")) {
        const dataTableSearch = new DataTable("#wilayah-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export-kec").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Pengajuan Wilayah",
            };

            // if (type === "csv") {
            //   data.columnDelimiter = "|";
            // }

            dataTableSearch.export(data);
          });
        });
      }
    },

    setupTableAction() {
      let outerThis = this;
      $("#wilayah-list").on("click", `.submit-acc-kecamatan`, function (e) {
        let kec = this;
        outerThis.accKecamatan(kec.id);
        e.preventDefault();
      });

      $("#wilayah-list").on("click", `.tolak`, function (e) {
        let kec = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menolak pengajuan kecamatan ${kec.name}?`,
          "Berhasil memperbarui data",
          kec.id,
          false,
          false
        );
        e.preventDefault();
      });

      $("#wilayah-list").on("click", `.delete`, function (e) {
        let kec = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menghapus pengajuan kecamatan ${kec.name}?`,
          "Berhasil menghapus data",
          kec.id,
          true,
          false
        );
        e.preventDefault();
      });
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

    showSwal(type, text, toastText, id_kecamatan, isDelete = false, status) {
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
          timer: 2000,
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
            if (isDelete) this.deleteKecamatan(id_kecamatan);
            else if (!isDelete && status) this.accKecamatan(id_kecamatan);
            else this.decKecamatan(id_kecamatan);
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
      } else if (type === "toast") {
        this.$swal({
          toast: true,
          position: "top-end",
          title: text,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
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
