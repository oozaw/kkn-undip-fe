import { defineStore } from "pinia";
import * as s$mahasiswa from "@/service/mahasiswa";

const d$mahasiswa = defineStore("mahasiswaStore", {
  id: "mahasiswa",
  state: () => ({
    listMahasiswa: [],
    status: null,
  }),
  actions: {
    async a$listMahasiswa(periode, prodi) {
      if (prodi === "") prodi = "all";
      try {
        const { data, status } = await s$mahasiswa.listMahasiswa(
          periode,
          prodi
        );
        this.listMahasiswa = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$addMahasiswa(body) {
      try {
        const status = await s$mahasiswa.addMahasiswa(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$importMahasiswa(body) {
      try {
        const status = await s$mahasiswa.importMahasiswa(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listMahasiswa: ({ listMahasiswa }) => listMahasiswa,
  },
});

export default d$mahasiswa;
