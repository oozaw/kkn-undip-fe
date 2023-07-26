import { baseApi } from "@/utils/axios";

const api = `/`;

const listReportase = () => baseApi.get(`${api}reportase/mahasiswa`);

const listReportaseKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}reportase/kecamatan/${id_kecamatan}`);

const getReportase = (id_reportase) =>
  baseApi.get(`${api}reportase/detail/${id_reportase}`);

const addReportase = (body) => baseApi.post(`${api}reportase`, body);

const editReportase = (id_reportase, body) =>
  baseApi.put(`${api}reportase/${id_reportase}`, body);

const evalReportase = (body) => baseApi.put(`${api}reportase/evaluate`, body);

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
