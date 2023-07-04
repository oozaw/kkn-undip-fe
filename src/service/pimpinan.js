import { baseApi } from "@/utils/axios";

const api = `/`;

const listPimpinan = () => baseApi.get(`${api}pimpinan`);

const addPimpinan = (body) => baseApi.post(`${api}admin/pimpinan/single`, body);

const importPimpinan = (body) =>
  baseApi.post(`${api}admin/pimpinan`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const deletePimpinan = (id_pimpinan) =>
  baseApi.delete(`${api}admin/pimpinan/${id_pimpinan}`);

export { listPimpinan, addPimpinan, importPimpinan, deletePimpinan };
