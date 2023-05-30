import { defineStore } from "pinia";
import * as s$laporan from "@/service/laporan";

const d$laporan = defineStore("laporanStore", {
  id: "laporan",
  state: () => ({
    status: null,
    listLRK: [],
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
  },
  getters: {
    g$listLRK: ({ listLRK }) => listLRK,
  },
});

export default d$laporan;
