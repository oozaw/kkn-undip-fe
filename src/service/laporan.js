import { baseApi } from "@/utils/axios";

const api = `/`;

const listLaporan = () => baseApi.get(`${api}laporan`);

const listLaporanKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}laporan/kecamatan/${id_kecamatan}`);

const evaluateLaporan = (body) => baseApi.put(`${api}laporan/evaluate`, body);

const listLRK = () => baseApi.get(`${api}laporan/lrk`);

const addLRK = (body) => baseApi.post(`${api}laporan/lrk`, body);

const editLRK = (body) => baseApi.put(`${api}laporan/lrk`, body);

const listLPK = () => baseApi.get(`${api}laporan/lpk`);

const getLaporan = (id_laporan) =>
  baseApi.get(`${api}laporan/detail/${id_laporan}`);

const addLPK = (body) => baseApi.post(`${api}laporan/lpk`, body);

const deleteLaporan = (id_laporan) =>
  baseApi.delete(`${api}laporan/${id_laporan}`);

export {
  listLaporan,
  listLaporanKecamatan,
  evaluateLaporan,
  listLRK,
  addLRK,
  editLRK,
  listLPK,
  getLaporan,
  addLPK,
  deleteLaporan,
};
