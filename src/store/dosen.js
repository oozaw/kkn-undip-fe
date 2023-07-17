import { defineStore } from "pinia";
import * as s$dosen from "@/service/dosen";

const d$dosen = defineStore("dosenStore", {
  id: "dosen",
  state: () => ({
    listDosen: [],
    dosen: null,
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

    async a$getDosen(id_dosen) {
      try {
        const { data, status } = await s$dosen.getDosen(id_dosen);
        this.dosen = data ?? null;
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

    async a$editDosen(id_dosen, body) {
      try {
        const status = await s$dosen.editDosen(id_dosen, body);
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
    g$dosen: ({ dosen }) => dosen,
  },
});

export default d$dosen;
