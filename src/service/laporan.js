import { baseApi } from "@/utils/axios";

const api = `/`;

const addLRK = (body) => baseApi.post(`${api}mahasiswa/lrk`, body);

export { addLRK };
