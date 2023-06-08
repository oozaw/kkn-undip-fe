import { baseApi } from "@/utils/axios";

const api = `/`;

const listReportase = () => baseApi.get(`${api}mahasiswa/reportase`);

const addReportase = (body) => baseApi.post(`${api}mahasiswa/reportase`, body);

export { addReportase, listReportase };
