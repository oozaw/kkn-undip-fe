import { baseApi } from "@/utils/axios";

const api = `/`;

const listBappeda = () => baseApi.get(`${api}bappeda`);

const addBappeda = (body) => baseApi.post(`${api}admin/bappeda/single`, body);

const importBappeda = (body) =>
  baseApi.post(`${api}admin/bappeda`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const deleteBappeda = (id_bappeda) =>
  baseApi.delete(`${api}admin/bappeda/${id_bappeda}`);

export { listBappeda, addBappeda, importBappeda, deleteBappeda };
