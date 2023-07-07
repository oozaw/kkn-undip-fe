import { defineStore } from "pinia";
import * as s$halaman from "@/service/halaman";

const d$halaman = defineStore("halamanStore", {
  id: "halaman",
  state: () => ({
    status: null,
    statusHalaman: null,
    halaman: null,
    listHalaman: [],
  }),
  actions: {
    async a$listHalaman(id_tema) {
      try {
        const { data, status } = await s$halaman.listHalaman(id_tema);
        this.listHalaman = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$getHalaman(id_tema_halaman) {
      try {
        const { data, status } = await s$halaman.getHalaman(id_tema_halaman);
        this.halaman = data ?? null;
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$addHalaman(body) {
      try {
        const status = await s$halaman.addHalaman(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$editHalaman(id_tema_halaman, body) {
      try {
        const status = await s$halaman.editHalaman(id_tema_halaman, body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$switchHalaman(id_halaman) {
      try {
        const status = await s$halaman.switchHalaman(id_halaman);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$checkHalaman(id_tema, id_halaman) {
      try {
        const { data, status } = await s$halaman.checkHalaman(
          id_tema,
          id_halaman
        );
        this.statusHalaman = data?.status ?? null;
        this.status = status;
        return data;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$statusHalaman: ({ statusHalaman }) => statusHalaman,
    g$halaman: ({ halaman }) => halaman,
    g$listHalaman: ({ listHalaman }) => listHalaman,
  },
});

export default d$halaman;
