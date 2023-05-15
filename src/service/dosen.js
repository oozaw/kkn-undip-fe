import { baseApi } from "@/utils/axios";

const api = `/dosen`;

const listDosen = () => baseApi.get(`${api}`);

export { listDosen };
