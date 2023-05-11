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
          <div class="card-header pb-0 pt-0">
            <p class="font-weight-bold text-dark mb-2">Pilih Dosen</p>
          </div>
          <div class="pb-3 pt-0 card-body">
            <div class="col-12 align-self-center">
              <select
                id="choices-dosen"
                class="form-control"
                name="choices-dosen"
              >
                <option value="Dosen">Dosen A</option>
                <option value="Dosen">Dosen B</option>
                <option value="Dosen">Dosen C</option>
              </select>
            </div>
          </div>
        </div>
        <div class="bg-white card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Data Nilai Akhir Mahasiswa</h5>
                <p class="text-sm mb-0">
                  Data nilai akhir mahasiswa berdasarkan keputusan dosen
                </p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    class="mt-2 mb-0 btn btn-outline-success btn-sm export-nilai mt-sm-0"
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
            <div class="table-responsive">
              <table id="nilai-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>Nilai Akhir</th>
                    <th>Lokasi Dipilih</th>
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
                    <td class="text-sm">1234352435234</td>
                    <td class="text-sm">45</td>
                    <td class="text-sm">Desa A</td>
                    <td class="text-sm">
                      <span class="badge badge-danger">Tidak Lulus</span>
                    </td>
                    <td class="text-sm">
                      <a
                        class="me-3"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Mahasiswa"
                        title="Detail Mahasiswa"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
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
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Mahasiswa"
                        title="Hapus Mahasiswa"
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
                    <td class="text-sm">123214312421</td>
                    <td class="text-sm">89</td>
                    <td class="text-sm">Desa B</td>
                    <td class="text-sm">
                      <span class="badge badge-success">Lulus</span>
                    </td>
                    <td class="text-sm">
                      <a
                        class="me-3"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Mahasiswa"
                        title="Detail Mahasiswa"
                      >
                        <i class="fas fa-eye text-info"></i>
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
                  <tr>
                    <td class="text-sm ps-3">3</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">Mahasiswa 3</h6>
                    </td>
                    <td class="text-sm">123214312421</td>
                    <td class="text-sm">90</td>
                    <td class="text-sm">Desa C</td>
                    <td class="text-sm">
                      <span class="badge badge-success">Lulus</span>
                    </td>
                    <td class="text-sm">
                      <a
                        class="me-3"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Mahasiswa"
                        title="Detail Mahasiswa"
                      >
                        <i class="fas fa-eye text-info"></i>
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
                    <th class="col-1 ps-2">No.</th>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>Nilai Akhir</th>
                    <th>Lokasi Dipilih</th>
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
  name: "IndexNilaiAkhirMhsAdmin",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      choicesTema: undefined,
      choicesDosen: undefined,
    };
  },
  mounted() {
    this.choicesTema = this.getChoices("choices-tema");
    this.choicesDosen = this.getChoices("choices-dosen");

    if (document.getElementById("nilai-list")) {
      const dataTableSearch = new DataTable("#nilai-list", {
        searchable: true,
        fixedHeight: false,
        perPage: 5,
      });

      document.querySelectorAll(".export-nilai").forEach(function (el) {
        el.addEventListener("click", function () {
          var type = el.dataset.type;

          var data = {
            type: type,
            // tambah nama yang lebih spesifik, cth: nama bappeda / daerah
            filename: "Data Nilai Akhir Mahasiswa",
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
    this.choicesDosen.destroy();
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
