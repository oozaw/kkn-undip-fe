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
        const { id, username, role } = certCookies();
        this.id = id;
        this.username = username;
        this.role = role;
        return "User Authenticated!";
      } catch ({ message, error }) {
        this.id = undefined;
        this.username = undefined;
        this.role = undefined;
        throw message ?? error;
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

    async a$getUser() {
      try {
        const { data } = await s$auth.getUser();
        this.infoUser = data ?? {
          nama: this.username,
        };
        return true;
      } catch (error) {
        this.infoUser = undefined;
        throw error;
      }
    },

    async a$logout() {
      try {
        delCookies("CERT");
        return true;
      } catch ({ message, error }) {
        throw message ?? error;
      }
    },

    a$checkAuth(allowedRoles) {
      return allowedRoles.includes(this.role);
    },
  },
  getters: {
    g$user: ({ id, username, role }) => ({ id, username, role }),
    g$infoUser: ({ infoUser }) => infoUser,
  },
  persist: true,
});

export default d$auth;
