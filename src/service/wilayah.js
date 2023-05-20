import { baseApi } from "@/utils/axios";

const api = `/`;

const listWilayah = (id_tema, id_bappeda) =>
  baseApi.get(`${api}wilayah/${id_tema}/${id_bappeda}`);

const listAllWilayah = (id_tema) => baseApi.get(`${api}wilayah/${id_tema}`);

const addKecamatan = (body) => baseApi.post(`${api}bappeda/kecamatan`, body);

export { listAllWilayah, listWilayah, addKecamatan };
