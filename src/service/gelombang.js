import { baseApi } from "@/utils/axios";

const api = `/`;

const listAllGelombang = (id_tema) => baseApi.get(`${api}gelombang/${id_tema}`);

const listGelombang = (id_tema, id_halaman) =>
  baseApi.get(`${api}gelombang/halaman/${id_tema}/${id_halaman}`);

const listGelombangDosen = (id_tema, id_halaman, id_dosen) =>
  baseApi.get(`${api}gelombang/dosen/${id_tema}/${id_halaman}/${id_dosen}`);

const listGelombangMahasiswa = (id_tema, id_halaman, id_mahasiswa) =>
  baseApi.get(
    `${api}gelombang/mahasiswa/${id_tema}/${id_halaman}/${id_mahasiswa}`
  );

const getGelombang = (id_gelombang) =>
  baseApi.get(`${api}gelombang/detail/${id_gelombang}`);

const addGelombang = (body) => baseApi.post(`${api}gelombang`, body);

const editGelombang = (id_gelombang, body) =>
  baseApi.put(`${api}gelombang/${id_gelombang}`, body);

const switchGelombang = (id_gelombang) =>
  baseApi.patch(`${api}gelombang/${id_gelombang}`);

const deleteGelombang = (id_gelombang) =>
  baseApi.delete(`${api}gelombang/${id_gelombang}`);

export {
  listAllGelombang,
  listGelombang,
  listGelombangDosen,
  listGelombangMahasiswa,
  getGelombang,
  addGelombang,
  editGelombang,
  switchGelombang,
  deleteGelombang,
};
