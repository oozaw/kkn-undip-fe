import { baseApi } from "@/utils/axios";

const api = `/`;

const listKorwil = () => baseApi.get(`${api}korwil`);

const addKorwil = (body) => baseApi.post(`${api}admin/korwil/single`, body);

const importKorwil = (body) =>
  baseApi.post(`${api}admin/korwil`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const deleteKorwil = (id_korwil) =>
  baseApi.delete(`${api}admin/korwil/${id_korwil}`);

export { listKorwil, addKorwil, importKorwil, deleteKorwil };
