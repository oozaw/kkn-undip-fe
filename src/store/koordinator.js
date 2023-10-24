import { defineStore } from "pinia";
import * as s$koordinator from "@/service/koordinator";

const d$koordinator = defineStore("koordinatorStore", {
  id: "koordinator",
  state: () => ({
    listKoordinator: [],
    koordinator: null,
    status: null,
  }),
  actions: {
    async a$listKoordinator() {
      try {
        const { data, status } = await s$koordinator.listKoordinator();
        this.listKoordinator = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$getKoordinator(id_koordinator) {
      try {
        const { data, status } = await s$koordinator.getKoordinator(
          id_koordinator
        );
        this.koordinator = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$addKoordinator(body) {
      try {
        const status = await s$koordinator.addKoordinator(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$editKoordinator(id_koordinator, body) {
      try {
        const status = await s$koordinator.editKoordinator(
          id_koordinator,
          body
        );
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$deleteKoordinator(id_koordinator) {
      try {
        const status = await s$koordinator.deleteKoordinator(id_koordinator);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listKoordinator: ({ listKoordinator }) => listKoordinator,
    g$koordinator: ({ koordinator }) => koordinator,
  },
});

export default d$koordinator;
