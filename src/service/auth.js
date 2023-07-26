import { baseApi } from "@/utils/axios";

const api = `/`;

const login = (body) => baseApi.post(`${api}auth`, body);

const logout = (body) => baseApi.post(`${api}logout`, body);

const getUser = () => baseApi.get(`${api}user/detail`);

const editUser = (body) => baseApi.put(`${api}user`, body);

export { login, logout, getUser, editUser };
