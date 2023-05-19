import { baseApi } from "@/utils/axios";

const api = `/`;

const listTema = () => baseApi.get(`${api}tema`);

export { listTema };
