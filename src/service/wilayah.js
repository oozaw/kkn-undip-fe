import { baseApi } from "@/utils/axios";

const api = `/`;

const listKabupaten = (id_tema, id_bappeda) =>
  baseApi.get(`${api}wilayah/kabupaten/${id_tema}`, { params: { id_bappeda } });

const listAllKabupaten = (id_tema) =>
  baseApi.get(`${api}wilayah/kabupaten/${id_tema}`);

const listKecamatan = (id_kabupaten) =>
  baseApi.get(`${api}wilayah/kecamatan`, { params: { id_kabupaten } });

const listAllKecamatan = (id_tema) =>
  baseApi.get(`${api}wilayah/kecamatan`, { params: { id_tema } });

const addKecamatan = (body) => baseApi.post(`${api}bappeda/kecamatan`, body);

export {
  listKabupaten,
  listAllKabupaten,
  listKecamatan,
  listAllKecamatan,
  addKecamatan,
};
