import { baseApi } from "@/utils/axios";

const api = `/`;

const listKorwil = () => baseApi.get(`${api}korwil`);

const addKorwil = (body) => baseApi.post(`${api}admin/korwil/single`, body);

const deleteKorwil = (id_korwil) =>
  baseApi.delete(`${api}admin/korwil/${id_korwil}`);

export { listKorwil, addKorwil, deleteKorwil };
