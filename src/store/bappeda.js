import { defineStore } from "pinia";
import * as s$bappeda from "@/service/bappeda";

const d$bappeda = defineStore("bappedaStore", {
  id: "bappeda",
  state: () => ({
    listBappeda: [],
    listKabupaten: [],
    bappeda: null,
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

    async a$getBappeda(id_bappeda) {
      try {
        const { data, status } = await s$bappeda.getBappeda(id_bappeda);
        this.bappeda = data ?? null;
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

    async a$listKabupatenBappeda() {
      try {
        const { data, status } = await s$bappeda.listKabupatenBappeda();
        this.listKabupaten = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
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

    async a$editBappeda(id_bappeda, body) {
      try {
        const status = await s$bappeda.editBappeda(id_bappeda, body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$deleteBappeda(id_bappeda) {
      try {
        const status = await s$bappeda.deleteBappeda(id_bappeda);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listBappeda: ({ listBappeda }) => listBappeda,
    g$listKabupatenBappeda: ({ listKabupaten }) => listKabupaten,
    g$bappeda: ({ bappeda }) => bappeda,
  },
});

export default d$bappeda;
