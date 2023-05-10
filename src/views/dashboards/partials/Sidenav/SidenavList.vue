<template>
  <div
    id="sidenav-collapse-main"
    class="collapse navbar-collapse w-auto h-auto h-100"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'Dashboard' }">
          <sidenav-collapse
            nav-text="Dashboard"
            :collapse="false"
            url="#"
            :aria-controls="''"
            collapse-ref="/dashboard"
            :class="getRoute() === 'dashboard' ? 'active' : ''"
          >
            <template #icon>
              <i class="ni ni-shop text-primary text-sm opacity-10"></i>
            </template>
          </sidenav-collapse>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link :to="{ name: 'Edit Data Diri' }">
          <sidenav-collapse
            nav-text="Profil Diri"
            :collapse="false"
            url="#"
            :aria-controls="''"
            collapse-ref="/pendaftaran/data-diri/edit"
            :class="getRoute2() === 'data-diri' ? 'active' : ''"
          >
            <template #icon>
              <font-awesome-icon
                icon="fa-solid fa-user-tie"
                class="text-primary"
              />
              <!-- <i class="ni ni-single-02 text-success text-sm"></i> -->
            </template>
          </sidenav-collapse>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link :to="{ name: 'Profil Wilayah' }">
          <sidenav-collapse
            nav-text="Profil Wilayah"
            :collapse="false"
            url="#"
            :aria-controls="''"
            collapse-ref="/profil-wilayah/edit"
            :class="getRoute() === 'profil-wilayah' ? 'active' : ''"
          >
            <template #icon>
              <font-awesome-icon
                icon="fa-solid fa-map-location-dot"
                class="text-warning"
              />
              <!-- <i class="ni ni-single-02 text-success text-sm"></i> -->
            </template>
          </sidenav-collapse>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link :to="{ name: 'Pengajuan Lokasi' }">
          <sidenav-collapse
            nav-text="Pengajuan Lokasi KKN"
            :collapse="false"
            url="#"
            :aria-controls="''"
            collapse-ref="/pengajuan-lokasi"
            :class="getRoute() === 'pengajuan-lokasi' ? 'active' : ''"
          >
            <template #icon>
              <font-awesome-icon
                icon="fa-solid fa-map-location-dot"
                class="text-success"
              />
              <!-- <i class="ni ni-single-02 text-success text-sm"></i> -->
            </template>
          </sidenav-collapse>
        </router-link>
      </li>

      <!-- Menu Utama -->
      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="main-menu"
          nav-text="Menu Utama"
          :class="getRoute() === 'admin' ? 'active' : ''"
        >
          <template #icon>
            <font-awesome-icon icon="fa-solid fa-list" class="text-primary" />
          </template>
          <template #list>
            <ul class="nav ms-4">
              <!-- nav links -->
              <sidenav-item
                :to="{ name: 'Edit Data Diri' }"
                mini-icon="S"
                text="Statistik"
              />
              <sidenav-item
                :isActive="getRoute2() === 'kkn'"
                :to="{ name: 'Index KKN Terdaftar' }"
                mini-icon="P"
                text="Pendaftaran KKN"
              />
              <sidenav-item
                :to="{ name: 'Pengajuan Wilayah' }"
                mini-icon="L"
                text="Pengajuan Wilayah"
              />
              <sidenav-item
                :isActive="getRoute2() === 'kalender'"
                :to="{ name: 'Kalender' }"
                mini-icon="K"
                text="Kalender KKN"
              />
              <sidenav-item
                :isActive="getRoute2() === 'pengumuman'"
                :to="{ name: 'Pengumuman' }"
                mini-icon="P"
                text="Pengumuman"
              />
              <sidenav-item
                :isActive="getRoute2() === 'halaman'"
                :to="{ name: 'Halaman' }"
                mini-icon="H"
                text="Kelola Halaman"
              />
              <sidenav-item
                :to="{ name: 'Registrasi' }"
                mini-icon="K"
                text="Download Area"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <!-- Kelola Akun -->
      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="kelola-akun"
          nav-text="Kelola Akun"
          :class="getRoute() === 'akun' ? 'active' : ''"
        >
          <template #icon>
            <font-awesome-icon
              icon="fa-solid fa-users-gear"
              class="text-dark"
            />
          </template>
          <template #list>
            <ul class="nav ms-4">
              <!-- nav links -->
              <sidenav-item
                :isActive="getRoute2() === 'mahasiswa'"
                :to="{ name: 'Mahasiswa' }"
                mini-icon="M"
                text="Mahasiswa"
              />
              <sidenav-item
                :isActive="getRoute2() === 'dosen'"
                :to="{ name: 'Dosen' }"
                mini-icon="D"
                text="Dosen"
              />
              <sidenav-item
                :isActive="getRoute2() === 'administrator'"
                :to="{ name: 'Administrator' }"
                mini-icon="A"
                text="Administrator"
              />
              <sidenav-item
                :isActive="getRoute2() === 'bappeda'"
                :to="{ name: 'Bappeda' }"
                mini-icon="B"
                text="BAPPEDA"
              />
              <sidenav-item
                :isActive="getRoute2() === 'reviewer'"
                :to="{ name: 'Reviewer' }"
                mini-icon="R"
                text="Reviewer"
              />
              <sidenav-item
                :isActive="getRoute2() === 'pimpinan'"
                :to="{ name: 'Pimpinan' }"
                mini-icon="P"
                text="Pimpinan"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <!-- Kelola Mahasiswa -->
      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="kelola-mhs"
          nav-text="Kelola Mahasiswa"
          :class="getRoute() === 'kelola-mhs' ? 'active' : ''"
        >
          <template #icon>
            <font-awesome-icon
              icon="fa-solid fa-sliders"
              class="text-success"
            />
          </template>
          <template #list>
            <ul class="nav ms-4">
              <!-- nav links -->
              <sidenav-item
                :isActive="getRoute2() === 'pendaftaran'"
                :to="{ name: 'Pendaftaran Mahasiswa Admin' }"
                mini-icon="P"
                text="Data Pendaftaran"
              />
              <sidenav-item
                :isActive="getRoute2() === 'post-test'"
                :to="{ name: 'Nilai Post Test Mahasiswa Admin' }"
                mini-icon="N"
                text="Data Nilai Post Test"
              />
              <sidenav-item
                :isActive="getRoute2() === 'presensi'"
                :to="{ name: 'Presensi Mahasiswa Admin' }"
                mini-icon="P"
                text="Data Presensi Harian"
              />
              <sidenav-item
                :isActive="getRoute2() === 'lrk-lpk'"
                :to="{ name: 'LRK & LPK Mahasiswa Admin' }"
                mini-icon="L"
                text="Data LRK & LPK"
              />
              <sidenav-item
                :isActive="getRoute2() === 'reportase'"
                :to="{ name: 'Reportase Mahasiswa Admin' }"
                mini-icon="R"
                text="Data Reportase"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="pendaftaran"
          nav-text="Pendaftaran KKN"
          :class="getRoute() === 'pendaftaran' ? 'active' : ''"
        >
          <template #icon>
            <i class="ni ni-ungroup text-warning text-sm opacity-10"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <!-- nav links -->
              <sidenav-item
                :to="{ name: 'Edit Data Diri' }"
                mini-icon="P"
                text="Pendaftaran Diri"
              />
              <sidenav-item
                :to="{ name: 'Edit Data Berkas' }"
                mini-icon="B"
                text="Submit Berkas"
              />
              <sidenav-item
                :to="{ name: 'Daftar Lokasi' }"
                mini-icon="L"
                text="Daftar Lokasi"
              />
              <sidenav-item
                :to="{ name: 'Registrasi' }"
                mini-icon="R"
                text="Registrasi KKN"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <router-link :to="{ name: 'Post Test' }">
          <sidenav-collapse
            nav-text="Post Test"
            :collapse="false"
            url="#"
            :aria-controls="''"
            collapse-ref="/post-test"
            :class="getRoute() === 'post-test' ? 'active' : ''"
          >
            <template #icon>
              <i class="ni ni-ui-04 text-info text-sm opacity-10"></i>
            </template>
          </sidenav-collapse>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link :to="{ name: 'Seleksi' }">
          <sidenav-collapse
            nav-text="Seleksi Mahasiswa"
            :collapse="false"
            url="#"
            :aria-controls="''"
            collapse-ref="/seleksi-mhs"
            :class="getRoute() === 'seleksi-mhs' ? 'active' : ''"
          >
            <template #icon>
              <i class="ni ni-ui-04 text-info text-sm opacity-10"></i>
            </template>
          </sidenav-collapse>
        </router-link>
      </li>

      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="kegiatanKKN"
          nav-text="Kegiatan KKN"
          :class="getRoute() === 'kegiatan' ? 'active' : ''"
        >
          <template #icon>
            <i class="ni ni-archive-2 text-success text-sm opacity-10"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <!-- nav links -->
              <sidenav-item :to="{ name: 'LRK' }" mini-icon="R" text="LRK" />
              <sidenav-item :to="{ name: 'LPK' }" mini-icon="P" text="LPK" />
              <sidenav-item
                :to="{ name: 'Reportase' }"
                mini-icon="R"
                text="Data Reportase"
              />
              <sidenav-item
                :to="{ name: 'Presensi' }"
                mini-icon="P"
                text="Presensi"
              />
              <sidenav-item
                :to="{ name: 'Nilai Akhir' }"
                mini-icon="N"
                text="Nilai Akhir Mahasiswa"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <router-link :to="{ name: 'Mahasiswa' }">
          <sidenav-collapse
            nav-text="Download Area"
            collapse-ref=""
            :collapse="false"
            url="#"
            :aria-controls="''"
            :class="getRoute() === 'pengguna' ? 'active' : ''"
          >
            <template #icon>
              <i
                class="ni ni-single-copy-04 text-danger text-sm opacity-10"
              ></i>
            </template>
          </sidenav-collapse>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCollapse from "./SidenavCollapse.vue";

export default {
  name: "SidenavList",
  components: {
    SidenavItem,
    SidenavCollapse,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      // console.log(this.$route.path.split("/")[1]);
      return routeArr[1];
    },
    getRoute2() {
      const routeArr = this.$route.path.split("/");
      // console.log(this.$route.path.split("/")[2]);
      return routeArr[2];
    },
  },
};
</script>
