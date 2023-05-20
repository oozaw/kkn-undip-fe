import { defineStore } from "pinia";
import * as s$bappeda from "@/service/bappeda";

const d$bappeda = defineStore("bappedaStore", {
  id: "bappeda",
  state: () => ({
    listBappeda: [],
    status: null,
  }),
  actions: {
    async a$listBappeda() {
      try {
        const { data, status } = await s$bappeda.listBappeda();
        this.listBappeda = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$addBappeda(body) {
      try {
        const status = await s$bappeda.addBappeda(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$importBappeda(body) {
      try {
        const status = await s$bappeda.importBappeda(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listBappeda: ({ listBappeda }) => listBappeda,
  },
});

export default d$bappeda;
