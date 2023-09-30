import { baseApi } from "@/utils/axios";

const api = `/`;

const listAllPresensi = () => baseApi.get(`${api}presensi`);

const listPresensiTema = (id_tema) =>
  baseApi.get(`${api}presensi/tema/${id_tema}`);

const listRiwayatPresensiMahasiswa = () =>
  baseApi.get(`${api}presensi/riwayat/mahasiswa`);

const getRiwayatPresensi = (id_mahasiswa, tgl) =>
  baseApi.get(`${api}presensi/riwayat/${id_mahasiswa}/${tgl}`);

const addPresensi = (id_tema) => baseApi.post(`${api}presensi/${id_tema}`);

const submitPresensi = (id_tema, body) =>
  baseApi.post(`${api}presensi/submit/${id_tema}`, body);

const updateStatusPresensi = () => baseApi.put(`${api}presensi/status`);

export {
  listAllPresensi,
  listPresensiTema,
  listRiwayatPresensiMahasiswa,
  getRiwayatPresensi,
  addPresensi,
  submitPresensi,
  updateStatusPresensi,
};
