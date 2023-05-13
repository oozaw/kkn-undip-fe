import { baseApi } from "@/utils/axios";

const api = `/wilayah`;

const listKabupaten = () => baseApi.get(`${api}`);

const listKecamatan = (body) => baseApi.post(`${api}/kecamatan`, body);

const addKecamatan = (body) => baseApi.post(`${api}`, body);

export { listKabupaten, listKecamatan, addKecamatan };
