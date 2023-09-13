import { baseApi } from "@/utils/axios";

const api = `/`;

const excelPendaftaranMhsKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}excel/pendaftaran/mahasiswa/${id_kecamatan}`, {
    responseType: "blob",
  });

const excelNilaiMhsKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}excel/nilai/mahasiswa/${id_kecamatan}`, {
    responseType: "blob",
  });

const excelPendaftaranDosenTema = (id_tema) =>
  baseApi.get(`${api}excel/pendaftaran/dosen/${id_tema}`, {
    responseType: "blob",
  });
  
export { excelPendaftaranMhsKecamatan, excelNilaiMhsKecamatan, excelPendaftaranDosenTema };
