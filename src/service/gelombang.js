import { baseApi } from "@/utils/axios";

const api = `/`;

const listGelombang = () => baseApi.get(`${api}admin/gelombang`);

const addGelombang = (body) => baseApi.post(`${api}admin/gelombang`, body);

const switchGelombang = (id_gelombang) =>
  baseApi.patch(`${api}admin/gelombang/${id_gelombang}`);

export { listGelombang, addGelombang, switchGelombang };
