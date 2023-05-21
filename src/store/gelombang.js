import { defineStore } from "pinia";
import * as s$gelombang from "@/service/gelombang";

const d$gelombang = defineStore("gelombangStore", {
  id: "gelombang",
  state: () => ({
    status: null,
  }),
  actions: {
    async a$adGelombang(body) {
      try {
        const status = await s$gelombang.adGelombang(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {},
});

export default d$gelombang;
