import { baseApi } from "@/utils/axios";

const api = `/`;

const login = (body) => baseApi.post(`${api}login`, body);

const logout = (body) => baseApi.post(`${api}logout`, body);

export { login, logout };
