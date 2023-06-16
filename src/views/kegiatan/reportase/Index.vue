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
                  <h5 class="mb-2">Reportase</h5>
                  <p class="text-sm mb-0">Reportase Kegiatan KKN</p>
                </div>
                <div class="my-auto mt-4 ms-auto mt-lg-0">
                  <div class="my-auto ms-auto">
                    <router-link
                      class="mb-0 me-2 btn bg-gradient-success btn-sm"
                      :to="{ name: 'Tambah Reportase' }"
                      >+&nbsp; Tambah Reportase
                    </router-link>
                    <button
                      class="mt-1 mb-0 btn btn-outline-success btn-sm export-mhs-sec mt-sm-0"
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
                <table id="reportase-list" class="table table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th class="col-1">No.</th>
                      <th>Judul Reportase</th>
                      <th>Tanggal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(report, i) in g$listReportase"
                      :key="report.id_reportase"
                    >
                      <td class="text-sm">{{ i + 1 }}</td>
                      <td>
                        <h6 class="my-auto">{{ report.judul }}</h6>
                      </td>
                      <td class="text-sm">
                        {{ moment(report.created_at).format("DD-MM-YYYY") }}
                      </td>
                      <td class="text-sm">
                        <a
                          :id="report.id_reportase"
                          class="detail"
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Detail Reportase"
                          title="Detail Reportase"
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
                      <th class="col-1">No.</th>
                      <th>Judul Reportase</th>
                      <th>Tanggal</th>
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
                  @change="getTema()"
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
                  <h5 class="mb-2">Data Reportase Mahasiswa</h5>
                  <p class="text-sm mb-0">Data Reportase Mahasiswa Terdaftar</p>
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
                <table
                  id="reportase-dosen-section-list"
                  class="table table-flush"
                >
                  <thead class="thead-light">
                    <tr>
                      <th class="col-1 ps-2">No.</th>
                      <th class="ps-0">Nama Lengkap</th>
                      <th>Judul</th>
                      <th>NIM</th>
                      <th>Fakultas</th>
                      <th>Tanggal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-sm ps-3">1</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">Mahasiswa 1</h6>
                      </td>
                      <td class="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam repellat facere exercitationem sapiente
                        voluptate voluptatibus modi consectetur recusandae. Ad
                        blanditiis vero nesciunt placeat officia soluta harum
                        consequuntur voluptatum eveniet consectetur?
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">23 April 2023</td>
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
                      <td class="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam repellat facere exercitationem sapiente
                        voluptate voluptatibus modi consectetur recusandae. Ad
                        blanditiis vero nesciunt placeat officia soluta harum
                        consequuntur voluptatum eveniet consectetur?
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">23 April 2023</td>
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
                      <td class="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam repellat facere exercitationem sapiente
                        voluptate voluptatibus modi consectetur recusandae. Ad
                        blanditiis vero nesciunt placeat officia soluta harum
                        consequuntur voluptatum eveniet consectetur?
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">23 April 2023</td>
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
                      <td class="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam repellat facere exercitationem sapiente
                        voluptate voluptatibus modi consectetur recusandae. Ad
                        blanditiis vero nesciunt placeat officia soluta harum
                        consequuntur voluptatum eveniet consectetur?
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">23 April 2023</td>
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
                      <td class="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam repellat facere exercitationem sapiente
                        voluptate voluptatibus modi consectetur recusandae. Ad
                        blanditiis vero nesciunt placeat officia soluta harum
                        consequuntur voluptatum eveniet consectetur?
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">23 April 2023</td>
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
                      <td class="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam repellat facere exercitationem sapiente
                        voluptate voluptatibus modi consectetur recusandae. Ad
                        blanditiis vero nesciunt placeat officia soluta harum
                        consequuntur voluptatum eveniet consectetur?
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">23 April 2023</td>
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
                      <th class="col-1 ps-2">No.</th>
                      <th class="ps-0">Nama Lengkap</th>
                      <th>Judul</th>
                      <th>NIM</th>
                      <th>Fakultas</th>
                      <th>Tanggal</th>
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
import moment from "moment";
import Choices from "choices.js";
import setTooltip from "@/assets/js/tooltip.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$auth from "@/store/auth";
import d$reportase from "@/store/reportase";

export default {
  name: "IndexReportase",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      indexComponent: 0,
      tema: "tema",
      moment: moment,
    };
  },
  computed: {
    ...mapState(d$auth, ["g$user"]),
    ...mapState(d$reportase, ["g$listReportase"]),
  },
  async created() {
    if (this.g$user.role === "MAHASISWA") await this.getListReportase();

    if (this.g$user.role === "DOSEN") this.getTema();

    this.getChoices("choices-tema");

    setTooltip(this.$store.state.bootstrap);
  },
  methods: {
    ...mapActions(d$reportase, ["a$listReportase"]),

    async getListReportase() {
      this.indexComponent++;

      try {
        await this.a$listReportase();
      } catch (error) {
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat memuat data" + error
        );
        console.log(error);
      }

      this.setupDataTable("reportase-list");
      this.setupTableAction();
    },

    setupTableAction() {
      let outerThis = this;
      $("#reportase-list").on("click", `.detail`, function (e) {
        let reportase = this;
        outerThis.$router.push({
          name: "Detail Reportase",
          params: { id_reportase: reportase.id },
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
              filename: "Data Reportase",
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
              filename: "Data Reportase " + tema,
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
