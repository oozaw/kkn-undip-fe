<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard>
          <template #button>
            <argon-button
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
              color="success"
              variant="gradient"
              size="sm"
              >Tambah Tema</argon-button
            >
          </template>
        </HeaderProfileCard>
        <div class="card mt-4">
          <div class="card-header">
            <h5>Tambah Tema KKN Baru</h5>
          </div>
          <form role="form" id="form-tema" @submit.prevent="addTema()">
            <div class="card-body pt-0">
              <div class="row">
                <div class="col-sm-6 col-12">
                  <label class="form-label mt-2">Jenis KKN</label>
                  <select
                    id="choices-jenis"
                    class="form-control"
                    name="choices-jenis"
                    @change="checkJenisSelection()"
                  >
                    <option value="reguler">Reguler</option>
                    <option value="tematik">Tematik</option>
                  </select>
                </div>
                <div class="col-sm-6 col-12">
                  <label class="form-label mt-2">Periode</label>
                  <select
                    id="choices-periode"
                    class="form-control"
                    name="choices-periode"
                  >
                    <option value="reguler">2022/2023</option>
                    <option value="tematik">2023/2024</option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label class="form-label mt-2">Tema</label>
                  <argon-input
                    id="tema"
                    type="tema"
                    placeholder="Masukkan Tema KKN"
                    v-model="body.tema"
                    :isRequired="true"
                  />
                </div>
              </div>
              <div class="tematik-section" v-if="filterJenis === 'tematik'">
                <div class="row">
                  <div class="col-sm-6 col-12">
                    <label class="form-label mt-2">Lokasi Provinsi</label>
                    <argon-input
                      id="provinsi"
                      name="provinsi"
                      type="text"
                      placeholder="Masukkan Provinsi"
                      v-model="body.provinsi"
                      :isRequired="true"
                    />
                  </div>
                  <div class="col-sm-6 col-12">
                    <label class="form-label mt-2">Lokasi Kabupaten</label>
                    <argon-input
                      id="kabupaten"
                      name="kabupaten"
                      type="text"
                      placeholder="Masukkan kabupaten"
                      v-model="body.kabupaten"
                      :isRequired="true"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 align-self-center">
                    <label class="form-label mt-2">Lokasi Kecamatan</label>
                    <argon-input
                      id="kecamatan"
                      name="kecamatan"
                      type="text"
                      placeholder="Masukkan kecamatan"
                      v-model="body.kecamatan"
                      :isRequired="true"
                    />
                  </div>
                  <div class="col-sm-6 align-self-center">
                    <label class="form-label mt-4 mt-sm-2"
                      >Lokasi Desa/ Kelurahan</label
                    >
                    <argon-input
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
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions } from "pinia";
import d$tema from "@/store/tema";

export default {
  name: "TambahTemaKKN",
  components: {
    HeaderProfileCard,
    ArgonInput,
    ArgonButton,
  },
  data() {
    const filterJenis = ref("reguler");

    return {
      body: {
        jenis: "reguler",
        periode: "2022/2023",
        tema: "",
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        desa: "",
      },
      filterJenis,
      choicesJenis: undefined,
      choicesPeriode: undefined,
    };
  },
  mounted() {
    // mhs-section
    this.choicesJenis = this.getChoices("choices-jenis");
    this.choicesPeriode = this.getChoices("choices-periode");
  },
  beforeUnmount() {
    // mhs-section
    this.choicesJenis.destroy();
    this.choicesPeriode.destroy();
  },
  methods: {
    ...mapActions(d$tema, ["a$addTema"]),

    async addTema() {
      var input = {
        nama: this.body.tema,
      };

      try {
        await this.a$addTema(input);
        this.$router.push({ name: "Tema KKN" });
        this.showSwal("success-message", "Tema KKN berhasil ditambahkan!");
      } catch (error) {
        this.showSwal("failed-message", error ?? "Tema KKN gagal ditambahkan!");
        console.log(error);
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
