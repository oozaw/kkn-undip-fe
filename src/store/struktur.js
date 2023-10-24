import { defineStore } from "pinia";
import * as s$struktur from "@/service/struktur";

const d$struktur = defineStore("strukturStore", {
  id: "struktur",
  state: () => ({
    struktur: null,
    status: null,
  }),
  actions: {
    async a$getStruktur() {
      try {
        const { data, status } = await s$struktur.getStruktur();
        this.struktur = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$editStruktur(body) {
      try {
        const status = await s$struktur.editStruktur(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$struktur: ({ struktur }) => struktur,
  },
});

export default d$struktur;
