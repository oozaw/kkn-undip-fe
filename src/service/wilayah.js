import { baseApi } from "@/utils/axios";

const api = `/`;

const listWilayahTemaBappeda = (id_tema, id_bappeda) =>
  baseApi.get(`${api}kabupaten/bappeda/tema/${id_tema}/${id_bappeda}`);

const listWilayah = (id_tema) => baseApi.get(`${api}kabupaten/tema/${id_tema}`);

const listAllKecamatan = () => baseApi.get(`${api}kecamatan`);

const listKecamatanKabupaten = (id_kabupaten) =>
  baseApi.get(`${api}kecamatan/kabupaten/${id_kabupaten}`);

const listAllDesa = () => baseApi.get(`${api}desa`);

const listDesaKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}desa/kecamatan/${id_kecamatan}`);

const getKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}kecamatan/detail/${id_kecamatan}`);

const getKecamatanMhs = () => baseApi.get(`${api}kecamatan/mahasiswa`);

const getDesa = (id_desa) => baseApi.get(`${api}desa/detail/${id_desa}`);

const addKabupaten = (body) => baseApi.post(`${api}kabupaten`, body);

const addKecamatan = (body) => baseApi.post(`${api}kecamatan`, body);

const addDesa = (body) => baseApi.post(`${api}desa`, body);

const editKecamatan = (id_kecamatan, body) =>
  baseApi.put(`${api}kecamatan/${id_kecamatan}`, body);

const editDesa = (id_desa, body) => baseApi.put(`${api}desa/${id_desa}`, body);

const accKecamatan = (id_kecamatan, body) =>
  baseApi.put(`${api}kecamatan/acc/${id_kecamatan}`, body);

const decKecamatan = (id_kecamatan) =>
  baseApi.put(`${api}kecamatan/dec/${id_kecamatan}`);

const deleteKecamatan = (id_kecamatan) =>
  baseApi.delete(`${api}kecamatan/${id_kecamatan}`);

const deleteDesa = (id_desa) => baseApi.delete(`${api}desa/${id_desa}`);

export {
  listWilayah,
  listWilayahTemaBappeda,
  listAllKecamatan,
  listKecamatanKabupaten,
  listAllDesa,
  listDesaKecamatan,
  getKecamatan,
  getKecamatanMhs,
  getDesa,
  addKabupaten,
  addKecamatan,
  addDesa,
  editKecamatan,
  editDesa,
  accKecamatan,
  decKecamatan,
  deleteKecamatan,
  deleteDesa,
};
