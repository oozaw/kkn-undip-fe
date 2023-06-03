import { defineStore } from "pinia";
import * as s$gelombang from "@/service/gelombang";

const d$gelombang = defineStore("gelombangStore", {
  id: "gelombang",
  state: () => ({
    status: null,
    listGelombang: [],
    listGelombangActive: [],
  }),
  actions: {
    async a$listAllGelombang() {
      try {
        const { data, status } = await s$gelombang.listAllGelombang();
        this.listGelombang = data ?? [];
        this.listGelombangActive = [];
        data.forEach((gelombang) => {
          if (gelombang.status) {
            this.listGelombangActive.push(gelombang);
          }
        });
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$listGelombang(id_tema, id_halaman) {
      try {
        const { data, status } = await s$gelombang.listGelombang(
          id_tema,
          id_halaman
        );
        this.listGelombang = data ?? [];
        data.forEach((gelombang) => {
          if (gelombang.status) {
            this.listGelombangActive.push(gelombang);
          }
        });
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$listGelombangDosen(id_tema, id_halaman, id_dosen) {
      try {
        const { data, status } = await s$gelombang.listGelombangDosen(
          id_tema,
          id_halaman,
          id_dosen
        );
        this.listGelombang = data ?? [];
        data.forEach((gelombang) => {
          if (gelombang.status) {
            this.listGelombangActive.push(gelombang);
          }
        });
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$listGelombangMahasiswa(id_tema, id_halaman, id_mahasiswa) {
      try {
        const { data, status } = await s$gelombang.listGelombangMahasiswa(
          id_tema,
          id_halaman,
          id_mahasiswa
        );
        this.listGelombang = data ?? [];
        data.forEach((gelombang) => {
          if (gelombang.status) {
            this.listGelombangActive.push(gelombang);
          }
        });
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$addGelombang(body) {
      try {
        const status = await s$gelombang.addGelombang(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$switchGelombang(id_gelombang) {
      try {
        const status = await s$gelombang.switchGelombang(id_gelombang);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listGelombang: ({ listGelombang }) => listGelombang,
    g$listGelombangActive: ({ listGelombangActive }) => listGelombangActive,
  },
});

export default d$gelombang;
