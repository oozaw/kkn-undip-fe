import { defineStore } from "pinia";
import * as s$admin from "@/service/admin";

const d$admin = defineStore("adminStore", {
  id: "admin",
  state: () => ({
    listAdmin: [],
    admin: null,
    status: null,
  }),
  actions: {
    async a$listAdmin() {
      try {
        const { data, status } = await s$admin.listAdmin();
        this.listAdmin = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$getAdmin(id_admin) {
      try {
        const { data, status } = await s$admin.getAdmin(id_admin);
        this.admin = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
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

    async a$editAdmin(id_admin, body) {
      try {
        const status = await s$admin.editAdmin(id_admin, body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listAdmin: ({ listAdmin }) => listAdmin,
    g$admin: ({ admin }) => admin,
  },
});

export default d$admin;
