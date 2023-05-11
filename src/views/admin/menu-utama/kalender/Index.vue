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
            <p class="font-weight-bold text-dark mb-2">Pilih Aktor</p>
          </div>
          <div class="pb-3 pt-0 card-body">
            <div class="col-12 align-self-center">
              <select
                id="choices-aktor"
                class="form-control"
                name="choices-aktor"
              >
                <option value="dosen">Dosen</option>
                <option value="mahasiswa">Mahasiswa</option>
                <option value="bappeda">BAPPEDA</option>
              </select>
            </div>
          </div>
        </div>
        <div class="bg-white card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Kalender Kegiatan KKN</h5>
                <p class="text-sm mb-0">Jadwal Kegiatan KKN Terdaftar</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link
                    class="mb-0 btn btn-success btn-sm mt-sm-0 me-2"
                    :to="{ name: 'Tambah Kalender' }"
                  >
                    + Tambah Jadwal
                  </router-link>
                  <button
                    class="mt-2 mb-0 btn btn-outline-success btn-sm export-kalendar mt-sm-0"
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
              <table id="kalendar-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="col-4">Judul</th>
                    <th>Tanggal Mulai</th>
                    <th>Tanggal Berakhir</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-sm ps-3">1</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">Jadwal 1</h6>
                    </td>
                    <td class="text-sm">1 Desember 2023</td>
                    <td class="text-sm">15 Desember 2023</td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        class="me-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit Jadwal"
                        title="Edit Jadwal"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Jadwal"
                        title="Hapus Jadwal"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="col-4">Judul</th>
                    <th>Tanggal Mulai</th>
                    <th>Tanggal Berakhir</th>
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
  name: "IndexKalender",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      choicesTema: Choices,
      choicesAktor: Choices,
    };
  },
  mounted() {
    this.choicesTema = this.getChoices("choices-tema");
    this.choicesAktor = this.getChoices("choices-aktor");

    if (document.getElementById("kalendar-list")) {
      const dataTableSearch = new DataTable("#kalendar-list", {
        searchable: true,
        fixedHeight: false,
        perPage: 5,
      });

      document.querySelectorAll(".export-kalendar").forEach(function (el) {
        el.addEventListener("click", function () {
          var type = el.dataset.type;

          var data = {
            type: type,
            filename: "Data Kalendar Kegiatan",
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
    this.choicesAktor.destroy();
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
