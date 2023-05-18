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
    async a$listKabupaten(id_tema, id_bappeda) {
      try {
        const { data, status } = await s$wilayah.listKabupaten(
          id_tema,
          id_bappeda
        );
        this.listKabupaten = data ?? [];
        if (data.length > 0) this.listKecamatan = data[0].kecamatan ?? [];
        else this.listKecamatan = [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$listAllKabupaten(id_tema) {
      try {
        const { data, status } = await s$wilayah.listAllKabupaten(id_tema);
        this.listKabupaten = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$listKecamatan(id_kabupaten) {
      try {
        const { data, status } = await s$wilayah.listKecamatan(id_kabupaten);
        this.listKecamatan = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$listAllKecamatan(id_tema) {
      try {
        const { data, status } = await s$wilayah.listAllKecamatan(id_tema);
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
    g$listDesa: ({ listDesa }) => listDesa,
  },
});

export default d$wilayah;
