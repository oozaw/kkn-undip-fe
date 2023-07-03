import { defineStore } from "pinia";
import * as s$korwil from "@/service/korwil";

const d$korwil = defineStore("korwilStore", {
  id: "korwil",
  state: () => ({
    status: null,
    listKorwil: [],
  }),
  actions: {
    async a$listKorwil() {
      try {
        const { data, status } = await s$korwil.listKorwil();
        this.listKorwil = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$addKorwil(body) {
      try {
        const { status } = await s$korwil.addKorwil(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$importKorwil(body) {
      try {
        const status = await s$korwil.importKorwil(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$deleteKorwil(id_korwil) {
      try {
        const { status } = await s$korwil.deleteKorwil(id_korwil);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listKorwil: ({ listKorwil }) => listKorwil,
  },
});

export default d$korwil;
