import { defineStore } from "pinia";
import * as s$pengumuman from "@/service/pengumuman";

const d$pengumuman = defineStore("pengumumanStore", {
  id: "pengumuman",
  state: () => ({
    listPengumuman: [],
    pengumuman: null,
    status: null,
  }),
  actions: {
    async a$listAllPengumuman() {
      try {
        const { data, status } = await s$pengumuman.listAllPengumuman();
        this.listPengumuman = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listMahasiswaPengumuman() {
      try {
        const { data, status } = await s$pengumuman.listMahasiswaPengumuman();
        this.listPengumuman = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listDosenPengumuman() {
      try {
        const { data, status } = await s$pengumuman.listDosenPengumuman();
        this.listPengumuman = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listBappedaPengumuman() {
      try {
        const { data, status } = await s$pengumuman.listBappedaPengumuman();
        this.listPengumuman = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$getPengumuman(id_pengumuman) {
      try {
        const { data, status } = await s$pengumuman.getPengumuman(
          id_pengumuman
        );
        this.pengumuman = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$addPengumuman(body) {
      try {
        const { data, status } = await s$pengumuman.addPengumuman(body);
        this.pengumuman = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$editPengumuman(id_pengumuman, body) {
      try {
        const { data, status } = await s$pengumuman.editPengumuman(
          id_pengumuman,
          body
        );
        this.pengumuman = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$deletePengumuman(id_pengumuman) {
      try {
        const { data, status } = await s$pengumuman.deletePengumuman(
          id_pengumuman
        );
        this.pengumuman = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },
  },
  getters: {
    g$listPengumuman: ({ listPengumuman }) => listPengumuman,
    g$pengumuman: ({ pengumuman }) => pengumuman,
  },
});

export default d$pengumuman;
