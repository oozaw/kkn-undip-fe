<template>
  <div class="card">
    <div class="card-header pt-3 pb-0 font-weight-bold">
      Daftar Anggota Kelompok
    </div>
    <div class="table-responsive">
      <table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Nama
            </th>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
            >
              Fakultas/ Prodi
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Angkatan
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              NIM
            </th>
            <th class="text-secondary opacity-7"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img
                    src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-2.jpg"
                    class="avatar avatar-sm me-3"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">John Michael</h6>
                </div>
              </div>
            </td>
            <td>
              <p class="text-sm font-weight-bold mb-0">FSM</p>
              <p class="text-xs text-secondary mb-0">S1 Informatika</p>
            </td>
            <td class="align-middle text-center">
              <span class="badge badge-success">2019</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-sm font-weight-bold"
                >2406011923849</span
              >
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img
                    src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-3.jpg"
                    class="avatar avatar-sm me-3"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Alexa Liras</h6>
                </div>
              </div>
            </td>
            <td>
              <p class="text-sm font-weight-bold mb-0">FT</p>
              <p class="text-xs text-secondary mb-0">S1 Teknik Sipil</p>
            </td>
            <td class="align-middle text-center">
              <span class="badge badge-success">2020</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-sm font-weight-bold"
                >2406011923849</span
              >
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img
                    src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-4.jpg"
                    class="avatar avatar-sm me-3"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Laurent Perrier</h6>
                </div>
              </div>
            </td>
            <td>
              <p class="text-sm font-weight-bold mb-0">FEB</p>
              <p class="text-xs text-secondary mb-0">S1 Bisnis</p>
            </td>
            <td class="align-middle text-center">
              <span class="badge badge-success">2019</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-sm font-weight-bold"
                >2406011923849</span
              >
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img
                    src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-3.jpg"
                    class="avatar avatar-sm me-3"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Michael Levi</h6>
                </div>
              </div>
            </td>
            <td>
              <p class="text-sm font-weight-bold mb-0">FEB</p>
              <p class="text-xs text-secondary mb-0">S1 Akuntansi</p>
            </td>
            <td class="align-middle text-center">
              <span class="badge badge-success">2018</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-sm font-weight-bold"
                >2406011923849</span
              >
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img
                    src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-2.jpg"
                    class="avatar avatar-sm me-3"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Richard Gran</h6>
                </div>
              </div>
            </td>
            <td>
              <p class="text-sm font-weight-bold mb-0">FT</p>
              <p class="text-xs text-secondary mb-0">S1 Teknik Lingkungan</p>
            </td>
            <td class="align-middle text-center">
              <span class="badge badge-success">2020</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-sm font-weight-bold"
                >2406011923849</span
              >
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
};
</script>
