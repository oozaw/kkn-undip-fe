<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <section v-if="g$statusHalaman">
          <HeaderProfileCard>
            <template #button>
              <argon-button
                type="button"
                :onclick="() => $router.push({ name: 'Registrasi' })"
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
            <h5 class="">
              {{ `Registrasi KKN ${gelombang.nama} ${tema.nama}` }}
            </h5>
            <form
              role="form"
              id="form-proposal"
              enctype="multipart/form-data"
              @submit.prevent="addProposal()"
            >
              <div class="mt-2 row">
                <div class="col-md-6 col-12">
                  <div class="reguler-section" :hidden="filterJenis !== 1">
                    <!-- <div class="row">
                      <div class="col-12 align-self-center">
                        <label class="form-label mt-2">Provinsi</label>
                        <select
                          id="choices-provinsi"
                          class="form-control"
                          name="choices-provinsi"
                          v-model="id_provinsi"
                        >
                          <option value="" selected hidden disabled>
                            -- Pilih Provinsi --
                          </option>
                        </select>
                      </div>
                    </div> -->
                    <div class="row mt-3">
                      <div class="col-12 align-self-center">
                        <label class="form-label mt-2">Kabupaten/ Kota</label>
                        <select
                          id="choices-kab"
                          class="form-control"
                          name="choices-kab"
                          v-model="id_kabupaten"
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
                          v-model="body.id_kecamatan"
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
                    <label class="form-label">{{
                      `Potensi Kecamatan ${kecamatan.nama ?? ""}`
                    }}</label>
                    <div class="row ms-1 text-md">
                      <span
                        id="potensi"
                        class=""
                        v-html="kecamatan.potensi"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
        <inactive-halaman v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import * as Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import InactiveHalaman from "@/views/dashboards/components/InactiveHalaman.vue";
import { mapActions, mapState } from "pinia";
import d$wilayah from "@/store/wilayah";
import d$tema from "@/store/tema";
import d$gelombang from "@/store/gelombang";
import d$proposal from "@/store/proposal";
import d$halaman from "@/store/halaman";

export default {
  name: "AddRegistrasiKKN",
  components: {
    HeaderProfileCard,
    ArgonButton,
    InactiveHalaman,
  },
  data() {
    const filterJenis = ref("");

    return {
      id_halaman: 1,
      filterJenis,
      body: {
        file: "",
        id_tema: "",
        id_kecamatan: "",
        id_gelombang: "",
      },
      tema: "",
      gelombang: "",
      id_provinsi: "",
      id_kabupaten: "",
      kecamatan: "",
      potensi: "",
      choicesProvinsi: undefined,
      choicesKabupaten: undefined,
      choicesKecamatan: undefined,
      listKecamatan: [],
    };
  },
  computed: {
    ...mapState(d$wilayah, ["g$listKabupaten", "g$listKecamatan"]),
    ...mapState(d$tema, ["g$listTema", "g$listTemaActive"]),
    ...mapState(d$gelombang, ["g$listGelombang"]),
    ...mapState(d$halaman, ["g$statusHalaman"]),
  },
  async created() {
    this.showSwal("loading");

    await this.a$checkHalaman(
      parseInt(this.$route.params.id_tema),
      parseInt(this.id_halaman)
    );
    if (this.g$statusHalaman) await this.getInitData();

    this.showSwal("close");
  },
  beforeUnmount() {
    if (this.choicesProvinsi) this.choicesProvinsi.destroy();
    if (this.choicesKabupaten) this.choicesKabupaten.destroy();
    if (this.choicesKecamatan) this.choicesKecamatan.destroy();
  },
  methods: {
    ...mapActions(d$wilayah, ["a$listKabupaten"]),
    ...mapActions(d$tema, ["a$listTema"]),
    ...mapActions(d$gelombang, ["a$listGelombang"]),
    ...mapActions(d$proposal, ["a$addProposal"]),
    ...mapActions(d$halaman, ["a$checkHalaman"]),

    async addProposal() {
      this.showSwal("loading");
      this.body.file = this.$refs.file.files[0];
      this.body.id_tema = parseInt(this.$route.params.id_tema);
      this.body.id_kecamatan = parseInt(this.body.id_kecamatan);
      this.body.id_gelombang = parseInt(this.$route.params.id_gelombang);

      if (!this.body.id_kecamatan) {
        this.showSwal("warning-message", "Kecamatan harus diisi!");
        return;
      }

      if (!this.body.file || this.body.file == undefined) {
        this.showSwal("warning-message", "File proposal harus diisi!");
        return;
      }

      try {
        await this.a$addProposal(this.body);
        this.$router.push({ name: "Registrasi" });
        this.showSwal(
          "success-message",
          "Pengajuan proposal berhasil ditambahkan!"
        );
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal ditambahkan! " + msg);
      }
    },

    async getPotensi() {
      this.body.id_kecamatan = parseInt(this.body.id_kecamatan);
      await this.g$listKecamatan.forEach((kecamatan) => {
        if (kecamatan.id_kecamatan === this.body.id_kecamatan) {
          this.kecamatan = kecamatan;
        }
      });
    },

    async getListKecamatan() {
      this.listKecamatan = [];
      this.id_kabupaten = parseInt(this.id_kabupaten);

      try {
        await this.g$listKecamatan.forEach((kecamatan) => {
          if (
            kecamatan.id_kabupaten === this.id_kabupaten &&
            kecamatan.status === 1
          ) {
            this.listKecamatan.push(kecamatan);
          }
        });
        this.setChoices(this.choicesKecamatan, this.listKecamatan);
      } catch (error) {
        console.log(error);
      }
    },

    async getInitData() {
      this.showSwal("loading");
      try {
        await this.a$listTema();
        await this.a$listGelombang(
          parseInt(this.$route.params.id_tema),
          parseInt(this.id_halaman)
        );

        // this.choicesProvinsi = this.getChoices("choices-provinsi");
        this.choicesKabupaten = this.getChoices("choices-kab");
        this.choicesKecamatan = this.getChoices("choices-kec");

        await this.getTema();
        await this.getGelombang();
        await this.getListKabupaten();

        this.showSwal("close");
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
    },

    async getListKabupaten() {
      try {
        await this.a$listKabupaten(parseInt(this.tema.id_tema));
        this.setChoices(this.choicesKabupaten, this.g$listKabupaten);
      } catch (error) {
        console.log(error);
      }
    },

    async getTema() {
      await this.g$listTemaActive.forEach((tema) => {
        if (tema.id_tema == this.$route.params.id_tema) {
          this.tema = tema;
          return;
        }
      });
      this.filterJenis = this.tema.jenis;
    },

    async getGelombang() {
      await this.g$listGelombang.forEach((gelombang) => {
        if (gelombang.id_gelombang == this.$route.params.id_gelombang) {
          this.gelombang = gelombang;
          return;
        }
      });
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
