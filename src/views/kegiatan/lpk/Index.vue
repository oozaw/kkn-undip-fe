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
                  <h5 class="mb-2">LPK</h5>
                  <p class="text-sm mb-0">Laporan Pelaksanaan Kegiatan KKN</p>
                </div>
                <div class="my-auto mt-4 ms-auto mt-lg-0">
                  <div class="my-auto ms-auto">
                    <button
                      type="button"
                      class="mx-2 mb-0 btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#import-lpk"
                    >
                      Impor
                    </button>
                    <div
                      id="import-lpk"
                      class="modal fade"
                      tabindex="-1"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog mt-lg-10">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 id="ModalLabel" class="modal-title">
                              Impor Data LPK via File Excel
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
                              Silahkan cari dan pilih file excel berisi data LPK
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
              <div class="table-responsive">
                <table id="lpk-list" class="table table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th class="col-1">No.</th>
                      <th>Judul Program Kerja</th>
                      <th>Kategori Program Kerja</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(lpk, i) in g$listLPK" :key="lpk.id_laporan">
                      <td class="text-sm">{{ i + 1 }}</td>
                      <td>
                        <h6 class="my-auto">{{ lpk.program }}</h6>
                      </td>
                      <td>
                        <span class="badge badge-primary badge-sm"
                          >Monodisiplin</span
                        >
                      </td>
                      <td class="text-sm">
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Detail LPK"
                          title="Detail LPK"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <a
                          :id="lpk.id_laporan"
                          href="#"
                          class="mx-3 edit"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Edit LPK"
                          title="Edit LPK"
                        >
                          <i class="fas fa-user-edit text-primary"></i>
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Hapus LPK"
                          title="Hapus LPK"
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
        <section id="dosen-section" v-else>
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
                  <h5 class="mb-2">Data LPK Mahasiswa</h5>
                  <p class="text-sm mb-0">Data LPK Mahasiswa Terdaftar</p>
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
                <table id="lpk-dosen-section-list" class="table table-flush">
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
                    <tr>
                      <td class="text-sm ps-3">2</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">Mahasiswa 2</h6>
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">Informatika</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">
                        <span class="badge badge-danger">Belum Diupload</span>
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
                    <tr>
                      <td class="text-sm ps-3">3</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">Mahasiswa 3</h6>
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
                    <tr>
                      <td class="text-sm ps-3">4</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">Mahasiswa 4</h6>
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
                    <tr>
                      <td class="text-sm ps-3">5</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">Mahasiswa 5</h6>
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">Informatika</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">
                        <span class="badge badge-danger">Belum Diupload</span>
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
                    <tr>
                      <td class="text-sm ps-3">6</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">Mahasiswa 6</h6>
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
  name: "IndexLPK",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      indexComponent: 0,
    };
  },
  computed: {
    ...mapState(d$laporan, ["g$listLPK"]),
    ...mapState(d$auth, ["g$user"]),
    ...mapState(d$tema, ["g$listTema"]),
  },
  async created() {
    if (this.g$user.role === "MAHASISWA") {
      await this.getListLPK();
    }

    setTooltip(this.$store.state.bootstrap);
  },
  mounted() {
    this.getChoices("choices-tema");

    this.setupDataTable("lpk-dosen-section-list");
  },
  methods: {
    ...mapActions(d$laporan, ["a$listLPK"]),
    ...mapActions(d$tema, ["a$listTema"]),

    async getListLPK() {
      this.indexComponent++;

      try {
        await this.a$listLPK();
      } catch (error) {
        this.showSwal("failed-message", "Terjadi kesalahan saat memuat data");
        console.log(error.error);
      }

      this.setupDataTable("lpk-list");
      this.setupTableAction();
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

    setupTableAction() {
      let outerThis = this;
      $("#lpk-list").on("click", `.edit`, function (e) {
        let lpk = this;
        outerThis.$router.push({
          name: "Edit LPK",
          params: { id_laporan: lpk.id },
        });
        e.preventDefault();
      });
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
              filename: "Data LPK",
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
            var tema =
              document.getElementById("choices-tema").selectedOptions[0].text;

            var data = {
              type: type,
              filename: "Data LPK Mahasiswa " + tema,
            };

            if (type === "csv") {
              data.columnDelimiter = "|";
            }

            dataTableSearch.export(data);
          });
        });
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
