import { baseApi } from "@/utils/axios";

const api = `/`;

const listPimpinan = () => baseApi.get(`${api}pimpinan`);

const getPimpinan = (id_pimpinan) =>
  baseApi.get(`${api}pimpinan/detail/${id_pimpinan}`);

const addPimpinan = (body) => baseApi.post(`${api}pimpinan`, body);

const importPimpinan = (body) =>
  baseApi.post(`${api}pimpinan/import`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const editPimpinan = (id_pimpinan, body) =>
  baseApi.put(`${api}pimpinan/${id_pimpinan}`, body);

const deletePimpinan = (id_pimpinan) =>
  baseApi.delete(`${api}pimpinan/${id_pimpinan}`);

export {
  listPimpinan,
  getPimpinan,
  addPimpinan,
  importPimpinan,
  editPimpinan,
  deletePimpinan,
};
