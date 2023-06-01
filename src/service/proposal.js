import { baseApi } from "@/utils/axios";

const api = `/`;

const listProposal = (id_tema) => baseApi.get(`${api}proposal/${id_tema}`);

const addProposal = (body) =>
  baseApi.post(`${api}dosen/proposal`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const accProposal = (id_proposal) =>
  baseApi.put(`${api}admin/proposal/acc/${id_proposal}`);

const decProposal = (id_proposal) =>
  baseApi.put(`${api}admin/proposal/dec/${id_proposal}`);

export { listProposal, addProposal, accProposal, decProposal };
