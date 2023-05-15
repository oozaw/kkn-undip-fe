import { baseApi } from "@/utils/axios";

const api = `/admin`;

const listAdmin = () => baseApi.get(`${api}`);

const addAdmin = (body) => baseApi.post(`${api}`, body);

export { listAdmin, addAdmin };
