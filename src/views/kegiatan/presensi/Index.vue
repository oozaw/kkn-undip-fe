<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <choices-content-loader v-if="isLoading" />
        <div class="card mt-4 bg-white" :hidden="isLoading">
          <div class="card-body pb-2">
            <div class="d-flex">
              <div>
                <h5 class="text-bold text-dark">{{ today.time }} WIB</h5>
                <p class="text-bold text-dark text-lg">
                  {{ today.day }}, {{ today.date }}
                </p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-3">
                <div class="my-auto ms-auto">
                  <argon-button
                    v-if="!riwayatPresensi"
                    class="mb-0 me-2"
                    size="sm"
                    color="success"
                    variant="contained"
                    @click="submitPresensi()"
                    >Hadir
                  </argon-button>
                  <argon-button
                    class="mb-0 me-2"
                    size="sm"
                    color="primary"
                    variant="contained"
                  >
                    <font-awesome-icon icon="fa-solid fa-qrcode" class="me-2" />
                    Generate QR
                  </argon-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table-content-loader v-if="isLoading" />
        <div class="bg-white card mt-4" :hidden="isLoading">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Presensi Harian</h5>
                <p class="text-sm mb-0">Riwayat Presensi Harian</p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    class="mt-1 mb-0 btn btn-outline-success btn-sm export mt-sm-0"
                    data-type="csv"
                    type="button"
                    name="button"
                  >
                    Expor to Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="ms-2 pt-1 px-0 pb-0 card-body">
            <div class="table-responsive" :key="indexComponent">
              <table id="mhs-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th>No.</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(presensi, index) in listRiwayatPresensi"
                    :key="index"
                  >
                    <td class="text-sm">{{ index + 1 }}</td>
                    <td>
                      <h6 class="my-auto">
                        {{
                          moment(presensi.presensi.tgl).format(
                            "dddd, DD MMMM YYYY"
                          )
                        }}
                      </h6>
                    </td>
                    <td class="text-sm">
                      <span
                        class="badge badge-success"
                        v-if="presensi.status == 1"
                        >Hadir</span
                      >
                    </td>
                    <td class="text-sm">
                      {{ moment(presensi.updated_at).format("HH:mm:ss") }} WIB
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>No.</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Waktu</th>
                  </tr>
                </tfoot>
              </table>
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
import { DataTable } from "simple-datatables";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import ChoicesContentLoader from "@/views/dashboards/components/ChoicesContentLoader.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$presensi from "@/store/presensi";
import d$auth from "@/store/auth";
import d$wilayah from "@/store/wilayah";
import markerIcon from "@/assets/img/icons/marker.png";

export default {
  name: "IndexPresensi",
  components: {
    HeaderProfileCard,
    ArgonButton,
    TableContentLoader,
    ChoicesContentLoader,
  },
  data() {
    return {
      markerIcon,
      isLoading: true,
      moment,
      today: {
        day: "",
        date: "",
        time: "",
      },
      indexComponent: 0,
      riwayatPresensi: undefined,
      listRiwayatPresensi: [],
    };
  },
  computed: {
    ...mapState(d$auth, ["g$infoUser"]),
    ...mapState(d$presensi, ["g$presensi", "g$listPresensi"]),
    ...mapState(d$wilayah, ["g$kecamatan"]),
  },
  async created() {
    moment.locale("id");

    this.getDateTime();
    setInterval(() => {
      this.getDateTime();
    }, 1000);

    await this.getInitData();
  },
  methods: {
    ...mapActions(d$presensi, [
      "a$listPresensiMahasiswa",
      "a$getPresensi",
      "a$submitPresensi",
    ]),
    ...mapActions(d$wilayah, ["a$getKecamatanMhs"]),

    async getInitData() {
      this.isLoading = true;
      this.indexComponent++;
      this.listRiwayatPresensi = [];

      try {
        await this.a$listPresensiMahasiswa();
        await this.a$getPresensi(
          Number(this.g$infoUser.id_mahasiswa),
          moment().format("YYYY-MM-DD")
        );
        this.listRiwayatPresensi = this.g$listPresensi;
        this.riwayatPresensi = this.g$presensi;
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

      setTimeout(() => {
        this.setupDataTable();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async submitPresensi() {
      this.showSwal("loading");

      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              await this.a$getKecamatanMhs();

              const distance = this.getDistance(this.g$kecamatan, position);

              if (distance > this.g$kecamatan.radius) {
                this.showSwal(
                  "failed-message",
                  "Anda berada di luar radius kecamatan!"
                );
                return;
              }

              await this.a$submitPresensi(Number(this.g$infoUser.id_tema), {
                tgl: moment().format("YYYY-MM-DD"),
                status: 1,
              });

              this.showSwal("success-message", "Berhasil melakukan presensi!");
              await this.getInitData();
            },
            (error) => {
              if (error.code == error.PERMISSION_DENIED) {
                this.showSwal(
                  "failed-message",
                  "Anda harus mengizinkan akses lokasi untuk melakukan presensi!"
                );
                return;
              } else {
                this.showSwal(
                  "failed-message",
                  "Terjadi kesalahan saat mengambil lokasi!"
                );
                return;
              }
            }
          );
        } else {
          this.showSwal(
            "failed-message",
            "Browser tidak mendukung geolocation!"
          );
          return;
        }
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat melakukan presensi! " + msg
        );
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

    getDateTime() {
      const today = moment();
      this.today.day = today.format("dddd");
      this.today.date = today.format("DD MMMM YYYY");
      this.today.time = today.format("HH:mm:ss");
    },

    setupDataTable() {
      if (document.getElementById("mhs-list")) {
        const dataTableSearch = new DataTable("#mhs-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Seleksi Mahasiswa" + type,
            };

            if (type === "csv") {
              data.columnDelimiter = "|";
            }

            dataTableSearch.export(data);
          });
        });
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
