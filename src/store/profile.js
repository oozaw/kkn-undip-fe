import { defineStore } from "pinia";
import * as s$profile from "@/service/profile";

const d$profile = defineStore("profileStore", {
  id: "profile",
  state: () => ({
    profile: null,
    status: null,
  }),
  actions: {
    async a$getProfile() {
      try {
        const { data, status } = await s$profile.getProfile();
        this.profile = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$editProfile(id_profile) {
      try {
        const status = await s$profile.editProfile(id_profile);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },
  },
  getters: {
    g$profile: ({ profile }) => profile,
  },
});

export default d$profile;
