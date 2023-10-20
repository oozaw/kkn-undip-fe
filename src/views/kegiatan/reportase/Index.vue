<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <section id="mhs-section" v-if="g$user.role === 'MAHASISWA'">
          <TableContentLoader v-if="isLoading" />
          <div class="bg-white card mt-4" :hidden="isLoading">
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
                      <th>Kategori</th>
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
                        {{
                          report.kategori == 1
                            ? "Monodisiplin"
                            : "Multidisiplin"
                        }}
                      </td>
                      <td class="text-sm">
                        {{ moment(report.created_at).format("DD-MM-YYYY") }}
                      </td>
                      <td class="text-sm">
                        <!-- <a
                          type="button"
                          class="mb-0 text-primary"
                          data-bs-toggle="modal"
                          :data-bs-target="'#detail_' + report.id_reportase"
                          title="Detail Reportase"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <div
                          :id="'detail_' + report.id_reportase"
                          class="modal fade"
                          tabindex="-1"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog modal-lg mt-lg-5">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5
                                  id="ModalLabel"
                                  class="modal-title text-wrap"
                                >
                                  Detail Reportase
                                  {{ report.judul }}
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
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Judul:</strong>
                                    &nbsp;
                                    {{ report.judul }}
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Kategori:</strong>
                                    &nbsp;
                                    {{
                                      report.kategori == 1
                                        ? "Monodisiplin"
                                        : "Multidisiplin"
                                    }}
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark"
                                      >Publikasi:</strong
                                    >
                                    &nbsp;
                                    <a
                                      v-if="report.link_publikasi"
                                      :href="report.link_publikasi"
                                      target="_blank"
                                    >
                                      <font-awesome-icon
                                        icon="fa-solid fa-up-right-from-square"
                                      />
                                    </a>
                                    <span v-else> - </span>
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Isi:</strong>
                                    &nbsp;
                                    <div
                                      class="text-wrap"
                                      v-html="getOutOfTagP(report.isi)"
                                    ></div>
                                  </li>
                                  <li
                                    class="border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-sm text-dark"
                                      >Komentar:</strong
                                    >
                                    &nbsp;
                                    <div
                                      class="text-wrap"
                                      v-html="getOutOfTagP(report.komentar)"
                                    ></div>
                                  </li>
                                </ul>
                              </div>
                              <div class="modal-footer"></div>
                            </div>
                          </div>
                        </div> -->
                        <a
                          :id="report.id_reportase"
                          href="#"
                          class="detail"
                          data-bs-toggle="tooltip"
                          title="Detail Reportase"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <a
                          :id="report.id_reportase"
                          href="#"
                          class="mx-3 edit"
                          data-bs-toggle="tooltip"
                          title="Edit Reportase"
                        >
                          <i class="fas fa-user-edit text-primary"></i>
                        </a>
                        <a
                          :id="report.id_reportase"
                          :name="report.judul"
                          class="delete"
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Hapus Reportase"
                          title="Hapus Reportase"
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
                      <th>Kategori</th>
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
          <TwoChoicesContentLoader v-if="isLoadingOnInit" />
          <div class="bg-white card mt-4" :hidden="isLoadingOnInit">
            <div class="card-header pb-0 pt-3">
              <p class="font-weight-bold text-dark mb-2">
                Pilih Tema Terdaftar
              </p>
            </div>
            <div class="pb-3 pt-0 card-body">
              <div class="col-12 align-self-center">
                <select
                  id="choices-tema"
                  class="form-control"
                  name="choices-tema"
                  v-model="id_tema"
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
            <div class="card-header pb-0 pt-0">
              <p class="font-weight-bold text-dark mb-2">Pilih Lokasi</p>
            </div>
            <div class="pb-4 pt-0 card-body">
              <div class="col-12 align-self-center">
                <select
                  id="choices-kecamatan"
                  class="form-control"
                  name="choices-kecamatan"
                  v-model="id_kecamatan"
                  @change="getListLaporanDosen()"
                >
                  <option value="" disabled>-- Pilih wilayah --</option>
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
                      Ekspor
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="ms-2 pt-1 px-0 pb-0 card-body">
              <div class="table-responsive" :key="indexComponent">
                <table
                  id="reportase-dosen-section-list"
                  class="table table-flush"
                >
                  <thead class="thead-light">
                    <tr>
                      <th class="col-1 ps-2">No.</th>
                      <th class="ps-0">Nama Lengkap</th>
                      <th>NIM</th>
                      <th>Judul</th>
                      <th>Kategori</th>
                      <th>Tanggal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(reportase, i) in g$listReportase"
                      :key="reportase.id_reportase"
                    >
                      <td class="text-sm ps-3">{{ i + 1 }}</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">{{ reportase.mahasiswa?.nama }}</h6>
                      </td>
                      <td class="text-sm">{{ reportase.mahasiswa?.nim }}</td>
                      <td class="text-sm">{{ reportase.judul }}</td>
                      <td class="text-sm">
                        {{
                          reportase.kategori == 1
                            ? "Monodisiplin"
                            : "Multidisiplin"
                        }}
                      </td>
                      <td class="text-sm">
                        {{ moment(reportase.created_at).format("DD-MM-YYYY") }}
                      </td>
                      <td class="text-sm">
                        <a
                          :id="reportase.id_reportase"
                          :name="reportase.mahasiswa?.nama"
                          href="#"
                          class="me-3 detail"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Detail Reportase"
                          title="Detail Reportase"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <!-- <a
                          type="button"
                          class="mb-0 me-3 text-primary"
                          data-bs-toggle="modal"
                          :data-bs-target="'#detail_' + reportase.id_reportase"
                          title="Detail Reportase"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <div
                          :id="'detail_' + reportase.id_reportase"
                          class="modal fade"
                          tabindex="-1"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog modal-lg mt-lg-5">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5
                                  id="ModalLabel"
                                  class="modal-title text-wrap"
                                >
                                  Detail Reportase
                                  {{ reportase.mahasiswa.nama }}
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
                                    <strong class="text-dark"
                                      >Nama Lengkap:</strong
                                    >
                                    &nbsp;
                                    {{ reportase.mahasiswa.nama }}
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">NIM:</strong>
                                    &nbsp;
                                    {{ reportase.mahasiswa.nim }}
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Fakultas:</strong>
                                    &nbsp;
                                    {{
                                      reportase.mahasiswa.prodi?.fakultas.nama
                                    }}
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Prodi:</strong>
                                    &nbsp;
                                    {{ reportase.mahasiswa.prodi?.nama }}
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Judul:</strong>
                                    &nbsp;
                                    {{ reportase.judul }}
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Kategori:</strong>
                                    &nbsp;
                                    {{
                                      reportase.kategori == 1
                                        ? "Monodisiplin"
                                        : "Multidisiplin"
                                    }}
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark"
                                      >Publikasi:</strong
                                    >
                                    &nbsp;
                                    <a
                                      v-if="reportase.link_publikasi"
                                      :href="reportase.link_publikasi"
                                      target="_blank"
                                    >
                                      <font-awesome-icon
                                        icon="fa-solid fa-up-right-from-square"
                                      />
                                    </a>
                                    <span v-else> - </span>
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Isi:</strong>
                                    &nbsp;
                                    <div
                                      class="text-wrap"
                                      v-html="getOutOfTagP(reportase.isi)"
                                    ></div>
                                  </li>
                                  <li
                                    class="border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-sm text-dark"
                                      >Komentar:</strong
                                    >
                                    &nbsp;
                                    <div
                                      class="text-wrap"
                                      v-html="getOutOfTagP(reportase.komentar)"
                                    ></div>
                                  </li>
                                </ul>
                              </div>
                              <div class="modal-footer"></div>
                            </div>
                          </div>
                        </div> -->
                        <a
                          :id="reportase.id_reportase"
                          :name="reportase.mahasiswa?.nama"
                          href="#"
                          class="me-3 edit"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Evaluasi Reportase"
                          title="Evaluasi Reportase"
                        >
                          <i class="fas fa-user-edit text-primary"></i>
                        </a>
                        <a
                          :id="reportase.id_reportase"
                          :name="reportase.mahasiswa?.nama"
                          class="delete"
                          href="#"
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
                      <th>NIM</th>
                      <th>Judul</th>
                      <th>Kategori</th>
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
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import TwoChoicesContentLoader from "@/views/dashboards/components/TwoChoicesContentLoader.vue";
import { mapActions, mapState } from "pinia";
import d$auth from "@/store/auth";
import d$tema from "@/store/tema";
import d$proposal from "@/store/proposal";
import d$reportase from "@/store/reportase";

export default {
  name: "IndexReportase",
  components: {
    HeaderProfileCard,
    TableContentLoader,
    TwoChoicesContentLoader,
  },
  data() {
    return {
      indexComponent: 0,
      tema: "tema",
      id_tema: 0,
      id_kecamatan: 0,
      choicesTema: undefined,
      choicesKec: undefined,
      moment,
      isLoading: true,
      isLoadingOnInit: true,
    };
  },
  computed: {
    ...mapState(d$auth, ["g$user"]),
    ...mapState(d$reportase, ["g$listReportase"]),
    ...mapState(d$tema, ["g$listTema"]),
    ...mapState(d$proposal, ["g$listProposal"]),
  },
  async created() {
    if (this.g$user.role === "MAHASISWA") await this.getListReportaseMhs();
    else if (this.g$user.role === "DOSEN") await this.getInitData();
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
    if (this.choicesKec) this.choicesKec.destroy();
  },
  methods: {
    ...mapActions(d$tema, ["a$listTemaDosen"]),
    ...mapActions(d$proposal, ["a$listProposalDosen"]),
    ...mapActions(d$reportase, [
      "a$listReportase",
      "a$listReportaseKecamatan",
      "a$deleteReportase",
    ]),

    async getInitData() {
      this.isLoadingOnInit = true;
      this.isLoading = true;

      try {
        await this.a$listTemaDosen();
        this.id_tema = this.g$listTema[0].id_tema;

        this.choicesTema = this.getChoices("choices-tema");
        this.getTema();
        this.choicesKec = this.getChoices("choices-kecamatan");

        await this.getListKecamatan();
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

    async getListReportaseDosen() {
      this.isLoading = true;

      this.indexComponent++;
      this.id_kecamatan = parseInt(this.id_kecamatan);

      try {
        await this.a$listReportaseKecamatan(this.id_kecamatan);
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
        this.setupDataTable("reportase-dosen-section-list");
        this.setupTableAction();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async getListKecamatan() {
      this.id_tema = parseInt(this.id_tema);

      try {
        await this.a$listProposalDosen(this.id_tema);
        this.id_kecamatan = this.g$listProposal[0]?.id_kecamatan ?? 0;
        this.setChoices(this.choicesKec, this.g$listProposal);
        await this.getListReportaseDosen();
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

    async getListReportaseMhs() {
      this.isLoading = true;
      this.indexComponent++;

      try {
        await this.a$listReportase();
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
        this.setupDataTable("reportase-list");
        this.setupTableAction();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async deleteReportase(id_reportase) {
      this.showSwal("loading");

      try {
        await this.a$deleteReportase(id_reportase);
        if (this.g$user.role === "MAHASISWA") await this.getListReportaseMhs();
        else if (this.g$user.role === "DOSEN")
          await this.getListReportaseDosen();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }
    },

    setupTableAction() {
      let outerThis = this;

      // detail reportase
      $("#reportase-list").on("click", `.detail`, function (e) {
        let reportase = this;
        outerThis.$router.push({
          name: "Detail Reportase",
          params: { id_reportase: reportase.id },
        });
        e.preventDefault();
      });

      $("#reportase-dosen-section-list").on("click", `.detail`, function (e) {
        let reportase = this;
        outerThis.$router.push({
          name: "Detail Reportase",
          params: { id_reportase: reportase.id },
        });
        e.preventDefault();
      });

      // edit reportase
      $("#reportase-list").on("click", `.edit`, function (e) {
        let reportase = this;
        outerThis.$router.push({
          name: "Edit Reportase",
          params: { id_reportase: reportase.id },
        });
        e.preventDefault();
      });

      // evaluate reportase
      $("#reportase-dosen-section-list").on("click", ".edit", function (e) {
        let reportase = this;
        outerThis.$router.push({
          name: "Evaluasi Reportase",
          params: { id_reportase: reportase.id },
        });
        e.preventDefault();
      });

      // delete
      $("#reportase-list").on("click", `.delete`, function (e) {
        let reportase = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus reportase  ${reportase.name}?`,
          "Berhasil menghapus data",
          reportase.id
        );
        e.preventDefault();
      });

      $("#reportase-dosen-section-list").on("click", `.delete`, function (e) {
        let reportase = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus reportase mahasiswa ${reportase.name}?`,
          "Berhasil menghapus data",
          reportase.id
        );
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

            // if (type === "csv") {
            //   data.columnDelimiter = "|";
            // }

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

            // if (type === "csv") {
            //   data.columnDelimiter = "|";
            // }

            dataTableSearch.export(data);
          });
        });
      }
    },

    setChoices(choices, option) {
      if (choices) {
        choices.clearChoices();
        choices.removeActiveItems();

        if (option.length !== 0) {
          let newOption = [];
          option.forEach((item) => {
            if (Object.values(item)[7] == 1) {
              newOption.push({
                value: Object.values(item)[1],
                label: Object.values(item)[10].nama,
                selected: Object.values(item)[1] == this.id_kecamatan,
              });
            }
          });
          choices.setChoices(newOption);
        } else {
          choices.setChoices([
            {
              value: "",
              label: "Tidak ada data",
              selected: true,
              disabled: true,
            },
          ]);
        }
      }
    },

    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
          shouldSort: false,
        });
      }
    },

    getOutOfTagP(element) {
      var temp = $("<div>").html(element);
      temp.find("p").each(function () {
        $(this).replaceWith(this.childNodes);
      });

      var output = temp.html();
      return output;
    },

    getTema() {
      this.tema =
        document.getElementById("choices-tema").selectedOptions[0].text;
    },

    showSwal(type, text, toastText, id_reportase) {
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
            this.deleteReportase(id_reportase);
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
