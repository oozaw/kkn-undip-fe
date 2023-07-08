import { baseApi } from "@/utils/axios";

const api = `/`;

const listDosen = () => baseApi.get(`${api}dosen`);

const getDosen = (id_dosen) => baseApi.get(`${api}dosen/${id_dosen}`);

const addDosen = (body) => baseApi.post(`${api}admin/dosen/single`, body);

const importDosen = (body) =>
  baseApi.post(`${api}admin/dosen`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const editDosen = (id_dosen, body) =>
  baseApi.put(`${api}admin/dosen/${id_dosen}`, body);

const deleteDosen = (id_dosen) =>
  baseApi.delete(`${api}admin/dosen/${id_dosen}`);

export { listDosen, getDosen, addDosen, importDosen, editDosen, deleteDosen };
