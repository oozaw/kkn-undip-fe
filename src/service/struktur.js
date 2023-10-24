import { baseApi } from "@/utils/axios";

const api = `/struktur`;

const getStruktur = () => baseApi.get(`${api}`);

const editStruktur = (body) => baseApi.put(`${api}`, body);

export { getStruktur, editStruktur };
