import { baseApi } from "@/utils/axios";

const api = `/`;

const listAdmin = () => baseApi.get(`${api}admin`);

const getAdmin = (id_admin) => baseApi.get(`${api}admin/${id_admin}`);

const addAdmin = (body) => baseApi.post(`${api}superadmin/admin`, body);

const editAdmin = (id_admin, body) =>
  baseApi.put(`${api}superadmin/admin/${id_admin}`, body);

export { listAdmin, getAdmin, addAdmin, editAdmin };
