import { baseApi } from "@/utils/axios";

const api = `/bappeda`;

const listBappeda = () => baseApi.get(`${api}`);

const addBappeda = (body) => baseApi.post(`${api}`, body);

export { listBappeda, addBappeda };
