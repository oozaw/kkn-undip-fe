<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              :onclick="() => $router.push({ name: 'Dosen' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-dosen"
              class="mb-0 me-lg-2"
              color="success"
              variant="gradient"
              size="sm"
              >Tambah Dosen</argon-button
            >
          </template>
        </HeaderProfileCard>
      </div>
    </div>
    <div class="mt-4">
      <div class="mt-4 mt-lg-0">
        <div class="card">
          <form role="form" id="form-dosen" @submit.prevent="addDosen()">
            <div class="card-body pb-5">
              <h5 class="font-weight-bolder mb-3">Tambah Dosen</h5>
              <div class="row">
                <div class="col-12 col-sm-6">
                  <label>Nama</label>
                  <input
                    class="form-control"
                    type="text"
                    name="nama"
                    id="nama"
                    placeholder="Masukkan nama lengkap"
                    required
                    v-model="body.nama"
                  />
                </div>
                <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                  <label>NIP</label>
                  <input
                    class="form-control"
                    type="number"
                    name="nip"
                    id="nip"
                    placeholder="Masukkan NIP"
                    required
                    v-model="body.nip"
                  />
                </div>
              </div>
              <!-- <div class="row">
                <div class="col-3">
                  <label class="mt-4">Fakultas</label>
                  <select
                    id="fakultas-add"
                    class="form-control"
                    name="fakultas"
                  >
                    <option value="0" selected disabled hidden>
                      -- Pilih fakultas --
                    </option>
                    <option value="Choice 2">Real Estate</option>
                    <option value="Choice 3">Electronics</option>
                    <option value="Choice 4">Clothing</option>
                    <option value="Choice 5">Others</option>
                  </select>
                </div>
                <div class="col-3">
                  <label class="mt-4">Jurusan</label>
                  <select id="jurusan-add" class="form-control" name="fakultas">
                    <option value="0" selected disabled hidden>
                      -- Pilih jurusan --
                    </option>
                    <option value="Choice 2">Real Estate</option>
                    <option value="Choice 3">Electronics</option>
                    <option value="Choice 4">Clothing</option>
                    <option value="Choice 5">Others</option>
                  </select>
                </div>
                <div class="col-3">
                  <label class="mt-4">Username</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Masukkan username"
                  />
                </div>
                <div class="col-3">
                  <label class="mt-4">Password</label>
                  <input
                    class="form-control"
                    type="password"
                    placeholder="Masukkan password"
                  />
                </div>
              </div> -->
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import d$dosen from "@/store/dosen";
import { mapActions } from "pinia";

export default {
  name: "AddDosen",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      body: {
        nama: "",
        nip: "",
      },
      choicesFakultas: undefined,
      choicesJurusan: undefined,
    };
  },
  mounted() {
    // this.choicesFakultas = this.getChoices("fakultas-add");
    // this.choicesJurusan = this.getChoices("jurusan-add");
  },
  beforeUnmount() {
    // this.choicesFakultas.destroy();
    // this.choicesJurusan.destroy();
  },
  methods: {
    ...mapActions(d$dosen, ["a$addDosen"]),

    async addDosen() {
      this.showSwal("loading");

      this.body.nip = this.body.nip.toString();

      if (this.body.nama === "" || this.body.nip === "") {
        this.showSwal("failed-message", "Data tidak boleh kosong!");
        return;
      }

      try {
        await this.a$addDosen(this.body);
        this.showSwal("success-message", "Data Dosen berhasil ditambahkan!");
        this.$router.push({ name: "Dosen" });
      } catch (error) {
        this.showSwal("failed-message", error);
        console.log(error);
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
