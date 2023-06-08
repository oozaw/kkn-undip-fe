import { baseApi } from "@/utils/axios";

const api = `/`;

const listFakultas = () => baseApi.get(`${api}fakultas`);

export { listFakultas };
