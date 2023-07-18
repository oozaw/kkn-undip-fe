<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard />
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
                @change="getListNilai()"
              >
                <option value="" disabled hidden>-- Pilih lokasi --</option>
              </select>
            </div>
          </div>
        </div>
        <div class="bg-white card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Data Nilai Akhir Mahasiswa</h5>
                <p class="text-sm mb-0">
                  Data nilai akhir mahasiswa berdasarkan keputusan dosen
                </p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    class="mt-2 mb-0 btn btn-outline-success btn-sm export-nilai mt-sm-0"
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
              <table id="nilai-list" class="table table-flush">
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
                        class="mb-0 me-3 text-primary"
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
                              <h5 id="ModalLabel" class="modal-title">
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
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Nama:</strong>
                                  &nbsp;
                                  {{ nilai.mahasiswa.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">NIM:</strong>
                                  &nbsp;
                                  {{ nilai.mahasiswa.nim }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Pembekalan:</strong>
                                  &nbsp;
                                  {{ nilai.pembekalan }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Upacara:</strong>
                                  &nbsp;
                                  {{ nilai.upacara }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark"
                                    >Kehadiran Dilokasi:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.kehadiran_dilokasi }}
                                </li>
                                <li class="border-0 list-group-item ps-0">
                                  <strong class="text-sm text-dark"
                                    >LRK:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.lrk }}
                                </li>
                                <li class="border-0 list-group-item ps-0">
                                  <strong class="text-sm text-dark"
                                    >Integritas:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.integritas }}
                                </li>
                                <li class="border-0 list-group-item ps-0">
                                  <strong class="text-sm text-dark"
                                    >Sosial:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.sosial_kemasyarakatan }}
                                </li>
                                <li class="border-0 list-group-item ps-0">
                                  <strong class="text-sm text-dark"
                                    >LPK:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.lpk }}
                                </li>
                                <li class="border-0 list-group-item ps-0">
                                  <strong class="text-sm text-dark"
                                    >Ujian Akhir:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.ujian_akhir }}
                                </li>
                                <li class="border-0 list-group-item ps-0">
                                  <strong class="text-sm text-dark"
                                    >Tugas:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.tugas }}
                                </li>
                                <li class="border-0 list-group-item ps-0">
                                  <strong class="text-sm text-dark"
                                    >UTS:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.uts }}
                                </li>
                                <li class="border-0 list-group-item ps-0">
                                  <strong class="text-sm text-dark"
                                    >UAS:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.uas }}
                                </li>
                                <li class="border-0 list-group-item ps-0">
                                  <strong class="text-sm text-dark"
                                    >Nilai Akhir:</strong
                                  >
                                  &nbsp;
                                  {{ nilai.nilai_akhir }}
                                </li>
                                <li class="border-0 list-group-item ps-0">
                                  <strong class="text-sm text-dark"
                                    >Nilai Akhir (Huruf):</strong
                                  >
                                  &nbsp;
                                  {{ nilai.nilai_huruf }}
                                </li>
                                <li class="border-0 list-group-item ps-0">
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
import d$tema from "@/store/tema";
import d$wilayah from "@/store/wilayah";
import d$nilai from "@/store/nilai";
import { mapActions, mapState } from "pinia";

export default {
  name: "IndexNilaiAkhirMhsAdmin",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      id_tema: "",
      id_kecamatan: "",
      indexComponent: 0,
      choicesTema: undefined,
      choicesLokasi: undefined,
      loader: undefined,
    };
  },
  computed: {
    ...mapState(d$tema, ["g$listTema"]),
    ...mapState(d$wilayah, ["g$listKecamatan"]),
    ...mapState(d$nilai, ["g$listNilai"]),
  },
  async created() {
    this.showLoading(true);

    await this.getInitData();

    this.choicesTema = this.getChoices("choices-tema");
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
    if (this.choicesLokasi) this.choicesLokasi.destroy();
  },
  methods: {
    ...mapActions(d$tema, ["a$listTema"]),
    ...mapActions(d$wilayah, ["a$listAllKabupaten"]),
    ...mapActions(d$nilai, ["a$listNilaiKecamatan", "a$resetNilai"]),

    async getInitData() {
      try {
        await this.a$listTema();
        this.id_tema = this.g$listTema[0].id_tema;

        this.choicesLokasi = this.getChoices("choices-lokasi");

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

    async getListNilai() {
      this.showLoading(true);

      this.indexComponent++;
      this.id_kecamatan = parseInt(this.id_kecamatan);

      try {
        await this.a$listNilaiKecamatan(this.id_kecamatan);
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

      this.setupDataTable();
      this.setupTableAction();

      this.showLoading(false);
    },

    async getListKecamatan() {
      this.id_tema = parseInt(this.id_tema);

      try {
        await this.a$listAllKabupaten(this.id_tema);
        this.id_kecamatan = this.g$listKecamatan[0]?.id_kecamatan ?? 0;
        this.setChoices(this.choicesLokasi, this.g$listKecamatan);
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

    setupDataTable() {
      if (document.getElementById("nilai-list")) {
        const dataTableSearch = new DataTable("#nilai-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export-nilai").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              // tambah nama yang lebih spesifik, cth: nama bappeda / daerah
              filename: "Data Nilai Akhir Mahasiswa",
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

      // reset
      $("#nilai-list").on("click", `.reset`, function (e) {
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
