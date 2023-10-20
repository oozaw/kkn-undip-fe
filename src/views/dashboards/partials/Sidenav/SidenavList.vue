<template>
  <div
    id="sidenav-collapse-main"
    class="collapse navbar-collapse w-auto h-auto h-100"
  >
    <ul class="navbar-nav">
      <!-- Dashboard -->
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

      <!-- Profile Diri -->
      <li class="nav-item" v-if="a$checkAuth(['REVIEWER'])">
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
                class="text-success"
              />
            </template>
          </sidenav-collapse>
        </router-link>
      </li>

      <!-- Pengajuan Proposal Dosen -->
      <li class="nav-item" v-if="a$checkAuth(['REVIEWER'])">
        <router-link :to="{ name: 'Pendaftaran Dosen Admin' }">
          <sidenav-collapse
            nav-text="Pengajuan Proposal Dosen"
            :collapse="false"
            url="#"
            :aria-controls="''"
            collapse-ref="/dosen/pendaftaran"
            :class="getRoute2() === 'pendaftaran' ? 'active' : ''"
          >
            <template #icon>
              <font-awesome-icon
                icon="fa-solid fa-file-lines"
                class="text-secondary"
              />
            </template>
          </sidenav-collapse>
        </router-link>
      </li>

      <!-- Profile Wilayah -->
      <li class="nav-item" v-if="a$checkAuth(['BAPPEDA'])">
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

      <!-- Keikutsertaan Kabupaten -->
      <li class="nav-item" v-if="a$checkAuth(['BAPPEDA'])">
        <router-link :to="{ name: 'Keikutsertaan Wilayah' }">
          <sidenav-collapse
            nav-text="Keikutsertaan Wilayah"
            :collapse="false"
            url="#"
            :aria-controls="''"
            collapse-ref="/keikutsertaan-wilayah"
            :class="getRoute() === 'keikutsertaan-wilayah' ? 'active' : ''"
          >
            <template #icon>
              <font-awesome-icon
                icon="fa-solid fa-map-location-dot"
                class="text-primary"
              />
              <!-- <i class="ni ni-single-02 text-success text-sm"></i> -->
            </template>
          </sidenav-collapse>
        </router-link>
      </li>

      <!-- Pengajuan Lokasi -->
      <li class="nav-item" v-if="a$checkAuth(['BAPPEDA'])">
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
      <li class="nav-item" v-if="a$checkAuth(['ADMIN'])">
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
              <!-- <sidenav-item
                :to="{ name: 'Edit Data Diri' }"
                mini-icon="S"
                text="Statistik"
              /> -->
              <sidenav-item
                :isActive="getRoute2() === 'tema'"
                :to="{ name: 'Tema KKN' }"
                mini-icon="T"
                text="Tema KKN"
              />
              <sidenav-item
                :isActive="getRoute2() === 'gelombang'"
                :to="{ name: 'Gelombang' }"
                mini-icon="G"
                text="Gelombang Pendaftaran"
              />
              <sidenav-item
                :to="{ name: 'Pengajuan Wilayah' }"
                mini-icon="W"
                text="Pengajuan Wilayah"
              />
              <sidenav-item
                :isActive="getRoute2() === 'presensi'"
                :to="{ name: 'Jadwal Presensi' }"
                mini-icon="P"
                text="Jadwal Presensi"
              />
              <sidenav-item
                :isActive="getRoute2() === 'kalender'"
                :to="{ name: 'Kalender' }"
                mini-icon="K"
                text="Kalender Kegiatan"
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
              <!-- <sidenav-item
                :to="{ name: 'Registrasi' }"
                mini-icon="K"
                text="Download Area"
              /> -->
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <!-- Kelola Akun -->
      <li class="nav-item" v-if="a$checkAuth(['ADMIN', 'SUPERADMIN'])">
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
                v-if="a$checkAuth(['ADMIN'])"
              />
              <sidenav-item
                :isActive="getRoute2() === 'dosen'"
                :to="{ name: 'Dosen' }"
                mini-icon="D"
                text="Dosen"
                v-if="a$checkAuth(['ADMIN'])"
              />
              <sidenav-item
                :isActive="getRoute2() === 'administrator'"
                :to="{ name: 'Administrator' }"
                mini-icon="A"
                text="Administrator"
                v-if="a$checkAuth(['SUPERADMIN'])"
              />
              <sidenav-item
                :isActive="getRoute2() === 'bappeda'"
                :to="{ name: 'Bappeda' }"
                mini-icon="B"
                text="BAPPEDA"
                v-if="a$checkAuth(['ADMIN'])"
              />
              <sidenav-item
                :isActive="getRoute2() === 'reviewer'"
                :to="{ name: 'Reviewer' }"
                mini-icon="R"
                text="Reviewer"
                v-if="a$checkAuth(['ADMIN'])"
              />
              <sidenav-item
                :isActive="getRoute2() === 'pimpinan'"
                :to="{ name: 'Pimpinan' }"
                mini-icon="P"
                text="Pimpinan"
                v-if="a$checkAuth(['ADMIN'])"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <!-- Kelola Mahasiswa -->
      <li class="nav-item" v-if="a$checkAuth(['ADMIN'])">
        <sidenav-collapse
          collapse-ref="mahasiswa"
          nav-text="Kelola Mahasiswa"
          :class="getRoute() === 'mahasiswa' ? 'active' : ''"
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
                :isActive="
                  getRoute2() === 'pendaftaran' && getRoute() === 'mahasiswa'
                "
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
                :isActive="
                  getRoute2() === 'presensi' && getRoute() === 'mahasiswa'
                "
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

      <!-- Kelola Dosen -->
      <li class="nav-item" v-if="a$checkAuth(['ADMIN'])">
        <sidenav-collapse
          collapse-ref="dosen"
          nav-text="Kelola Dosen"
          :class="getRoute() === 'dosen' ? 'active' : ''"
        >
          <template #icon>
            <font-awesome-icon
              icon="fa-solid fa-sliders"
              class="text-warning"
            />
          </template>
          <template #list>
            <ul class="nav ms-4">
              <!-- nav links -->
              <sidenav-item
                :isActive="
                  getRoute2() === 'pendaftaran' && getRoute() === 'dosen'
                "
                :to="{ name: 'Pendaftaran Dosen Admin' }"
                mini-icon="P"
                text="Data Pendaftaran & Lokasi"
              />
              <sidenav-item
                :isActive="getRoute2() === 'pemilihan-mhs'"
                :to="{ name: 'Seleksi Mahasiswa' }"
                mini-icon="P"
                text="Data Seleksi Mahasiswa"
              />
              <!-- <sidenav-item
                :isActive="
                  getRoute2() === 'presensi' && getRoute() === 'dosen'
                "
                :to="{ name: 'Presensi Dosen Admin' }"
                mini-icon="P"
                text="Data Presensi Harian"
              /> -->
              <sidenav-item
                :isActive="getRoute2() === 'nilai-akhir'"
                :to="{ name: 'Nilai Akhir Mahasiswa Admin' }"
                mini-icon="N"
                text="Data Nilai Akhir Mahasiswa"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <!-- Kelola Landing Page -->
      <li class="nav-item" v-if="a$checkAuth(['ADMIN'])">
        <sidenav-collapse
          collapse-ref="landing-page"
          nav-text="Landing Page"
          :class="getRoute() === 'landing' ? 'active' : ''"
        >
          <template #icon>
            <font-awesome-icon icon="fa-solid fa-pager" class="text-danger" />
          </template>
          <template #list>
            <ul class="nav ms-4">
              <!-- nav links -->
              <sidenav-item
                :isActive="
                  getRoute2() === 'profile' && getRoute() === 'landing'
                "
                :to="{ name: 'Landing Profile' }"
                mini-icon="P"
                text="Profile"
              />
              <sidenav-item
                :isActive="getRoute2() === 'berita' && getRoute() === 'landing'"
                :to="{ name: 'Landing Berita' }"
                mini-icon="B"
                text="Berita"
              />
              <sidenav-item
                :isActive="
                  getRoute2() === 'reportase' && getRoute() === 'landing'
                "
                :to="{ name: 'Landing Reportase' }"
                mini-icon="R"
                text="Reportase"
              />
              <sidenav-item
                :isActive="
                  getRoute2() === 'struktur' && getRoute() === 'landing'
                "
                :to="{ name: 'Landing Struktur' }"
                mini-icon="S"
                text="Struktur"
              />
              <sidenav-item
                :isActive="getRoute2() === 'galeri' && getRoute() === 'landing'"
                :to="{ name: 'Landing Galeri' }"
                mini-icon="G"
                text="Galeri"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <!-- Koordinator Wilayah -->
      <li class="nav-item" v-if="a$checkAuth(['ADMIN', 'BAPPEDA'])">
        <router-link :to="{ name: 'Koordinator Wilayah' }">
          <sidenav-collapse
            nav-text="Koordinator Wilayah"
            :collapse="false"
            url="#"
            :aria-controls="''"
            collapse-ref="/korwil"
            :class="getRoute() === 'korwil' ? 'active' : ''"
          >
            <template #icon>
              <font-awesome-icon
                icon="fa-solid fa-users-gear"
                class="text-primary"
              />
              <!-- <i class="ni ni-single-02 text-success text-sm"></i> -->
            </template>
          </sidenav-collapse>
        </router-link>
      </li>

      <!-- Pendaftaran KKN -->
      <li class="nav-item" v-if="a$checkAuth(['DOSEN', 'MAHASISWA'])">
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
              <!-- <sidenav-item
                :isActive="getRoute2() === 'tema'"
                :to="{ name: 'Tema KKN' }"
                mini-icon="T"
                text="KKN Tematik"
                v-if="a$checkAuth(['DOSEN'])"
              /> -->
              <sidenav-item
                :to="{ name: 'Edit Data Berkas' }"
                mini-icon="B"
                text="Submit Berkas"
                v-if="a$checkAuth(['MAHASISWA'])"
              />
              <sidenav-item
                :isActive="getRoute2() === 'lokasi'"
                :to="{ name: 'Index Lokasi' }"
                mini-icon="L"
                text="Daftar Lokasi"
                v-if="a$checkAuth(['MAHASISWA'])"
              />
              <sidenav-item
                :isActive="getRoute2() === 'registrasi'"
                :to="{ name: 'Registrasi' }"
                mini-icon="R"
                text="Registrasi KKN"
                v-if="a$checkAuth(['DOSEN'])"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <!-- Post Test -->
      <li class="nav-item" v-if="a$checkAuth(['MAHASISWA'])">
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

      <!-- Seleksi Mahasiswa -->
      <li class="nav-item" v-if="a$checkAuth(['DOSEN'])">
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

      <!-- Kegiatan KKN -->
      <li class="nav-item" v-if="a$checkAuth(['DOSEN', 'MAHASISWA'])">
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
              <sidenav-item
                :isActive="getRoute2() === 'lrk'"
                :to="{ name: 'LRK' }"
                mini-icon="R"
                text="LRK"
                :isDisabled="!isAccepted()"
              />
              <sidenav-item
                :isActive="getRoute2() === 'lpk'"
                :to="{ name: 'LPK' }"
                mini-icon="P"
                text="LPK"
                :isDisabled="!isAccepted()"
              />
              <sidenav-item
                :isActive="getRoute2() === 'reportase'"
                :to="{ name: 'Reportase' }"
                mini-icon="R"
                text="Reportase"
                :isDisabled="!isAccepted()"
              />
              <sidenav-item
                :to="{ name: 'Presensi' }"
                mini-icon="P"
                text="Presensi"
                :isDisabled="!isAccepted()"
              />
              <sidenav-item
                :to="{ name: 'Review Presensi Mahasiswa' }"
                mini-icon="P"
                text="Presensi Mahasiswa"
                v-if="a$checkAuth(['DOSEN'])"
              />
              <sidenav-item
                :isActive="getRoute2() === 'nilai'"
                :to="{ name: 'Nilai Akhir' }"
                mini-icon="N"
                text="Nilai Akhir Mahasiswa"
                v-if="a$checkAuth(['DOSEN'])"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <!-- Export -->
      <li class="nav-item" v-if="a$checkAuth(['ADMIN'])">
        <router-link :to="{ name: 'Export' }">
          <sidenav-collapse
            nav-text="Ekspor Area"
            collapse-ref=""
            :collapse="false"
            url="#"
            :aria-controls="''"
            :class="getRoute() === 'export' ? 'active' : ''"
          >
            <template #icon>
              <i
                class="ni ni-single-copy-04 text-success text-sm opacity-10"
              ></i>
            </template>
          </sidenav-collapse>
        </router-link>
      </li>

      <!-- Download Area -->
      <!-- <li class="nav-item">
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
      </li> -->
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import d$auth from "@/store/auth";
import { mapActions, mapState } from "pinia";

export default {
  name: "SidenavList",
  components: {
    SidenavItem,
    SidenavCollapse,
  },
  computed: {
    ...mapState(d$auth, ["g$infoUser", "g$user"]),
  },
  methods: {
    ...mapActions(d$auth, ["a$getUser", "a$checkAuth"]),

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

    isAccepted() {
      if (this.g$user.role == "MAHASISWA") return this.g$infoUser?.status == 2;
      else return this.g$infoUser?.id_tema.length > 0;
    },
  },
};
</script>
