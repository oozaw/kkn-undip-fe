import { defineStore } from "pinia";
import * as s$qr from "@/service/qr";

const d$qr = defineStore("qrStore", {
  id: "qr",
  state: () => ({
    qr: null,
    status: null,
  }),
  actions: {
    async a$generateQR(url) {
      try {
        const { data, status } = await s$qr.generateQR(url);
        this.qr = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },
  },
  getters: {
    g$qr: ({ qr }) => qr,
  },
});

export default d$qr;
