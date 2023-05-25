import { baseApi } from "@/utils/axios";

const api = `/`;

const listProposal = () => baseApi.get(`${api}/proposal`);

const addProposal = (body) =>
  baseApi.post(`${api}dosen/proposal`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const accProposal = (id_proposal) =>
  baseApi.patch(`${api}admin/proposal/acc/${id_proposal}`);

const decProposal = (id_proposal) =>
  baseApi.patch(`${api}admin/proposal/dec/${id_proposal}`);

export { listProposal, addProposal, accProposal, decProposal };
