import { baseApi } from "@/utils/axios";

const api = `/`;

const listReportase = () => baseApi.get(`${api}mahasiswa/reportase`);

const listReportaseKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}reportase/kecamatan/${id_kecamatan}`);

const getReportase = (id_reportase) =>
  baseApi.get(`${api}reportase/${id_reportase}`);

const addReportase = (body) => baseApi.post(`${api}mahasiswa/reportase`, body);

const editReportase = (id_reportase, body) =>
  baseApi.put(`${api}mahasiswa/reportase/${id_reportase}`, body);

const evalReportase = (body) => baseApi.put(`${api}dosen/reportase`, body);

const deleteReportase = (id_reportase) =>
  baseApi.delete(`${api}reportase/${id_reportase}`);

export {
  listReportase,
  listReportaseKecamatan,
  addReportase,
  getReportase,
  editReportase,
  evalReportase,
  deleteReportase,
};
