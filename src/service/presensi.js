import { baseApi } from "@/utils/axios";

const api = `/`;

const listJadwalPresensi = () => baseApi.get(`${api}presensi/jadwal`);

const listJadwalPresensiTema = (id_tema) =>
  baseApi.get(`${api}presensi/jadwal/tema/${id_tema}`);

const listPresensiMahasiswa = () => baseApi.get(`${api}presensi/mahasiswa`);

const listPresensiKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}presensi/kecamatan/${id_kecamatan}`);

const getPresensi = (id_mahasiswa, tgl) =>
  baseApi.get(`${api}presensi/detail/${id_mahasiswa}/${tgl}`);

const addJadwalPresensi = (body) => baseApi.post(`${api}presensi/jadwal`, body);

const addPresensi = (body) => baseApi.post(`${api}presensi`, body);

const setupJadwalPresensiTema = (id_tema) =>
  baseApi.post(`${api}presensi/jadwal/${id_tema}`);

const editJadwalPresensi = (id_presensi, body) =>
  baseApi.put(`${api}presensi/jadwal/${id_presensi}`, body);

const editPresensi = (id_riwayat_presensi, body) =>
  baseApi.put(`${api}presensi/${id_riwayat_presensi}`, body);

const submitPresensi = (id_tema, body) =>
  baseApi.post(`${api}presensi/submit/${id_tema}`, body);

const updateStatusJadwalPresensi = () =>
  baseApi.put(`${api}presensi/jadwal/status`);

const deleteJadwalPresensi = (id_presensi) =>
  baseApi.delete(`${api}presensi/jadwal/${id_presensi}`);

const deletePresensi = (id_riwayat_presensi) =>
  baseApi.delete(`${api}presensi/${id_riwayat_presensi}`);

export {
  listJadwalPresensi,
  listJadwalPresensiTema,
  listPresensiMahasiswa,
  listPresensiKecamatan,
  getPresensi,
  addJadwalPresensi,
  addPresensi,
  setupJadwalPresensiTema,
  editJadwalPresensi,
  editPresensi,
  submitPresensi,
  updateStatusJadwalPresensi,
  deleteJadwalPresensi,
  deletePresensi,
};
