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
        <router-link :to="{ name: 'Pengguna' }">
          <sidenav-collapse
            nav-text="Pengguna"
            :collapse="false"
            url="#"
            :aria-controls="''"
            collapse-ref="/pengguna"
            :class="getRoute() === 'pengguna' ? 'active' : ''"
          >
            <template #icon>
              <font-awesome-icon
                icon="fa-solid fa-users"
                class="text-success"
              />
              <!-- <i class="ni ni-single-02 text-success text-sm"></i> -->
            </template>
          </sidenav-collapse>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'Mahasiswa' }">
          <sidenav-collapse
            nav-text="Mahasiswa"
            :collapse="false"
            url="#"
            :aria-controls="''"
            collapse-ref="/mahasiswa"
            :class="getRoute() === 'mahasiswa' ? 'active' : ''"
          >
            <template #icon>
              <font-awesome-icon
                icon="fa-solid fa-users-rays"
                class="text-primary"
              />
              <!-- <i class="ni ni-single-02 text-primary text-sm"></i> -->
            </template>
          </sidenav-collapse>
        </router-link>
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
                :to="{ name: 'Overview' }"
                mini-icon="R"
                text="Data Reportase"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <router-link :to="{ name: 'Pengguna' }">
          <sidenav-collapse
            nav-text="Download Area"
            :collapse="false"
            url="#"
            :aria-controls="''"
            collapse-ref="/pengguna"
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
  },
};
</script>
