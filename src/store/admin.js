import { defineStore } from "pinia";
import * as s$admin from "@/service/admin";

const d$admin = defineStore("adminStore", {
  id: "admin",
  state: () => ({
    listAdmin: [],
    status: null,
  }),
  actions: {
    async a$listAdmin() {
      try {
        const { data, status } = await s$admin.listAdmin();
        this.listAdmin = data ?? [];
        this.status = status;
      } catch ({ message }) {
        this.status = false;
        throw message;
      }
    },

    async a$addAdmin(body) {
      try {
        const status = await s$admin.addAdmin(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listAdmin: ({ listAdmin }) => listAdmin,
  },
});

export default d$admin;
