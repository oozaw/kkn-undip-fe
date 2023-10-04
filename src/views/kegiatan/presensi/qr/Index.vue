<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <div class="mt-4 card">
          <div class="page-header min-vh-70">
            <div class="container" v-if="statusPresensi == true">
              <div class="row justify-content-center">
                <div class="col-lg-6 col-md-7 mx-auto text-center">
                  <h1 class="display-2 text-bolder text-success">Berhasil</h1>
                  <h3>Anda Telah Melakukan Presensi</h3>
                  <p class="lead">
                    Pada {{ tgl.format("dddd, DD MMMM YYYY") }}, {{ waktu }} WIB
                  </p>
                </div>
              </div>
            </div>
            <div class="container" v-else-if="statusPresensi == false">
              <div class="row justify-content-center">
                <div class="col-lg-6 col-md-7 mx-auto text-center">
                  <h1 class="display-2 text-bolder text-danger">Error</h1>
                  <h3>Presensi Gagal Dilakukan</h3>
                  <p class="lead">
                    {{ errorMsg }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import L from "leaflet";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$presensi from "@/store/presensi";
import d$auth from "@/store/auth";
import d$wilayah from "@/store/wilayah";

export default {
  name: "IndexPresensiQR",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      moment,
      isLoading: true,
      indexComponent: 0,
      tgl: this.$route.params.tgl,
      waktu: "",
      statusPresensi: undefined,
      errorMsg: "",
    };
  },
  computed: {
    ...mapState(d$auth, ["g$infoUser"]),
    ...mapState(d$presensi, ["g$presensi", "g$listPresensi"]),
    ...mapState(d$wilayah, ["g$kecamatan"]),
  },
  async created() {
    moment.locale("id");
    this.tgl = moment(this.tgl);
    await this.submitPresensi();
  },
  methods: {
    ...mapActions(d$presensi, ["a$submitPresensi"]),
    ...mapActions(d$wilayah, ["a$getKecamatanMhs"]),

    async submitPresensi() {
      this.showSwal("loading");

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              await this.a$getKecamatanMhs();

              const distance = this.getDistance(this.g$kecamatan, position);

              if (distance > this.g$kecamatan.radius) {
                this.statusPresensi = false;
                this.errorMsg = "Anda berada di luar radius kecamatan!";
                throw this.errorMsg;
              }

              this.waktu = moment().format("HH:mm:ss");
              await this.a$submitPresensi(Number(this.g$infoUser.id_tema), {
                tgl: this.tgl.format("YYYY-MM-DD"),
                status: 1,
              });

              this.statusPresensi = true;
              this.showSwal("success-message", "Berhasil melakukan presensi!");
            } catch (error) {
              console.log(error);
              let msg = "";
              if (error.error && error.error != undefined) msg = error.error;
              else msg = error;
              this.statusPresensi = false;
              this.errorMsg = msg;
              this.showSwal(
                "failed-message",
                "Presensi gagal dilakukan! " + msg
              );
            }
          },
          (error) => {
            if (error.code == error.PERMISSION_DENIED) {
              this.statusPresensi = false;
              this.errorMsg =
                "Anda harus mengizinkan akses lokasi untuk melakukan presensi!";
              this.showSwal(
                "failed-message",
                error.message + " " + this.errorMsg
              );
              return;
            } else {
              this.statusPresensi = false;
              this.errorMsg = "Terjadi kesalahan saat mengambil lokasi!";
              this.showSwal(
                "failed-message",
                this.errorMsg + " " + error.message
              );
              return;
            }
          }
        );
      } else {
        this.statusPresensi = false;
        this.errorMsg = "Browser tidak mendukung geolocation!";
        this.showSwal("failed-message", this.errorMsg);
        return;
      }
    },

    getDistance(kecamatan, position) {
      const coordinateKec = L.latLng(kecamatan.latitude, kecamatan.longitude);
      const coordinateMhs = L.latLng(
        position.coords.latitude,
        position.coords.longitude
      );

      return coordinateKec.distanceTo(coordinateMhs);
    },

    showSwal(type, text, toastText, id_mahasiswa_kecamatan) {
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
      } else if (type === "warning-confirmation") {
        this.$swal({
          title: "Apakah Anda yakin?",
          text: text,
          showCancelButton: true,
          confirmButtonText: "Ya!",
          cancelButtonText: "Batal!",
          customClass: {
            confirmButton: "btn bg-gradient-success",
            cancelButton: "btn bg-gradient-secondary",
          },
          buttonsStyling: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.deletePendaftaran(id_mahasiswa_kecamatan);
            this.$swal({
              toast: true,
              position: "top-end",
              title: toastText,
              icon: "success",
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
              didOpen: () => {
                this.$swal.hideLoading();
              },
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            this.$swal.close();
          }
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
