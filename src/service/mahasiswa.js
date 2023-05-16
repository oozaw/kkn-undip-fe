import { baseApi } from "@/utils/axios";

const api = `/`;

const listMahasiswa = (periode, prodi) =>
  baseApi.get(`${api}mahasiswa/${periode}/${prodi}`);

const addMahasiswa = (body) =>
  baseApi.post(`${api}admin/mahasiswa/single`, body);

export { listMahasiswa, addMahasiswa };
