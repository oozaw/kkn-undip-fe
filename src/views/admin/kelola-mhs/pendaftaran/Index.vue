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
                @change="getListMahasiswa()"
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
                <h5 class="mb-2">Data Pendaftaran Mahasiswa</h5>
                <p class="text-sm mb-0">Data pendaftaran mahasiswa KKN</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    class="mt-2 mb-0 btn btn-outline-success btn-sm export-pendaftaran mt-sm-0"
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
              <table id="pendaftaran-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>Gelombang</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(pendaftaran, index) in g$listMahasiswa"
                    :key="pendaftaran.id_mahasiswa_kecamatan"
                  >
                    <td class="text-sm">{{ index + 1 }}</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">{{ pendaftaran.mahasiswa.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ pendaftaran.mahasiswa.nim }}</td>
                    <td class="text-sm">{{ pendaftaran.gelombang.nama }}</td>
                    <td class="text-sm">
                      <span
                        v-if="pendaftaran.mahasiswa.status == 2"
                        class="badge badge-success"
                        >Diterima</span
                      >
                      <span
                        v-else-if="pendaftaran.mahasiswa.status == 1"
                        class="badge badge-primary"
                        >Sedang diproses</span
                      >
                      <span
                        v-else-if="pendaftaran.mahasiswa.status == 0"
                        class="badge badge-secondary"
                        >Belum terdaftar</span
                      >
                      <span v-else class="badge badge-danger">Ditolak</span>
                    </td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 me-3 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="
                          '#detail_' + pendaftaran.mahasiswa.id_mahasiswa
                        "
                        title="Detail Mahasiswa"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + pendaftaran.mahasiswa.id_mahasiswa"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-5">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title">
                                Detail Mahasiswa
                                {{ pendaftaran.mahasiswa.nama }}
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
                                  class="pt-0 text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark"
                                    >Nama Lengkap:</strong
                                  >
                                  &nbsp;
                                  {{ pendaftaran.mahasiswa.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">NIM:</strong>
                                  &nbsp;
                                  {{ pendaftaran.mahasiswa.nim }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Fakultas:</strong>
                                  &nbsp;
                                  {{
                                    pendaftaran.mahasiswa.prodi.fakultas.nama
                                  }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Prodi:</strong>
                                  &nbsp;
                                  {{ pendaftaran.mahasiswa.prodi.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Tema:</strong>
                                  &nbsp;
                                  {{
                                    pendaftaran.kecamatan.kabupaten.tema.nama
                                  }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Gelombang:</strong>
                                  &nbsp;
                                  {{ pendaftaran.gelombang.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Kabupaten:</strong>
                                  &nbsp;
                                  {{ pendaftaran.kecamatan.kabupaten.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Kecamatan:</strong>
                                  &nbsp;
                                  {{ pendaftaran.kecamatan.nama }}
                                </li>
                                <li class="border-0 list-group-item ps-0">
                                  <strong class="text-sm text-dark"
                                    >Status:</strong
                                  >
                                  &nbsp;
                                  <span
                                    v-if="pendaftaran.mahasiswa.status == 2"
                                    class="badge badge-success"
                                    >Diterima</span
                                  >
                                  <span
                                    v-else-if="
                                      pendaftaran.mahasiswa.status == 1
                                    "
                                    class="badge badge-primary"
                                    >Sedang diproses</span
                                  >
                                  <span
                                    v-else-if="
                                      pendaftaran.mahasiswa.status == 0
                                    "
                                    class="badge badge-secondary"
                                    >Belum terdaftar</span
                                  >
                                  <span v-else class="badge badge-danger"
                                    >Ditolak</span
                                  >
                                </li>
                              </ul>
                            </div>
                            <div class="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                      <!-- <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Mahasiswa"
                        title="Edit Mahasiswa"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a> -->
                      <a
                        class="me-3"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        title="Hapus Mahasiswa"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>Gelombang</th>
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
// import $ from "jquery";
import { DataTable } from "simple-datatables";
import Choices from "choices.js";
import setTooltip from "@/assets/js/tooltip.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$tema from "@/store/tema";
import d$wilayah from "@/store/wilayah";
import d$mahasiswa from "@/store/mahasiswa";

export default {
  name: "IndexPendaftaranMhsAdmin",
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
    };
  },
  computed: {
    ...mapState(d$tema, ["g$listTema"]),
    ...mapState(d$wilayah, ["g$listKecamatan"]),
    ...mapState(d$mahasiswa, ["g$listMahasiswa"]),
  },
  async created() {
    await this.getInitData();

    this.choicesTema = this.getChoices("choices-tema");

    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
    if (this.choicesLokasi) this.choicesLokasi.destroy();
  },
  methods: {
    ...mapActions(d$tema, ["a$listTema"]),
    ...mapActions(d$mahasiswa, ["a$listMahasiswaRegisteredByKecamatan"]),
    ...mapActions(d$wilayah, ["a$listAllKabupaten"]),

    async getInitData() {
      try {
        await this.a$listTema();
        this.id_tema = this.g$listTema[0].id_tema;

        this.choicesLokasi = this.getChoices("choices-lokasi");

        await this.getListKecamatan();
      } catch (error) {
        this.showSwal(
          "failed-message",
          error ?? "Terjadi kesalahan saat memuat data"
        );
        console.log(error);
      }
    },

    async getListMahasiswa() {
      this.indexComponent++;
      this.id_kecamatan = parseInt(this.id_kecamatan);

      try {
        await this.a$listMahasiswaRegisteredByKecamatan(this.id_kecamatan);
      } catch (error) {
        this.showSwal(
          "failed-message",
          error ?? "Terjadi kesalahan saat memuat data"
        );
        console.log(error);
      }

      this.setupDataTable();
    },

    async getListKecamatan() {
      this.id_tema = parseInt(this.id_tema);

      try {
        await this.a$listAllKabupaten(this.id_tema);
        this.id_kecamatan = this.g$listKecamatan[0]?.id_kecamatan ?? 0;
        this.setChoices(this.choicesLokasi, this.g$listKecamatan);
        await this.getListMahasiswa();
      } catch (error) {
        this.showSwal(
          "failed-message",
          error ?? "Terjadi kesalahan saat memuat data"
        );
        console.log(error);
      }
    },

    setupDataTable() {
      if (document.getElementById("pendaftaran-list")) {
        const dataTableSearch = new DataTable("#pendaftaran-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export-pendaftaran").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              // tambah nama yang lebih spesifik, cth: nama desa
              filename: "Data Pendaftaran",
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
