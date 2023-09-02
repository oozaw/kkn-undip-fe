import { baseApi } from "@/utils/axios";

const api = `/`;

const excelPendaftaranMhsKecamatan = (id_kecamatan) =>
  baseApi.get(`${api}excel/pendaftaran/mahasiswa/${id_kecamatan}`, {
    responseType: "blob",
  });

export { excelPendaftaranMhsKecamatan };
