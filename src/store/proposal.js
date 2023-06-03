import { defineStore } from "pinia";
import * as s$proposal from "@/service/proposal";

const d$proposal = defineStore("proposalStore", {
  id: "proposal",
  state: () => ({
    status: null,
    proposal: undefined,
    listProposal: [],
  }),
  actions: {
    async a$getProposal(id_proposal) {
      try {
        const { data, status } = await s$proposal.getProposal(id_proposal);
        this.proposal = data ?? null;
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
    async a$listProposal(id_tema) {
      try {
        const { data, status } = await s$proposal.listProposal(id_tema);
        this.listProposal = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$listProposalDosen(id_tema) {
      try {
        const { data, status } = await s$proposal.listProposalDosen(id_tema);
        this.listProposal = data ?? [];
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$addProposal(body) {
      try {
        const status = await s$proposal.addProposal(body);
        this.status = status;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$accProposal(id_proposal) {
      try {
        await s$proposal.accProposal(id_proposal);
        this.status = true;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$decProposal(id_proposal) {
      try {
        await s$proposal.decProposal(id_proposal);
        this.status = true;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },

    async a$evaluateProposal(body) {
      try {
        await s$proposal.evaluateProposal(body);
        this.status = true;
      } catch (error) {
        this.status = false;
        throw error;
      }
    },
  },
  getters: {
    g$proposal: ({ proposal }) => proposal,
    g$listProposal: ({ listProposal }) => listProposal,
  },
});

export default d$proposal;
