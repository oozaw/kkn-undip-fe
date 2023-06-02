import { baseApi } from "@/utils/axios";

const api = `/`;

const listLaporan = () => baseApi.get(`${api}laporan`);

const listLaporanKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}laporan/kecamatan/${id_kecamatan}`);

const listLRK = () => baseApi.get(`${api}mahasiswa/lrk`);

const addLRK = (body) => baseApi.post(`${api}mahasiswa/lrk`, body);

const editLRK = (body) => baseApi.put(`${api}mahasiswa/lrk/edit`, body);

const listLPK = () => baseApi.get(`${api}mahasiswa/lpk`);

const getLaporan = (id_laporan) => baseApi.get(`${api}laporan/${id_laporan}`);

const addLPK = (body) => baseApi.post(`${api}mahasiswa/lpk`, body);

export {
  listLaporan,
  listLaporanKecamatan,
  listLRK,
  addLRK,
  editLRK,
  listLPK,
  getLaporan,
  addLPK,
};
