import { defineStore } from "pinia";
import * as s$berita from "@/service/berita";

const d$berita = defineStore("beritaStore", {
  id: "berita",
  state: () => ({
    listBerita: [],
    berita: null,
    thumbnail: null,
    status: null,
  }),
  actions: {
    async a$listBerita() {
      try {
        const { data, status } = await s$berita.listBerita();
        this.listBerita = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$getBerita(id_berita) {
      try {
        const { data, status } = await s$berita.getBerita(id_berita);
        this.berita = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$getThumbnail(id_berita) {
      try {
        const data = await s$berita.getThumbnail(id_berita);
        this.thumbnail = data ?? null;
        this.status = true;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$addBerita(body) {
      try {
        const status = await s$berita.addBerita(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$editBerita(id_berita, body) {
      try {
        const status = await s$berita.editBerita(id_berita, body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$deleteBerita(id_berita) {
      try {
        const status = await s$berita.deleteBerita(id_berita);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listBerita: ({ listBerita }) => listBerita,
    g$berita: ({ berita }) => berita,
    g$thumbnail: ({ thumbnail }) => thumbnail,
  },
});

export default d$berita;
