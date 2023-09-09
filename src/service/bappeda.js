import { baseApi } from "@/utils/axios";

const api = `/`;

const listBappeda = () => baseApi.get(`${api}bappeda`);

const listBappedaTema = (id_tema) =>
  baseApi.get(`${api}bappeda/tema/${id_tema}`);

const getBappeda = (id_bappeda) =>
  baseApi.get(`${api}bappeda/detail/${id_bappeda}`);

const listKabupatenBappeda = () => baseApi.get(`${api}kabupaten/bappeda`);

const addBappeda = (body) => baseApi.post(`${api}bappeda`, body);

const importBappeda = (body) =>
  baseApi.post(`${api}bappeda/import`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const editBappeda = (id_bappeda, body) =>
  baseApi.put(`${api}bappeda/${id_bappeda}`, body);

const deleteBappeda = (id_bappeda) =>
  baseApi.delete(`${api}bappeda/${id_bappeda}`);

export {
  listBappeda,
  listBappedaTema,
  getBappeda,
  addBappeda,
  listKabupatenBappeda,
  importBappeda,
  editBappeda,
  deleteBappeda,
};
