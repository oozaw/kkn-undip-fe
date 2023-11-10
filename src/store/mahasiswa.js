import { defineStore } from "pinia";
import * as s$mahasiswa from "@/service/mahasiswa";

const d$mahasiswa = defineStore("mahasiswaStore", {
  id: "mahasiswa",
  state: () => ({
    listMahasiswa: [],
    mahasiswa: null,
    status: null,
    formatFile: null,
  }),
  actions: {
    async a$listMahasiswa() {
      try {
        const { data, status } = await s$mahasiswa.listMahasiswa();
        this.listMahasiswa = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listMahasiswaTema(id_tema) {
      try {
        const { data, status } = await s$mahasiswa.listMahasiswaTema(id_tema);
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

    async a$getMahasiswa(id_mahasiswa) {
      try {
        const { data, status } = await s$mahasiswa.getMahasiswa(id_mahasiswa);
        this.mahasiswa = data ?? null;
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

    async a$editMahasiswa(id_mahasiswa, body) {
      try {
        const status = await s$mahasiswa.editMahasiswa(id_mahasiswa, body);
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

    async a$deleteDaftarLokasi(id_mahasiswa_kecamatan) {
      try {
        const status = await s$mahasiswa.deleteDaftarLokasi(
          id_mahasiswa_kecamatan
        );
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

    async a$deleteMahasiswa(id_mahasiswa) {
      try {
        const status = await s$mahasiswa.deleteMahasiswa(id_mahasiswa);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$downloadFormatImport() {
      try {
        const data = await s$mahasiswa.downloadFormatImport();
        this.formatFile = data ?? null;
        this.status = true;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$addKHS(body) {
      try {
        const status = await s$mahasiswa.addKHS(body);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$addSuratPernyataan(body) {
      try {
        const status = await s$mahasiswa.addSuratPernyataan(body);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$addFoto(body) {
      try {
        const status = await s$mahasiswa.addFoto(body);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },
  },
  getters: {
    g$listMahasiswa: ({ listMahasiswa }) => listMahasiswa,
    g$mahasiswa: ({ mahasiswa }) => mahasiswa,
    g$formatFile: ({ formatFile }) => formatFile,
  },
});

export default d$mahasiswa;
