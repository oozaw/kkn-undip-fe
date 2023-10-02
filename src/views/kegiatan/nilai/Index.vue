<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <TwoChoicesContentLoader v-if="isLoadingOnInit" />
        <div class="bg-white card mt-4" :hidden="isLoadingOnInit">
          <div class="card-header pb-0 pt-3">
            <p class="font-weight-bold text-dark mb-2">Pilih Tema Terdaftar</p>
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
                @change="getListNilai()"
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
                <h5 class="mb-2">Data Nilai Mahasiswa</h5>
                <p class="text-sm mb-0">Data Nilai Akhir Mahasiswa Terdaftar</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    type="button"
                    class="mx-2 mb-0 btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#import-nilai"
                  >
                    Impor
                  </button>
                  <div
                    id="import-nilai"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                    :key="indexComponent"
                  >
                    <div class="modal-dialog mt-lg-10">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title text-wrap">
                            Impor Data Nilai Mahasiswa via File Excel
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
                          <p class="mb-1">
                            Silahkan download dan isi format file di bawah ini!
                          </p>
                          <button
                            class="btn btn-success d-inline-block"
                            type="button"
                            name="button"
                            @click="downloadFormatImport()"
                          >
                            <font-awesome-icon
                              class="me-1"
                              icon="fa-solid fa-file-arrow-down"
                            />
                            Download Format File
                          </button>
                          <a href="#" id="file-placeholder" hidden></a>
                          <form
                            role="form"
                            id="form-import-nilai"
                            enctype="multipart/form-data"
                            @submit.prevent="importNilai()"
                          >
                            <input
                              id="file"
                              name="file"
                              ref="file"
                              type="file"
                              placeholder="Browse file..."
                              class="mb-1 form-control"
                              required
                            />
                          </form>
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
                            id="button-close-modal"
                            type="button"
                            class="btn bg-gradient-secondary btn-sm"
                            data-bs-dismiss="modal"
                          >
                            Batal
                          </button>
                          <button
                            form="form-import-nilai"
                            type="submit"
                            class="btn bg-gradient-primary btn-sm"
                          >
                            Unggah
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    :key="indexComponent"
                    class="mt-1 mb-0 btn btn-outline-success btn-sm mt-sm-0"
                    type="button"
                    name="button"
                    @click="exportToExcel()"
                  >
                    Expor
                  </button>
                  <a href="#" hidden id="file-placeholder"></a>
                </div>
              </div>
            </div>
          </div>
          <div class="ms-2 pt-1 px-0 pb-0 card-body">
            <div class="table-responsive" :key="indexComponent">
              <table id="nilai-akhir-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="ps-0">Nama Lengkap</th>
                    <th>NIM</th>
                    <th>Fakultas</th>
                    <th>Nilai</th>
                    <th>Grade</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(nilai, i) in g$listNilai" :key="nilai.id_nilai">
                    <td class="text-sm ps-3">{{ i + 1 }}</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">{{ nilai.mahasiswa.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ nilai.mahasiswa.nim }}</td>
                    <td class="text-sm">
                      {{ nilai.mahasiswa.prodi?.fakultas?.nama }}
                    </td>
                    <td class="text-sm">{{ nilai.nilai_akhir ?? "-" }}</td>
                    <td class="text-sm">{{ nilai.nilai_huruf ?? "-" }}</td>
                    <td class="text-sm">
                      <span
                        class="badge badge-success"
                        v-if="
                          nilai.nilai_huruf == 'A' ||
                          nilai.nilai_huruf == 'B' ||
                          nilai.nilai_huruf == 'C'
                        "
                        >Lulus</span
                      >
                      <span class="badge badge-danger" v-else>Tidak Lulus</span>
                    </td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#detail_' + nilai.id_nilai"
                        title="Detail Nilai"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + nilai.id_nilai"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-5">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title text-wrap">
                                Detail Nilai {{ nilai.mahasiswa.nama }}
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
                                  <strong class="text-dark">Nama:</strong>
                                  &nbsp;
                                  {{ nilai.mahasiswa.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">NIM:</strong>
                                  &nbsp;
                                  {{ nilai.mahasiswa.nim }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Pembekalan:</strong>
                                  &nbsp;
                                  {{ nilai.pembekalan }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Upacara:</strong>
                                  &nbsp;
                                  {{ nilai.upacara }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark"
                                    >Kehadiran Dilokasi:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.kehadiran_dilokasi }}
                                </li>
                                <li
                                  class="border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-sm text-dark"
                                    >LRK:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.lrk }}
                                </li>
                                <li
                                  class="border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-sm text-dark"
                                    >Integritas:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.integritas }}
                                </li>
                                <li
                                  class="border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-sm text-dark"
                                    >Sosial:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.sosial_kemasyarakatan }}
                                </li>
                                <li
                                  class="border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-sm text-dark"
                                    >LPK:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.lpk }}
                                </li>
                                <li
                                  class="border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-sm text-dark"
                                    >Ujian Akhir:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.ujian_akhir }}
                                </li>
                                <li
                                  class="border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-sm text-dark"
                                    >Tugas:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.tugas }}
                                </li>
                                <li
                                  class="border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-sm text-dark"
                                    >UTS:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.uts }}
                                </li>
                                <li
                                  class="border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-sm text-dark"
                                    >UAS:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.uas }}
                                </li>
                                <li
                                  class="border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-sm text-dark"
                                    >Nilai Akhir:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.nilai_akhir }}
                                </li>
                                <li
                                  class="border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-sm text-dark"
                                    >Nilai Akhir (Huruf):</strong
                                  >
                                  &nbsp;
                                  {{ nilai.nilai_huruf }}
                                </li>
                                <li
                                  class="border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-sm text-dark"
                                    >Status:</strong
                                  >
                                  &nbsp;
                                  <span
                                    class="badge badge-success"
                                    v-if="
                                      nilai.nilai_huruf == 'A' ||
                                      nilai.nilai_huruf == 'B' ||
                                      nilai.nilai_huruf == 'C'
                                    "
                                    >Lulus</span
                                  >
                                  <span class="badge badge-danger" v-else
                                    >Tidak Lulus</span
                                  >
                                </li>
                              </ul>
                            </div>
                            <div class="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                      <a
                        :id="nilai.id_nilai"
                        href="#"
                        class="mx-3 edit"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Nilai"
                        title="Edit Nilai"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        :id="nilai.id_nilai"
                        :name="nilai.mahasiswa.nama"
                        class="reset"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Reset Nilai"
                        title="Reset Nilai"
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
                    <th>Fakultas</th>
                    <th>Nilai</th>
                    <th>Grade</th>
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
import TwoChoicesContentLoader from "@/views/dashboards/components/TwoChoicesContentLoader.vue";
import { mapActions, mapState } from "pinia";
import d$nilai from "@/store/nilai";
import d$tema from "@/store/tema";
import d$proposal from "@/store/proposal";
import d$export from "@/store/export";

export default {
  name: "IndexNilaiAkhir",
  components: {
    HeaderProfileCard,
    TableContentLoader,
    TwoChoicesContentLoader,
  },
  data() {
    return {
      indexComponent: 0,
      listNilai: [],
      tema: "",
      kecamatan: "",
      id_tema: 0,
      id_kecamatan: 0,
      body: {
        file: "",
      },
      choicesTema: undefined,
      choicesKec: undefined,
      isLoadingOnInit: true,
      isLoading: true,
    };
  },
  computed: {
    ...mapState(d$tema, ["g$listTema"]),
    ...mapState(d$nilai, ["g$listNilai", "g$formatFile"]),
    ...mapState(d$proposal, ["g$listProposalAccepted"]),
    ...mapState(d$export, ["g$exportData"]),
  },
  async created() {
    await this.getInitData();
    this.getTemaAndKecamatan();
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
    if (this.choicesKec) this.choicesKec.destroy();
  },
  methods: {
    ...mapActions(d$tema, ["a$listTemaDosen"]),
    ...mapActions(d$nilai, [
      "a$listNilaiKecamatan",
      "a$resetNilai",
      "a$downloadFormatImport",
      "a$importNilai",
    ]),
    ...mapActions(d$proposal, ["a$listProposalDosen"]),
    ...mapActions(d$export, ["a$excelNilaiMhsKecamatan"]),

    async getInitData() {
      this.isLoadingOnInit = true;
      this.isLoading = true;

      try {
        await this.a$listTemaDosen();
        this.id_tema = this.g$listTema[0].id_tema;

        this.choicesKec = this.getChoices("choices-kecamatan");
        this.choicesTema = this.getChoices("choices-tema");

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

    async getListKecamatan() {
      this.id_tema = parseInt(this.id_tema);

      try {
        await this.a$listProposalDosen(this.id_tema);
        this.id_kecamatan = this.g$listProposalAccepted[0]?.id_kecamatan ?? 0;
        this.setChoices(this.choicesKec, this.g$listProposalAccepted);
        await this.getListNilai();
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

    async getListNilai() {
      this.isLoading = true;

      this.indexComponent++;
      this.id_kecamatan = parseInt(this.id_kecamatan);

      try {
        await this.a$listNilaiKecamatan(this.id_kecamatan);
        // this.listNilai = this.g$listNilai;
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
        this.setupDataTable();
        this.setupTableAction();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async resetNilai(id_nilai) {
      this.showSwal("loading");

      try {
        await this.a$resetNilai(id_nilai);
        await this.getListNilai();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat mereset nilai! " + msg
        );
      }
    },

    async importNilai() {
      this.showSwal("loading");

      this.body.file = this.$refs.file.files[0];
      this.indexComponent++;
      document.getElementById("button-close-modal").click();

      try {
        await this.a$importNilai(this.body);
        await this.getListNilai();
        this.showSwal("success-message", "Data nilai berhasil diimpor!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diimpor! " + msg);
      }
    },

    async downloadFormatImport() {
      this.showSwal("loading");

      const button = document.getElementById("file-placeholder");

      try {
        await this.a$downloadFormatImport(this.id_kecamatan);
        const fileURL = window.URL.createObjectURL(
          new Blob([this.g$formatFile], { type: "application/xlsx" })
        );

        const proposal = this.g$listProposalAccepted.find(
          (proposal) => proposal.id_kecamatan == this.id_kecamatan
        );

        const namaKecamatan = proposal.kecamatan.nama;
        const namaKabupaten = proposal.kecamatan.kabupaten.nama;

        let namaTema =
          document.getElementById("choices-tema").selectedOptions[0].innerHTML;

        namaTema = namaTema.replace(/\//g, "-");

        button.href = fileURL;
        button.download = `Format Impor Nilai Mahasiswa Kec. ${namaKecamatan}, Kab. ${namaKabupaten} - ${namaTema}.xlsx`;

        button.click();

        this.showSwal("close");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diunduh! " + msg);
      }
    },

    async exportToExcel() {
      this.showSwal("loading");

      const button = document.getElementById("file-placeholder");

      try {
        let namaTema =
          document.getElementById("choices-tema").selectedOptions[0].innerHTML;

        namaTema = namaTema.replace(/\//g, "-");

        const proposal = this.g$listProposalAccepted.find(
          (proposal) => proposal.id_kecamatan == this.id_kecamatan
        );

        const namaKecamatan = proposal.kecamatan?.nama;
        const namaKabupaten = proposal.kecamatan.kabupaten?.nama;

        await this.a$excelNilaiMhsKecamatan(this.id_kecamatan);
        const namaFile = `Data Nilai Mahasiswa Kec. ${namaKecamatan}, Kab. ${namaKabupaten} - ${namaTema}.xlsx`;

        const fileURL = window.URL.createObjectURL(
          new Blob([this.g$exportData], { type: "application/xlsx" })
        );

        button.href = fileURL;
        button.download = namaFile;

        button.click();

        this.showSwal("close");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diunduh! " + msg);
      }
    },

    setupTableAction() {
      let outerThis = this;

      // edit nilai
      $("#nilai-akhir-list").on("click", `.edit`, function (e) {
        let nilai = this;
        outerThis.$router.push({
          name: "Edit Nilai Akhir",
          params: { id_nilai: nilai.id },
        });
        e.preventDefault();
      });

      // reset
      $("#nilai-akhir-list").on("click", `.reset`, function (e) {
        let nilai = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Reset nilai ${nilai.name}?`,
          "Berhasil memperbarui data",
          nilai.id
        );
        e.preventDefault();
      });
    },

    setupDataTable() {
      let outerThis = this;
      if (document.getElementById("nilai-akhir-list")) {
        const dataTableSearch = new DataTable("#nilai-akhir-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;
            outerThis.getTemaAndKecamatan();

            var data = {
              type: type,
              filename:
                "Data Nilai Akhir " +
                outerThis.tema +
                " - " +
                outerThis.kecamatan,
            };

            //  if (type === "csv") {
            //    data.columnDelimiter = "|";
            //  }

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

    getTemaAndKecamatan() {
      this.tema =
        document.getElementById("choices-tema").selectedOptions[0].text;

      this.kecamatan =
        document.getElementById("choices-kecamatan").selectedOptions[0].text;
    },

    showSwal(type, text, toastText, id_nilai) {
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
            this.resetNilai(id_nilai);
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
