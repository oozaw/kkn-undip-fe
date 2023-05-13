import { baseApi } from "@/utils/axios";

const api = `/wilayah`;

const listKecamatan = (body) => baseApi.post(`${api}/kecamatan`, body);

const addKecamatan = (body) => baseApi.post(`${api}`, body);

export { listKecamatan, addKecamatan };
