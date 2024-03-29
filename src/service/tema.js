import { baseApi } from "@/utils/axios";

const api = `/`;

const listTema = () => baseApi.get(`${api}tema`);

const listTemaDosen = () => baseApi.get(`${api}tema/dosen`);

const getTema = (id_tema) => baseApi.get(`${api}tema/${id_tema}`);

const addTema = (body) => baseApi.post(`${api}admin/tema`, body);

const editTema = (id_tema, body) =>
  baseApi.put(`${api}admin/tema/edit/${id_tema}`, body);

const switchTema = (id_tema) => baseApi.patch(`${api}admin/tema/${id_tema}`);

const deleteTema = (id_tema) => baseApi.delete(`${api}admin/tema/${id_tema}`);

export {
  listTema,
  listTemaDosen,
  getTema,
  addTema,
  editTema,
  switchTema,
  deleteTema,
};
