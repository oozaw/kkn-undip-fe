<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              type="button"
              :onclick="() => $router.push({ name: 'Administrator' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-admin"
              class="mb-0 me-lg-2"
              color="success"
              variant="gradient"
              size="sm"
              >Tambah Administrator</argon-button
            >
          </template>
        </HeaderProfileCard>
      </div>
    </div>
    <div class="mt-4">
      <div class="mt-4 mt-lg-0">
        <div class="card">
          <form id="form-admin" role="form" @submit.prevent="addAdmin()">
            <div class="card-body pb-5">
              <h5 class="font-weight-bolder mb-3">Tambah Administrator</h5>
              <div class="row">
                <div class="col-12 col-sm-6">
                  <label>Nama</label>
                  <input
                    class="form-control"
                    type="text"
                    name="nama"
                    id="nama"
                    placeholder="Masukkan nama administrator"
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
                    placeholder="Masukkan NIP administrator"
                    v-model="body.nip"
                    required
                  />
                </div>
              </div>
              <!-- Username & Password Section -->
              <!-- <div class="row">
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
import d$admin from "@/store/admin";
import { mapActions } from "pinia";

export default {
  name: "AddAdministrator",
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
    ...mapActions(d$admin, ["a$addAdmin"]),

    async addAdmin() {
      this.showSwal("loading");

      this.body.nip = this.body.nip.toString();

      // validation
      if (this.body.nama.length === 0 || this.body.nip.length === 0) {
        this.showSwal("warning-message", "Data belum lengkap!");
        return;
      }

      try {
        await this.a$addAdmin(this.body);
        this.showSwal("success-message", "Data Admin berhasil ditambahkan!");
        this.$router.push({ name: "Administrator" });
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
