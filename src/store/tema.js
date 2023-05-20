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
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$addTema(body) {
      try {
        const { data, status } = await s$tema.addTema(body);
        this.status = status;
        return data;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },
  },
  getters: {
    g$listTema: ({ listTema }) => listTema,
  },
});

export default d$tema;