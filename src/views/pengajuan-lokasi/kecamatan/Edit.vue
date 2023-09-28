<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              type="button"
              :onclick="() => $router.go(-1)"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-kec"
              class="mb-0 me-lg-2"
              color="primary"
              variant="gradient"
              size="sm"
              >Simpan Perubahan</argon-button
            >
          </template>
        </HeaderProfileCard>
        <div id="card-profile-wilayah" class="card mt-4 pb-3">
          <div class="card-header">
            <h5>Edit Lokasi Kecamatan dan Potensi</h5>
          </div>
          <div class="card-body pt-0">
            <form id="form-kec" role="form" @submit.prevent="editKecamatan()">
              <div class="row">
                <div class="col-12">
                  <label class="form-label">Tema KKN</label>
                  <input
                    name="tema"
                    id="tema"
                    class="form-control"
                    :value="tema"
                    readonly
                    required
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label class="form-label">Kecamatan</label>
                  <input
                    class="form-control"
                    id="nama-kecamatan"
                    type="text"
                    placeholder="Nama kecamatan"
                    v-model="kecamatan"
                    required
                  />
                </div>
              </div>
              <div id="potensi-row" class="row mt-3">
                <div class="col-12">
                  <label class="mt-2">Potensi</label>
                  <quill-editor
                    id="potensi-editor"
                    v-model:content="potensi"
                    contentType="html"
                    theme="snow"
                    style="height: 200px"
                    placeholder="Isi dengan potensi kecamatan"
                  ></quill-editor>
                  <div class="invalid-feedback mb-3 ms-1">
                    <span id="potensi-validation"></span>
                  </div>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-12">
                  <label class="form-label">Lokasi</label>
                  <p class="font-italic text-sm mt-0 ms-1 mb-0">
                    Cari lokasi kecamatan, tandai lokasi tersebut dengan
                    menggeser penanda/ pointer pada peta ke tengah lokasi
                    kecamatan. Kemudia masukkan radius wilayah dari titik tengah
                    kecamatan melalui field di bawah ini.
                  </p>
                  <div class="d-flex ms-1">
                    <div class="mt-3">Radius (m):</div>
                    <div class="my-2 ms-2">
                      <input
                        class="form-control"
                        id="radius"
                        name="radius"
                        type="number"
                        placeholder="Masukkan radius wilayah dari titik tengah kecamatan (m)"
                        v-model="radius"
                        @input="setRadius()"
                        required
                      />
                    </div>
                  </div>
                  <div
                    class="ms-1"
                    id="map-container"
                    style="width: 100%; height: 500px"
                  ></div>
                </div>
              </div>
              <div class="row mt-4">
                <div
                  class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-end"
                >
                  <argon-button
                    type="button"
                    :onclick="() => $router.go(-1)"
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    type="submit"
                    form="form-kec"
                    class="mb-0 me-lg-2"
                    color="primary"
                    variant="gradient"
                    size="sm"
                    >Simpan Perubahan</argon-button
                  >
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
import { QuillEditor } from "@vueup/vue-quill";
import L from "leaflet";
import { GeocodingControl } from "@maptiler/geocoding-control/leaflet";
import "@maptiler/geocoding-control/style.css";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import d$wilayah from "@/store/wilayah";
import d$auth from "@/store/auth";
import d$tema from "@/store/tema";
import { mapActions, mapState } from "pinia";
import markerIcon from "@/assets/img/icons/marker.png";

export default {
  name: "EditKecamatan",
  components: {
    HeaderProfileCard,
    QuillEditor,
    ArgonButton,
  },
  data() {
    return {
      markerIcon,
      GeocodingControl,
      marker: undefined,
      circle: undefined,
      radius: 500,
      valueFormDesa: "",
      id_kecamatan: this.$route.params.id_kecamatan,
      tema: "",
      kecamatan: "",
      potensi: "",
      lat: -6.990632,
      long: 110.422941,
    };
  },
  computed: {
    ...mapState(d$tema, ["g$listTemaActive"]),
    ...mapState(d$auth, ["g$infoUser"]),
    ...mapState(d$wilayah, ["g$listKabupaten", "g$kecamatan"]),
  },
  async created() {
    await this.getInitData();
  },
  methods: {
    ...mapActions(d$wilayah, [
      "a$editKecamatan",
      "a$listKabupatenTemaBappeda",
      "a$getKecamatan",
    ]),
    ...mapActions(d$tema, ["a$listTema"]),

    async getInitData() {
      this.showSwal("loading");

      try {
        await this.a$getKecamatan(Number(this.id_kecamatan));
        this.tema = this.g$kecamatan.nama_tema;
        this.kecamatan = this.g$kecamatan.nama;
        this.potensi = this.g$kecamatan.potensi;
        this.lat = this.g$kecamatan.latitude ?? -6.990632;
        this.long = this.g$kecamatan.longitude ?? 110.422941;
        this.radius = this.g$kecamatan.radius ?? 500;
        this.initMap();
        this.showSwal("close");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat memuat data. " + msg
        );
      }
    },

    async editKecamatan() {
      this.showSwal("loading");

      // validation
      if (!this.tema || this.tema === "" || this.tema === "0") {
        this.showSwal("warning-message", "Tema tidak boleh kosong!");
        return;
      }

      var potensiEditor = document.getElementById("potensi-editor");
      var potensiValidation = document.getElementById("potensi-validation");
      var potensiRow = document.getElementById("potensi-row");
      if (this.isEmptyPotensi()) {
        potensiEditor.classList.add("is-invalid");
        potensiValidation.innerText = "Potensi tidak boleh kosong!";
        potensiRow.classList.add("pb-7");
        this.showSwal("warning-message", "Potensi tidak boleh kosong!");

        return;
      } else {
        potensiEditor.classList.remove("is-invalid");
        potensiValidation.innerText = "";
        potensiRow.classList.remove("pb-7");

        var data = {
          nama: this.kecamatan,
          potensi: this.potensi,
          latitude: this.lat,
          longitude: this.long,
          radius: this.radius,
        };

        try {
          await this.a$editKecamatan(this.id_kecamatan, data);
          this.$router.push({ name: "Pengajuan Lokasi" });
          this.showSwal("success-message", "Data kecamatan berhasil disimpan!");
        } catch (error) {
          console.log(error);
          let msg = "";
          if (error.error && error.error != undefined) msg = error.error;
          else msg = error;
          this.showSwal("failed-message", "Data gagal ditambahkan! " + msg);
        }
      }
    },

    initMap() {
      const map = L.map("map-container").setView([this.lat, this.long], 15);

      const myIcon = L.icon({
        iconUrl: this.markerIcon,
        iconSize: [40, 40],
      });

      this.marker = L.marker([this.lat, this.long], {
        icon: myIcon,
        draggable: true,
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

      L.control.maptilerGeocoding({ apiKey }).addTo(map);

      // onclick marker
      this.marker.on("dragend", (e) => {
        this.lat = e.target._latlng.lat;
        this.long = e.target._latlng.lng;
        this.circle.setLatLng([this.lat, this.long]);
      });

      // onclick map
      map.on("click", (e) => {
        this.lat = e.latlng.lat;
        this.long = e.latlng.lng;
        this.marker.setLatLng([this.lat, this.long]);
        this.circle.setLatLng([this.lat, this.long]);
      });
    },

    setRadius() {
      this.circle.setRadius(this.radius);
    },

    isEmptyPotensi() {
      if (this.potensi == "" || this.potensi == "<p><br></p>") {
        return true;
      } else {
        return false;
      }
    },

    showSwal(type, text, toastText) {
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
