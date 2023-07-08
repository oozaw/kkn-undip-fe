import { baseApi } from "@/utils/axios";

const api = `/`;

const listBappeda = () => baseApi.get(`${api}bappeda`);

const getBappeda = (id_bappeda) => baseApi.get(`${api}bappeda/${id_bappeda}`);

const addBappeda = (body) => baseApi.post(`${api}admin/bappeda/single`, body);

const importBappeda = (body) =>
  baseApi.post(`${api}admin/bappeda`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const editBappeda = (id_bappeda, body) =>
  baseApi.put(`${api}admin/bappeda/${id_bappeda}`, body);

const deleteBappeda = (id_bappeda) =>
  baseApi.delete(`${api}admin/bappeda/${id_bappeda}`);

export {
  listBappeda,
  getBappeda,
  addBappeda,
  importBappeda,
  editBappeda,
  deleteBappeda,
};
