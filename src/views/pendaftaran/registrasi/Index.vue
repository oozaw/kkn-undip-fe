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
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Data Registrasi KKN</h5>
                <p class="text-sm mb-0">
                  Registrasi KKN, Submit Proposal, Daftar Lokasi
                </p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link
                    class="mb-0 btn bg-gradient-success btn-sm"
                    :to="{ name: 'Tambah Registrasi' }"
                    >+&nbsp; Tambah Data Registrasi
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="ms-2 pt-1 px-0 pb-0 card-body">
            <div class="table-responsive">
              <table id="registrasi-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Wilayah KKN</th>
                    <th>Jenis</th>
                    <th>Periode</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-sm">1</td>
                    <td>
                      <h6 class="my-auto">Desa Bergas, Kecamatan Bergas</h6>
                    </td>
                    <td class="text-sm">Reguler Tim I</td>
                    <td class="text-sm">2022/2023</td>
                    <td class="text-sm">
                      <span class="badge badge-success">Diterima</span>
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
                      <h6 class="my-auto">Desa Hankaf, Kecamatan Hankaf</h6>
                    </td>
                    <td class="text-sm">Reguler Tim II</td>
                    <td class="text-sm">2022/2023</td>
                    <td class="text-sm">
                      <span class="badge badge-danger">Ditolak</span>
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
                      <h6 class="my-auto">
                        Desa Gunungmas, Kecamatan Gunungmas
                      </h6>
                    </td>
                    <td class="text-sm">Reguler Tim I</td>
                    <td class="text-sm">2022/2023</td>
                    <td class="text-sm">
                      <span class="badge badge-secondary">Ditunda</span>
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
                      <h6 class="my-auto">
                        Desa Jatimulyo, Kecamatan Jatimulyo
                      </h6>
                    </td>
                    <td class="text-sm">Tematik</td>
                    <td class="text-sm">2022/2023</td>
                    <td class="text-sm">
                      <span class="badge badge-success">Diterima</span>
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
                    <th>Wilayah KKN</th>
                    <th>Jenis</th>
                    <th>Periode</th>
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
import setTooltip from "@/assets/js/tooltip.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";

export default {
  name: "IndexReportase",
  components: {
    HeaderProfileCard,
  },
  mounted() {
    if (document.getElementById("registrasi-list")) {
      const dataTableSearch = new DataTable("#registrasi-list", {
        searchable: true,
        fixedHeight: false,
        perPage: 7,
      });

      document.querySelectorAll(".export").forEach(function (el) {
        el.addEventListener("click", function () {
          var type = el.dataset.type;

          var data = {
            type: type,
            filename: "soft-ui-" + type,
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
};
</script>
