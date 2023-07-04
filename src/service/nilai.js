import { baseApi } from "@/utils/axios";

const api = `/`;

const listNilaiKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}nilai/kecamatan/${id_kecamatan}`);

const getNilai = (id_nilai) => baseApi.get(`${api}nilai/${id_nilai}`);

const editNilai = (body) => baseApi.put(`${api}dosen/nilai/`, body);

const resetNilai = (id_nilai) =>
  baseApi.put(`${api}dosen/nilai/reset/${id_nilai}`);

export { listNilaiKecamatan, getNilai, editNilai, resetNilai };
