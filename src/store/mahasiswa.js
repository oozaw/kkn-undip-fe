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

    async a$listMahasiswaUnregistered() {
      try {
        const { data, status } = await s$mahasiswa.listMahasiswaUnregistered();
        this.listMahasiswa = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listMahasiswaRegistered() {
      try {
        const { data, status } = await s$mahasiswa.listMahasiswaRegistered();
        this.listMahasiswa = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listMahasiswaAccepted() {
      try {
        const { data, status } = await s$mahasiswa.listMahasiswaAccepted();
        this.listMahasiswa = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listMahasiswaRegisteredByKecamatan(id_kecamatan) {
      try {
        const { data, status } =
          await s$mahasiswa.listMahasiswaRegisteredByKecamatan(id_kecamatan);
        this.listMahasiswa = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listMahasiswaAcceptedByKecamatan(id_kecamatan) {
      try {
        const { data, status } =
          await s$mahasiswa.listMahasiswaAcceptedByKecamatan(id_kecamatan);
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
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$importMahasiswa(body) {
      try {
        const status = await s$mahasiswa.importMahasiswa(body);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listMahasiswaWilayah(id_kecamatan) {
      try {
        const { data, status } = await s$mahasiswa.listMahasiswaWilayah(
          id_kecamatan
        );
        this.listMahasiswa = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$daftarLokasi(body) {
      try {
        const { data, status } = await s$mahasiswa.daftarLokasi(body);
        this.listMahasiswa = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$accMahasiswa(id_mahasiswa_kecamatan) {
      try {
        const status = await s$mahasiswa.accMahasiswa(id_mahasiswa_kecamatan);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$decMahasiswa(id_mahasiswa_kecamatan) {
      try {
        const status = await s$mahasiswa.decMahasiswa(id_mahasiswa_kecamatan);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },
  },
  getters: {
    g$listMahasiswa: ({ listMahasiswa }) => listMahasiswa,
  },
});

export default d$mahasiswa;
