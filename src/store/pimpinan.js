import { defineStore } from "pinia";
import * as s$pimpinan from "@/service/pimpinan";

const d$pimpinan = defineStore("pimpinanStore", {
  id: "pimpinan",
  state: () => ({
    listPimpinan: [],
    status: null,
  }),
  actions: {
    async a$listPimpinan() {
      try {
        const { data, status } = await s$pimpinan.listPimpinan();
        this.listPimpinan = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$addPimpinan(body) {
      try {
        const status = await s$pimpinan.addPimpinan(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$importPimpinan(body) {
      try {
        const status = await s$pimpinan.importPimpinan(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listPimpinan: ({ listPimpinan }) => listPimpinan,
  },
});

export default d$pimpinan;
