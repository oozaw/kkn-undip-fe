import { baseApi } from "@/utils/axios";

const api = `/`;

const addGelombang = (body) => baseApi.post(`${api}admin/gelombang`, body);

export { addGelombang };
