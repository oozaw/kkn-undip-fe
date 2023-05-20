import { baseApi } from "@/utils/axios";

const api = `/`;

const listAdmin = () => baseApi.get(`${api}admin`);

const addAdmin = (body) => baseApi.post(`${api}superadmin/admin`, body);

export { listAdmin, addAdmin };
