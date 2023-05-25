<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              :onclick="() => $router.push({ name: 'Registrasi KKN' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-proposal"
              class="mb-0 me-lg-2"
              color="success"
              variant="gradient"
              size="sm"
              >Submit Proposal</argon-button
            >
          </template>
        </HeaderProfileCard>
        <div class="p-4 pt-3 bg-white card mt-4">
          <h5 class="">Registrasi KKN</h5>
          <form
            role="form"
            id="form-proposal"
            enctype="multipart/form-data"
            @submit.prevent="addProposal()"
          >
            <div class="mt-2 row">
              <div class="col-md-6 col-12">
                <div class="row">
                  <div class="col-12 align-self-center">
                    <label class="form-label mt-2">Jenis KKN</label>
                    <select
                      id="choices-jenis"
                      class="form-control"
                      name="choices-jenis"
                      @change="getListTema()"
                    >
                      <option value="" selected hidden disabled>
                        -- Pilih jenis KKN --
                      </option>
                      <option value="reguler">Reguler</option>
                      <option value="tematik">Tematik</option>
                    </select>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12 align-self-center">
                    <label class="form-label mt-2">Tema</label>
                    <select
                      id="choices-tema"
                      class="form-control"
                      name="choices-tema"
                      v-model="tema"
                      @change="getListKabupaten()"
                    >
                      <option value="" selected hidden disabled>
                        -- Pilih tema --
                      </option>
                      <!-- <option
                        v-for="tema in listTemaActive"
                        :key="tema.id_tema"
                        :value="tema.id_tema"
                      >
                        {{ tema.nama }}
                      </option> -->
                    </select>
                  </div>
                </div>
                <div
                  class="reguler-section"
                  :hidden="filterJenis !== 'reguler'"
                >
                  <div class="row mt-3">
                    <div class="col-12 align-self-center">
                      <label class="form-label mt-2">Provinsi</label>
                      <select
                        id="choices-provinsi"
                        class="form-control"
                        name="choices-provinsi"
                      >
                        <option value="" selected hidden disabled>
                          -- Pilih Provinsi --
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12 align-self-center">
                      <label class="form-label mt-2">Kabupaten/ Kota</label>
                      <select
                        id="choices-kab"
                        class="form-control"
                        name="choices-kab"
                        v-model="kabupaten"
                        @change="getListKecamatan()"
                      >
                        <option value="" selected hidden disabled>
                          -- Pilih Kabupaten/ Kota --
                        </option>
                        <!-- <option
                          v-for="kab in g$listKabupaten"
                          :key="kab.id_kabupaten"
                          :value="kab.id_kabupaten"
                        >
                          {{ kab.nama }}
                        </option> -->
                      </select>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12 align-self-center">
                      <label class="form-label mt-2">Kecamatan</label>
                      <select
                        id="choices-kec"
                        class="form-control"
                        name="choices-kec"
                        v-model="kecamatan"
                        @change="getPotensi()"
                      >
                        <option value="" selected hidden disabled>
                          -- Pilih Kecamatan --
                        </option>
                        <!-- <option
                          v-for="kec in listKecamatan"
                          :key="kec.id_kecamatan"
                          :value="kec.id_kecamatan"
                        >
                          {{ kec.nama }}
                        </option> -->
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12 mt-3 mt-lg-0">
                    <label for="file-prposal" class="form-label"
                      >Proposal (*.pdf)</label
                    >
                    <input
                      class="form-control"
                      type="file"
                      ref="file"
                      id="file-proposal"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-12 mt-3 mt-md-0">
                <div class="col-12 ms-md-2 pe-1">
                  <label class="form-label">Potensi Wilayah Terpilih:</label>
                  <div class="row ms-1 text-md">
                    <span id="potensi" class="" v-html="potensi"></span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import * as Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$wilayah from "@/store/wilayah";
import d$tema from "@/store/tema";
import d$proposal from "@/store/proposal";

export default {
  name: "AddRegistrasiKKN",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    const filterJenis = ref("");

    return {
      filterJenis,
      file: "",
      tema: "",
      kabupaten: "",
      kecamatan: "",
      potensi: "",
      choicesJenis: undefined,
      choicesTema: undefined,
      choicesProvinsi: undefined,
      choicesKabupaten: undefined,
      choicesKecamatan: undefined,
      listTemaActive: [],
      listKecamatan: [],
    };
  },
  computed: {
    ...mapState(d$wilayah, ["g$listKabupaten", "g$listKecamatan"]),
    ...mapState(d$tema, ["g$listTema"]),
  },
  mounted() {
    this.choicesJenis = this.getChoices("choices-jenis");
    this.choicesTema = this.getChoices("choices-tema");
    this.choicesProvinsi = this.getChoices("choices-provinsi");
    this.choicesKabupaten = this.getChoices("choices-kab");
    this.choicesKecamatan = this.getChoices("choices-kec");
  },
  beforeUnmount() {
    if (this.choicesJenis) this.choicesJenis.destroy();
    if (this.choicesTema) this.choicesTema.destroy();
    if (this.choicesProvinsi) this.choicesProvinsi.destroy();
    if (this.choicesKabupaten) this.choicesKabupaten.destroy();
    if (this.choicesKecamatan) this.choicesKecamatan.destroy();
  },
  methods: {
    ...mapActions(d$wilayah, ["a$listAllKabupaten"]),
    ...mapActions(d$tema, ["a$listTema"]),
    ...mapActions(d$proposal, ["a$addProposal"]),

    async addProposal() {
      this.file = this.$refs.file.files[0];
      this.kecamatan = parseInt(this.kecamatan);

      var body = {
        file: this.file,
        id_kecamatan: this.kecamatan,
        id_gelombang: this.$route.params.id_gelombang,
      };

      try {
        await this.a$addProposal(body);
        this.$router.push({ name: "RegistrasiKKN" });
        this.showSwal(
          "success-message",
          "Pengajuan proposal berhasil ditambahkan!"
        );
        this.sho;
      } catch (error) {
        this.showSwal(
          "failed-message",
          error ?? "Terjadi kesalahan saat menambahkan data"
        );
        console.log(error);
      }
    },

    async getPotensi() {
      this.kecamatan = parseInt(this.kecamatan);
      await this.g$listKecamatan.forEach((kecamatan) => {
        if (kecamatan.id_kecamatan === this.kecamatan) {
          this.potensi = kecamatan.potensi;
        }
      });
    },

    async getListKecamatan() {
      this.listKecamatan = [];
      this.kabupaten = parseInt(this.kabupaten);

      try {
        await this.g$listKecamatan.forEach((kecamatan) => {
          if (kecamatan.id_kabupaten === this.kabupaten && kecamatan.status) {
            this.listKecamatan.push(kecamatan);
          }
        });
        this.setChoices(this.choicesKecamatan, this.listKecamatan);
      } catch (error) {
        console.log(error);
      }
    },

    async getListKabupaten() {
      this.tema = parseInt(this.tema);

      try {
        await this.a$listAllKabupaten(this.tema);
        this.setChoices(this.choicesKabupaten, this.g$listKabupaten);
      } catch (error) {
        console.log(error);
      }
    },

    async getListTema() {
      // tambahin filter jenis
      this.listTemaActive = [];

      try {
        await this.a$listTema();
        this.g$listTema.forEach((tema) => {
          if (tema.status) this.listTemaActive.push(tema);
        });
        this.setChoices(this.choicesTema, this.listTemaActive);
        this.checkJenisSelection();
      } catch (error) {
        console.log(error);
      }
    },

    checkJenisSelection() {
      var element = document.getElementById("choices-jenis");
      if (element) {
        this.filterJenis = element.value;
      }
    },

    setChoices(choices, option) {
      if (choices) {
        choices.clearChoices();
        let newOption = [];
        option.forEach((item) => {
          newOption.push({
            value: Object.values(item)[0],
            label: item.nama,
          });
        });
        choices.setChoices(newOption);
      }
    },

    getChoices(id) {
      var element = document.getElementById(id);
      if (element) {
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
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
      }
    },
  },
};
</script>
