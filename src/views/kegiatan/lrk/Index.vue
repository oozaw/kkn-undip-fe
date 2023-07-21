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
                      class="mb-0 me-2 btn bg-gradient-success btn-sm"
                      :to="{
                        name: 'Tambah LRK',
                        params: { id_tema: g$infoUser.id_tema },
                      }"
                      >+&nbsp; Tambah LRK
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
                        <h6 class="my-auto">{{ getOutOfTagP(lrk.program) }}</h6>
                      </td>
                      <td class="text-sm">
                        {{
                          lrk.kategori == 1 ? "Monodisiplin" : "Multidisiplin"
                        }}
                      </td>
                      <td class="text-sm">
                        <a
                          type="button"
                          class="mb-0 text-primary"
                          data-bs-toggle="modal"
                          :data-bs-target="'#detail_' + lrk.id_laporan"
                          title="Detail LRK"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <div
                          :id="'detail_' + lrk.id_laporan"
                          class="modal fade"
                          tabindex="-1"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog modal-lg mt-lg-5">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 id="ModalLabel" class="modal-title">
                                  Detail Laporan
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
                                    <div
                                      class="text-wrap"
                                      v-html="getOutOfTagP(lrk.program)"
                                    ></div>
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Kategori:</strong>
                                    &nbsp;
                                    {{
                                      lrk.kategori == 1
                                        ? "Monodisiplin"
                                        : "Multidisiplin"
                                    }}
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Potensi:</strong>
                                    &nbsp;
                                    <div
                                      class="text-wrap"
                                      v-html="getOutOfTagP(lrk.potensi)"
                                    ></div>
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Sasaran:</strong>
                                    &nbsp;
                                    <div
                                      class="text-wrap"
                                      v-html="getOutOfTagP(lrk.sasaran)"
                                    ></div>
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Metode:</strong>
                                    &nbsp;
                                    <div
                                      class="text-wrap"
                                      v-html="getOutOfTagP(lrk.metode)"
                                    ></div>
                                  </li>
                                  <li
                                    class="border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-sm text-dark"
                                      >Keluaran:</strong
                                    >
                                    &nbsp;
                                    <div
                                      class="text-wrap"
                                      v-html="getOutOfTagP(lrk.luaran)"
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
                                      v-html="getOutOfTagP(lrk.komentar)"
                                    ></div>
                                  </li>
                                </ul>
                              </div>
                              <div class="modal-footer"></div>
                            </div>
                          </div>
                        </div>
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
                          :id="lrk.id_laporan"
                          :name="lrk.program"
                          class="delete"
                          href="#"
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
        <section id="dosen-section" v-else>
          <div class="bg-white card mt-4">
            <div class="card-header pb-0 pt-3">
              <p class="font-weight-bold text-dark mb-2">
                Pilih Tema dan Wilayah Terdaftar
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
              <div class="col-12 align-self-center mt-3">
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
              <div class="table-responsive" :key="indexComponent">
                <table id="lrk-dosen-section-list" class="table table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th class="col-1 ps-2">No.</th>
                      <th class="ps-0">Nama Lengkap</th>
                      <th>NIM</th>
                      <th>Judul</th>
                      <th>Kategori</th>
                      <th>Tanggal Unggah</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(lrk, i) in g$listLaporan" :key="lrk.id_laporan">
                      <td class="text-sm ps-3">{{ i + 1 }}</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">{{ lrk.mahasiswa.nama }}</h6>
                      </td>
                      <td class="text-sm">{{ lrk.mahasiswa.nim }}</td>
                      <td class="text-sm">{{ getOutOfTagP(lrk.program) }}</td>
                      <td class="text-sm">
                        {{
                          lrk.kategori == 1 ? "Monodisiplin" : "Multidisiplin"
                        }}
                      </td>
                      <td class="text-sm">
                        {{ moment(lrk.created_at).format("DD-MM-YYYY") }}
                      </td>
                      <td class="text-sm">
                        <a
                          type="button"
                          class="mb-0 me-3 text-primary"
                          data-bs-toggle="modal"
                          :data-bs-target="'#detail_' + lrk.id_laporan"
                          title="Detail Laporan"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <div
                          :id="'detail_' + lrk.id_laporan"
                          class="modal fade"
                          tabindex="-1"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog modal-lg mt-lg-5">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 id="ModalLabel" class="modal-title">
                                  Detail Laporan
                                  {{ lrk.mahasiswa.nama }}
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
                                    {{ lrk.mahasiswa.nama }}
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">NIM:</strong>
                                    &nbsp;
                                    {{ lrk.mahasiswa.nim }}
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Fakultas:</strong>
                                    &nbsp;
                                    {{ lrk.mahasiswa.prodi?.fakultas.nama }}
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Prodi:</strong>
                                    &nbsp;
                                    {{ lrk.mahasiswa.prodi?.nama }}
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Program:</strong>
                                    &nbsp;
                                    <div
                                      class="text-wrap"
                                      v-html="getOutOfTagP(lrk.program)"
                                    ></div>
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Kategori:</strong>
                                    &nbsp;
                                    {{
                                      lrk.kategori == 1
                                        ? "Monodisiplin"
                                        : "Multidisiplin"
                                    }}
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Potensi:</strong>
                                    &nbsp;
                                    <div
                                      class="text-wrap"
                                      v-html="getOutOfTagP(lrk.potensi)"
                                    ></div>
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Sasaran:</strong>
                                    &nbsp;
                                    <div
                                      class="text-wrap"
                                      v-html="getOutOfTagP(lrk.sasaran)"
                                    ></div>
                                  </li>
                                  <li
                                    class="text-sm border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-dark">Metode:</strong>
                                    &nbsp;
                                    <div
                                      class="text-wrap"
                                      v-html="getOutOfTagP(lrk.metode)"
                                    ></div>
                                  </li>
                                  <li
                                    class="border-0 list-group-item ps-0 text-wrap"
                                  >
                                    <strong class="text-sm text-dark"
                                      >Keluaran:</strong
                                    >
                                    &nbsp;
                                    <div
                                      class="text-wrap"
                                      v-html="getOutOfTagP(lrk.luaran)"
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
                                      v-html="getOutOfTagP(lrk.komentar)"
                                    ></div>
                                  </li>
                                </ul>
                              </div>
                              <div class="modal-footer"></div>
                            </div>
                          </div>
                        </div>
                        <a
                          :id="lrk.id_laporan"
                          :name="lrk.mahasiswa.nama"
                          href="#"
                          class="me-3 edit"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Evaluasi lrk"
                          title="Evaluasi lrk"
                        >
                          <i class="fas fa-user-edit text-primary"></i>
                        </a>
                        <a
                          :id="lrk.id_laporan"
                          :name="lrk.mahasiswa.nama"
                          class="delete"
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Hapus lrk"
                          title="Hapus lrk"
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
                      <th>Tanggal Unggah</th>
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
import { mapActions, mapState } from "pinia";
import d$tema from "@/store/tema";
import d$auth from "@/store/auth";
import d$laporan from "@/store/laporan";
import d$proposal from "@/store/proposal";

export default {
  name: "IndexLRK",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      tema: "",
      id_tema: 0,
      id_kecamatan: 0,
      indexComponent: 0,
      choicesTema: undefined,
      choicesKec: undefined,
      moment,
    };
  },
  computed: {
    ...mapState(d$auth, ["g$user", "g$infoUser"]),
    ...mapState(d$laporan, ["g$listLRK", "g$listLaporan"]),
    ...mapState(d$tema, ["g$listTema"]),
    ...mapState(d$proposal, ["g$listProposal"]),
  },
  async created() {
    this.showLoading(true);

    if (this.g$user.role === "MAHASISWA") {
      await this.getListLRK();
    } else if (this.g$user.role === "DOSEN") {
      await this.getInitData();
    }
  },
  mounted() {
    this.setupDataTable("lrk-dosen-section-list");
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
    if (this.choicesKec) this.choicesKec.destroy();
  },
  methods: {
    ...mapActions(d$tema, ["a$listTemaDosen"]),
    ...mapActions(d$laporan, [
      "a$listLRK",
      "a$listLaporanKecamatan",
      "a$deleteLaporan",
    ]),
    ...mapActions(d$proposal, ["a$listProposalDosen"]),

    async getInitData() {
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
    },

    async getListLaporanDosen() {
      this.showLoading(true);

      this.indexComponent++;
      this.id_kecamatan = parseInt(this.id_kecamatan);

      try {
        await this.a$listLaporanKecamatan(this.id_kecamatan);
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

      this.setupDataTable("lrk-dosen-section-list");
      this.setupTableAction();

      this.showLoading(false);
    },

    async getListKecamatan() {
      this.id_tema = parseInt(this.id_tema);

      try {
        await this.a$listProposalDosen(this.id_tema);
        this.id_kecamatan = this.g$listProposal[0]?.id_kecamatan ?? 0;
        this.setChoices(this.choicesKec, this.g$listProposal);
        await this.getListLaporanDosen();
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

    async getListLRK() {
      this.showLoading(true);

      this.indexComponent++;

      try {
        await this.a$listLRK();
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

      this.setupDataTable("lrk-list");
      this.setupTableAction();

      this.showLoading(false);
    },

    async deleteLaporan(id_laporan) {
      this.showSwal("loading");

      try {
        await this.a$deleteLaporan(id_laporan);
        if (this.g$user.role === "MAHASISWA") await this.getListLRK();
        else if (this.g$user.role === "DOSEN") await this.getListLaporanDosen();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }
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

            // if (type === "csv") {
            //   data.columnDelimiter = "|";
            // }

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
      $("#lrk-list").on("click", `.edit`, function (e) {
        let lrk = this;
        outerThis.$router.push({
          name: "Edit LRK",
          params: { id_laporan: lrk.id },
        });
        e.preventDefault();
      });

      // evaluate lrk for dosen
      $("#lrk-dosen-section-list").on("click", `.edit`, function (e) {
        let lrk = this;
        outerThis.$router.push({
          name: "Evaluate LRK",
          params: { id_laporan: lrk.id },
        });
        e.preventDefault();
      });

      // delete
      $("#lrk-list").on("click", `.delete`, function (e) {
        let laporan = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus laporan ${laporan.name}? Semua data LRK dan LPK akan dihapus permanen!`,
          "Berhasil menghapus data",
          laporan.id
        );
        e.preventDefault();
      });

      $("#lrk-dosen-section-list").on("click", `.delete`, function (e) {
        let laporan = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus laporan mahasiswa ${laporan.name}? Semua data LRK dan LPK mahasiswa tersebut akan dihapus permanen!`,
          "Berhasil menghapus data",
          laporan.id
        );
        e.preventDefault();
      });
    },

    getOutOfTagP(element) {
      var temp = $("<div>").html(element);
      temp.find("p").each(function () {
        $(this).replaceWith(this.childNodes);
      });

      var output = temp.html();
      return output;
      // var div = document.createElement("div");
      // div.innerHTML = element;
      // var text = div.textContent || div.innerHTML || "";
      // return text;
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
        });
      }
    },

    getTema() {
      this.tema =
        document.getElementById("choices-tema").selectedOptions[0].text;
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

    showSwal(type, text, toastText, id_laporan) {
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
            this.deleteLaporan(id_laporan);
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
