import { baseApi } from "@/utils/axios";

const api = `/`;

const listAllGelombang = () => baseApi.get(`${api}admin/gelombang`);

const listGelombang = (id_tema, id_halaman) =>
  baseApi.get(`${api}gelombang/${id_tema}/${id_halaman}`);

const listGelombangMahasiswa = (id_tema, id_halaman, id_mahasiswa) =>
  baseApi.get(
    `${api}gelombang/mahasiswa/${id_tema}/${id_halaman}/${id_mahasiswa}`
  );

const addGelombang = (body) => baseApi.post(`${api}admin/gelombang`, body);

const switchGelombang = (id_gelombang) =>
  baseApi.patch(`${api}admin/gelombang/${id_gelombang}`);

export {
  listAllGelombang,
  listGelombang,
  listGelombangMahasiswa,
  addGelombang,
  switchGelombang,
};
