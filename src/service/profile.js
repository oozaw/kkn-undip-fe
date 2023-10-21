import { baseApi } from "@/utils/axios";

const api = `/profile`;

const getProfile = () => baseApi.get(`${api}`);

const editProfile = (body) => baseApi.put(`${api}`, body);

export { getProfile, editProfile };
