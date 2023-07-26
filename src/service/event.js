import { baseApi } from "@/utils/axios";

const api = `/`;

const listAllEvent = () => baseApi.get(`${api}event`);

const listMahasiswaEvent = () => baseApi.get(`${api}event/mahasiswa`);

const listDosenEvent = () => baseApi.get(`${api}event/dosen`);

const listBappedaEvent = () => baseApi.get(`${api}event/bappeda`);

const getEvent = (id_event) => baseApi.get(`${api}event/detail/${id_event}`);

const addEvent = (body) => baseApi.post(`${api}event`, body);

const editEvent = (id_event, body) =>
  baseApi.put(`${api}event/${id_event}`, body);

const deleteEvent = (id_event) => baseApi.delete(`${api}event/${id_event}`);

export {
  listAllEvent,
  listMahasiswaEvent,
  listDosenEvent,
  listBappedaEvent,
  getEvent,
  addEvent,
  editEvent,
  deleteEvent,
};
