<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard />
        <TwoChoicesContentLoader v-if="isLoadingOnInit" />
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
                v-model="id_tema"
                @change="getListKecamatan()"
              >
                <option value="">-- Pilih tema --</option>
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
                id="choices-lokasi"
                class="form-control"
                name="choices-lokasi"
                v-model="id_kecamatan"
                @change="getListPresensi()"
              >
                <option value="">-- Pilih lokasi --</option>
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
                <h5 class="mb-2">Data Presensi Mahasiswa</h5>
                <p class="text-sm mb-0">Riwayat Presensi Mahasiswa KKN</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    v-if="this.g$user.role === 'ADMIN'"
                    type="button"
                    class="mb-0 btn btn-success btn-sm me-2"
                    @click="
                      () => {
                        $router.push({
                          name: 'Tambah Presensi Mahasiswa Admin',
                          params: { id_kecamatan: id_kecamatan },
                        });
                      }
                    "
                  >
                    + Tambah Riwayat Presensi
                  </button>
                  <button
                    v-else-if="this.g$user.role === 'DOSEN'"
                    type="button"
                    class="mb-0 btn btn-success btn-sm me-2"
                    @click="
                      () => {
                        $router.push({
                          name: 'Tambah Presensi Mahasiswa',
                          params: { id_kecamatan: id_kecamatan },
                        });
                      }
                    "
                  >
                    + Tambah Riwayat Presensi
                  </button>
                  <button
                    class="mt-2 mb-0 btn btn-outline-success btn-sm export-presensi mt-sm-0"
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
              <table id="presensi-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Waktu</th>
                    <th>Oleh</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(presensi, i) in listPresensi" :key="i">
                    <td class="text-sm ps-3">{{ i + 1 }}</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">{{ presensi.mahasiswa.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ presensi.mahasiswa.nim }}</td>
                    <td class="text-sm">
                      {{
                        moment(presensi.presensi.tgl).format(
                          "dddd, DD MMM YYYY"
                        )
                      }}
                    </td>
                    <td class="text-sm">
                      <span
                        class="badge badge-success"
                        v-if="presensi.status == 1"
                        >Hadir</span
                      >
                      <span
                        class="badge badge-warning"
                        v-else-if="presensi.status == 2"
                        >Izin</span
                      >
                      <span class="badge badge-danger" v-else>Absen</span>
                    </td>
                    <td class="text-sm">
                      {{ moment(presensi.updated_at).format("HH:mm") }} WIB
                    </td>
                    <td class="text-sm">
                      {{ presensi.by }}
                    </td>
                    <td class="text-sm">
                      <a
                        v-if="presensi.status != -1"
                        :id="presensi.id_riwayat_presensi"
                        :name="`${presensi.mahasiswa.nama} tanggal ${moment(
                          presensi.presensi.tgl
                        ).format('DD MMMM YYYY')}`"
                        class="me-3 not-attended"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Tidak Hadir"
                        title="Tidak Hadir"
                      >
                        <font-awesome-icon
                          class="text-danger"
                          icon="fa-solid fa-square-xmark"
                          size="xl"
                        />
                      </a>
                      <a
                        v-if="presensi.status != 2"
                        :id="presensi.id_riwayat_presensi"
                        :name="`${presensi.mahasiswa.nama} tanggal ${moment(
                          presensi.presensi.tgl
                        ).format('DD MMMM YYYY')}`"
                        class="me-3 permission"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Izin"
                        title="Izin"
                      >
                        <font-awesome-icon
                          class="text-warning"
                          icon="fa-solid fa-square-minus"
                          size="xl"
                        />
                      </a>
                      <a
                        v-if="presensi.status != 1"
                        :id="presensi.id_riwayat_presensi"
                        :name="`${presensi.mahasiswa.nama} tanggal ${moment(
                          presensi.presensi.tgl
                        ).format('DD MMMM YYYY')}`"
                        class="me-3 attended"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hadir"
                        title="Hadir"
                      >
                        <font-awesome-icon
                          class="text-success"
                          icon="fa-solid fa-square-check"
                          size="xl"
                        />
                      </a>
                      <a
                        :id="presensi.id_riwayat_presensi"
                        :name="`${presensi.mahasiswa.nama} tanggal ${moment(
                          presensi.presensi.tgl
                        ).format('DD MMMM YYYY')}`"
                        class="delete"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Presensi"
                        title="Hapus Presensi"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Waktu</th>
                    <th>Oleh</th>
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
import moment from "moment";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import TwoChoicesContentLoader from "@/views/dashboards/components/TwoChoicesContentLoader.vue";
import { mapActions, mapState } from "pinia";
import d$presensi from "@/store/presensi";
import d$wilayah from "@/store/wilayah";
import d$tema from "@/store/tema";
import d$auth from "@/store/auth";
import d$proposal from "@/store/proposal";

export default {
  name: "IndexPresensiMhsAdmin",
  components: {
    HeaderProfileCard,
    TableContentLoader,
    TwoChoicesContentLoader,
  },
  data() {
    return {
      choicesTema: undefined,
      choicesLokasi: undefined,
      isLoadingOnInit: true,
      isLoading: true,
      indexComponent: 0,
      id_tema: "",
      id_kecamatan: "",
      listPresensi: [],
      moment,
      submittedStatus: 0,
    };
  },
  computed: {
    ...mapState(d$tema, ["g$listTema"]),
    ...mapState(d$wilayah, ["g$listKecamatanAccepted"]),
    ...mapState(d$presensi, ["g$listPresensi"]),
    ...mapState(d$auth, ["g$user"]),
    ...mapState(d$proposal, ["g$listProposalAccepted"]),
  },
  async created() {
    moment.locale("id");
    await this.getInitData();
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
    if (this.choicesLokasi) this.choicesLokasi.destroy();
  },
  methods: {
    ...mapActions(d$tema, ["a$listTema", "a$listTemaDosen"]),
    ...mapActions(d$wilayah, ["a$listKabupaten"]),
    ...mapActions(d$presensi, [
      "a$listPresensiKecamatan",
      "a$deletePresensi",
      "a$editPresensi",
    ]),
    ...mapActions(d$proposal, ["a$listProposalDosen"]),

    async getInitData() {
      this.isLoadingOnInit = true;

      try {
        if (this.g$user.role === "ADMIN") await this.a$listTema();
        else if (this.g$user.role === "DOSEN") await this.a$listTemaDosen();
        this.id_tema = this.g$listTema[0].id_tema;
        this.choicesLokasi = this.getChoices("choices-lokasi");
        if (this.g$user.role === "ADMIN") await this.getListKecamatan();
        else if (this.g$user.role === "DOSEN")
          await this.getListKecamatanDosen();
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

    async getListKecamatanDosen() {
      this.id_tema = parseInt(this.id_tema);

      try {
        await this.a$listProposalDosen(this.id_tema);
        this.id_kecamatan = this.g$listProposalAccepted[0]?.id_kecamatan ?? 0;
        this.setChoicesKecamatanDosen(
          this.choicesLokasi,
          this.g$listProposalAccepted
        );
        await this.getListPresensi();
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

    async getListKecamatan() {
      this.id_tema = parseInt(this.id_tema);

      try {
        await this.a$listKabupaten(this.id_tema);
        let listKecamatan = [];
        listKecamatan = this.g$listKecamatanAccepted.sort((a, b) =>
          a.nama > b.nama ? 1 : a.nama < b.nama ? -1 : 0
        );
        this.id_kecamatan = listKecamatan[0]?.id_kecamatan ?? 0;
        this.setChoices(this.choicesLokasi, this.g$listKecamatanAccepted);
        await this.getListPresensi();
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

    async getListPresensi() {
      this.isLoading = true;

      this.listPendaftaran = [];
      this.indexComponent++;
      this.id_kecamatan = parseInt(this.id_kecamatan);

      try {
        await this.a$listPresensiKecamatan(this.id_kecamatan);
        this.listPresensi = this.g$listPresensi;
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

    async editPresensi(id_presensi, status) {
      this.showSwal("loading");

      try {
        await this.a$editPresensi(id_presensi, { status: status });
        this.getListPresensi();
        this.showSwal("success-message", "Berhasil mengubah data");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat mengubah data! " + msg
        );
      }
    },

    async deletePresensi(id_presensi) {
      this.showSwal("loading");

      try {
        await this.a$deletePresensi(id_presensi);
        this.getListPresensi();
        this.showSwal("success-message", "Berhasil menghapus data");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat menghapus data! " + msg
        );
      }
    },

    setupDataTable() {
      if (document.getElementById("presensi-list")) {
        const dataTableSearch = new DataTable("#presensi-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export-presensi").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              // tambah nama yang lebih spesifik, cth: nama desa, tanggal
              filename: "Data Presensi",
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
      // delete
      $("#presensi-list").on("click", `.delete`, function (e) {
        let presensi = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus presensi mahasiswa ${presensi.name}?`,
          presensi.id,
          true
        );
        e.preventDefault();
      });

      // not attended
      $("#presensi-list").on("click", `.not-attended`, function (e) {
        let presensi = this;
        outerThis.submittedStatus = -1;
        outerThis.showSwal(
          "warning-confirmation",
          `Ubah presensi mahasiswa ${presensi.name} menjadi tidak hadir?`,
          presensi.id,
          false
        );
        e.preventDefault();
      });

      // permission
      $("#presensi-list").on("click", `.permission`, function (e) {
        let presensi = this;
        outerThis.submittedStatus = 2;
        outerThis.showSwal(
          "warning-confirmation",
          `Ubah presensi mahasiswa ${presensi.name} menjadi izin?`,
          presensi.id,
          false
        );
        e.preventDefault();
      });

      // attended
      $("#presensi-list").on("click", `.attended`, function (e) {
        let presensi = this;
        outerThis.submittedStatus = 1;
        outerThis.showSwal(
          "warning-confirmation",
          `Ubah presensi mahasiswa ${presensi.name} menjadi hadir?`,
          presensi.id,
          false
        );
        e.preventDefault();
      });
    },

    setChoices(choices, option) {
      if (choices) {
        choices.clearChoices();
        choices.removeActiveItems();

        if (option.length !== 0) {
          let newOption = [];
          option.forEach((item) => {
            newOption.push({
              value: Object.values(item)[0],
              label: item.nama,
              selected: Object.values(item)[0] == this.id_kecamatan,
            });
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

    setChoicesKecamatanDosen(choices, option) {
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
      var element = document.getElementById(id);
      if (element) {
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
          shouldSort: false,
        });
      }
    },

    showSwal(type, text, idPresensi, isDelete) {
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
            if (isDelete) this.deletePresensi(idPresensi);
            else this.editPresensi(idPresensi, this.submittedStatus);
            // this.$swal({
            //   toast: true,
            //   position: "top-end",
            //   title: toastText,
            //   icon: "success",
            //   showConfirmButton: false,
            //   timer: 2500,
            //   timerProgressBar: true,
            //   didOpen: () => {
            //     this.$swal.hideLoading();
            //   },
            // });
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
