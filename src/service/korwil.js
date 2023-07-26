import { baseApi } from "@/utils/axios";

const api = `/`;

const listKorwil = () => baseApi.get(`${api}korwil`);

const getKorwil = (id_korwil) =>
  baseApi.get(`${api}korwil/detail/${id_korwil}`);

const addKorwil = (body) => baseApi.post(`${api}korwil`, body);

const importKorwil = (body) =>
  baseApi.post(`${api}korwil/import`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const editKorwil = (id_korwil, body) =>
  baseApi.put(`${api}korwil/${id_korwil}`, body);

const deleteKorwil = (id_korwil) => baseApi.delete(`${api}korwil/${id_korwil}`);

export {
  listKorwil,
  getKorwil,
  addKorwil,
  importKorwil,
  editKorwil,
  deleteKorwil,
};
