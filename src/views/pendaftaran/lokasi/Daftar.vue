<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              :onclick="() => $router.push({ name: 'Index Lokasi' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-daftar-lokasi"
              class="mb-0 me-lg-2"
              color="success"
              variant="gradient"
              size="sm"
              >Submit Lokasi</argon-button
            >
          </template>
        </HeaderProfileCard>
        <div class="p-4 pt-3 bg-white card mt-4">
          <h5 class="">
            {{
              `Daftar Lokasi Pada Tema ${tema.nama ?? ""} di ${
                gelombang.nama ?? ""
              }`
            }}
          </h5>
          <div class="mt-2 row">
            <div class="col-md-4 col-12">
              <form
                role="form"
                id="form-daftar-lokasi"
                @submit.prevent="daftarLokasi()"
              >
                <div class="row">
                  <div class="col-12 align-self-center">
                    <label class="form-label mt-2">Provinsi</label>
                    <select
                      id="choices-prov"
                      class="form-control"
                      name="choices-prov"
                      v-model="prov"
                    >
                      <option value="" disabled hidden>
                        -- Pilih Provinsi --
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12 align-self-center">
                    <label class="form-label mt-2">Kabupaten</label>
                    <select
                      id="choices-kab"
                      class="form-control"
                      name="choices-kab"
                      v-model="kab"
                      @change="getListKecamatan()"
                    >
                      <option value="" disabled hidden>
                        -- Pilih Kabupaten --
                      </option>
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
                      <option value="" disabled hidden>
                        -- Pilih Kecamatan --
                      </option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-md-8 col-12 mt-3 mt-md-0">
              <div class="col-12 ms-md-2 pe-1">
                <label class="form-label"
                  >{{ `Potensi Kecamatan ${kec.nama ?? ""}` }}:</label
                >
                <div class="row ms-1 text-md">
                  <span id="potensi" class="" v-html="kec.potensi"></span>
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
import * as Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$mahasiswa from "@/store/mahasiswa";
import d$wilayah from "@/store/wilayah";
import d$gelombang from "@/store/gelombang";
import d$tema from "@/store/tema";

export default {
  name: "DaftarLokasi",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      id_halaman: 2,
      body: {
        id_tema: "",
        id_kecamatan: "",
        id_gelombang: "",
      },
      prov: "",
      kab: "",
      kec: "",
      choicesProv: undefined,
      choicesKab: undefined,
      choicesKec: undefined,
      tema: "",
      gelombang: "",
      listKecamatan: [],
    };
  },
  computed: {
    ...mapState(d$wilayah, ["g$listKabupaten", "g$listKecamatan"]),
    ...mapState(d$gelombang, ["g$listGelombang"]),
    ...mapState(d$tema, ["g$listTemaActive"]),
  },
  async created() {
    await this.getInitData();

    this.body.id_tema = parseInt(this.$route.params.id_tema);
    this.body.id_gelombang = parseInt(this.$route.params.id_gelombang);
  },
  mounted() {
    this.choicesProv = this.getChoices("choices-prov");
    this.choicesKab = this.getChoices("choices-kab");
    this.choicesKec = this.getChoices("choices-kec");
  },
  beforeUnmount() {
    if (this.choicesProv) this.choicesProv.destroy();
    if (this.choicesProv) this.choicesKab.destroy();
    if (this.choicesKec) this.choicesKec.destroy();
  },
  methods: {
    ...mapActions(d$mahasiswa, ["a$daftarLokasi"]),
    ...mapActions(d$wilayah, ["a$listAllKabupaten"]),
    ...mapActions(d$gelombang, ["a$listGelombang"]),
    ...mapActions(d$tema, ["a$listTema"]),

    async getInitData() {
      this.showSwal("loading");

      try {
        await this.a$listTema();
        await this.a$listGelombang(
          parseInt(this.$route.params.id_tema),
          parseInt(this.id_halaman)
        );
        await this.getTema();
        await this.getGelombang();
        await this.getListKabupaten();
        this.showSwal("close");
      } catch (error) {
        this.showSwal("failed-message", "Terjadi kesalahan saat memuat data");
        console.log(error);
      }
    },

    async daftarLokasi() {
      if (!this.body.id_kecamatan || this.body.id_kecamatan == "") {
        this.showSwal("warning-message", "Pilih kecamatan terlebih dahulu");
        return;
      }

      this.body.id_kecamatan = parseInt(this.body.id_kecamatan);

      try {
        await this.a$daftarLokasi(this.body);
        this.$router.push({
          name: "Index Lokasi",
        });
        this.showSwal("success-message", "Berhasil mendaftar lokasi");
      } catch (error) {
        this.showSwal("failed-message", error ?? "Gagal mendaftar lokasi");
        console.log(error);
      }
    },

    async getPotensi() {
      await this.g$listKecamatan.forEach((kecamatan) => {
        if (kecamatan.id_kecamatan == this.body.id_kecamatan) {
          this.kec = kecamatan;
        }
      });
    },

    async getListKecamatan() {
      this.listKecamatan = [];
      this.kab = parseInt(this.kab);

      try {
        await this.g$listKecamatan.forEach((kecamatan) => {
          if (kecamatan.id_kabupaten === this.kab && kecamatan.status === 1) {
            this.listKecamatan.push(kecamatan);
          }
        });
        this.setChoices(this.choicesKec, this.listKecamatan);
      } catch (error) {
        console.log(error);
      }
    },

    async getListKabupaten() {
      let tema = parseInt(this.$route.params.id_tema);

      try {
        await this.a$listAllKabupaten(tema);
        this.setChoices(this.choicesKab, this.g$listKabupaten);
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
          shouldSort: true,
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
