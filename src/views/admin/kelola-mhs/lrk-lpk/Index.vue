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
          <div class="pb-3 pt-0 card-body">
            <div class="col-12 align-self-center">
              <select
                id="choices-lokasi"
                class="form-control"
                name="choices-lokasi"
                v-model="id_kecamatan"
                @change="getListLaporan()"
              >
                <option value="" disabled>-- Pilih lokasi --</option>
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
                <h5 class="mb-2">Data LRK & LPK</h5>
                <p class="text-sm mb-0">Data LRK & LPK mahasiswa KKN</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0" :key="indexComponent">
                <div class="my-auto ms-auto d-flex flex-wrap">
                  <div id="button-table"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="ms-2 pt-1 mt-4 card-body">
            <div class="table-responsive" :key="indexComponent">
              <table id="lrk-lpk-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      No.
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      Nama
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      NIM
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      Judul Program
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      Kategori
                    </th>
                    <th hidden>Potensi</th>
                    <th hidden>Sasaran</th>
                    <th hidden>Metode</th>
                    <th hidden>Luaran</th>
                    <th hidden>Pelaksanaan</th>
                    <th hidden>Capaian</th>
                    <th hidden>Hambatan</th>
                    <th hidden>Keberlanjutan</th>
                    <th hidden>Komentar</th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      Tanggal Unggah
                    </th>
                    <th
                      class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(laporan, i) in listLaporan"
                    :key="laporan.id_laporan"
                    class="align-middle"
                    height="46px"
                  >
                    <td class="text-sm ps-4">{{ i + 1 }}</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto ps-3">{{ laporan.mahasiswa.nama }}</h6>
                    </td>
                    <td class="text-sm ps-4">{{ laporan.mahasiswa.nim }}</td>
                    <td class="text-sm ps-4">
                      {{ getOutOfTagP(laporan.program) }}
                    </td>
                    <td class="text-sm ps-4">
                      {{
                        laporan.kategori == 1 ? "Monodisiplin" : "Multidisiplin"
                      }}
                    </td>
                    <td hidden>{{ getOutOfTagP(laporan.potensi) }}</td>
                    <td hidden>{{ getOutOfTagP(laporan.sasaran) }}</td>
                    <td hidden>{{ getOutOfTagP(laporan.metode) }}</td>
                    <td hidden>{{ getOutOfTagP(laporan.luaran) }}</td>
                    <td hidden>{{ getOutOfTagP(laporan.pelaksanaan) }}</td>
                    <td hidden>{{ getOutOfTagP(laporan.capaian) }}</td>
                    <td hidden>{{ getOutOfTagP(laporan.hambatan) }}</td>
                    <td hidden>{{ getOutOfTagP(laporan.kelanjutan) }}</td>
                    <td hidden>{{ getOutOfTagP(laporan.komentar) }}</td>
                    <td class="text-sm ps-4">
                      {{ moment(laporan.created_at).format("DD-MM-YYYY") }}
                    </td>
                    <td class="text-sm ps-4">
                      <a
                        type="button"
                        class="mb-0 me-3 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#detail_' + laporan.id_laporan"
                        title="Detail Laporan"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + laporan.id_laporan"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-lg mt-lg-5">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title text-wrap">
                                Detail Laporan
                                {{ laporan.mahasiswa.nama }}
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
                                  {{ laporan.mahasiswa.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">NIM:</strong>
                                  &nbsp;
                                  {{ laporan.mahasiswa.nim }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Fakultas:</strong>
                                  &nbsp;
                                  {{ laporan.mahasiswa.prodi?.fakultas?.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Prodi:</strong>
                                  &nbsp;
                                  {{ laporan.mahasiswa.prodi?.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Judul:</strong>
                                  &nbsp;
                                  <div
                                    class="text-wrap"
                                    v-html="getOutOfTagP(laporan.program)"
                                  ></div>
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Kategori:</strong>
                                  &nbsp;
                                  {{
                                    laporan.kategori == 1
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
                                    v-html="getOutOfTagP(laporan.potensi)"
                                  ></div>
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Sasaran:</strong>
                                  &nbsp;
                                  <div
                                    class="text-wrap"
                                    v-html="getOutOfTagP(laporan.sasaran)"
                                  ></div>
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-dark">Metode:</strong>
                                  &nbsp;
                                  <div
                                    class="text-wrap"
                                    v-html="getOutOfTagP(laporan.metode)"
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
                                    v-html="getOutOfTagP(laporan.luaran)"
                                  ></div>
                                </li>
                                <li
                                  class="border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-sm text-dark"
                                    >Pelaksanaan:</strong
                                  >
                                  &nbsp;
                                  <div
                                    class="text-wrap"
                                    v-html="getOutOfTagP(laporan.pelaksanaan)"
                                  ></div>
                                </li>
                                <li
                                  class="border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-sm text-dark"
                                    >Capaian:</strong
                                  >
                                  &nbsp;
                                  <div
                                    class="text-wrap"
                                    v-html="getOutOfTagP(laporan.capaian)"
                                  ></div>
                                </li>
                                <li
                                  class="border-0 list-group-item ps-0 text-wrap"
                                >
                                  <strong class="text-sm text-dark"
                                    >Hambatan:</strong
                                  >
                                  &nbsp;
                                  <div
                                    class="text-wrap"
                                    v-html="getOutOfTagP(laporan.hambatan)"
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
                                    v-html="getOutOfTagP(laporan.komentar)"
                                  ></div>
                                </li>
                              </ul>
                            </div>
                            <div class="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                      <a
                        v-if="g$user.role === 'ADMIN'"
                        :id="laporan.id_laporan"
                        :name="laporan.mahasiswa.nama"
                        class="me-3 delete"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Laporan"
                        title="Hapus Laporan"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
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
import moment from "moment";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TwoChoicesContentLoader from "@/views/dashboards/components/TwoChoicesContentLoader.vue";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import { mapActions, mapState } from "pinia";
import d$tema from "@/store/tema";
import d$laporan from "@/store/laporan";
import d$wilayah from "@/store/wilayah";
import d$auth from "@/store/auth";
import DataTable from "datatables.net-vue3";
import DataTableLib from "datatables.net-bs5";
import Buttons from "datatables.net-buttons-bs5";
import ButtonHtml5 from "datatables.net-buttons/js/buttons.html5";
import print from "datatables.net-buttons/js/buttons.print";
import pdfmake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "datatables.net-responsive-bs5";
import JsZip from "jszip";
pdfmake.vfs = pdfFonts.pdfMake.vfs;
window.JsZip = JsZip;
DataTable.use(DataTableLib);
DataTable.use(pdfmake);
DataTable.use(Buttons);
DataTable.use(ButtonHtml5);
DataTable.use(print);

export default {
  name: "IndexLRKLPKMhsAdmin",
  components: {
    HeaderProfileCard,
    TwoChoicesContentLoader,
    TableContentLoader,
  },
  data() {
    return {
      id_tema: "",
      id_kecamatan: "",
      isLoadingOnInit: true,
      isLoading: true,
      listLaporan: [],
      indexComponent: 0,
      choicesTema: undefined,
      choicesLokasi: undefined,
      moment: moment,
      loader: undefined,
    };
  },
  computed: {
    ...mapState(d$tema, ["g$listTema"]),
    ...mapState(d$wilayah, ["g$listKecamatan"]),
    ...mapState(d$laporan, ["g$listLaporan"]),
    ...mapState(d$auth, ["g$user"]),
  },
  async created() {
    await this.getInitData();
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
    if (this.choicesLokasi) this.choicesLokasi.destroy();
  },
  methods: {
    ...mapActions(d$tema, ["a$listTema"]),
    ...mapActions(d$wilayah, ["a$listKabupaten"]),
    ...mapActions(d$laporan, ["a$listLaporanKecamatan", "a$deleteLaporan"]),

    async getInitData() {
      this.isLoadingOnInit = true;

      try {
        await this.a$listTema();
        this.id_tema = this.g$listTema[0].id_tema;
        this.choicesLokasi = this.getChoices("choices-lokasi");
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

    async getListLaporan() {
      this.isLoading = true;

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

      this.listLaporan = this.g$listLaporan;

      setTimeout(() => {
        this.setupDataTable();
        this.setupTableAction();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async getListKecamatan() {
      this.id_tema = parseInt(this.id_tema);

      try {
        await this.a$listKabupaten(this.id_tema);
        let listKecamatan = [];
        listKecamatan = this.g$listKecamatan.sort((a, b) =>
          a.nama > b.nama ? 1 : a.nama < b.nama ? -1 : 0
        );
        this.id_kecamatan = listKecamatan[0]?.id_kecamatan ?? 0;
        this.setChoices(this.choicesLokasi, this.g$listKecamatan);
        await this.getListLaporan();
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

    async deleteLaporan(id_laporan) {
      this.showSwal("loading");

      try {
        await this.a$deleteLaporan(id_laporan);
        await this.getListLaporan();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }
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

    getChoices(id) {
      var element = document.getElementById(id);
      if (element) {
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
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

    setupDataTable() {
      if (this.dataTable) {
        this.dataTable.clear();
        this.dataTable.destroy();
      }

      if (document.getElementById("lrk-lpk-list")) {
        const dataTableSearch = $("#lrk-lpk-list").DataTable({
          pageLength: 5,
          lengthChange: true,
          lengthMenu: [5, 10, 25, 50, 75, 100],
          language: {
            paginate: {
              next: "&#155;", // or '→'
              previous: "&#139;", // or '←'
            },
          },
          // language: {
          //   url: "{{ url('/json/dataTable-id.json') }}",
          // },
          responsive: true,
          autoWidth: false,
          initComplete: function () {
            var api = this.api();

            new $.fn.dataTable.Buttons(api, {
              buttons: [
                {
                  extend: "csv",
                  text: "Ekspor",
                  title: "Data Dosen | KKN UNDIP",
                  exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                  },
                  attr: {
                    class: "btn btn-outline-success btn-sm",
                    style: "height: 32px;",
                  },
                },
              ],
            });

            api.buttons().container().appendTo("#button-table");
          },
        });

        this.dataTable = dataTableSearch;
      }
    },

    setupTableAction() {
      let outerThis = this;
      // delete
      $("#lrk-lpk-list").on("click", `.delete`, function (e) {
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
