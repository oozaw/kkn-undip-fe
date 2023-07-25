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
                <h5 class="mb-2">Keikutsertaan Wilayah Pada KKN</h5>
                <p class="text-sm mb-0">
                  Daftar wilayah kabupaten/ kota yang terdaftar pada suatu KKN
                </p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    type="button"
                    class="mx-2 mb-0 btn btn-success btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#add-keikutsertaan-wilayah"
                  >
                    + Tambah Keikutsertaan
                  </button>
                  <div
                    id="add-keikutsertaan-wilayah"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                    :key="indexComponentModal"
                  >
                    <div class="modal-dialog mt-lg-10">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title text-wrap">
                            Tambah Keikutsertaan Wilayah
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
                            id="form-add-keikutsertaan-wilayah"
                            @submit.prevent="addKeikutsertaan()"
                          >
                            <p>Silahkan pilih tema KKN yang Anda inginkan</p>
                            <label class="form-label">Tema</label>
                            <select
                              name="jenis"
                              id="choices-tema"
                              class="choices-tema form-select"
                              v-model="tema"
                            >
                              <option value="0" hidden>-- Pilih Tema --</option>
                              <option
                                v-for="tema in listTemaAvailable"
                                :key="tema.id_tema"
                                :value="tema.id_tema"
                              >
                                {{ tema.nama }}
                              </option>
                            </select>
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
                            form="form-add-keikutsertaan-wilayah"
                            type="submit"
                            class="btn bg-gradient-primary btn-sm"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    class="mt-2 mb-0 btn btn-outline-success btn-sm export-kab mt-sm-0"
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
              <table id="kabupaten-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="col-4 ps-0">Tema</th>
                    <th class="ps-0">Total Kecamatan</th>
                    <th class="ps-0">Total Desa</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(kab, index) in listAllKabupaten"
                    v-bind:key="kab.id_kabupaten"
                  >
                    <td class="text-sm ps-3">{{ index + 1 }}</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">{{ kab.nama_tema }}</h6>
                    </td>
                    <td class="text-sm">{{ kab.jumlah_kecamatan ?? 0 }}</td>
                    <td class="text-sm">{{ kab.jumlah_desa ?? 0 }}</td>
                    <!-- <td class="text-sm">
                      <span v-if="kec.status == 1" class="badge badge-success"
                        >Diterima</span
                      >
                      <span
                        v-else-if="kec.status == 0"
                        class="badge badge-secondary"
                        >Verifikasi</span
                      >
                      <span v-else class="badge badge-danger">Ditolak</span>
                    </td> -->
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail kecamatan"
                        title="Detail kecamatan"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit kecamatan"
                        title="Edit kecamatan"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        href="javascript:;"
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
                    <th class="col-4 ps-0">Tema</th>
                    <th class="ps-0">Total Kecamatan</th>
                    <th class="ps-0">Total Desa</th>
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
import { DataTable } from "simple-datatables";
import Choices from "choices.js";
import setTooltip from "@/assets/js/tooltip.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$wilayah from "@/store/wilayah";
import d$auth from "@/store/auth";
import d$tema from "@/store/tema";

export default {
  name: "IndexKeikutsertaanWilayah",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      tema: "0",
      indexComponent: 0,
      indexComponentModal: 0,
      choicesTema: undefined,
      dataTableKab: undefined,
      listAllKabupaten: [],
      listTemaAvailable: [],
    };
  },
  computed: {
    ...mapState(d$wilayah, ["g$listKabupaten", "g$listAllKabupaten"]),
    ...mapState(d$tema, ["g$listTema", "g$listTemaActive"]),
    ...mapState(d$auth, ["g$infoUser"]),
  },
  async created() {
    await this.getListWilayah();

    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$wilayah, [
      "a$listKabupatenTemaBappeda",
      "a$addAllKabupaten",
      "a$addKabupaten",
    ]),
    ...mapActions(d$tema, ["a$listTema"]),

    async addKeikutsertaan() {
      this.tema = parseInt(this.tema);

      if (!this.tema) {
        this.showSwal("warning-message", "Pilih tema terlebih dahulu!");
        return;
      }

      try {
        await this.a$addKabupaten({
          id_tema: this.tema,
        });
        this.showSwal("success-message", "Data berhasil ditambahkan!");
        document.getElementById("button-close-modal").click();
        this.indexComponentModal++;
        await this.getListWilayah();
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

    async getListTema() {
      let temaSelected = [];
      this.listTemaAvailable = [];

      this.listAllKabupaten.forEach((kab) => {
        temaSelected.push(kab.id_tema);
      });

      this.g$listTemaActive.forEach((tema) => {
        if (!temaSelected.includes(tema.id_tema)) {
          this.listTemaAvailable.push(tema);
        }
      });

      setTimeout(() => {
        if (this.choicesTema) this.choicesTema.destroy();
        this.choicesTema = this.getChoices("choices-tema");
      }, 1);
    },

    async getListWilayah() {
      try {
        this.listAllKabupaten = [];

        await this.a$listTema();
        await this.g$listTema.forEach((tema) => {
          this.getListKabupaten(
            tema.id_tema,
            tema.nama,
            this.g$infoUser.id_bappeda
          );
        });
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

    async getListKabupaten(id_tema, nama_tema, id_bappeda) {
      await this.a$listKabupatenTemaBappeda(id_tema, id_bappeda);
      if (this.g$listKabupaten.length === 0) {
        this.getListTema();
        setTimeout(() => {
          this.setupDataTable();
        }, 1);

        return;
      }

      let newData = {
        nama_tema,
      };
      let newDataKab = {};

      this.g$listKabupaten.forEach((kab) => {
        let dataJumlahKecamatan = {
          jumlah_kecamatan: kab.kecamatan.length,
        };
        let dataJumlahDesa = {};
        let jmlDesa = 0;
        kab.kecamatan.forEach((kec) => {
          jmlDesa += kec.desa.length;
        });
        dataJumlahDesa = {
          jumlah_desa: jmlDesa,
        };
        newDataKab = Object.assign(
          {},
          kab,
          newData,
          dataJumlahKecamatan,
          dataJumlahDesa
        );
      });
      this.listAllKabupaten.push(newDataKab);
      this.listAllKabupaten = this.listAllKabupaten.flat();
      this.getListTema();
      this.indexComponent++;
      setTimeout(() => {
        this.setupDataTable();
      }, 1);
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
      if (document.getElementById("kabupaten-list")) {
        const dataTableSearchKec = new DataTable("#kabupaten-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export-kab").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Keikutsertaan Wilayah",
            };

            // if (type === "csv") {
            //   data.columnDelimiter = "|";
            // }

            dataTableSearchKec.export(data);
          });
        });

        this.dataTableKec = dataTableSearchKec;
      }
    },

    showSwal(type, text) {
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
      }
    },
  },
};
</script>
