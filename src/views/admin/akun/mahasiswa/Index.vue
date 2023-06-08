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
                    :key="indexComponent"
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
                          <p class="mb-1">
                            Silahkan download dan isi format file di bawah ini!
                          </p>
                          <a
                            href="../others/Format Import Mahasiswa - KKN UNDIP.xlsx"
                            target="_blank"
                            class="btn btn-success d-inline-block"
                          >
                            <font-awesome-icon
                              class="me-1"
                              icon="fa-solid fa-file-arrow-down"
                            />
                            Download Format File
                          </a>
                          <form
                            role="form"
                            id="form-import-mhs"
                            @submit.prevent="importMahasiswa()"
                            enctype="multipart/form-data"
                          >
                            <input
                              id="file"
                              ref="file"
                              type="file"
                              name="file"
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
                            form="form-import-mhs"
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
            <div class="table-responsive" :key="indexComponent">
              <table id="mhs-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>Fakultas</th>
                    <th>Prodi</th>
                    <!-- <th>Status</th> -->
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
                    <td class="text-sm">{{ mhs.prodi?.fakultas?.nama }}</td>
                    <td class="text-sm">{{ mhs.prodi?.nama }}</td>
                    <!-- <td>
                      <span class="badge badge-danger badge-sm"
                        >Unregistered</span
                      >
                    </td> -->
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
                    <th>Fakultas</th>
                    <th>Prodi</th>
                    <!-- <th>Status</th> -->
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
import d$mahasiswa from "@/store/mahasiswa";
import { mapActions, mapState } from "pinia";

export default {
  name: "IndexMahasiswa",
  components: {
    HeaderProfileCard,
  },
  computed: {
    ...mapState(d$mahasiswa, ["g$listMahasiswa"]),
  },
  data() {
    return {
      indexComponent: 0,
      tema: "1",
      body: {
        file: "",
        id_periode: "",
      },
      choicesTema: undefined,
      dataTable: undefined,
    };
  },
  async created() {
    await this.getListMahasiswa();

    this.choicesTema = this.getChoices("choices-tema");

    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$mahasiswa, ["a$listMahasiswa", "a$importMahasiswa"]),

    async getListMahasiswa() {
      this.indexComponent++;
      try {
        await this.a$listMahasiswa(this.tema, "");
      } catch (error) {
        if (error) this.showSwal("failed-message", error);
        else
          this.showSwal(
            "failed-message",
            "Terjadi kesalahan saat memuat data!"
          );
        console.log(error);
      }
      this.setupDataTable();
    },

    async importMahasiswa() {
      this.body.file = this.$refs.file.files[0];
      this.body.id_periode = this.tema;
      this.indexComponent++;
      document.getElementById("button-close-modal").click();

      try {
        await this.a$importMahasiswa(this.body);
        await this.a$listMahasiswa(this.tema, "");
        this.showSwal("success-message", "Data mahasiswa berhasil diimpor!");
      } catch (error) {
        this.showSwal("failed-message", error);
        console.log(error);
      }
      this.setupDataTable();
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
      if (this.dataTable) {
        this.dataTable.clear();
        this.dataTable.destroy();
      }

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
