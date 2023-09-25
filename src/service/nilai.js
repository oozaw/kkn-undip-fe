import { baseApi } from "@/utils/axios";

const api = `/`;

const listNilaiKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}nilai/kecamatan/${id_kecamatan}`);

const getNilai = (id_nilai) => baseApi.get(`${api}nilai/detail/${id_nilai}`);

const editNilai = (body) => baseApi.put(`${api}nilai/`, body);

const resetNilai = (id_nilai) => baseApi.put(`${api}nilai/reset/${id_nilai}`);

const downloadFormatImport = (id_kecamatan) =>
  baseApi.get(`${api}nilai/import/${id_kecamatan}`, {
    responseType: "blob",
  });

const importNilai = (body) =>
  baseApi.post(`${api}nilai/import`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export {
  listNilaiKecamatan,
  getNilai,
  editNilai,
  resetNilai,
  downloadFormatImport,
  importNilai,
};
