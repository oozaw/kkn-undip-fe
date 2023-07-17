<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              type="button"
              :onclick="() => $router.push({ name: 'Pimpinan' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-pimpinan"
              class="mb-0 me-lg-2"
              color="success"
              variant="gradient"
              size="sm"
              >Tambah Pimpinan</argon-button
            >
          </template>
        </HeaderProfileCard>
      </div>
    </div>
    <div class="mt-4">
      <div class="mt-4 mt-lg-0">
        <div class="card">
          <form id="form-pimpinan" role="form" @submit.prevent="addPimpinan()">
            <div class="card-body pb-5">
              <h5 class="font-weight-bolder mb-3">Tambah Pimpinan</h5>
              <div class="row">
                <div class="col-12 col-sm-6">
                  <label>Nama</label>
                  <input
                    class="form-control"
                    type="text"
                    name="nama"
                    id="nama"
                    placeholder="Masukkan nama pimpinan"
                    v-model="body.nama"
                    required
                  />
                </div>
                <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                  <label>NIP</label>
                  <input
                    class="form-control"
                    type="text"
                    name="nip"
                    id="nip"
                    placeholder="Masukkan NIP pimpinan"
                    v-model="body.nip"
                    required
                  />
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
import d$pimpinan from "@/store/pimpinan";
import { mapActions } from "pinia";

export default {
  name: "AddPimpinan",
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
    };
  },
  methods: {
    ...mapActions(d$pimpinan, ["a$addPimpinan"]),

    async addPimpinan() {
      this.showSwal("loading");

      this.body.nip = this.body.nip.toString();

      // validation
      if (this.body.nama === "" || this.body.nip === "") {
        this.showSwal("warning-message", "Data belum lengkap!");
        return;
      }

      try {
        await this.a$addPimpinan(this.body);
        this.showSwal("success-message", "Data Pimpinan berhasil ditambahkan!");
        this.$router.push({ name: "Pimpinan" });
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
