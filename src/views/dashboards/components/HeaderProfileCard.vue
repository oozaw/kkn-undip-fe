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
          <h5 class="mb-1 font-weight-bolder">{{ g$user.name }}</h5>
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
    ...mapState(d$auth, ["g$user"]),
  },
  mounted() {
    if (this.g$user.role) {
      document.getElementById("role").innerHTML = this.checkRole(
        this.g$user.role
      );
    }
  },
  methods: {
    checkRole(role) {
      switch (role) {
        case "SUPERADMIN":
          return "Super Administrator";
        case "ADMIN":
          return "Administrator";
        case "USER":
          return "User";
        case "MAHASISWA":
          return "Mahasiswa";
        case "DOSEN":
          return "Dosen";
        case "BAPPEDA":
          return "BAPPEDA";
        case "REVIEWER":
          return "Reviewer";
        default:
          return "";
      }
    },
  },
};
</script>
