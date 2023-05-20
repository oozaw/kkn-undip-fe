import { defineStore } from "pinia";
import * as s$wilayah from "@/service/wilayah";

const d$wilayah = defineStore("wilayahStore", {
  id: "wilayah",
  state: () => ({
    listKabupaten: [],
    listKecamatan: [],
    listDesa: [],
    status: null,
  }),
  actions: {
    async a$listKabupaten(id_tema, id_bappeda) {
      try {
        const { data, status } = await s$wilayah.listWilayah(
          id_tema,
          id_bappeda
        );
        this.listKabupaten = data ?? [];
        if (data.length > 0) this.listKecamatan = data[0].kecamatan ?? [];
        else this.listKecamatan = [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$listAllKabupaten(id_tema) {
      try {
        const { data, status } = await s$wilayah.listAllWilayah(id_tema);
        var dataKecamatan = [];
        data.forEach((kab) => {
          var namaKabupatenObject = {
            nama_kabupaten: kab.nama,
          };
          kab.kecamatan.forEach((kec) => {
            var newKecamatanWithKabupaten = Object.assign(
              {},
              kec,
              namaKabupatenObject
            );
            dataKecamatan.push(newKecamatanWithKabupaten);
          });
        });
        this.listKecamatan = dataKecamatan;
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$addKecamatan(body) {
      try {
        const status = await s$wilayah.addKecamatan(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$listKabupaten: ({ listKabupaten }) => listKabupaten,
    g$listKecamatan: ({ listKecamatan }) => listKecamatan,
    g$listDesa: ({ listDesa }) => listDesa,
  },
});

export default d$wilayah;
