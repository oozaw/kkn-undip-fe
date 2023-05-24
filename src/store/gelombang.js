import { defineStore } from "pinia";
import * as s$gelombang from "@/service/gelombang";

const d$gelombang = defineStore("gelombangStore", {
  id: "gelombang",
  state: () => ({
    status: null,
    listGelombang: [],
  }),
  actions: {
    async a$listGelombang() {
      try {
        const { data, status } = await s$gelombang.listGelombang();
        this.listGelombang = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$addGelombang(body) {
      try {
        const status = await s$gelombang.addGelombang(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$switchGelombang(id_gelombang) {
      try {
        const status = await s$gelombang.switchGelombang(id_gelombang);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listGelombang: ({ listGelombang }) => listGelombang,
  },
});

export default d$gelombang;
