<template>
  <div id="profile" class="card card-body">
    <div class="row align-items-center">
      <div class="col-sm-auto col-4">
        <argon-avatar
          :img="img"
          alt="team-3"
          size="xl"
          shadow="sm"
          border-radius="lg"
        />
      </div>
      <div class="col-sm-auto col-8 my-auto">
        <div class="h-100">
          <h5 class="mb-1 font-weight-bolder">{{ g$infoUser.nama }}</h5>
          <p id="role" class="mb-0 font-weight-bold text-sm"></p>
        </div>
      </div>
      <div
        class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-center"
      >
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import ArgonAvatar from "@/components/ArgonAvatar.vue";
import { mapState } from "pinia";
import d$auth from "@/store/auth";

import imgDefault from "@/assets/img/team-3.jpg";

export default {
  name: "HeaderProfileCard",
  components: {
    ArgonAvatar,
  },
  props: {
    img: {
      type: String,
      default: imgDefault,
    },
  },
  data() {
    return {
      imgDefault,
    };
  },
  computed: {
    ...mapState(d$auth, ["g$user", "g$infoUser"]),
  },
  mounted() {
    if (this.g$user.role) {
      var element = document.getElementById("role");
      if (element) element.innerHTML = this.checkRole(this.g$user.role);
    }
  },
  methods: {
    checkRole(role) {
      switch (role) {
        case "SUPERADMIN":
          return "Super Administrator KKN UNDIP";
        case "ADMIN":
          return "Tim Administrasi KKN UNDIP";
        case "PIMPINAN":
          return "Pimpinan P2KKN UNDIP";
        case "MAHASISWA":
          if (this.g$infoUser.id_tema) {
            let jenis = this.g$infoUser.tema.jenis == 1 ? "Reguler" : "";
            let tema = `${jenis} ${this.g$infoUser.tema.nama}`;
            return `Mahasiswa KKN ${tema}`;
          }
          return "Mahasiswa - Belum Terdaftar";
        case "DOSEN":
          return "Dosen KKN UNDIP";
        case "BAPPEDA":
          return "BAPPEDA " + this.g$infoUser.nama_kabupaten;
        case "REVIEWER":
          return "Tim Reviewer KKN UNDIP";
        default:
          return "";
      }
    },
  },
};
</script>
