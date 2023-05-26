import { baseApi } from "@/utils/axios";

const api = `/`;

const getDokumen = (id_dokumen) => baseApi.get(`${api}dokumen/${id_dokumen}`);

export { getDokumen };
