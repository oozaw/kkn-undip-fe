import { defineStore } from "pinia";
import * as s$export from "@/service/export";

const d$export = defineStore("exportStore", {
  id: "export",
  state: () => ({
    exports: null,
    status: null,
  }),
  actions: {
    async a$excelPendaftaranMhsKecamatan(id_kecamatan) {
      try {
        const data = await s$export.excelPendaftaranMhsKecamatan(id_kecamatan);
        this.exports = data ?? null;
        this.status = true;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },
  },
  getters: {
    g$exportData: ({ exports }) => exports,
  },
});

export default d$export;
