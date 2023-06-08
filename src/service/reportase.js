import { baseApi } from "@/utils/axios";

const api = `/`;

const listReportase = () => baseApi.get(`${api}mahasiswa/reportase`);

const getReportase = (id_reportase) =>
  baseApi.get(`${api}reportase/${id_reportase}`);

const addReportase = (body) => baseApi.post(`${api}mahasiswa/reportase`, body);

export { addReportase, listReportase, getReportase };
