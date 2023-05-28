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

const listMahasiswaWilayah = (id_kecamatan) =>
  baseApi.get(`${api}dosen/mahasiswa/${id_kecamatan}`);

const daftarLokasi = (body) =>
  baseApi.post(`${api}mahasiswa/daftar_lokasi`, body);

export {
  listMahasiswa,
  addMahasiswa,
  importMahasiswa,
  listMahasiswaWilayah,
  daftarLokasi,
};
