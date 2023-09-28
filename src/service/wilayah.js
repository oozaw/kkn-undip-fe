import { baseApi } from "@/utils/axios";

const api = `/`;

const listWilayahTemaBappeda = (id_tema, id_bappeda) =>
  baseApi.get(`${api}kabupaten/bappeda/tema/${id_tema}/${id_bappeda}`);

const listWilayah = (id_tema) => baseApi.get(`${api}kabupaten/tema/${id_tema}`);

const listAllKecamatan = () => baseApi.get(`${api}kecamatan`);

const getKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}kecamatan/detail/${id_kecamatan}`);

const getKecamatanMhs = () => baseApi.get(`${api}kecamatan/mahasiswa`);

const addKabupaten = (body) => baseApi.post(`${api}kabupaten`, body);

const addKecamatan = (body) => baseApi.post(`${api}kecamatan`, body);

const editKecamatan = (id_kecamatan, body) =>
  baseApi.put(`${api}kecamatan/${id_kecamatan}`, body);

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
  getKecamatan,
  getKecamatanMhs,
  addKabupaten,
  addKecamatan,
  editKecamatan,
  accKecamatan,
  decKecamatan,
  deleteKecamatan,
};
