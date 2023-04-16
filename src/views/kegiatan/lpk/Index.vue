<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card
          name="Tazki Hanifan Amri"
          description="KKN Reguler
         Tim 1 2023"
        />
        <section id="mhs-section">
          <div class="bg-white card mt-4">
            <!-- Card header -->
            <div class="pb-0 card-header">
              <div class="d-lg-flex">
                <div>
                  <h5 class="mb-2">LPK</h5>
                  <p class="text-sm mb-0">Laporan Pelaksanaan Kegiatan KKN</p>
                </div>
                <div class="my-auto mt-4 ms-auto mt-lg-0">
                  <div class="my-auto ms-auto">
                    <router-link
                      class="mb-0 btn bg-gradient-success btn-sm"
                      :to="{ name: 'Tambah LRK' }"
                      >+&nbsp; Tambah LPK
                    </router-link>
                    <button
                      type="button"
                      class="mx-1 mb-0 btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#import-lpk"
                    >
                      Impor
                    </button>
                    <div
                      id="import-lpk"
                      class="modal fade"
                      tabindex="-1"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog mt-lg-10">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 id="ModalLabel" class="modal-title">
                              Impor Data LPK via File Excel
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
                              Silahkan cari dan pilih file excel berisi data LPK
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
                      class="mt-1 mb-0 btn btn-outline-success btn-sm export-mhs-sec mt-sm-0"
                      data-type="csv"
                      type="button"
                      name="button"
                    >
                      Expor
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="ms-2 pt-1 px-0 pb-0 card-body">
              <div class="table-responsive">
                <table id="lpk-list" class="table table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th class="col-1">No.</th>
                      <th>Judul Program Kerja</th>
                      <th>Kategori Program Kerja</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-sm">1</td>
                      <td>
                        <h6 class="my-auto">Program Kerja 1</h6>
                      </td>
                      <td>
                        <span class="badge badge-primary badge-sm"
                          >Monodisiplin</span
                        >
                      </td>
                      <td class="text-sm">
                        <a
                          href="javascript:;"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Preview product"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <a
                          href="javascript:;"
                          class="mx-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Edit product"
                        >
                          <i class="fas fa-user-edit text-primary"></i>
                        </a>
                        <a
                          href="javascript:;"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Delete product"
                        >
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-sm">2</td>
                      <td>
                        <h6 class="my-auto">Program Kerja 2</h6>
                      </td>
                      <td>
                        <span class="badge badge-success badge-sm"
                          >Multidisiplin</span
                        >
                      </td>
                      <td class="text-sm">
                        <a
                          href="javascript:;"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Preview product"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <a
                          href="javascript:;"
                          class="mx-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Edit product"
                        >
                          <i class="fas fa-user-edit text-primary"></i>
                        </a>
                        <a
                          href="javascript:;"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Delete product"
                        >
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-sm">3</td>
                      <td>
                        <h6 class="my-auto">Program Kerja 3</h6>
                      </td>
                      <td>
                        <span class="badge badge-success badge-sm"
                          >Multidisiplin</span
                        >
                      </td>
                      <td class="text-sm">
                        <a
                          href="javascript:;"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Preview product"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <a
                          href="javascript:;"
                          class="mx-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Edit product"
                        >
                          <i class="fas fa-user-edit text-primary"></i>
                        </a>
                        <a
                          href="javascript:;"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Delete product"
                        >
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-sm">4</td>
                      <td>
                        <h6 class="my-auto">Program Kerja 4</h6>
                      </td>
                      <td>
                        <span class="badge badge-primary badge-sm"
                          >Monodisiplin</span
                        >
                      </td>
                      <td class="text-sm">
                        <a
                          href="javascript:;"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Preview product"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <a
                          href="javascript:;"
                          class="mx-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Edit product"
                        >
                          <i class="fas fa-user-edit text-primary"></i>
                        </a>
                        <a
                          href="javascript:;"
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
        <section id="dosen-section">
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
                >
                  <option value="reguler">
                    KKN Tematik Pengurangan Risiko Bencana Berbasis Partisipasi
                    Masyarakat dan Komunitas
                  </option>
                  <option value="tematik">KKN Reguler Tim I</option>
                </select>
              </div>
            </div>
          </div>
          <div class="bg-white card mt-4">
            <!-- Card header -->
            <div class="pb-0 card-header">
              <div class="d-lg-flex">
                <div>
                  <h5 class="mb-2">Data LPK Mahasiswa</h5>
                  <p class="text-sm mb-0">Data LPK Mahasiswa Terdaftar</p>
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
              <div class="table-responsive">
                <table id="lpk-dosen-section-list" class="table table-flush">
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
                    <tr>
                      <td class="text-sm ps-3">1</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">Mahasiswa 1</h6>
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">Informatika</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">
                        <span class="badge badge-success">Sudah Diupload</span>
                      </td>
                      <td class="text-sm">
                        <a
                          href="javascript:;"
                          class="me-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Preview product"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <a
                          href="javascript:;"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Delete product"
                        >
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-sm ps-3">2</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">Mahasiswa 2</h6>
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">Informatika</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">
                        <span class="badge badge-danger">Belum Diupload</span>
                      </td>
                      <td class="text-sm">
                        <a
                          href="javascript:;"
                          class="me-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Preview product"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <a
                          href="javascript:;"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Delete product"
                        >
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-sm ps-3">3</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">Mahasiswa 3</h6>
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">Informatika</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">
                        <span class="badge badge-success">Sudah Diupload</span>
                      </td>
                      <td class="text-sm">
                        <a
                          href="javascript:;"
                          class="me-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Preview product"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <a
                          href="javascript:;"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Delete product"
                        >
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-sm ps-3">4</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">Mahasiswa 4</h6>
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">Informatika</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">
                        <span class="badge badge-success">Sudah Diupload</span>
                      </td>
                      <td class="text-sm">
                        <a
                          href="javascript:;"
                          class="me-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Preview product"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <a
                          href="javascript:;"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Delete product"
                        >
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-sm ps-3">5</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">Mahasiswa 5</h6>
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">Informatika</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">
                        <span class="badge badge-danger">Belum Diupload</span>
                      </td>
                      <td class="text-sm">
                        <a
                          href="javascript:;"
                          class="me-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Preview product"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <a
                          href="javascript:;"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Delete product"
                        >
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-sm ps-3">6</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">Mahasiswa 6</h6>
                      </td>
                      <td class="text-sm">249572834239</td>
                      <td class="text-sm">Informatika</td>
                      <td class="text-sm">FSM</td>
                      <td class="text-sm">
                        <span class="badge badge-success">Sudah Diupload</span>
                      </td>
                      <td class="text-sm">
                        <a
                          href="javascript:;"
                          class="me-3"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Preview product"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <a
                          href="javascript:;"
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
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { DataTable } from "simple-datatables";
import Choices from "choices.js";
import setTooltip from "@/assets/js/tooltip.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";

export default {
  name: "IndexLPK",
  components: {
    HeaderProfileCard,
  },
  mounted() {
    this.getChoices("choices-tema");

    if (document.getElementById("lpk-list")) {
      const dataTableSearch = new DataTable("#lpk-list", {
        searchable: true,
        fixedHeight: false,
        perPage: 5,
      });

      document.querySelectorAll(".export-mhs-sec").forEach(function (el) {
        el.addEventListener("click", function () {
          var type = el.dataset.type;

          var data = {
            type: type,
            filename: "Data LPK",
          };

          if (type === "csv") {
            data.columnDelimiter = "|";
          }

          dataTableSearch.export(data);
        });
      });
    }
    if (document.getElementById("lpk-dosen-section-list")) {
      const dataTableSearch = new DataTable("#lpk-dosen-section-list", {
        searchable: true,
        fixedHeight: false,
        perPage: 5,
      });

      document.querySelectorAll(".export-dosen-sec").forEach(function (el) {
        el.addEventListener("click", function () {
          var type = el.dataset.type;
          var tema =
            document.getElementById("choices-tema").selectedOptions[0].text;

          var data = {
            type: type,
            filename: "Data LPK " + tema,
          };

          if (type === "csv") {
            data.columnDelimiter = "|";
          }

          dataTableSearch.export(data);
        });
      });
    }
    setTooltip(this.$store.state.bootstrap);
  },
  methods: {
    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
        });
      }
    },
  },
};
</script>
