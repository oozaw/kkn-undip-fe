<template>
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
      <tr v-for="(mhs, index) in listMahasiswa" :key="mhs.id_mahasiswa">
        <td class="text-sm">{{ index + 1 }}</td>
        <td>
          <h6 class="my-auto">{{ mhs.nama }}</h6>
        </td>
        <td class="text-sm">{{ mhs.nim }}</td>
        <td class="text-sm">{{ mhs.id_prodi }}</td>
        <td>
          <span class="badge badge-danger badge-sm">Unregistered</span>
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
</template>

<script>
import { DataTable } from "simple-datatables";

export default {
  name: "MahasiswaTable",
  data() {
    return {
      dataTable: undefined,
    };
  },
  props: {
    listMahasiswa: {
      type: Array,
      required: true,
    },
  },
  beforeUnmount() {
    if (this.dataTable) {
      this.dataTable.clear();
      this.dataTable.destroy();
    }
  },
  mounted() {
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
  methods: {},
};
</script>
