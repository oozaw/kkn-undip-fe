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
      } catch ({ message }) {
        this.status = false;
        throw message;
      }
    },
  },
  getters: {
    g$listBappeda: ({ listBappeda }) => listBappeda,
  },
});

export default d$bappeda;
