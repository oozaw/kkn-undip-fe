import { baseApi } from "@/utils/axios";

const api = `/`;

const listReviewer = () => baseApi.get(`${api}reviewer`);

const getReviewer = (id_reviewer) =>
  baseApi.get(`${api}reviewer/detail/${id_reviewer}`);

const addReviewer = (body) => baseApi.post(`${api}reviewer`, body);

const importReviewer = (body) =>
  baseApi.post(`${api}reviewer/import`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const editReviewer = (id_reviewer, body) =>
  baseApi.put(`${api}reviewer/${id_reviewer}`, body);

const deleteReviewer = (id_reviewer) =>
  baseApi.delete(`${api}reviewer/${id_reviewer}`);

export {
  listReviewer,
  getReviewer,
  addReviewer,
  importReviewer,
  editReviewer,
  deleteReviewer,
};
