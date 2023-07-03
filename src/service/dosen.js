import { baseApi } from "@/utils/axios";

const api = `/`;

const listDosen = () => baseApi.get(`${api}dosen`);

const addDosen = (body) => baseApi.post(`${api}admin/dosen/single`, body);

const importDosen = (body) =>
  baseApi.post(`${api}admin/dosen`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const deleteDosen = (id_dosen) =>
  baseApi.delete(`${api}admin/dosen/${id_dosen}`);

export { listDosen, addDosen, importDosen, deleteDosen };
