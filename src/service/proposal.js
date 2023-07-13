import { baseApi } from "@/utils/axios";

const api = `/`;

const getProposal = (id_proposal) =>
  baseApi.get(`${api}proposal/detail/${id_proposal}`);

const listProposal = (id_tema) => baseApi.get(`${api}proposal/${id_tema}`);

const listAllProposalDosen = () => baseApi.get(`${api}dosen/proposal/all`);

const listProposalDosen = (id_tema) =>
  baseApi.get(`${api}dosen/proposal/${id_tema}`);

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

const evaluateProposal = (body) => baseApi.put(`${api}reviewer/evaluate`, body);

const deleteProposal = (id_proposal) =>
  baseApi.delete(`${api}proposal/${id_proposal}`);

export {
  getProposal,
  listProposal,
  listAllProposalDosen,
  listProposalDosen,
  addProposal,
  accProposal,
  decProposal,
  evaluateProposal,
  deleteProposal,
};
