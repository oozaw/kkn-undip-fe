import { baseApi } from "@/utils/axios";

const api = `/`;

const login = (body) => baseApi.post(`${api}auth`, body);

const logout = (body) => baseApi.post(`${api}logout`, body);

const getUser = () => baseApi.get(`${api}auth`);

export { login, logout, getUser };
