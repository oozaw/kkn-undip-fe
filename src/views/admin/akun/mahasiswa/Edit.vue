<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              type="button"
              :onclick="() => $router.push({ name: 'Mahasiswa' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-edit-mahasiswa"
              class="mb-0 me-lg-2"
              color="primary"
              variant="gradient"
              size="sm"
              >Simpan Mahasiswa</argon-button
            >
          </template>
        </HeaderProfileCard>
      </div>
    </div>
    <div class="mt-4">
      <div class="mt-4 mt-lg-0">
        <div class="card">
          <form
            id="form-edit-mahasiswa"
            role="form"
            @submit.prevent="editMahasiswa()"
          >
            <div class="card-body pb-5">
              <h5 class="font-weight-bolder mb-3">Edit Mahasiswa</h5>
              <div class="row">
                <div class="col-12 col-sm-6">
                  <label>Nama</label>
                  <input
                    class="form-control"
                    type="text"
                    name="nama"
                    id="nama"
                    placeholder="Nama mahasiswa"
                    v-model="body.nama"
                    required
                  />
                </div>
                <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                  <label>NIM</label>
                  <input
                    class="form-control"
                    type="text"
                    name="nim"
                    id="nim"
                    placeholder="NIM mahasiswa"
                    v-model="body.nim"
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label class="mt-4">Fakultas</label>
                  <select
                    id="choices-fakultas"
                    class="form-control"
                    name="choices-fakultas"
                    v-model="idFakultas"
                    @change="getListProdi()"
                  >
                    <option value="" disabled>-- Pilih fakultas --</option>
                    <option
                      v-for="fakultas in g$listFakultas"
                      :key="fakultas.id_fakultas"
                      :value="fakultas.id_fakultas"
                    >
                      {{ fakultas.nama }}
                    </option>
                  </select>
                </div>
                <div class="col-6">
                  <label class="mt-4">Program Studi</label>
                  <select
                    id="choices-prodi"
                    class="form-control"
                    name="choices-prodi"
                    v-model="body.prodi"
                  >
                    <option value="" disabled>-- Pilih prodi --</option>
                  </select>
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
import Choices from "choices.js";
import ArgonButton from "@/components/ArgonButton.vue";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$fakultas from "@/store/fakultas";
import d$mahasiswa from "@/store/mahasiswa";

export default {
  name: "EditMahasiswa",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      idMahasiswa: parseInt(this.$route.params.id_mahasiswa),
      body: {
        nama: "",
        nim: "",
        prodi: "",
      },
      idFakultas: "",
      choicesFakultas: undefined,
      choicesProdi: undefined,
      loader: undefined,
    };
  },
  computed: {
    ...mapState(d$fakultas, ["g$listFakultas"]),
    ...mapState(d$mahasiswa, ["g$mahasiswa"]),
  },
  async created() {
    await this.getInitData();
  },
  beforeUnmount() {
    this.destroyChoices();
  },
  methods: {
    ...mapActions(d$mahasiswa, ["a$addMahasiswa"]),
    ...mapActions(d$fakultas, ["a$listFakultas"]),
    ...mapActions(d$mahasiswa, ["a$editMahasiswa", "a$getMahasiswa"]),

    async getInitData() {
      this.showLoading(true);

      try {
        await this.a$getMahasiswa(this.idMahasiswa);
        this.body.nama = this.g$mahasiswa.nama ?? "";
        this.body.nim = this.g$mahasiswa.nim ?? "";
        this.idFakultas = this.g$mahasiswa.id_fakultas ?? "";
        this.body.prodi = this.g$mahasiswa.id_prodi ?? "";

        await this.a$listFakultas();

        this.initChoices();

        if (this.body.prodi != "") this.getListProdi();
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

      this.showLoading(false);
    },

    async editMahasiswa() {
      this.showSwal("loading");

      if (
        this.body.nama === "" ||
        this.body.nim === "" ||
        this.body.prodi === ""
      ) {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      this.body.nim = this.body.nim.toString();
      this.body.prodi = parseInt(this.body.prodi);

      try {
        await this.a$editMahasiswa(this.idMahasiswa, this.body);
        this.showSwal("success-message", "Data mahasiswa berhasil disimpan!");
        this.$router.push({ name: "Mahasiswa" });
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal disimpan! " + msg);
      }
    },

    getListProdi() {
      this.g$listFakultas.forEach((fakultas) => {
        if (fakultas.id_fakultas == this.idFakultas) {
          this.setChoices(this.choicesProdi, fakultas.prodi);
        }
      });
    },

    initChoices() {
      this.choicesFakultas = this.getChoices("choices-fakultas");
      this.choicesProdi = this.getChoices("choices-prodi");
    },

    destroyChoices() {
      if (this.choicesFakultas) this.choicesFakultas.destroy();
      if (this.choicesProdi) this.choicesProdi.destroy();
    },

    setChoices(choices, option) {
      if (choices) {
        choices.clearChoices();
        choices.removeActiveItems();

        let newOption = [
          {
            value: "",
            label: "-- Pilih prodi --",
            selected: true,
            disabled: true,
          },
        ];

        if (this.body.prodi == "" || this.body.prodi == null)
          newOption.selected = true;
        else newOption.selected = false;

        option.forEach((item) => {
          newOption.push({
            value: Object.values(item)[0],
            label: Object.values(item)[2],
            selected: Object.values(item)[0] == this.body.prodi,
          });
        });
        choices.setChoices(newOption);
      }
    },

    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
          shouldSort: true,
        });
      }
    },

    showLoading(isLoading) {
      if (isLoading && !this.loader) {
        this.loader = this.$loading.show();
      } else if (!isLoading && this.loader) {
        this.loader.hide();
        this.loader = undefined;
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
