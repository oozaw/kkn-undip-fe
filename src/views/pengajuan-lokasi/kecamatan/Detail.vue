<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card>
          <template #button>
            <argon-button
              @click="() => $router.go(-1)"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Kembali</argon-button
            >
            <argon-button
              @click="
                showSwal(
                  'warning-confirmation',
                  `Hapus kecamatan ${kecamatan?.nama}?`,
                  'Berhasil menghapus data',
                  id_kecamatan
                )
              "
              class="mb-0 me-2"
              color="danger"
              size="sm"
              v-if="kecamatan?.status == 0"
              >Hapus</argon-button
            >
            <argon-button
              @click="
                () =>
                  $router.push({
                    name: 'Edit Kecamatan',
                    params: { id_kecamatan: kecamatan?.id_kecamatan },
                  })
              "
              class="mb-0 me-lg-2"
              color="primary"
              size="sm"
              >Edit</argon-button
            >
          </template>
        </header-profile-card>
        <div class="bg-white pb-2 card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <h5 class="mb-2">Detail Kecamatan</h5>
            </div>
          </div>
          <div class="ms-2 pt-1 ps-3 card-body">
            <ul class="list-group px-3">
              <div class="row">
                <li
                  class="col-12 col-md-6 text-sm border-0 list-group-item ps-0 text-wrap"
                >
                  <strong class="text-dark">Tema:</strong>
                  &nbsp; {{ kecamatan?.nama_tema }}
                </li>
                <li
                  class="col-12 col-md-6 text-sm border-0 list-group-item ps-0 text-wrap"
                >
                  <strong class="text-dark">Koordinator Wilayah:</strong>
                  &nbsp; {{ kecamatan?.nama_korwil ?? "-" }}
                </li>
              </div>
              <div class="row">
                <li
                  class="col-12 col-md-6 text-sm border-0 list-group-item ps-0 text-wrap"
                >
                  <strong class="text-dark">Nama Kecamatan:</strong>
                  &nbsp; {{ kecamatan?.nama }}
                </li>
                <li
                  class="col-12 col-md-6 text-sm border-0 list-group-item ps-0 text-wrap"
                >
                  <strong class="text-dark">Status:</strong>
                  &nbsp;
                  <span
                    v-if="kecamatan?.status == 1"
                    class="badge badge-success"
                    >Diterima</span
                  >
                  <span
                    v-else-if="kecamatan?.status == 0"
                    class="badge badge-secondary"
                    >Sedang diproses</span
                  >
                  <span v-else class="badge badge-danger">Ditolak</span>
                </li>
              </div>
              <div class="row">
                <li
                  class="col-12 col-md-6 text-sm border-0 list-group-item ps-0 text-wrap"
                >
                  <strong class="text-dark">Jumlah Desa:</strong>
                  &nbsp; {{ kecamatan?.desa.length }}
                </li>
                <li
                  class="col-12 col-md-6 text-sm border-0 list-group-item ps-0 text-wrap"
                >
                  <strong class="text-dark">Desa:</strong>
                  &nbsp;
                  {{
                    kecamatan?.desa.length > 0
                      ? kecamatan?.desa?.map((item) => item.nama).join(", ")
                      : "-"
                  }}
                </li>
              </div>
            </ul>
            <div class="row mt-0 pb-4 px-1 mt-2">
              <div class="col-12">
                <strong class="text-dark text-sm mb-2">Potensi:</strong>
                <br />
                <quill-editor
                  class="bg-light mt-2"
                  :options="options"
                  id="potensi-editor"
                  style="height: 200px"
                  v-model:content="g$kecamatan.potensi"
                  contentType="html"
                  theme="snow"
                ></quill-editor>
              </div>
            </div>
            <div class="row mt-0 pb-4 px-1">
              <div class="col-12">
                <strong class="text-dark text-sm mb-2">Lokasi:</strong>
                <br />
                <div
                  class="mt-2"
                  id="map-container"
                  style="width: 100%; height: 500px"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import { GeocodingControl } from "@maptiler/geocoding-control/leaflet";
import "@maptiler/geocoding-control/style.css";
import { QuillEditor } from "@vueup/vue-quill";
import moment from "moment";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$wilayah from "@/store/wilayah";
import d$auth from "@/store/auth";
import markerIcon from "@/assets/img/icons/marker.png";

export default {
  name: "DetailKecamatan",
  components: {
    HeaderProfileCard,
    ArgonButton,
    QuillEditor,
  },
  data() {
    return {
      markerIcon,
      options: {
        modules: {
          toolbar: false,
        },
        readOnly: true,
      },
      id_kecamatan: parseInt(this.$route.params.id_kecamatan),
      kecamatan: undefined,
      moment,
      GeocodingControl,
      lat: -6.990632,
      long: 110.422941,
      radius: 500,
    };
  },
  computed: {
    ...mapState(d$auth, ["g$user"]),
    ...mapState(d$wilayah, ["g$kecamatan"]),
  },
  async created() {
    await this.getInitData();
  },
  methods: {
    ...mapActions(d$wilayah, ["a$getKecamatan", "a$deleteKecamatan"]),

    async getInitData() {
      this.showSwal("loading");

      try {
        await this.a$getKecamatan(this.id_kecamatan);
        this.kecamatan = this.g$kecamatan;
        this.lat = this.g$kecamatan.latitude ?? -6.990632;
        this.long = this.g$kecamatan.longitude ?? 110.422941;
        this.radius = this.g$kecamatan.radius ?? 500;
        this.initMap();
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

      this.showSwal("close");
    },

    async deleteKecamatan(id_kecamatan) {
      this.showSwal("loading");

      this.indexComponent++;

      try {
        await this.a$deleteKecamatan(parseInt(id_kecamatan));
        await this.getListKecamatan();
        this.showSwal("success-message", "Data mahasiswa berhasil dihapus!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }

      this.setupDataTable();
      this.setupTableAction();
    },

    initMap() {
      const map = L.map("map-container").setView([this.lat, this.long], 15);

      const myIcon = L.icon({
        iconUrl: this.markerIcon,
        iconSize: [40, 40],
      });

      this.marker = L.marker([this.lat, this.long], {
        icon: myIcon,
        draggable: false,
      }).addTo(map);

      this.circle = L.circle([this.lat, this.long], {
        color: "#3388ff",
        fillColor: "#3388ff",
        fillOpacity: 0.2,
        radius: this.radius,
      }).addTo(map);

      if (this.lat == -6.990632 && this.long == 110.422941) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          map.flyTo([this.lat, this.long], 15);
          this.marker.setLatLng([this.lat, this.long]);
          this.circle.setLatLng([this.lat, this.long]);
        });
      }
      const apiKey = "cP2yDHNucCi8NaSfzSFz";

      const scale = devicePixelRatio > 1.5 ? "@2x" : "";

      L.tileLayer(
        `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}${scale}.png?key=${apiKey}`,
        {
          tileSize: 512,
          zoomOffset: -1,
          minZoom: 1,
          attribution:
            '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>, ' +
            '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
          crossOrigin: true,
        }
      ).addTo(map);

      // L.control.maptilerGeocoding({ apiKey }).addTo(map);
    },

    showSwal(type, text, toastText, id_kecamatan) {
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
            this.deleteKecamatan(id_kecamatan);
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
