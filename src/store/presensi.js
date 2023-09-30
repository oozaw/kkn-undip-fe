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
    async a$listAllPresensi() {
      try {
        const { data, status } = await s$presensi.listAllPresensi();
        this.listPresensi = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listPresensiTema(id_tema) {
      try {
        const { data, status } = await s$presensi.listPresensiTema(id_tema);
        this.listPresensi = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listRiwayatPresensiMahasiswa() {
      try {
        const { data, status } =
          await s$presensi.listRiwayatPresensiMahasiswa();
        this.listPresensi = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$getRiwayatPresensi(id_mahasiswa, tgl) {
      try {
        const { data, status } = await s$presensi.getRiwayatPresensi(
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

    async a$addPresensi(id_tema) {
      try {
        const status = await s$presensi.addPresensi(id_tema);
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

    async a$updateStatusPresensi() {
      try {
        const status = await s$presensi.updateStatusPresensi();
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
