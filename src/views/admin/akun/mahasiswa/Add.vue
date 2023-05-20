<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              :onclick="() => $router.push({ name: 'Mahasiswa' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-mahasiswa"
              class="mb-0 me-lg-2"
              color="success"
              variant="gradient"
              size="sm"
              >Tambah Mahasiswa</argon-button
            >
          </template>
        </HeaderProfileCard>
      </div>
    </div>
    <div class="mt-4">
      <div class="mt-4 mt-lg-0">
        <div class="card">
          <form
            id="form-mahasiswa"
            role="form"
            @submit.prevent="addMahasiswa()"
          >
            <div class="card-body pb-5">
              <h5 class="font-weight-bolder mb-3">Tambah Mahasiswa</h5>
              <!-- <div class="row">
                <div class="col-12 align-self-center">
                  <label for="choices-tema" class="form-label">Tema</label>
                  <select
                    id="choices-tema"
                    class="form-control"
                    name="choices-tema"
                    v-model="body.id_tema"
                  >
                    <option value="" disabled hidden>
                      -- Pilih periode --
                    </option>
                    <option value="1">KKN Reguler Tim I</option>
                    <option value="2">
                      KKN Tematik Pengurangan Risiko Bencana Berbasis
                      Partisipasi Masyarakat dan Komunitas
                    </option>
                  </select>
                </div>
              </div> -->
              <div class="row">
                <div class="col-12 col-sm-6">
                  <label>Nama</label>
                  <input
                    class="form-control"
                    type="text"
                    name="nama"
                    id="nama"
                    placeholder="Nama mahasiswa"
                    required
                    v-model="body.nama"
                  />
                </div>
                <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                  <label>NIM</label>
                  <input
                    class="form-control"
                    type="number"
                    name="nim"
                    id="nim"
                    placeholder="NIM mahasiswa"
                    required
                    v-model="body.nim"
                  />
                </div>
              </div>
              <!-- <div class="row mt-3">
                <div class="col-12">
                  <label class="form-label" for="prodi">Prodi</label>
                  <input
                    type="text"
                    class="form-control"
                    id="prodi"
                    name="prodi"
                    placeholder="Masukkan prodi"
                    required
                    v-model="body.prodi"
                  />
                </div>
              </div> -->
              <!-- <div class="row">
              <div class="col-3">
                <label class="mt-4">Fakultas</label>
                <select id="fakultas-add" class="form-control" name="fakultas">
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
                <select id="choices-prodi" class="form-control" name="fakultas">
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
import ArgonButton from "@/components/ArgonButton.vue";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import d$mahasiswa from "@/store/mahasiswa";
import { mapActions } from "pinia";

export default {
  name: "AddMahasiswa",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      body: {
        // id_tema: "",
        nama: "",
        nim: "",
        // prodi: "",
      },
      choicesTema: undefined,
    };
  },
  mounted() {
    // this.choicesTema = this.getChoices("choices-tema");
  },
  beforeUnmount() {
    // this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$mahasiswa, ["a$addMahasiswa"]),

    async addMahasiswa() {
      if (
        // !this.body.id_tema ||
        this.body.nama === "" ||
        this.body.nim === ""
        // this.body.prodi === ""
      ) {
        this.showSwal("failed-message", "Data masih belum lengkap!");
        return;
      }

      // this.body.id_tema = parseInt(this.body.id_tema);
      this.body.nim = this.body.nim.toString();

      console.log(this.body);
      try {
        await this.a$addMahasiswa(this.body);
        this.showSwal(
          "success-message",
          "Data mahasiswa berhasil ditambahkan!"
        );
        this.$router.push({ name: "Mahasiswa" });
      } catch (error) {
        this.showSwal(
          "failed-message",
          "Data mahasiswa gagal ditambahkan! " + error
        );
        console.log(error);
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
