import { defineStore } from "pinia";
import * as s$dosen from "@/service/dosen";

const d$dosen = defineStore("dosenStore", {
  id: "dosen",
  state: () => ({
    listDosen: [],
    status: null,
  }),
  actions: {
    async a$listDosen() {
      try {
        const { data, status } = await s$dosen.listDosen();
        this.listDosen = data ?? [];
        this.status = status;
      } catch ({ message }) {
        this.status = false;
        throw message;
      }
    },
  },
  getters: {
    g$listDosen: ({ listDosen }) => listDosen,
  },
});

export default d$dosen;
