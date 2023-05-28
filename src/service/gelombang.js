import { baseApi } from "@/utils/axios";

const api = `/`;

const listAllGelombang = () => baseApi.get(`${api}admin/gelombang`);

const listGelombang = (id_tema, id_halaman) =>
  baseApi.get(`${api}gelombang/${id_tema}/${id_halaman}`);

const addGelombang = (body) => baseApi.post(`${api}admin/gelombang`, body);

const switchGelombang = (id_gelombang) =>
  baseApi.patch(`${api}admin/gelombang/${id_gelombang}`);

export { listAllGelombang, listGelombang, addGelombang, switchGelombang };
