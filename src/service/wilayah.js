import { baseApi } from "@/utils/axios";

const api = `/`;

const listWilayahTemaBappeda = (id_tema, id_bappeda) =>
  baseApi.get(`${api}wilayah/${id_tema}/${id_bappeda}`);

const listWilayah = (id_tema) => baseApi.get(`${api}wilayah/${id_tema}`);

const listAllKecamatan = () => baseApi.get(`${api}wilayah`);

const getKecamatanMhs = () => baseApi.get(`${api}mahasiswa/kecamatan`);

const addKabupaten = (body) => baseApi.post(`${api}bappeda/kabupaten`, body);

const addKecamatan = (body) => baseApi.post(`${api}bappeda/kecamatan`, body);

const accKecamatan = (id_kecamatan, body) =>
  baseApi.put(`${api}admin/kecamatan/acc/${id_kecamatan}`, body);

const decKecamatan = (id_kecamatan) =>
  baseApi.put(`${api}admin/kecamatan/dec/${id_kecamatan}`);

const deleteKecamatan = (id_kecamatan) =>
  baseApi.delete(`${api}admin/kecamatan/${id_kecamatan}`);

export {
  listWilayah,
  listWilayahTemaBappeda,
  listAllKecamatan,
  getKecamatanMhs,
  addKabupaten,
  addKecamatan,
  accKecamatan,
  decKecamatan,
  deleteKecamatan,
};
