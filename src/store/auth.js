import { defineStore } from "pinia";
import * as s$auth from "@/service/auth";
import { delCookies, setCookies, certCookies } from "@/utils/cookies";

import { parseISO } from "date-fns";

const d$auth = defineStore("authStore", {
  id: "auth",
  state: () => ({
    id: undefined,
    username: undefined,
    role: undefined,
    infoUser: undefined,
  }),
  actions: {
    async a$setUser() {
      try {
        const { id, username, role, info } = certCookies();
        this.id = id;
        this.username = username;
        this.role = role;
        this.infoUser = info;
        return "User Authenticated!";
      } catch ({ message }) {
        this.id = undefined;
        this.username = undefined;
        this.role = undefined;
        this.infoUser = undefined;
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
    g$user: ({ id, username, role }) => ({ id, username, role }),
    g$infoUser: ({ infoUser }) => infoUser,
  },
});

export default d$auth;
