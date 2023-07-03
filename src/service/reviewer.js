import { baseApi } from "@/utils/axios";

const api = `/`;

const listReviewer = () => baseApi.get(`${api}reviewer`);

const addReviewer = (body) => baseApi.post(`${api}admin/reviewer/single`, body);

const importReviewer = (body) =>
  baseApi.post(`${api}admin/reviewer`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const deleteReviewer = (id_reviewer) =>
  baseApi.delete(`${api}admin/reviewer/${id_reviewer}`);

export { listReviewer, addReviewer, importReviewer, deleteReviewer };
