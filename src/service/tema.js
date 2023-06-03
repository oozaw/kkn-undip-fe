import { baseApi } from "@/utils/axios";

const api = `/`;

const listTema = () => baseApi.get(`${api}tema`);

const listTemaDosen = () => baseApi.get(`${api}tema/dosen`);

const addTema = (body) => baseApi.post(`${api}admin/tema`, body);

const switchTema = (id_tema) => baseApi.patch(`${api}admin/tema/${id_tema}`);

export { listTema, listTemaDosen, addTema, switchTema };
