<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              type="button"
              :onclick="() => $router.push({ name: 'Bappeda' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-edit-bappeda"
              class="mb-0 me-lg-2"
              color="primary"
              variant="gradient"
              size="sm"
              >Simpan BAPPEDA</argon-button
            >
          </template>
        </HeaderProfileCard>
      </div>
    </div>
    <div class="mt-4">
      <div class="mt-4 mt-lg-0">
        <div class="card">
          <div class="card-body pb-5">
            <h5 class="font-weight-bolder mb-3">Edit BAPPEDA</h5>
            <form
              id="form-edit-bappeda"
              role="form"
              @submit.prevent="editBappeda()"
            >
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
                    v-model="body.nb"
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
                    v-model="body.nama_kabupaten"
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
import ArgonButton from "@/components/ArgonButton.vue";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import d$bappeda from "@/store/bappeda";
import { mapActions, mapState } from "pinia";

export default {
  name: "EditBappeda",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      idBappeda: parseInt(this.$route.params.id_bappeda),
      body: {
        nama: "",
        nb: "",
        nama_kabupaten: "",
        nama_pj: "",
      },
    };
  },
  computed: {
    ...mapState(d$bappeda, ["g$bappeda"]),
  },
  async created() {
    await this.getInitData();
  },
  methods: {
    ...mapActions(d$bappeda, ["a$editBappeda", "a$getBappeda"]),

    async getInitData() {
      try {
        await this.a$getBappeda(this.idBappeda);
        this.body.nama = this.g$bappeda.nama;
        this.body.nb = this.g$bappeda.nb;
        this.body.nama_kabupaten = this.g$bappeda.nama_kabupaten;
        this.body.nama_pj = this.g$bappeda.nama_pj;
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat mengambil data! " + msg
        );
      }
    },

    async editBappeda() {
      this.showSwal("loading");

      // validation
      if (
        this.body.nama_kabupaten === "" ||
        this.body.nama === "" ||
        this.body.nama_pj === "" ||
        this.nomor === ""
      ) {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      this.body.nb = this.body.nb.toString();

      try {
        await this.a$editBappeda(this.idBappeda, this.body);
        this.showSwal("success-message", "Data BAPPEDA berhasil disimpan!");
        this.$router.push({ name: "Bappeda" });
      } catch (error) {
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat memperbarui data! " + msg
        );
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
