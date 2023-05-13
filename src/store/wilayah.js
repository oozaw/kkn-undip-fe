import { defineStore } from "pinia";
import * as s$wilayah from "@/service/wilayah";

const d$wilayah = defineStore("wilayahStore", {
  id: "wilayah",
  state: () => ({
    listKabupaten: [],
    listKecamatan: [],
    listDesa: [],
    status: null,
  }),
  actions: {
    async a$listKabupaten() {
      try {
        const { data, status } = await s$wilayah.listKabupaten();
        this.listKabupaten = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$listKecamatan(body) {
      try {
        const { data, status } = await s$wilayah.listKecamatan(body);
        this.listKecamatan = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$addKecamatan(body) {
      try {
        const status = await s$wilayah.addKecamatan(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listKabupaten: ({ listKabupaten }) => listKabupaten,
    g$listKecamatan: ({ listKecamatan }) => listKecamatan,
  },
});

export default d$wilayah;
