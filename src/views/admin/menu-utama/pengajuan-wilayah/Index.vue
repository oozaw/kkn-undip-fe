<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard
          name="BAPPEDA Kota Semarang"
          description="Kota Semarang, Jawa Tengah, Indonesia"
        />
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
                <h5 class="mb-2">Pengajuan Lokasi Kecamatan KKN</h5>
                <p class="text-sm mb-0">
                  Daftar Lokasi Kecataman KKN Beserta Potensi
                </p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    class="mt-2 mb-0 btn btn-outline-success btn-sm export-kec mt-sm-0"
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
              <table id="wilayah-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="col-3 ps-0">Kecamatan</th>
                    <th class="ps-0">Total Desa</th>
                    <th>BAPPEDA</th>
                    <th>Potensi</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-sm ps-3">1</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">Kecamatan 1</h6>
                    </td>
                    <td class="text-sm">10</td>
                    <td class="text-sm">Kota Semarang</td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#lokasi-kkn"
                      >
                        Lihat
                      </a>
                      <div
                        id="lokasi-kkn"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-10">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title">
                                Potensi Kecamatan .......
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
                    </td>
                    <td class="text-sm">
                      <span class="badge badge-warning">Verifikasi</span>
                    </td>
                    <td class="text-sm">
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Kecamatan"
                        title="Detail"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Kecamatan"
                        title="Hapus"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Tolak Kecamatan"
                        title="Tolak"
                      >
                        <font-awesome-icon
                          class="text-danger"
                          icon="fa-solid fa-square-xmark"
                          size="xl"
                        />
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Verifikasi Kecamatan"
                        title="Verifikasi"
                      >
                        <font-awesome-icon
                          class="text-warning"
                          icon="fa-solid fa-square-minus"
                          size="xl"
                        />
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Terima Kecamatan"
                        title="Terima"
                      >
                        <font-awesome-icon
                          class="text-success"
                          icon="fa-solid fa-square-check"
                          size="xl"
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm ps-3">2</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">Kecamatan 2</h6>
                    </td>
                    <td class="text-sm">7</td>
                    <td class="text-sm">Kota Semarang</td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#lokasi-kkn"
                      >
                        Lihat
                      </a>
                      <div
                        id="lokasi-kkn"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-10">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title">
                                Potensi Kecamatan .......
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
                    </td>
                    <td class="text-sm">
                      <span class="badge badge-success">Diterima</span>
                    </td>
                    <td class="text-sm">
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Kecamatan"
                        title="Detail"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <font-awesome-icon
                          class="text-danger"
                          icon="fa-solid fa-square-xmark"
                          size="xl"
                        />
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <font-awesome-icon
                          class="text-warning"
                          icon="fa-solid fa-square-minus"
                          size="xl"
                        />
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <font-awesome-icon
                          class="text-success"
                          icon="fa-solid fa-square-check"
                          size="xl"
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm ps-3">3</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">Kecamatan 3</h6>
                    </td>
                    <td class="text-sm">8</td>
                    <td class="text-sm">Kota Semarang</td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#lokasi-kkn"
                      >
                        Lihat
                      </a>
                      <div
                        id="lokasi-kkn"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-10">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title">
                                Potensi Kecamatan .......
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
                    </td>
                    <td class="text-sm">
                      <span class="badge badge-danger">Ditolak</span>
                    </td>
                    <td class="text-sm">
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Kecamatan"
                        title="Detail"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <font-awesome-icon
                          class="text-danger"
                          icon="fa-solid fa-square-xmark"
                          size="xl"
                        />
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <font-awesome-icon
                          class="text-warning"
                          icon="fa-solid fa-square-minus"
                          size="xl"
                        />
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <font-awesome-icon
                          class="text-success"
                          icon="fa-solid fa-square-check"
                          size="xl"
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm ps-3">4</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">Kecamatan 4</h6>
                    </td>
                    <td class="text-sm">9</td>
                    <td class="text-sm">Kota Semarang</td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#lokasi-kkn"
                      >
                        Lihat
                      </a>
                      <div
                        id="lokasi-kkn"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-10">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title">
                                Potensi Kecamatan .......
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
                    </td>
                    <td class="text-sm">
                      <span class="badge badge-success">Diterima</span>
                    </td>
                    <td class="text-sm">
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Kecamatan"
                        title="Detail"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <font-awesome-icon
                          class="text-danger"
                          icon="fa-solid fa-square-xmark"
                          size="xl"
                        />
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <font-awesome-icon
                          class="text-warning"
                          icon="fa-solid fa-square-minus"
                          size="xl"
                        />
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <font-awesome-icon
                          class="text-success"
                          icon="fa-solid fa-square-check"
                          size="xl"
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm ps-3">5</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">Kecamatan 5</h6>
                    </td>
                    <td class="text-sm">6</td>
                    <td class="text-sm">Kota Semarang</td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#lokasi-kkn"
                      >
                        Lihat
                      </a>
                      <div
                        id="lokasi-kkn"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-10">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title">
                                Potensi Kecamatan .......
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
                    </td>
                    <td class="text-sm">
                      <span class="badge badge-danger">Ditolak</span>
                    </td>
                    <td class="text-sm">
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Kecamatan"
                        title="Detail"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <font-awesome-icon
                          class="text-danger"
                          icon="fa-solid fa-square-xmark"
                          size="xl"
                        />
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <font-awesome-icon
                          class="text-warning"
                          icon="fa-solid fa-square-minus"
                          size="xl"
                        />
                      </a>
                      <a
                        class="me-2"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <font-awesome-icon
                          class="text-success"
                          icon="fa-solid fa-square-check"
                          size="xl"
                        />
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="ps-0">Kecamatan</th>
                    <th>Total Desa</th>
                    <th>BAPPEDA</th>
                    <th>Potensi</th>
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
import { DataTable } from "simple-datatables";
import Choices from "choices.js";
import setTooltip from "@/assets/js/tooltip.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";

export default {
  name: "IndexPengajuanWilayah",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      choicesTema: Choices,
    };
  },
  mounted() {
    this.choicesTema = this.getChoices("choices-tema");
    if (document.getElementById("choices-status")) {
      new Choices(document.getElementById("choices-status"), {
        searchEnabled: false,
        allowHTML: true,
      });
    }

    if (document.getElementById("wilayah-list")) {
      const dataTableSearch = new DataTable("#wilayah-list", {
        searchable: true,
        fixedHeight: false,
        perPage: 5,
      });

      document.querySelectorAll(".export-kec").forEach(function (el) {
        el.addEventListener("click", function () {
          var type = el.dataset.type;

          var data = {
            type: type,
            filename: "Data Pengajuan Wilayah",
          };

          // if (type === "csv") {
          //   data.columnDelimiter = "|";
          // }

          dataTableSearch.export(data);
        });
      });
    }

    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    this.choicesTema.destroy();
  },
  methods: {
    getChoices(id) {
      var element = document.getElementById(id);
      if (element) {
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
        });
      }
    },
  },
};
</script>
