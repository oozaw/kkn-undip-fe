import { baseApi } from "@/utils/axios";

const api = `/mahasiswa`;

const listMahasiswa = (periode, prodi) =>
  baseApi.get(`${api}/${periode}/${prodi}`);

const addMahasiswa = (body) => baseApi.post(`${api}`, body);

export { listMahasiswa, addMahasiswa };
