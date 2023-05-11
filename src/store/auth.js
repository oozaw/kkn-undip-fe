import { defineStore } from "pinia";
import * as s$auth from "@/service/auth";
import { delCookies, setCookies, certCookies } from "@/utils/cookies";

import { parseISO } from "date-fns";

const d$auth = defineStore("authStore", {
  id: "auth",
  state: () => ({
    id: undefined,
    name: undefined,
    role: undefined,
  }),
  actions: {
    async a$setUser() {
      try {
        const { id, name, role } = certCookies();
        this.id = id;
        this.name = name;
        this.role = role;
        return "User Authenticated!";
      } catch ({ message }) {
        this.id = undefined;
        this.name = undefined;
        this.role = undefined;
        throw message;
      }
    },

    async a$login(body) {
      try {
        const { data } = await s$auth.login(body);
        setCookies("CERT", data.token, { datetime: parseISO(data.expiresAt) });
        this.a$setUser();
        return true;
      } catch ({ error, message }) {
        throw message ?? error;
      }
    },

    async a$logout() {
      try {
        delCookies("CERT");
        return true;
      } catch ({ message }) {
        throw message;
      }
    },
  },
  getters: {
    g$user: ({ id, name, role }) => ({ id, name, role }),
  },
});

export default d$auth;
