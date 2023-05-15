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
                <div class="col-12 col-sm-6 mt-sm-0">
                  <label class="form-label" for="kabupaten">Kabupaten</label>
                  <input
                    class="form-control"
                    type="text"
                    name="kabupaten"
                    id="kabupaten"
                    placeholder="Masukkan nama kabupaten"
                    v-model="body.kabupaten"
                    required
                  />
                </div>
                <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                  <label class="form-label" for="nama-pj"
                    >Nama Penanggung Jawab</label
                  >
                  <input
                    class="form-control"
                    type="text"
                    name="nama-pj"
                    id="nama-pj"
                    placeholder="Masukkan nama penanggung jawab"
                    v-model="body.nama_pj"
                    required
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
import { mapActions } from "pinia";

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
        nama_pj: "",
      },
      choicesKab: "",
    };
  },
  methods: {
    ...mapActions(d$bappeda, ["a$addBappeda"]),

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
      // validation
      if (
        this.body.kabupaten === "" ||
        this.body.nama === "" ||
        this.body.nama_pj === "" ||
        this.nomor === ""
      ) {
        this.showSwal("failed-message", "Data belum lengkap!");
        return;
      }

      this.body.nisn = this.nomor.toString();

      try {
        console.log(this.body);
        await this.a$addBappeda(this.body);
        this.showSwal("success-message", "Data BAPPEDA berhasil ditambahkan!");
        this.$router.push({ name: "Bappeda" });
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
};
</script>
