<template>
  <div class="mt-4 card">
    <div class="p-3 card-body">
      <div class="d-flex">
        <span id="jumlah-gelombang" hidden>{{ jumlahGelombang }}</span>
        <span id="id-gelombang" hidden>{{ idGelombang }}</span>
        <div class="icon me-4 mt-1 ms-2">
          <!-- <img alt="Image placeholder" :src="img" /> -->
          <font-awesome-icon
            icon="fa-solid fa-clone"
            class="text-info"
            size="2xl"
          />
        </div>
        <div class="my-auto ms-2">
          <h6 class="mb-0 font-weight-bolder">{{ title }}</h6>
          <p class="mb-0 text-sm">
            Status:
            <span v-if="status" class="font-weight-bolder text-success">
              Dibuka
            </span>
            <span v-else class="font-weight-bolder text-danger">Ditutup</span>
          </p>
        </div>
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="text-secondary" v-if="!isDosen">
        <p class="mt-3 mb-0">
          Status Pendaftaran:
          <span
            v-if="statusPendaftaran == 1"
            class="font-weight-bolder text-success"
          >
            Diterima
          </span>
          <span
            v-else-if="statusPendaftaran == 0"
            class="font-weight-bolder text-primary"
          >
            Sedang diproses
          </span>
          <span
            v-else-if="statusPendaftaran == -1"
            class="font-weight-bolder text-danger"
          >
            Ditolak
          </span>
          <span v-else class="font-weight-bolder text-secondary">
            Belum Mendaftar
          </span>
        </p>
      </div>
      <div class="text-secondary" v-else>
        <p class="mt-3 mb-0">
          Status Pendaftaran:
          <span
            v-if="listProposal.length"
            class="font-weight-bolder text-success"
          >
            Mendaftar
            {{ listProposal.length }} lokasi
          </span>
          <span v-else class="font-weight-bolder text-secondary">
            Belum Mendaftar
          </span>
        </p>
      </div>
      <div class="text-secondary">
        <p class="mb-0" v-html="'Batas Pengisian: ' + deadline" />
      </div>
      <hr class="horizontal dark" />
      <div class="d-flex">
        <a
          type="button"
          class="mb-0 btn btn-sm me-2 bg-gradient-info"
          data-bs-toggle="modal"
          :data-bs-target="'#lihat_' + idGelombang"
        >
          Lihat
        </a>
        <div
          :id="'lihat_' + idGelombang"
          class="modal fade"
          tabindex="-1"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg mt-lg-10">
            <div class="modal-content">
              <div class="modal-header">
                <h5 id="ModalLabel" class="modal-title">
                  Pendaftaran Pada Tema {{ namaTema }} di {{ namaGelombang }}
                </h5>
                <button
                  type="button"
                  class="btn-close text-dark mb-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <font-awesome-icon icon="fa-solid fa-xmark" />
                </button>
              </div>
              <div class="modal-body">
                <table
                  :id="'pendaftaran-list-' + idGelombang"
                  class="table table-flush"
                >
                  <thead class="thead-light">
                    <tr>
                      <th>No.</th>
                      <th>Kecamatan</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody v-if="!isDosen">
                    <tr v-if="statusPendaftaran !== -2">
                      <td class="text-sm ps-3">1</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">{{ namaKecamatan }}</h6>
                      </td>
                      <td class="text-sm">
                        <span
                          class="badge badge-primary"
                          v-if="statusPendaftaran === 0"
                          >Sedang diproses
                        </span>
                        <span
                          class="badge badge-success"
                          v-else-if="statusPendaftaran === 1"
                          >Diterima
                        </span>
                        <span class="badge badge-danger" v-else>Ditolak</span>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr
                      v-for="(proposal, i) in listProposal"
                      :key="proposal.id_proposal"
                    >
                      <td class="text-sm ps-3">{{ i + 1 }}</td>
                      <td class="ms-0 px-0">
                        <h6 class="my-auto">{{ proposal.kecamatan.nama }}</h6>
                      </td>
                      <td class="text-sm">
                        <span
                          class="badge badge-primary"
                          v-if="proposal.status === 0"
                          >Sedang diproses
                        </span>
                        <span
                          class="badge badge-success"
                          v-else-if="proposal.status === 1"
                          >Diterima
                        </span>
                        <span class="badge badge-danger" v-else>Ditolak</span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>No.</th>
                      <th>Kecamatan</th>
                      <th>Status</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { DataTable } from "simple-datatables";
export default {
  name: "EventCard",
  props: {
    idGelombang: {
      type: Number,
      default: 0,
    },
    idPendaftaran: {
      type: Number,
      default: 0,
    },
    isDosen: {
      type: Boolean,
      default: false,
    },
    listProposal: {
      type: Array,
      default: () => [],
    },
    namaKecamatan: {
      type: String,
      default: "",
    },
    namaTema: {
      type: String,
      default: "",
    },
    namaGelombang: {
      type: String,
      default: "",
    },
    jumlahGelombang: {
      type: Number,
      default: 0,
    },
    nilai: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: false,
    },
    statusPendaftaran: {
      type: Number,
      default: -2,
    },
    deadline: {
      type: String,
      default: "",
    },
    batasKelulusan: {
      type: String,
      default: "",
    },
    action: {
      type: Object,
      route: String,
      color: String,
      label: String,
      default: () => {},
    },
  },
  mounted() {
    // this.setupDataTable();
  },
  methods: {
    setupDataTable() {
      let jmlGelombang = parseInt(
        document.getElementById("jumlah-gelombang").innerHTML
      );
      let id = document.getElementById("id-gelombang").innerHTML;

      for (let i = 1; i <= jmlGelombang; i++) {
        if (document.getElementById(`pendaftaran-list-${id}`)) {
          return new DataTable(`#pendaftaran-list-${id}`, {
            searchable: false,
            fixedHeight: false,
            perPage: 1,
          });
        }
      }
    },
  },
};
</script>
