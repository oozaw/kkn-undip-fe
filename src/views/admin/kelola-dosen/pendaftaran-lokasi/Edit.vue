<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card>
          <template #button>
            <argon-button
              type="button"
              :onclick="() => $router.push({ name: 'Pendaftaran Dosen Admin' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-add-evaluasi"
              class="mb-0 me-lg-2"
              color="primary"
              variant="gradient"
              size="sm"
              >Simpan</argon-button
            >
          </template>
        </header-profile-card>
        <div class="row ms-1 mt-4 me-0">
          <div class="col-md-4 col-12 p-0">
            <div class="card h-100">
              <div class="p-4 pb-0 card-header">
                <div class="col-md-8 d-flex align-items-center">
                  <h6 class="mb-0">Detail Dosen</h6>
                </div>
              </div>
              <div class="p-4 card-body">
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
          </div>
          <div class="col-md-8 col-12 p-0 ps-md-4 mt-4 mt-md-0">
            <div class="card h-100">
              <div class="p-3 pb-0 card-header">
                <div class="col-md-8 d-flex align-items-center">
                  <h6 class="mb-0">Proposal</h6>
                </div>
              </div>
              <div class="p-3 card-body">
                <label class="mb-4">Proposal</label>
                <br />
                <iframe
                  class="w-100 h-100 pb-6"
                  :src="g$dokumenLink ?? ''"
                  frameborder="0"
                ></iframe>
              </div>
            </div>
          </div>
          <div class="bg-white pb-2 card mt-4">
            <!-- Card header -->
            <div class="pb-0 card-header">
              <div class="d-lg-flex">
                <h5 class="mb-2">Evaluasi Proposal</h5>
              </div>
            </div>
            <div class="ms-2 pt-1 ps-3 card-body" :key="indexComponent">
              <form
                role="form"
                id="form-add-evaluasi"
                @submit.prevent="addEvaluasi()"
              >
                <div class="row">
                  <div class="col-12">
                    <label class="mt-4">Komentar</label>
                    <quill-editor
                      id="latar-belakang-editor"
                      style="height: 180px"
                      v-model:content="body.komentar"
                      contentType="html"
                      toolbar="essential"
                      theme="snow"
                    ></quill-editor>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <label class="pt-4">Rekomendasi</label>
                    <select
                      name="choices-rekomendasi"
                      id="choices-rekomendasi"
                      v-model="body.rekomendasi"
                    >
                      <option value="">-- Pilih rekomendasi --</option>
                    </select>
                  </div>
                </div>
              </form>
              <div class="row mt-4">
                <div
                  class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-end"
                >
                  <argon-button
                    type="button"
                    :onclick="
                      () => $router.push({ name: 'Pendaftaran Dosen Admin' })
                    "
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    type="submit"
                    form="form-add-evaluasi"
                    class="mb-0 me-lg-2"
                    color="primary"
                    variant="gradient"
                    size="sm"
                    >Simpan</argon-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$proposal from "@/store/proposal";
import d$dokumen from "@/store/dokumen";

export default {
  name: "EditProposal",
  components: {
    HeaderProfileCard,
    ArgonButton,
    QuillEditor,
  },
  data() {
    return {
      indexComponent: 0,
      body: {
        id_proposal: parseInt(this.$route.params.id_proposal),
        komentar: "",
        rekomendasi: "",
      },
      choicesRekomendasi: undefined,
    };
  },
  computed: {
    ...mapState(d$proposal, ["g$proposal"]),
    ...mapState(d$dokumen, ["g$dokumenLink"]),
  },
  async created() {
    await this.getProposal();
  },
  mounted() {
    this.choicesRekomendasi = this.getChoices("choices-rekomendasi");
  },
  beforeUnmount() {
    if (this.choicesRekomendasi) this.choicesRekomendasi.destroy();
  },
  methods: {
    ...mapActions(d$proposal, ["a$getProposal", "a$evaluateProposal"]),
    ...mapActions(d$dokumen, ["a$getDokumenEmbedLink"]),

    async addEvaluasi() {
      this.showSwal("loading");

      if (
        this.isQuillEmpty(this.body.komentar) ||
        !this.body.rekomendasi ||
        this.body.rekomendasi == ""
      ) {
        this.showSwal(
          "warning-message",
          "Data LRK belum lengkap, lengkapi data terlebih dahulu!"
        );
        return;
      }

      this.body.rekomendasi = Boolean(parseInt(this.body.rekomendasi));

      try {
        await this.a$evaluateProposal(this.body);
        this.$router.push({ name: "Pendaftaran Dosen Admin" });
        this.showSwal(
          "success-message",
          "Evaluasi proposal berhasil ditambahkan!"
        );
      } catch (error) {
        this.showSwal("failed-message", "Evaluasi proposal gagal disimpan!");
        console.log(error.error);
      }
    },

    async getProposal() {
      this.showSwal("loading");
      this.indexComponent++;

      try {
        await this.a$getProposal(this.body.id_proposal);
        this.body.komentar = this.g$proposal.komentar;
        if (this.g$proposal.rekomendasi == null) this.body.rekomendasi = "";
        else this.body.rekomendasi = this.g$proposal.rekomendasi ? "1" : "0";
        this.setChoices(this.choicesRekomendasi);
        await this.a$getDokumenEmbedLink(this.g$proposal.dokumen.id_dokumen);
      } catch (error) {
        this.showSwal("failed-message", "Terjadi kesalahan saat memuat data");
        console.log(error);
      }

      this.showSwal("close");
    },

    isQuillEmpty(input) {
      if (input == "" || input == "<p><br></p>") return true;
      else return false;
    },

    setChoices(choices) {
      if (choices) {
        choices.clearChoices();
        choices.removeActiveItems();

        let option = {
          value: "",
          label: "-- Pilih rekomendasi --",
          selected: true,
          disabled: true,
        };

        if (this.body.rekomendasi === "") option.selected = true;
        else option.selected = false;

        choices.setChoices([
          option,
          {
            value: "0",
            label: "Tidak direkomendasikan",
            selected: this.body.rekomendasi === "0",
            disabled: false,
          },
          {
            value: "1",
            label: "Rekomendasikan",
            selected: this.body.rekomendasi === "1",
            disabled: false,
          },
        ]);
      }
    },

    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
          shouldSort: false,
        });
      }
    },

    showSwal(type, text) {
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
