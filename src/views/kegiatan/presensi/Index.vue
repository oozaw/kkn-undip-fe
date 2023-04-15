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
                <h5 class="mb-2">Presensi Harian</h5>
                <p class="text-sm mb-0">Data Presensi Harian</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <argon-button
                    class="mb-0 me-2"
                    size="sm"
                    color="success"
                    variant="contained"
                    >Hadir
                  </argon-button>
                  <argon-button
                    class="mb-0 me-2"
                    size="sm"
                    color="warning"
                    variant="contained"
                    >Izin
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
                    <th class="ps-0">Tanggal</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-sm ps-3">1</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">Senin, 23 Maret 2022</h6>
                    </td>
                    <td class="text-sm">
                      <span class="badge badge-success">Hadir</span>
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
                      <h6 class="my-auto">Senin, 22 Maret 2022</h6>
                    </td>
                    <td class="text-sm">
                      <span class="badge badge-success">Hadir</span>
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
                      <h6 class="my-auto">Senin, 21 Maret 2022</h6>
                    </td>
                    <td class="text-sm">
                      <span class="badge badge-warning">Izin</span>
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
                      <h6 class="my-auto">Senin, 20 Maret 2022</h6>
                    </td>
                    <td class="text-sm">
                      <span class="badge badge-warning">Izin</span>
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
                      <h6 class="my-auto">Senin, 19 Maret 2022</h6>
                    </td>
                    <td class="text-sm">
                      <span class="badge badge-success">Hadir</span>
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
                    <th>Tanggal</th>
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
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "IndexPresensi",
  components: {
    HeaderProfileCard,
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
