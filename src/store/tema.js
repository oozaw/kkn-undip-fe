import { defineStore } from "pinia";
import * as s$tema from "@/service/tema";

const d$tema = defineStore("temaStore", {
  id: "tema",
  state: () => ({
    listTema: [],
    status: null,
  }),
  actions: {
    async a$listTema() {
      try {
        const { data, status } = await s$tema.listTema();
        this.listTema = data ?? [];
        this.status = status;
      } catch ({ message }) {
        this.status = false;
        throw message;
      }
    },
  },
  getters: {
    g$listTema: ({ listTema }) => listTema,
  },
});

export default d$tema;
