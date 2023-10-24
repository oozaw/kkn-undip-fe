const { baseApi } = require("@/utils/axios");

const api = "/koordinator";

const listKoordinator = () => baseApi.get(`${api}`);

const getKoordinator = (id_koordinator) =>
  baseApi.get(`${api}/detail/${id_koordinator}`);

const addKoordinator = (body) => baseApi.post(`${api}`, body);

const editKoordinator = (id_koordinator, body) => baseApi.put(`${api}/${id_koordinator}`, body);

const deleteKoordinator = (id_koordinator) =>
  baseApi.delete(`${api}/${id_koordinator}`);

module.exports = {
  listKoordinator,
  getKoordinator,
  addKoordinator,
  editKoordinator,
  deleteKoordinator,
};
