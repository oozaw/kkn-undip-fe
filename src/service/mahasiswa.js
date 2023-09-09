import { baseApi } from "@/utils/axios";

const api = `/`;

const listMahasiswa = () => baseApi.get(`${api}mahasiswa`);

const listMahasiswaTema = (id_tema) =>
  baseApi.get(`${api}mahasiswa/tema/${id_tema}`);

const listMahasiswaUnregistered = () =>
  baseApi.get(`${api}mahasiswa/unregistered`);

const listMahasiswaRegistered = () => baseApi.get(`${api}mahasiswa/registered`);

const listMahasiswaAccepted = () => baseApi.get(`${api}mahasiswa/accepted`);

const listMahasiswaRegisteredByKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}mahasiswa/registered/${id_kecamatan}`);

const listMahasiswaAcceptedByKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}mahasiswa/accepted/${id_kecamatan}`);

const getMahasiswa = (id_mahasiswa) =>
  baseApi.get(`${api}mahasiswa/detail/${id_mahasiswa}`);

const addMahasiswa = (body) => baseApi.post(`${api}mahasiswa`, body);

const importMahasiswa = (body) =>
  baseApi.post(`${api}mahasiswa/import`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const editMahasiswa = (id_mahasiswa, body) =>
  baseApi.put(`${api}mahasiswa/${id_mahasiswa}`, body);

const listMahasiswaWilayah = (id_kecamatan) =>
  baseApi.get(`${api}mahasiswa/${id_kecamatan}`);

const daftarLokasi = (body) => baseApi.post(`${api}pendaftaran`, body);

const deleteDaftarLokasi = (id_mahasiswa_kecamatan) =>
  baseApi.delete(`${api}pendaftaran/${id_mahasiswa_kecamatan}`);

const accMahasiswa = (id_mahasiswa_kecamatan) =>
  baseApi.put(`${api}pendaftaran/acc/${id_mahasiswa_kecamatan}`);

const decMahasiswa = (id_mahasiswa_kecamatan) =>
  baseApi.put(`${api}pendaftaran/dec/${id_mahasiswa_kecamatan}`);

const deleteMahasiswa = (id_mahasiswa) =>
  baseApi.delete(`${api}mahasiswa/${id_mahasiswa}`);

export {
  listMahasiswa,
  listMahasiswaTema,
  listMahasiswaUnregistered,
  listMahasiswaRegistered,
  listMahasiswaAccepted,
  listMahasiswaRegisteredByKecamatan,
  listMahasiswaAcceptedByKecamatan,
  getMahasiswa,
  addMahasiswa,
  importMahasiswa,
  editMahasiswa,
  listMahasiswaWilayah,
  daftarLokasi,
  deleteDaftarLokasi,
  accMahasiswa,
  decMahasiswa,
  deleteMahasiswa,
};
