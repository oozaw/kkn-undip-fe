import { defineStore } from "pinia";
import * as s$laporan from "@/service/laporan";

const d$laporan = defineStore("laporanStore", {
  id: "laporan",
  state: () => ({
    status: null,
    listLaporan: [],
  }),
  actions: {
    async a$addLRK(body) {
      try {
        const status = await s$laporan.addLRK(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listLaporan: ({ listLaporan }) => listLaporan,
  },
});

export default d$laporan;
