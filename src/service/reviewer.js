import { baseApi } from "@/utils/axios";

const api = `/reviewer`;

const listReviewer = () => baseApi.get(`${api}`);

const addReviewer = (body) => baseApi.post(`${api}`, body);

export { listReviewer, addReviewer };
