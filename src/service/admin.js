import { baseApi } from "@/utils/axios";

const api = `/`;

const listAdmin = () => baseApi.get(`${api}admin`);

const getAdmin = (id_admin) => baseApi.get(`${api}admin/detail/${id_admin}`);

const addAdmin = (body) => baseApi.post(`${api}admin`, body);

const editAdmin = (id_admin, body) =>
  baseApi.put(`${api}admin/${id_admin}`, body);

export { listAdmin, getAdmin, addAdmin, editAdmin };
