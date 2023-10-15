import { baseApi } from "@/utils/axios";

const api = `/kategori`;

const listKategori = () => baseApi.get(`${api}`);

const getKategori = (id_kategori) =>
  baseApi.get(`${api}/detail/${id_kategori}`);

const addKategori = (body) => baseApi.post(`${api}`, body);

const editKategori = (id_kategori, body) =>
  baseApi.put(`${api}/${id_kategori}`, body);

const deleteKategori = (id_kategori) => baseApi.delete(`${api}/${id_kategori}`);

export { listKategori, getKategori, addKategori, editKategori, deleteKategori };
