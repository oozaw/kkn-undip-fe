<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              type="button"
              :onclick="() => $router.push({ name: 'Tema KKN' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-tema"
              class="mb-0 me-lg-2"
              color="primary"
              variant="gradient"
              size="sm"
              >Simpan Perubahan</argon-button
            >
          </template>
        </HeaderProfileCard>
        <div class="card mt-4">
          <div class="card-header pb-0">
            <h5>Edit Tema KKN</h5>
          </div>
          <form role="form" id="form-tema" @submit.prevent="editTema()">
            <div class="card-body pt-0">
              <div class="row mt-1">
                <div class="col-sm-6 col-12">
                  <label class="form-label mt-2">Jenis KKN</label>
                  <select
                    id="choices-jenis"
                    class="form-control"
                    name="choices-jenis"
                    v-model="jenis"
                    disabled
                  >
                    <option value="1">Reguler</option>
                    <option value="2">Tematik</option>
                  </select>
                </div>
                <div class="col-sm-6 col-12">
                  <label class="form-label mt-4 mt-sm-2">Periode</label>
                  <input
                    class="form-control"
                    id="periode"
                    name="periode"
                    type="text"
                    placeholder="Contoh: 2022/2023"
                    v-model="body.periode"
                    :isRequired="true"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="form-label mt-4">Tema</label>
                  <input
                    id="tema"
                    name="tema"
                    type="text"
                    class="form-control"
                    placeholder="Masukkan Tema KKN"
                    v-model="body.tema"
                    :isRequired="true"
                  />
                </div>
              </div>
              <div class="tematik-section" v-if="filterJenis === '2'">
                <div class="row">
                  <div class="col-sm-6 col-12">
                    <label class="form-label mt-4">Lokasi Provinsi</label>
                    <input
                      class="form-control"
                      id="provinsi"
                      name="provinsi"
                      type="text"
                      placeholder="Masukkan Provinsi"
                      v-model="body.prov"
                      :isRequired="true"
                    />
                  </div>
                  <div class="col-sm-6 col-12">
                    <label class="form-label mt-4">Lokasi Kabupaten</label>
                    <input
                      class="form-control"
                      id="kabupaten"
                      name="kabupaten"
                      type="text"
                      placeholder="Masukkan kabupaten"
                      v-model="body.kab"
                      :isRequired="true"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 align-self-center">
                    <label class="form-label mt-4">Lokasi Kecamatan</label>
                    <input
                      class="form-control"
                      id="kecamatan"
                      name="kecamatan"
                      type="text"
                      placeholder="Masukkan kecamatan"
                      v-model="body.kec"
                      :isRequired="true"
                    />
                  </div>
                  <div class="col-sm-6 align-self-center">
                    <label class="form-label mt-4"
                      >Lokasi Desa/ Kelurahan</label
                    >
                    <input
                      class="form-control"
                      id="desa"
                      name="desa"
                      type="text"
                      placeholder="Masukkan desa/ kelurahan"
                      v-model="body.desa"
                      :isRequired="true"
                    />
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
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$tema from "@/store/tema";

export default {
  name: "EditTemaKKN",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    const filterJenis = ref("1");

    return {
      idTema: parseInt(this.$route.params.id_tema),
      jenis: "1",
      body: {
        periode: "",
        nama: "",
        prov: "",
        kab: "",
        kec: "",
        desa: "",
      },
      filterJenis,
      choicesJenis: undefined,
      choicesPeriode: undefined,
    };
  },
  computed: {
    ...mapState(d$tema, ["g$tema"]),
  },
  async created() {
    await this.getInitData();

    // mhs-section
    this.choicesJenis = this.getChoices("choices-jenis");
    this.choicesPeriode = this.getChoices("choices-periode");
  },
  beforeUnmount() {
    // mhs-section
    if (this.choicesJenis) this.choicesJenis.destroy();
    if (this.choicesPeriode) this.choicesPeriode.destroy();
  },
  methods: {
    ...mapActions(d$tema, ["a$addTema", "a$getTema", "a$editTema"]),

    async editTema() {
      this.showSwal("loading");

      var input = {
        nama: this.body.tema,
        periode: this.body.periode,
      };

      if (
        !input.nama ||
        input.nama == "" ||
        !input.periode ||
        input.periode == ""
      ) {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      try {
        await this.a$editTema(this.idTema, input);
        this.$router.push({ name: "Tema KKN" });
        this.showSwal("success-message", "Tema KKN berhasil disimpan!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal disimpan! " + msg);
      }
    },

    async getInitData() {
      try {
        await this.a$getTema(this.idTema);

        this.body.tema = this.g$tema.nama;
        this.jenis = this.g$tema.jenis;
        this.filterJenis = this.g$tema.jenis.toString();
        this.body.periode = this.g$tema.periode;

        if (this.g$tema.jenis == 2) {
          this.body.kab = this.g$tema.kab;
          this.body.kec = this.g$tema.kec;
          this.body.desa = this.g$tema.desa;
        }
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

    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
        });
      }
    },

    removeAllOptions(id) {
      var element = document.getElementById(id);
      if (element) {
        while (element.options.length > 0) {
          element.remove(0);
        }
      }
    },

    checkJenisSelection() {
      var element = document.getElementById("choices-jenis");
      if (element) {
        this.filterJenis = element.value;
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
