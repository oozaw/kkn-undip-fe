import { baseApi } from "@/utils/axios";

const api = `/`;

const listKorwil = () => baseApi.get(`${api}korwil`);

const addKorwil = (body) => baseApi.post(`${api}admin/korwil/single`, body);

export { listKorwil, addKorwil };
