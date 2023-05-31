import { baseApi } from "@/utils/axios";

const api = `/`;

const addReportase = (body) => baseApi.post(`${api}mahasiswa/reportase`, body);

export { addReportase };
