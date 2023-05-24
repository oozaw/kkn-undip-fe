import { baseApi } from "@/utils/axios";

const api = `/`;

const listHalaman = () => baseApi.get(`${api}admin/halaman`);

const addHalaman = (body) => baseApi.post(`${api}admin/halaman`, body);

const switchHalaman = (id_halaman) =>
  baseApi.patch(`${api}admin/halaman/${id_halaman}`);

export { listHalaman, addHalaman, switchHalaman };
