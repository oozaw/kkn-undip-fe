<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card
          name="Tazki Hanifan Amri"
          description="KKN Reguler
           Tim 1 2023"
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
                <h5 class="mb-2">Data Dosen</h5>
                <p class="text-sm mb-0">Data dosen terdaftar</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link
                    class="mb-0 btn bg-gradient-success btn-sm"
                    :to="{ name: 'Tambah Dosen' }"
                    >+&nbsp; Tambah Dosen
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
                            Impor Data Dosen via File Excel
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
                            Silahkan cari dan pilih file excel berisi data dosen
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
              <table id="dosen-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Nama</th>
                    <th>NIP</th>
                    <th>Fakultas</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-sm">1</td>
                    <td>
                      <h6 class="my-auto">Dosen 1</h6>
                    </td>
                    <td class="text-sm">83384182392</td>
                    <td class="text-sm">FSM</td>
                    <td>
                      <span class="badge badge-danger badge-sm"
                        >Unregistered</span
                      >
                    </td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Dosen"
                        title="Detail Dosen"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Dosen"
                        title="Edit Dosen"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Dosen"
                        title="Hapus Dosen"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm">2</td>
                    <td>
                      <h6 class="my-auto">Dosen 2</h6>
                    </td>
                    <td class="text-sm">45235234324</td>
                    <td class="text-sm">FT</td>
                    <td>
                      <span class="badge badge-success badge-sm"
                        >Regisered</span
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
                      <h6 class="my-auto">Dosen 3</h6>
                    </td>
                    <td class="text-sm">56348767867</td>
                    <td class="text-sm">FEB</td>
                    <td>
                      <span class="badge badge-success badge-sm"
                        >Registered</span
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
                      <h6 class="my-auto">Dosen 4</h6>
                    </td>
                    <td class="text-sm">87847384733</td>
                    <td class="text-sm">FPP</td>
                    <td>
                      <span class="badge badge-danger badge-sm"
                        >Unregistered</span
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
                    <th>Nama</th>
                    <th>NIP</th>
                    <th>Fakultas</th>
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

export default {
  name: "IndexDosen",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      choicesTema: undefined,
    };
  },
  mounted() {
    this.choicesTema = this.getChoices("choices-tema");

    if (document.getElementById("dosen-list")) {
      const dataTableSearch = new DataTable("#dosen-list", {
        searchable: true,
        fixedHeight: false,
        perPage: 5,
      });

      document.querySelectorAll(".export").forEach(function (el) {
        el.addEventListener("click", function () {
          var type = el.dataset.type;

          var data = {
            type: type,
            filename: "Data Dosen",
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
          searchEnabled: true,
          allowHTML: true,
        });
      }
    },
  },
};
</script>
