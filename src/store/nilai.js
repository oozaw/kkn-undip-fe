import { defineStore } from "pinia";
import * as s$nilai from "@/service/nilai";

const d$nilai = defineStore("nilaiStore", {
  id: "nilai",
  state: () => ({
    listNilai: [],
    nilai: {},
    status: null,
    formatFile: null,
  }),
  actions: {
    async a$listNilaiKecamatan(id_kecamatan) {
      try {
        const { data, status } = await s$nilai.listNilaiKecamatan(id_kecamatan);
        this.listNilai = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$getNilai(id_nilai) {
      try {
        const { data, status } = await s$nilai.getNilai(id_nilai);
        this.nilai = data ?? {};
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$editNilai(body) {
      try {
        const status = await s$nilai.editNilai(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$resetNilai(id_nilai) {
      try {
        const status = await s$nilai.resetNilai(id_nilai);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$downloadFormatImport(id_kecamatan) {
      try {
        const data = await s$nilai.downloadFormatImport(id_kecamatan);
        this.formatFile = data ?? null;
        this.status = true;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$importNilai(body) {
      try {
        const status = await s$nilai.importNilai(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listNilai: ({ listNilai }) => listNilai,
    g$nilai: ({ nilai }) => nilai,
    g$formatFile: ({ formatFile }) => formatFile,
  },
});

export default d$nilai;
