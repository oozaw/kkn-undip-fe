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
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$addDosen(body) {
      try {
        const status = await s$dosen.addDosen(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$importDosen(body) {
      try {
        const status = await s$dosen.importDosen(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$deleteDosen(id_dosen) {
      try {
        const status = await s$dosen.deleteDosen(id_dosen);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listDosen: ({ listDosen }) => listDosen,
  },
});

export default d$dosen;
