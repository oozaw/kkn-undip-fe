import { defineStore } from "pinia";
import * as s$kategori from "@/service/kategori";

const d$kategori = defineStore("kategoriStore", {
  id: "kategori",
  state: () => ({
    status: null,
    listKategori: [],
    kategori: null,
  }),
  actions: {
    async a$listKategori() {
      try {
        const { data, status } = await s$kategori.listKategori();
        this.listKategori = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$getKategori(id_kategori) {
      try {
        const { data, status } = await s$kategori.getKategori(id_kategori);
        this.kategori = data ?? null;
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$addKategori(body) {
      try {
        const status = await s$kategori.addKategori(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$editKategori(id_kategori, body) {
      try {
        const status = await s$kategori.editKategori(id_kategori, body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$deleteKategori(id_kategori) {
      try {
        const status = await s$kategori.deleteKategori(id_kategori);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$kategori: ({ kategori }) => kategori,
    g$listKategori: ({ listKategori }) => listKategori,
  },
});

export default d$kategori;
