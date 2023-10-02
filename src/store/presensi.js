import { defineStore } from "pinia";
import * as s$presensi from "@/service/presensi";

const d$presensi = defineStore("presensiStore", {
  id: "presensi",
  state: () => ({
    listPresensi: [],
    presensi: null,
    status: null,
  }),
  actions: {
    async a$listJadwalPresensi() {
      try {
        const { data, status } = await s$presensi.listJadwalPresensi();
        this.listPresensi = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listJadwalPresensiTema(id_tema) {
      try {
        const { data, status } = await s$presensi.listJadwalPresensiTema(
          id_tema
        );
        this.listPresensi = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listPresensiMahasiswa() {
      try {
        const { data, status } = await s$presensi.listPresensiMahasiswa();
        this.listPresensi = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listPresensiKecamatan(id_kecamatan) {
      try {
        const { data, status } = await s$presensi.listPresensiKecamatan(
          id_kecamatan
        );
        this.listPresensi = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$getPresensi(id_mahasiswa, tgl) {
      try {
        const { data, status } = await s$presensi.getPresensi(
          id_mahasiswa,
          tgl
        );
        this.presensi = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$addJadwalPresensi(body) {
      try {
        const status = await s$presensi.addJadwalPresensi(body);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$setupJadwalPresensiTema(id_tema) {
      try {
        const status = await s$presensi.setupJadwalPresensiTema(id_tema);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$editJadwalPresensi(id_presensi, body) {
      try {
        const status = await s$presensi.editJadwalPresensi(id_presensi, body);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$editPresensi(id_riwayat_presensi, body) {
      try {
        const status = await s$presensi.editPresensi(id_riwayat_presensi, body);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$submitPresensi(id_tema, body) {
      try {
        const status = await s$presensi.submitPresensi(id_tema, body);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$updateStatusJadwalPresensi() {
      try {
        const status = await s$presensi.updateStatusJadwalPresensi();
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$deleteJadwalPresensi(id_presensi) {
      try {
        const status = await s$presensi.deleteJadwalPresensi(id_presensi);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$deletePresensi(id_riwayat_presensi) {
      try {
        const status = await s$presensi.deletePresensi(id_riwayat_presensi);
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },
  },
  getters: {
    g$listPresensi: ({ listPresensi }) => listPresensi,
    g$presensi: ({ presensi }) => presensi,
  },
});

export default d$presensi;
