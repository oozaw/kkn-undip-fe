<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              :onclick="() => $router.push({ name: 'Bappeda' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-bappeda"
              class="mb-0 me-lg-2"
              color="success"
              variant="gradient"
              size="sm"
              >Tambah BAPPEDA</argon-button
            >
          </template>
        </HeaderProfileCard>
      </div>
    </div>
    <div class="mt-4">
      <div class="mt-4 mt-lg-0">
        <div class="card">
          <div class="card-body pb-5">
            <h5 class="font-weight-bolder mb-3">Tambah Bappeda</h5>
            <form id="form-bappeda" role="form" @submit.prevent="addBappeda()">
              <div class="row">
                <div class="col-12 col-sm-6">
                  <label>Nama</label>
                  <input
                    class="form-control"
                    type="text"
                    name="nama"
                    id="nama"
                    placeholder="Masukkan nama BAPPEDA"
                    v-model="body.nama"
                    required
                  />
                </div>
                <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                  <label>Nomor BAPPEDA</label>
                  <input
                    class="form-control"
                    type="number"
                    name="nomor"
                    id="nomor"
                    placeholder="Masukkan nomor BAPPEDA"
                    v-model="nomor"
                    required
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label class="form-label" for="kabupaten">Kabupaten</label>
                  <select
                    class="form-control"
                    name="choices-kabupaten"
                    id="choices-kabupaten"
                    v-model="body.kabupaten"
                  >
                    <option value="" disabled>-- Pilih Kabupaten --</option>
                    <option
                      v-for="kab in g$listKabupaten"
                      :value="kab.nama"
                      v-bind:key="kab.id_kabupaten"
                    >
                      {{ kab.nama }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label class="mt-4">Username</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Masukkan username"
                  />
                </div>
                <div class="col-6">
                  <label class="mt-4">Password</label>
                  <input
                    class="form-control"
                    type="password"
                    placeholder="Masukkan password"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Choices from "choices.js";
import ArgonButton from "@/components/ArgonButton.vue";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import d$bappeda from "@/store/bappeda";
import d$wilayah from "@/store/wilayah";
import { mapActions, mapState } from "pinia";

export default {
  name: "AddBappeda",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      nomor: "",
      body: {
        nama: "",
        nisn: "",
        kabupaten: "",
        nama_pj: "belum diketahui",
      },
      choicesKab: "",
    };
  },
  computed: {
    ...mapState(d$wilayah, ["g$listKabupaten"]),
  },
  async created() {
    try {
      await this.a$listKabupaten();
      this.choicesKab = this.getChoices("choices-kabupaten");
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions(d$bappeda, ["a$addBappeda"]),
    ...mapActions(d$wilayah, ["a$listKabupaten"]),

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

    async addBappeda() {
      if (this.body.kabupaten === "") {
        this.showSwal("failed-message", "Kabupaten belum dipilih!");
        return;
      }

      this.body.nisn = this.nomor.toString();

      try {
        console.log(this.body);
        await this.a$addBappeda(this.body);
        this.showSwal("success-message", "Data BAPPEDA berhasil ditambahkan!");
        setTimeout(() => {
          this.$router.push({ name: "Bappeda" });
        }, 2600);
      } catch (error) {
        this.showSwal("failed-message", error);
        console.log(error);
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
  beforeUnmount() {
    this.choicesKab.destroy();
  },
};
</script>
