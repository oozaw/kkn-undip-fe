import { baseApi } from "@/utils/axios";

const api = `/`;

const listHalaman = (id_tema) => baseApi.get(`${api}admin/halaman/${id_tema}`);

const addHalaman = (body) => baseApi.post(`${api}admin/halaman`, body);

const switchHalaman = (id_halaman) =>
  baseApi.patch(`${api}admin/halaman/${id_halaman}`);

const checkHalaman = (id_tema, id_halaman) =>
  baseApi.get(`${api}halaman/${id_tema}/${id_halaman}`);

export { listHalaman, addHalaman, switchHalaman, checkHalaman };
