import { baseApi } from "@/utils/axios";

const api = `/`;

const listAllPengumuman = () => baseApi.get(`${api}pengumuman`);

const listMahasiswaPengumuman = () => baseApi.get(`${api}pengumuman/mahasiswa`);

const listDosenPengumuman = () => baseApi.get(`${api}pengumuman/dosen`);

const listBappedaPengumuman = () => baseApi.get(`${api}pengumuman/bappeda`);

const getPengumuman = (id_pengumuman) =>
  baseApi.get(`${api}pengumuman/${id_pengumuman}`);

const addPengumuman = (body) => baseApi.post(`${api}admin/pengumuman`, body);

const editPengumuman = (id_pengumuman, body) =>
  baseApi.put(`${api}admin/pengumuman/${id_pengumuman}`, body);

const deletePengumuman = (id_pengumuman) =>
  baseApi.delete(`${api}admin/pengumuman/${id_pengumuman}`);

export {
  listAllPengumuman,
  listMahasiswaPengumuman,
  listDosenPengumuman,
  listBappedaPengumuman,
  getPengumuman,
  addPengumuman,
  editPengumuman,
  deletePengumuman,
};
