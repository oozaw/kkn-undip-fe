<template>
  <div class="card">
    <div class="card-header pt-3 pb-0 font-weight-bold">
      Daftar Anggota Kelompok Kecamatan
    </div>
    <div class="table-responsive">
      <table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              No.
            </th>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Nama
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              NIM
            </th>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
            >
              Fakultas
            </th>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
            >
              Prodi
            </th>
            <th class="text-secondary opacity-7"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mhs, i) in value" :key="i">
            <td class="text-sm text-center">{{ i + 1 }}</td>
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ mhs.nama }}</h6>
                </div>
              </div>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-sm font-weight-bold">{{
                mhs.nim
              }}</span>
            </td>
            <td>
              <p class="text-sm font-weight-bold mb-0">{{ mhs.fakultas }}</p>
            </td>
            <td>
              <p class="text-xs text-secondary mb-0">{{ mhs.prodi }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "MembersTable",
  props: {
    value: {
      type: Array,
      isRequired: true,
    },
  },
};
</script>
