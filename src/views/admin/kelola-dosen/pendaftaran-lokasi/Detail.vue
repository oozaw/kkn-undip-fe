<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card>
          <template #button>
            <argon-button
              v-if="g$user.role !== 'DOSEN'"
              @click="() => $router.push({ name: 'Pendaftaran Dosen Admin' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              ><font-awesome-icon
                class="text-white me-2"
                icon="fa-solid fa-arrow-left"
                size="lg"
              />Kembali</argon-button
            >
            <argon-button
              v-else
              @click="() => $router.push({ name: 'Registrasi' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              ><font-awesome-icon
                class="text-white me-2"
                icon="fa-solid fa-arrow-left"
                size="lg"
              />Kembali</argon-button
            >
            <div v-if="g$user.role == 'ADMIN'">
              <argon-button
                @click="
                  showSwal(
                    'warning-confirmation',
                    `Menolak pendaftaran ${g$proposal?.dosen.nama}?`,
                    'Berhasil memperbarui data',
                    id_proposal,
                    false
                  )
                "
                class="mb-0 me-2"
                color="danger"
                size="sm"
                ><font-awesome-icon
                  class="text-white me-2"
                  icon="fa-solid fa-xmark"
                  size="lg"
                />Tolak</argon-button
              >
              <argon-button
                @click="
                  showSwal(
                    'warning-confirmation',
                    `Menerima pendaftaran ${g$proposal?.dosen.nama}?`,
                    'Berhasil memperbarui data',
                    id_proposal,
                    true
                  )
                "
                class="mb-0 me-lg-2"
                color="success"
                size="sm"
                ><font-awesome-icon
                  class="text-white me-2"
                  icon="fa-solid fa-check"
                  size="lg"
                />Terima</argon-button
              >
            </div>
          </template>
        </header-profile-card>
        <div class="bg-white pb-2 card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <h5 class="mb-2">Detail Proposal</h5>
            </div>
          </div>
          <div class="ms-2 pt-1 ps-3 card-body">
            <div class="mt-2 row">
              <div class="col-12">
                <ul class="list-group">
                  <li class="text-sm border-0 list-group-item ps-0">
                    <strong class="text-dark">Nama Lengkap:</strong>
                    &nbsp; {{ g$proposal?.dosen.nama }}
                  </li>
                  <li class="text-sm border-0 list-group-item ps-0">
                    <strong class="text-dark">NIP:</strong>
                    &nbsp; {{ g$proposal?.dosen.nip }}
                  </li>
                  <li class="text-sm border-0 list-group-item ps-0">
                    <strong class="text-dark">Tema:</strong>
                    &nbsp;
                    {{
                      `${g$proposal?.kecamatan.kabupaten.tema.nama} ${g$proposal?.kecamatan.kabupaten.tema.periode}`
                    }}
                  </li>
                  <li class="text-sm border-0 list-group-item ps-0">
                    <strong class="text-dark">Gelombang:</strong>
                    &nbsp; {{ g$proposal?.gelombang.nama }}
                  </li>
                  <li class="text-sm border-0 list-group-item ps-0">
                    <strong class="text-dark">Kabupaten:</strong>
                    &nbsp; {{ g$proposal?.kecamatan.kabupaten.nama }}
                  </li>
                  <li class="text-sm border-0 list-group-item ps-0">
                    <strong class="text-dark">Kecamatan:</strong>
                    &nbsp; {{ g$proposal?.kecamatan.nama }}
                  </li>
                  <li class="text-sm border-0 list-group-item ps-0">
                    <strong class="text-dark">Diunggah pada:</strong>
                    &nbsp;
                    {{ moment(g$proposal?.created_at).format("DD MMMM YYYY") }}
                  </li>
                  <li class="text-sm border-0 list-group-item ps-0">
                    <strong class="text-dark">Rekomendasi:</strong>
                    &nbsp;
                    <span
                      v-if="g$proposal?.rekomendasi == 1"
                      class="badge badge-success"
                      >Direkomendasikan</span
                    >
                    <span v-else class="badge badge-danger"
                      >Tidak direkomendasikan</span
                    >
                  </li>
                  <li class="text-sm border-0 list-group-item ps-0">
                    <strong class="text-dark">Status Proposal:</strong>
                    &nbsp;
                    <span
                      v-if="g$proposal?.status == 1"
                      class="badge badge-success"
                      >Diterima</span
                    >
                    <span
                      v-else-if="g$proposal?.status == 0"
                      class="badge badge-primary"
                      >Sedang diproses</span
                    >
                    <span v-else class="badge badge-danger">Ditolak</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="row mt-0 pb-4">
              <div class="col-12">
                <strong class="text-dark text-sm mb-2">Proposal:</strong>
                <br />
                <iframe
                  class="w-100 pb-4 mt-3"
                  style="height: 30rem"
                  :src="g$dokumenLink ?? ''"
                  frameborder="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$proposal from "@/store/proposal";
import d$dokumen from "@/store/dokumen";
import d$auth from "@/store/auth";

export default {
  name: "DetailProposalDosen",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      id_proposal: parseInt(this.$route.params.id_proposal),
      moment,
    };
  },
  computed: {
    ...mapState(d$proposal, ["g$proposal"]),
    ...mapState(d$auth, ["g$user"]),
    ...mapState(d$dokumen, ["g$dokumenLink"]),
  },
  async created() {
    await this.getProposal();
  },
  methods: {
    ...mapActions(d$proposal, [
      "a$getProposal",
      "a$accProposal",
      "a$decProposal",
    ]),
    ...mapActions(d$dokumen, ["a$getDokumenEmbedLink"]),

    async getProposal() {
      this.showSwal("loading");

      try {
        await this.a$getProposal(this.id_proposal);
        await this.a$getDokumenEmbedLink(this.g$proposal.dokumen.id_dokumen);
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat memuat data! " + msg
        );
      }

      this.showSwal("close");
    },

    async accProposal() {
      this.showSwal("loading");

      try {
        await this.a$accProposal(this.id_proposal);
        await this.getProposal();
        this.showSwal("success-message", "Proposal berhasil diterima");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diperbarui! " + msg);
      }
    },

    async decProposal() {
      this.showSwal("loading");

      try {
        await this.a$decProposal(this.id_proposal);
        await this.getProposal();
        this.showSwal("success-message", "Proposal berhasil ditolak");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal diperbarui! " + msg);
      }
    },

    showSwal(type, text, toastText, id_proposal, status) {
      if (type === "success-message") {
        this.$swal({
          icon: "success",
          title: "Berhasil!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
        });
      } else if (type === "warning-message") {
        this.$swal({
          icon: "warning",
          title: "Peringatan!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
        });
      } else if (type === "failed-message") {
        this.$swal({
          icon: "error",
          title: "Gagal!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
        });
      } else if (type === "auto-close") {
        let timerInterval;
        this.$swal({
          title: "Auto close alert!",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            this.$swal.showLoading();
            const b = this.$swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = this.$swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      } else if (type === "warning-confirmation") {
        this.$swal({
          title: "Apakah Anda yakin?",
          text: text,
          showCancelButton: true,
          confirmButtonText: "Ya!",
          cancelButtonText: "Batal!",
          customClass: {
            confirmButton: "btn bg-gradient-success",
            cancelButton: "btn bg-gradient-secondary",
          },
          buttonsStyling: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
        }).then((result) => {
          if (result.isConfirmed) {
            if (status) this.accProposal(id_proposal);
            else this.decProposal(id_proposal);
            this.$swal({
              toast: true,
              position: "top-end",
              title: toastText,
              icon: "success",
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            this.$swal.close();
          }
        });
      } else if (type === "loading") {
        this.$swal({
          title: "Memuat...",
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            this.$swal.showLoading();
          },
          didDestroy: () => {
            this.$swal.hideLoading();
          },
        });
      } else if (type === "close") {
        this.$swal.close();
      }
    },
  },
};
</script>
