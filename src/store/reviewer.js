import { defineStore } from "pinia";
import * as s$reviewer from "@/service/reviewer";

const d$reviewer = defineStore("reviewerStore", {
  id: "reviewer",
  state: () => ({
    listReviewer: [],
    reviewer: null,
    status: null,
  }),
  actions: {
    async a$listReviewer() {
      try {
        const { data, status } = await s$reviewer.listReviewer();
        this.listReviewer = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$getReviewer(id_reviewer) {
      try {
        const { data, status } = await s$reviewer.getReviewer(id_reviewer);
        this.reviewer = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$addReviewer(body) {
      try {
        const status = await s$reviewer.addReviewer(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$importReviewer(body) {
      try {
        const status = await s$reviewer.importReviewer(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$editReviewer(id_reviewer, body) {
      try {
        const status = await s$reviewer.editReviewer(id_reviewer, body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$deleteReviewer(id_reviewer) {
      try {
        const status = await s$reviewer.deleteReviewer(id_reviewer);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listReviewer: ({ listReviewer }) => listReviewer,
    g$reviewer: ({ reviewer }) => reviewer,
  },
});

export default d$reviewer;
