import { defineStore } from "pinia";
import * as s$laporan from "@/service/laporan";

const d$laporan = defineStore("laporanStore", {
  id: "laporan",
  state: () => ({
    status: null,
    listLRK: [],
    listLPK: [],
    laporan: {},
  }),
  actions: {
    async a$listLRK() {
      try {
        const { data, status } = await s$laporan.listLRK();
        this.listLRK = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$addLRK(body) {
      try {
        const status = await s$laporan.addLRK(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$editLRK(body) {
      try {
        const status = await s$laporan.editLRK(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$listLPK() {
      try {
        const { data, status } = await s$laporan.listLPK();
        this.listLPK = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$getLaporan(id_laporan) {
      try {
        const { data, status } = await s$laporan.getLaporan(id_laporan);
        this.laporan = data ?? {};
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$addLPK(body) {
      try {
        const status = await s$laporan.addLPK(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listLRK: ({ listLRK }) => listLRK,
    g$listLPK: ({ listLPK }) => listLPK,
    g$getLaporan: ({ laporan }) => laporan,
  },
});

export default d$laporan;
