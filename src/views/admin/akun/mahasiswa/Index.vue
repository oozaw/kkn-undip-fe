<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
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
                v-model="tema"
                @change="getListMahasiswa()"
              >
                <option value="1" selected>KKN Reguler Tim I</option>
                <option value="2">
                  KKN Tematik Pengurangan Risiko Bencana Berbasis Partisipasi
                  Masyarakat dan Komunitas
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="bg-white card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Data Mahasiswa</h5>
                <p class="text-sm mb-0">Data mahasiswa terdaftar</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link
                    class="mb-0 btn bg-gradient-success btn-sm"
                    :to="{ name: 'Tambah Mahasiswa' }"
                    >+&nbsp; Tambah Mahasiswa
                  </router-link>
                  <button
                    type="button"
                    class="mx-2 mb-0 btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#import-mhs"
                  >
                    Impor
                  </button>
                  <div
                    id="import-mhs"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog mt-lg-10">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title">
                            Impor Data Mahasiswa via File Excel
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
                            Silahkan cari dan pilih file excel berisi data
                            mahasiswa
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
                    class="mt-1 mb-0 btn btn-outline-success btn-sm export mt-sm-0"
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
          <div class="pt-1 px-0 pb-0 card-body">
            <div class="table-responsive">
              <!-- <mahasiswa-table :list-mahasiswa="g$listMahasiswa" :key="tema" /> -->
              <table id="mhs-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>Prodi</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(mhs, index) in g$listMahasiswa"
                    :key="mhs.id_mahasiswa"
                  >
                    <td class="text-sm">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto">{{ mhs.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ mhs.nim }}</td>
                    <td class="text-sm">{{ mhs.id_prodi }}</td>
                    <td>
                      <span class="badge badge-danger badge-sm"
                        >Unregistered</span
                      >
                    </td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Mahasiswa"
                        title="Detail Mahasiswa"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Mahasiswa"
                        title="Edit Mahasiswa"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Mahasiswa"
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
                    <th>Prodi</th>
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
import Choices from "choices.js";
import { DataTable } from "simple-datatables";
import setTooltip from "@/assets/js/tooltip.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
// import MahasiswaTable from "./components/MahasiswaTable.vue";
import d$mahasiswa from "@/store/mahasiswa";
import { mapActions, mapState } from "pinia";

export default {
  name: "IndexMahasiswa",
  components: {
    HeaderProfileCard,
    // MahasiswaTable,
  },
  computed: {
    ...mapState(d$mahasiswa, ["g$listMahasiswa"]),
  },
  data() {
    return {
      tema: "1",
      choicesTema: undefined,
      dataTable: undefined,
    };
  },
  async created() {
    await this.getListMahasiswa();

    this.choicesTema = this.getChoices("choices-tema");

    // this.setupDataTable();

    setTooltip(this.$store.state.bootstrap);
  },
  beforeUpdate() {
    console.log("beforeUpdate");
    // this.dataTable.rows().invalidate().draw();
  },
  updated() {
    console.log("updated");
    // this.setupDataTable();
  },
  beforeUnmount() {
    this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$mahasiswa, ["a$listMahasiswa"]),

    async getListMahasiswa() {
      try {
        await this.a$listMahasiswa(this.tema, "");
        console.log(this.g$listMahasiswa);
      } catch (error) {
        if (error) this.showSwal("failed-message", error);
        else
          this.showSwal(
            "failed-message",
            "Terjadi kesalahan saat memuat data!"
          );
        console.log(error);
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

    setupDataTable() {
      if (this.dataTable != undefined) {
        this.dataTable.clear();
        this.dataTable.destroy();
      } else {
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
                filename: "Data Mahasiswa",
              };
              // if (type === "csv") {
              //   data.columnDelimiter = "|";
              // }
              dataTableSearch.export(data);
            });
          });

          this.dataTable = dataTableSearch;
        }
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
