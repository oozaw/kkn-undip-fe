import { baseApi } from "@/utils/axios";

const api = `/`;

const listNilaiKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}nilai/kecamatan/${id_kecamatan}`);

const editNilai = (body) => baseApi.put(`${api}dosen/nilai/`, body);

const resetNilai = (id_nilai) =>
  baseApi.put(`${api}dosen/nilai/reset/${id_nilai}`);

export { listNilaiKecamatan, editNilai, resetNilai };
