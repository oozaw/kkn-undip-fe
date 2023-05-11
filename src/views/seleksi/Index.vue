<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
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
                <h5 class="mb-2">Seleksi Mahasiswa</h5>
                <p class="text-sm mb-0">
                  Pemilihan Mahasiswa KKN Sesuai Lokasi
                </p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <argon-button
                    class="mb-0 bg-light me-2"
                    size="sm"
                    color="success"
                    variant="outline"
                    >DITERIMA
                  </argon-button>
                  <argon-button
                    class="mb-0 bg-light me-2"
                    size="sm"
                    color="danger"
                    variant="outline"
                    >DITOLAK
                  </argon-button>
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
            <div class="table-responsive">
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
                  <tr>
                    <td class="text-sm ps-3">
                      <span class="me-2">1</span>
                      <argon-checkbox
                        id="checkbox-mhs-1"
                        name="checkbox-mhs-1"
                      />
                    </td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">Mahasiswa 1</h6>
                    </td>
                    <td class="text-sm">249572834239</td>
                    <td class="text-sm">Informatika</td>
                    <td class="text-sm">FSM</td>
                    <td class="text-sm">
                      <span class="badge badge-success">Diterima</span>
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
                    <td class="text-sm ps-3">
                      <span class="me-2">2</span>
                      <argon-checkbox
                        id="checkbox-mhs-1"
                        name="checkbox-mhs-1"
                      />
                    </td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">Mahasiswa 2</h6>
                    </td>
                    <td class="text-sm">249572834239</td>
                    <td class="text-sm">Informatika</td>
                    <td class="text-sm">FSM</td>
                    <td class="text-sm">
                      <span class="badge badge-danger">Ditolak</span>
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
                    <td class="text-sm ps-3">
                      <span class="me-2">3</span>
                      <argon-checkbox
                        id="checkbox-mhs-1"
                        name="checkbox-mhs-1"
                      />
                    </td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">Mahasiswa 3</h6>
                    </td>
                    <td class="text-sm">249572834239</td>
                    <td class="text-sm">Informatika</td>
                    <td class="text-sm">FSM</td>
                    <td class="text-sm">
                      <span class="badge badge-success">Diterima</span>
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
                    <td class="text-sm ps-3">
                      <span class="me-2">4</span>
                      <argon-checkbox
                        id="checkbox-mhs-1"
                        name="checkbox-mhs-1"
                      />
                    </td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">Mahasiswa 4</h6>
                    </td>
                    <td class="text-sm">249572834239</td>
                    <td class="text-sm">Informatika</td>
                    <td class="text-sm">FSM</td>
                    <td class="text-sm">
                      <span class="badge badge-secondary">Verifikasi</span>
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
                    <td class="text-sm ps-3">
                      <span class="me-2">5</span>
                      <argon-checkbox
                        id="checkbox-mhs-1"
                        name="checkbox-mhs-1"
                      />
                    </td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">Mahasiswa 5</h6>
                    </td>
                    <td class="text-sm">249572834239</td>
                    <td class="text-sm">Informatika</td>
                    <td class="text-sm">FSM</td>
                    <td class="text-sm">
                      <span class="badge badge-danger">Ditolak</span>
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
                    <td class="text-sm ps-3">
                      <span class="me-2">6</span>
                      <argon-checkbox
                        id="checkbox-mhs-1"
                        name="checkbox-mhs-1"
                      />
                    </td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">Mahasiswa 6</h6>
                    </td>
                    <td class="text-sm">249572834239</td>
                    <td class="text-sm">Informatika</td>
                    <td class="text-sm">FSM</td>
                    <td class="text-sm">
                      <span class="badge badge-success">Diterima</span>
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
      </div>
    </div>
  </div>
</template>

<script>
import { DataTable } from "simple-datatables";
import Choices from "choices.js";
import setTooltip from "@/assets/js/tooltip.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonCheckbox from "@/components/ArgonCheckbox.vue";
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "IndexSeleksiMhs",
  components: {
    HeaderProfileCard,
    ArgonCheckbox,
    ArgonButton,
  },
  mounted() {
    this.getChoices("choices-tema");

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
            filename: "Seleksi Mahasiswa" + type,
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
