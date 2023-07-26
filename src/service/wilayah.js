import { baseApi } from "@/utils/axios";

const api = `/`;

const listWilayahTemaBappeda = (id_tema, id_bappeda) =>
  baseApi.get(`${api}wilayah/${id_tema}/${id_bappeda}`);

const listWilayah = (id_tema) => baseApi.get(`${api}wilayah/${id_tema}`);

const listAllKecamatan = () => baseApi.get(`${api}kecamatan`);

const getKecamatanMhs = () => baseApi.get(`${api}kecamatan/mahasiswa`);

const addKabupaten = (body) => baseApi.post(`${api}bappeda/kabupaten`, body);

const addKecamatan = (body) => baseApi.post(`${api}kecamatan`, body);

const accKecamatan = (id_kecamatan, body) =>
  baseApi.put(`${api}kecamatan/acc/${id_kecamatan}`, body);

const decKecamatan = (id_kecamatan) =>
  baseApi.put(`${api}kecamatan/dec/${id_kecamatan}`);

const deleteKecamatan = (id_kecamatan) =>
  baseApi.delete(`${api}kecamatan/${id_kecamatan}`);

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
