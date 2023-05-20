import { baseApi } from "@/utils/axios";

const api = `/`;

const listTema = () => baseApi.get(`${api}tema`);

const addTema = (body) => baseApi.post(`${api}admin/tema`, body);

export { listTema, addTema };
