<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
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
                @change="getListMahasiswa()"
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
                <h5 class="mb-2">Seleksi Mahasiswa</h5>
                <p class="text-sm mb-0">
                  Pemilihan Mahasiswa KKN Sesuai Lokasi
                </p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    class="mt-1 mb-0 btn btn-outline-success btn-sm export mt-sm-0"
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
              <table id="mhs-list" class="table table-flush">
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
                  <tr
                    v-for="(pendaftar, i) in g$listMahasiswa"
                    :key="pendaftar.id_mahasiswa_kecamatan"
                  >
                    <td class="text-sm ps-3">
                      <span class="me-2">{{ i + 1 }}</span>
                    </td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">{{ pendaftar.mahasiswa.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ pendaftar.mahasiswa.nim }}</td>
                    <td class="text-sm">
                      {{ pendaftar.mahasiswa.prodi?.nama }}
                    </td>
                    <td class="text-sm">
                      {{ pendaftar.mahasiswa.prodi?.fakultas.nama }}
                    </td>
                    <td class="text-sm">
                      <span
                        v-if="pendaftar.status == 1"
                        class="badge badge-success"
                        >Diterima</span
                      >
                      <span
                        v-else-if="pendaftar.status == 0"
                        class="badge badge-primary"
                        >Sedang diproses</span
                      >
                      <span v-else class="badge badge-danger">Ditolak</span>
                    </td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 me-3 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="
                          '#detail_' + pendaftar.id_mahasiswa_kecamatan
                        "
                        title="Detail Mahasiswa"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <div
                        :id="'detail_' + pendaftar.id_mahasiswa_kecamatan"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-5">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title">
                                Detail Mahasiswa
                                {{ pendaftar.mahasiswa.nama }}
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
                                  {{ pendaftar.mahasiswa.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Angkatan:</strong>
                                  &nbsp;
                                  {{ pendaftar.mahasiswa.angkatan }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">NIM:</strong>
                                  &nbsp;
                                  {{ pendaftar.mahasiswa.nim }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Fakultas:</strong>
                                  &nbsp;
                                  {{ pendaftar.mahasiswa.prodi?.fakultas.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Prodi:</strong>
                                  &nbsp;
                                  {{ pendaftar.mahasiswa.prodi?.nama }}
                                </li>

                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Email:</strong>
                                  &nbsp;
                                  {{ pendaftar.mahasiswa.email }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">No. HP:</strong>
                                  &nbsp;
                                  {{ pendaftar.mahasiswa.no_hp }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Domisili:</strong>
                                  &nbsp;
                                  {{ pendaftar.mahasiswa.domisili }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Tema:</strong>
                                  &nbsp;
                                  {{ pendaftar.kecamatan.kabupaten.tema.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Gelombang:</strong>
                                  &nbsp;
                                  {{ pendaftar.gelombang.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Kabupaten:</strong>
                                  &nbsp;
                                  {{ pendaftar.kecamatan.kabupaten.nama }}
                                </li>
                                <li
                                  class="text-sm border-0 list-group-item ps-0"
                                >
                                  <strong class="text-dark">Kecamatan:</strong>
                                  &nbsp;
                                  {{ pendaftar.kecamatan.nama }}
                                </li>
                                <li class="pb-0 border-0 list-group-item ps-0">
                                  <strong class="text-sm text-dark"
                                    >Status:</strong
                                  >
                                  &nbsp;
                                  <span
                                    v-if="pendaftar.mahasiswa.status == 2"
                                    class="badge badge-success"
                                    >Diterima</span
                                  >
                                  <span
                                    v-else-if="pendaftar.mahasiswa.status == 1"
                                    class="badge badge-primary"
                                    >Sedang diproses</span
                                  >
                                  <span
                                    v-else-if="pendaftar.mahasiswa.status == 0"
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
                      <a
                        v-if="pendaftar.status == 0 || pendaftar.status == 1"
                        :id="pendaftar.id_mahasiswa_kecamatan"
                        :name="pendaftar.mahasiswa.nama"
                        class="me-3 tolak"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Tolak"
                        title="Tolak"
                      >
                        <font-awesome-icon
                          class="text-danger"
                          icon="fa-solid fa-square-xmark"
                          size="xl"
                        />
                      </a>
                      <a
                        v-if="pendaftar.status == 0 || pendaftar.status != 1"
                        :id="pendaftar.id_mahasiswa_kecamatan"
                        :name="pendaftar.mahasiswa.nama"
                        class="me-3 terima"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Terima"
                        title="Terima"
                      >
                        <font-awesome-icon
                          class="text-success"
                          icon="fa-solid fa-square-check"
                          size="xl"
                        />
                      </a>
                      <a
                        :id="pendaftar.id_mahasiswa_kecamatan"
                        :name="pendaftar.mahasiswa.nama"
                        class="delete"
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus pendaftaran"
                        title="Hapus pendaftaran"
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
import { mapState, mapActions } from "pinia";
import d$proposal from "@/store/proposal";
import d$tema from "@/store/tema";
import d$mahasiswa from "@/store/mahasiswa";

export default {
  name: "IndexSeleksiMhs",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      id_tema: "",
      id_kecamatan: "",
      indexComponent: 0,
      choicesTema: undefined,
      choicesKec: undefined,
    };
  },
  computed: {
    ...mapState(d$mahasiswa, ["g$listMahasiswa"]),
    ...mapState(d$tema, ["g$listTema"]),
    ...mapState(d$proposal, ["g$listProposal"]),
  },
  async created() {
    await this.getInitData();

    this.choicesTema = this.getChoices("choices-tema");

    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
    if (this.choicesKec) this.choicesKec.destroy();
  },
  methods: {
    ...mapActions(d$tema, ["a$listTemaDosen"]),
    ...mapActions(d$proposal, ["a$listProposalDosen"]),
    ...mapActions(d$mahasiswa, [
      "a$listMahasiswaWilayah",
      "a$accMahasiswa",
      "a$decMahasiswa",
      "a$deleteDaftarLokasi",
    ]),

    async getInitData() {
      try {
        await this.a$listTemaDosen();
        this.id_tema = this.g$listTema[0].id_tema;

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

    async getListMahasiswa() {
      this.indexComponent++;
      this.id_kecamatan = parseInt(this.id_kecamatan);

      try {
        await this.a$listMahasiswaWilayah(this.id_kecamatan);
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
    },

    async getListKecamatan() {
      this.id_tema = parseInt(this.id_tema);

      try {
        await this.a$listProposalDosen(this.id_tema);
        this.id_kecamatan = this.g$listProposal[0]?.id_kecamatan ?? 0;
        this.setChoices(this.choicesKec, this.g$listProposal);
        await this.getListMahasiswa();
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

    async deletePendaftaran(id_mahasiswa_kecamatan) {
      this.showSwal("loading");

      try {
        await this.a$deleteDaftarLokasi(id_mahasiswa_kecamatan);
        await this.getListMahasiswa();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat menghapus pendaftaran! " + msg
        );
      }
    },

    async accMahasiswa(id_mahasiswa_kecamatan) {
      this.showSwal("loading");

      try {
        await this.a$accMahasiswa(id_mahasiswa_kecamatan);
        await this.getListMahasiswa();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diperbarui! " + msg);
      }
    },

    async decMahasiswa(id_mahasiswa_kecamatan) {
      this.showSwal("loading");

      try {
        await this.a$decMahasiswa(id_mahasiswa_kecamatan);
        await this.getListMahasiswa();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diperbarui! " + msg);
      }
    },

    setupTableAction() {
      let outerThis = this;
      $("#mhs-list").on("click", `.terima`, function (e) {
        let pendaftar = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menerima pendaftaran ${pendaftar.name}?`,
          "Berhasil memperbarui data",
          pendaftar.id,
          false,
          true
        );
        e.preventDefault();
      });

      $("#mhs-list").on("click", `.tolak`, function (e) {
        let pendaftar = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menolak pendaftaran ${pendaftar.name}?`,
          "Berhasil memperbarui data",
          pendaftar.id,
          false,
          false
        );
        e.preventDefault();
      });

      // delete
      $("#mhs-list").on("click", `.delete`, function (e) {
        let mhs = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus pendaftaran mahasiswa ${mhs.name}? Semua data yang berkaitan dengan mahasiswa tersebut akan dihapus permanen!`,
          "Berhasil menghapus data",
          mhs.id,
          true
        );
        e.preventDefault();
      });
    },

    setupDataTable() {
      if (document.getElementById("mhs-list")) {
        const dataTableSearch = new DataTable("#mhs-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Seleksi Mahasiswa ",
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

    showSwal(type, text, toastText, id_proposal, isDelete, status) {
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
            if (isDelete) this.deletePendaftaran(id_proposal);
            else if (!isDelete && status) this.accMahasiswa(id_proposal);
            else this.decMahasiswa(id_proposal);
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
