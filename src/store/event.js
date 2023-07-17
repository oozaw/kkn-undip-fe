import { defineStore } from "pinia";
import * as s$event from "@/service/event";

const d$event = defineStore("eventStore", {
  id: "event",
  state: () => ({
    listEvent: [],
    event: null,
    status: null,
  }),
  actions: {
    async a$listAllEvent() {
      try {
        const { data, status } = await s$event.listAllEvent();
        this.listEvent = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listMahasiswaEvent() {
      try {
        const { data, status } = await s$event.listMahasiswaEvent();
        this.listEvent = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listDosenEvent() {
      try {
        const { data, status } = await s$event.listDosenEvent();
        this.listEvent = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$listBappedaEvent() {
      try {
        const { data, status } = await s$event.listBappedaEvent();
        this.listEvent = data ?? [];
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$getEvent(id_event) {
      try {
        const { data, status } = await s$event.getEvent(id_event);
        this.event = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$addEvent(body) {
      try {
        const { data, status } = await s$event.addEvent(body);
        this.event = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$editEvent(id_event, body) {
      try {
        const { data, status } = await s$event.editEvent(id_event, body);
        this.event = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },

    async a$deleteEvent(id_event) {
      try {
        const { data, status } = await s$event.deleteEvent(id_event);
        this.event = data ?? null;
        this.status = status;
      } catch ({ message, error }) {
        this.status = false;
        throw message ?? error;
      }
    },
  },
  getters: {
    g$listEvent: ({ listEvent }) => listEvent,
    g$event: ({ event }) => event,
  },
});

export default d$event;
