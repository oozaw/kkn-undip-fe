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
              color="success"
              variant="gradient"
              size="sm"
              >Tambah Tema</argon-button
            >
          </template>
        </HeaderProfileCard>
        <div class="card mt-4">
          <div class="card-header pb-1">
            <h5>Tambah Tema KKN Baru</h5>
          </div>
          <form role="form" id="form-tema" @submit.prevent="addTema()">
            <div class="card-body pt-1">
              <div class="row">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Jenis KKN</label>
                  <select
                    id="choices-jenis"
                    class="form-control"
                    name="choices-jenis"
                    @change="checkJenisSelection()"
                    v-model="body.jenis"
                  >
                    <option value="" disabled>-- Pilih jenis tema --</option>
                    <option value="1">Reguler</option>
                    <option value="2">Tematik</option>
                  </select>
                </div>
                <div class="col-sm-6 col-12 mt-3 mt-sm-0">
                  <label class="form-label">Periode</label>
                  <argon-input
                    id="periode"
                    type="periode"
                    placeholder="Contoh: 2022/2023"
                    v-model="body.periode"
                    :isRequired="true"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <label class="form-label">Tema</label>
                  <argon-input
                    id="tema"
                    type="tema"
                    placeholder="Masukkan Tema KKN"
                    v-model="body.nama"
                    :isRequired="true"
                  />
                </div>
              </div>
              <div class="tematik-section" v-if="filterJenis === '2'">
                <div class="row">
                  <div class="col-sm-6 col-12">
                    <label class="form-label">Lokasi Provinsi</label>
                    <argon-input
                      id="provinsi"
                      name="provinsi"
                      type="text"
                      placeholder="Masukkan Provinsi"
                      v-model="body.prov"
                      :isRequired="true"
                    />
                  </div>
                  <div class="col-sm-6 col-12">
                    <label class="form-label">Lokasi Kabupaten</label>
                    <argon-input
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
                    <label class="form-label">Lokasi Kecamatan</label>
                    <argon-input
                      id="kecamatan"
                      name="kecamatan"
                      type="text"
                      placeholder="Masukkan kecamatan"
                      v-model="body.kec"
                      :isRequired="true"
                    />
                  </div>
                  <div class="col-sm-6 align-self-center">
                    <label class="form-label">Lokasi Desa/ Kelurahan</label>
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
    const filterJenis = ref("1");

    return {
      body: {
        jenis: "",
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
  mounted() {
    // mhs-section
    this.choicesJenis = this.getChoices("choices-jenis");
  },
  beforeUnmount() {
    // mhs-section
    if (this.choicesJenis) this.choicesJenis.destroy();
  },
  methods: {
    ...mapActions(d$tema, ["a$addTema"]),

    async addTema() {
      this.showSwal("loading");

      console.log(this.body);
      if (
        !this.body.nama ||
        this.body.nama == "" ||
        !this.body.periode ||
        this.body.periode == "" ||
        !this.body.jenis ||
        this.body.jenis == "0"
      ) {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      if (
        this.body.jenis == "2" &&
        (!this.body.prov ||
          this.body.prov == "" ||
          !this.body.kab ||
          this.body.kab == "" ||
          !this.body.kec ||
          this.body.kec == "" ||
          !this.body.desa ||
          this.body.desa == "")
      ) {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      try {
        this.body.jenis = parseInt(this.body.jenis);
        delete this.body.prov;
        await this.a$addTema(this.body);
        this.$router.push({ name: "Tema KKN" });
        this.showSwal("success-message", "Tema KKN berhasil ditambahkan!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal ditambahkan! " + msg);
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
