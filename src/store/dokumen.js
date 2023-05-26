import { defineStore } from "pinia";
import * as s$dokumen from "@/service/dokumen";

const d$dokumen = defineStore("dokumenStore", {
  id: "dokumen",
  state: () => ({
    listDokumen: [],
    dokumenLink: "",
    status: null,
  }),
  actions: {
    async a$getDokumenLink(id_dokumen) {
      try {
        const { data, status } = await s$dokumen.getDokumen(id_dokumen);
        this.dokumenLink = data;
        this.status = status;
        return this.dokumenLink;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },
  },
  getters: {
    g$listAdmin: ({ listAdmin }) => listAdmin,
    g$dokumenLink: ({ dokumenLink }) => dokumenLink,
  },
});

export default d$dokumen;
