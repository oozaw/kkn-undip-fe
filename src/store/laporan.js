import { defineStore } from "pinia";
import * as s$laporan from "@/service/laporan";

const d$laporan = defineStore("laporanStore", {
  id: "laporan",
  state: () => ({
    status: null,
    listLaporan: [],
    listLRK: [],
    listLPK: [],
    laporan: {},
  }),
  actions: {
    async a$listLaporan() {
      try {
        const { data, status } = await s$laporan.listLaporan();
        this.listLaporan = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$listLaporanKecamatan(id_kecamatan) {
      try {
        const { data, status } = await s$laporan.listLaporanKecamatan(
          id_kecamatan
        );
        this.listLaporan = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$evaluateLaporan(body) {
      try {
        const status = await s$laporan.evaluateLaporan(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

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

    async a$deleteLaporan(id_laporan) {
      try {
        const status = await s$laporan.deleteLaporan(id_laporan);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listLaporan: ({ listLaporan }) => listLaporan,
    g$listLRK: ({ listLRK }) => listLRK,
    g$listLPK: ({ listLPK }) => listLPK,
    g$getLaporan: ({ laporan }) => laporan,
  },
});

export default d$laporan;
