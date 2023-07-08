import { baseApi } from "@/utils/axios";

const api = `/`;

const listPimpinan = () => baseApi.get(`${api}pimpinan`);

const getPimpinan = (id_pimpinan) =>
  baseApi.get(`${api}pimpinan/${id_pimpinan}`);

const addPimpinan = (body) => baseApi.post(`${api}admin/pimpinan/single`, body);

const importPimpinan = (body) =>
  baseApi.post(`${api}admin/pimpinan`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const editPimpinan = (id_pimpinan, body) =>
  baseApi.put(`${api}admin/pimpinan/${id_pimpinan}`, body);

const deletePimpinan = (id_pimpinan) =>
  baseApi.delete(`${api}admin/pimpinan/${id_pimpinan}`);

export {
  listPimpinan,
  getPimpinan,
  addPimpinan,
  importPimpinan,
  editPimpinan,
  deletePimpinan,
};
