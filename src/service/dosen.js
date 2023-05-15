import { baseApi } from "@/utils/axios";

const api = `/dosen`;

const listDosen = () => baseApi.get(`${api}`);

const addDosen = (body) => baseApi.post(`${api}`, body);

export { listDosen, addDosen };
