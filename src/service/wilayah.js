import { baseApi } from "@/utils/axios";

const api = `/wilayah`;

const addKecamatan = (body) => baseApi.post(`${api}`, body);

export { addKecamatan };
