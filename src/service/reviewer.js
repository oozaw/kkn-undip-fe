import { baseApi } from "@/utils/axios";

const api = `/`;

const listReviewer = () => baseApi.get(`${api}reviewer`);

const getReviewer = (id_reviewer) =>
  baseApi.get(`${api}reviewer/${id_reviewer}`);

const addReviewer = (body) => baseApi.post(`${api}admin/reviewer/single`, body);

const importReviewer = (body) =>
  baseApi.post(`${api}admin/reviewer`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const editReviewer = (id_reviewer, body) =>
  baseApi.put(`${api}admin/reviewer/${id_reviewer}`, body);

const deleteReviewer = (id_reviewer) =>
  baseApi.delete(`${api}admin/reviewer/${id_reviewer}`);

export {
  listReviewer,
  getReviewer,
  addReviewer,
  importReviewer,
  editReviewer,
  deleteReviewer,
};
