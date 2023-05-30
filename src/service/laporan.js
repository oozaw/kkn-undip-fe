import { baseApi } from "@/utils/axios";

const api = `/`;

const listLRK = () => baseApi.get(`${api}mahasiswa/lrk`);

const addLRK = (body) => baseApi.post(`${api}mahasiswa/lrk`, body);

export { listLRK, addLRK };
