import { baseApi } from "@/utils/axios";

const api = `/`;

const listMahasiswa = (periode, prodi) =>
  baseApi.get(`${api}mahasiswa/${periode}/${prodi}`);

const addMahasiswa = (body) =>
  baseApi.post(`${api}admin/mahasiswa/single`, body);

const importMahasiswa = (body) =>
  baseApi.post(`${api}admin/mahasiswa`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export { listMahasiswa, addMahasiswa, importMahasiswa };
