import { defineStore } from "pinia";
import * as s$reportase from "@/service/reportase";

const d$reportase = defineStore("reportaseStore", {
  id: "reportase",
  state: () => ({
    listReportase: [],
    reportase: {},
    status: null,
  }),
  actions: {
    async a$listReportase() {
      try {
        const { data, status } = await s$reportase.listReportase();
        this.listReportase = data;
        this.status = status;
      } catch (error) {
        this.listReportase = [];
        this.status = false;
        throw error;
      }
    },

    async a$getReportase(id_reportase) {
      try {
        const { data, status } = await s$reportase.getReportase(id_reportase);
        this.reportase = data ?? {};
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$addReportase(body) {
      try {
        const status = await s$reportase.addReportase(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listReportase: ({ listReportase }) => listReportase,
    g$reportase: ({ reportase }) => reportase,
  },
});

export default d$reportase;
