import { defineStore } from "pinia";
import * as s$pimpinan from "@/service/pimpinan";

const d$pimpinan = defineStore("pimpinanStore", {
  id: "pimpinan",
  state: () => ({
    listPimpinan: [],
    pimpinan: null,
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

    async a$getPimpinan(id_pimpinan) {
      try {
        const { data, status } = await s$pimpinan.getPimpinan(id_pimpinan);
        this.pimpinan = data ?? null;
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

    async a$editPimpinan(id_pimpinan, body) {
      try {
        const status = await s$pimpinan.editPimpinan(id_pimpinan, body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$deletePimpinan(id_pimpinan) {
      try {
        const status = await s$pimpinan.deletePimpinan(id_pimpinan);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listPimpinan: ({ listPimpinan }) => listPimpinan,
    g$pimpinan: ({ pimpinan }) => pimpinan,
  },
});

export default d$pimpinan;
