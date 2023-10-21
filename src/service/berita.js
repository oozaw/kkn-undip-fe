import { baseApi } from "@/utils/axios";

const api = "/berita";

const listBerita = () => baseApi.get(`${api}`);

const getBerita = (id_berita) => baseApi.get(`${api}/detail/${id_berita}`);

const getThumbnail = (id_berita) =>
  baseApi.get(`${api}/thumbnail/${id_berita}`, { responseType: "blob" });

const addBerita = (body) =>
  baseApi.post(`${api}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const editBerita = (id_berita, body) =>
  baseApi.put(`${api}/${id_berita}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const deleteBerita = (id_berita) => baseApi.delete(`${api}/${id_berita}`);

export {
  listBerita,
  getBerita,
  getThumbnail,
  addBerita,
  editBerita,
  deleteBerita,
};
