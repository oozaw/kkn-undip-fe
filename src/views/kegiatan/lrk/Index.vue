<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <section id="mhs-section" v-if="g$user.role === 'MAHASISWA'">
          <div class="bg-white card mt-4">
            <!-- Card header -->
            <div class="pb-0 card-header">
              <div class="d-lg-flex">
                <div>
                  <h5 class="mb-2">LRK</h5>
                  <p class="text-sm mb-0">Laporan Rencana Kegiatan KKN</p>
                </div>
                <div class="my-auto mt-4 ms-auto mt-lg-0">
                  <div class="my-auto ms-auto">
                    <router-link
                      class="mb-0 btn bg-gradient-success btn-sm"
                      :to="{
                        name: 'Tambah LRK',
                        params: { id_tema: g$infoUser.id_tema },
                      }"
                      >+&nbsp; Tambah LRK
                    </router-link>
                    <button
                      type="button"
                      class="mx-2 mb-0 btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#import-lrk"
                    >
                      Impor
                    </button>
                    <div
                      id="import-lrk"
                      class="modal fade"
                      tabindex="-1"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog mt-lg-10">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 id="ModalLabel" class="modal-title">
                              Impor Data LRK via File Excel
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
                            <p>
                              Silahkan cari dan pilih file excel berisi data LRK
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
                    <button
                      class="mt-1 mb-0 btn btn-outline-success btn-sm export-mhs-sec mt-sm-0"
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
                <table id="lrk-list" class="table table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th class="col-1">No.</th>
                      <th>Judul Program Kerja</th>
                      <th>Kategori Program Kerja</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(lrk, index) in g$listLRK" :key="lrk.id_laporan">
                      <td class="text-sm">{{ index + 1 }}</td>
                      <td>
                        <h6 class="my-auto">{{ lrk.program }}</h6>
                      </td>
                      <td>
                        <span class="badge badge-primary badge-sm"
                          >Monodisiplin</span
                        >
                      </td>
                      <td class="text-sm">
                        <a
                          href="#"
                          class="detail"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Detail LPK"
                          title="Detail LPK"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <a
                          :id="lrk.id_laporan"
                          href="#"
                          class="mx-3 edit"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Edit LRK"
                          title="Edit LRK"
                        >
                          <i class="fas fa-user-edit text-primary"></i>
                        </a>
                        <a
                          href="#"
                          class="hapus"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Hapus LRK"
                          title="Hapus LRK"
                        >
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th class="col-1">No.</th>
                      <th>Judul Program Kerja</th>
                      <th>Kategori Program Kerja</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </section>
        <section id="dosen-section" v-else-if="g$user.role === 'DOSEN'">
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
                >
                  <option value="reguler">
                    KKN Tematik Pengurangan Risiko Bencana Berbasis Partisipasi
                    Masyarakat dan Komunitas
                  </option>
                  <option value="tematik">KKN Reguler Tim I</option>
                </select>
              </div>
            </div>
          </div>
          <div class="bg-white card mt-4">
            <!-- Card header -->
            <div class="pb-0 card-header">
              <div class="d-lg-flex">
                <div>
                  <h5 class="mb-2">Data LRK Mahasiswa</h5>
                  <p class="text-sm mb-0">Data LRK Mahasiswa Terdaftar</p>
                </div>
                <div class="my-auto mt-4 ms-auto mt-lg-0">
                  <div class="my-auto ms-auto">
                    <button
                      class="mt-1 mb-0 btn btn-outline-success btn-sm export-dosen-sec mt-sm-0"
                      data-type="csv"
                      type="button"
                      name="button"
                    >
                      Expor to Excel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="ms-2 pt-1 px-0 pb-0 card-body">
              <div class="table-responsive">
                <table id="lrk-dosen-section-list" class="table table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th class="col-1 ps-2">No.</th>
                      <th class="ps-0">Nama Lengkap</th>
                      <th>NIM</th>
                      <th>Prodi</th>
                      <th>Fakultas</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-sm ps-3">1</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">Mahasiswa 1</h6>
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">Informatika</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">
                        <span class="badge badge-success">Sudah Diupload</span>
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
                      <th class="col-1">No.</th>
                      <th>Nama Lengkap</th>
                      <th>NIM</th>
                      <th>Prodi</th>
                      <th>Fakultas</th>
                      <th>Angkatan</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </section>
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
import d$tema from "@/store/tema";
import d$auth from "@/store/auth";
import d$laporan from "@/store/laporan";

export default {
  name: "IndexLRK",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      tema: "",
      indexComponent: 0,
      choicesTema: undefined,
    };
  },
  computed: {
    ...mapState(d$auth, ["g$user", "g$infoUser"]),
    ...mapState(d$laporan, ["g$listLRK"]),
  },
  async created() {
    if (this.g$user.role === "MAHASISWA") {
      await this.getListLRK();
    }
  },
  mounted() {
    if (this.g$user.role === "DOSEN") {
      this.getTema();
      this.getChoices("choices-tema");
    }

    this.setupDataTable("lrk-dosen-section-list");

    setTooltip(this.$store.state.bootstrap);
  },
  methods: {
    ...mapActions(d$tema, ["a$listTema"]),
    ...mapActions(d$laporan, ["a$listLRK"]),

    async getListLRK() {
      this.indexComponent++;

      try {
        await this.a$listLRK();
      } catch (error) {
        this.showSwal("failed-message", "Terjadi kesalahan saat memuat data");
        console.log(error.error);
      }

      this.setupDataTable("lrk-list");
      this.setupTableAction();
    },

    setupDataTable(id) {
      let element = document.getElementById(id);
      if (element) {
        const dataTableSearch = new DataTable(element, {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export-mhs-sec").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data LRK",
            };

            if (type === "csv") {
              data.columnDelimiter = "|";
            }

            dataTableSearch.export(data);
          });
        });

        document.querySelectorAll(".export-dosen-sec").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: `Data LRK Mahasiswa ${this.tema} di ${this.kecamatan}`,
            };

            if (type === "csv") {
              data.columnDelimiter = "|";
            }

            dataTableSearch.export(data);
          });
        });
      }
    },

    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
        });
      }
    },

    getTema() {
      this.tema =
        document.getElementById("choices-tema").selectedOptions[0].text;
    },

    setupTableAction() {
      let outerThis = this;
      $("#lrk-list").on("click", `.edit`, function (e) {
        let lrk = this;
        outerThis.$router.push({
          name: "Edit LRK",
          params: { id_laporan: lrk.id },
        });
        e.preventDefault();
      });
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
