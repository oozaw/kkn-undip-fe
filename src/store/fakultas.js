import { defineStore } from "pinia";
import * as s$fakultas from "@/service/fakultas";

const d$fakultas = defineStore("fakultasStore", {
  id: "fakultas",
  state: () => ({
    status: null,
    listFakultas: [],
  }),
  actions: {
    async a$listFakultas() {
      try {
        const { data, status } = await s$fakultas.listFakultas();
        this.listFakultas = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listFakultas: ({ listFakultas }) => listFakultas,
  },
});

export default d$fakultas;
