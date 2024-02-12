<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard />
        <div id="card-profile-wilayah" class="card mt-4 pb-3">
          <div class="card-header">
            <h5>Tambah Lokasi Kecamatan dan Potensi</h5>
          </div>
          <div class="card-body pt-0">
            <form id="form-kec" role="form" @submit.prevent="addKecamatan()">
              <div class="row">
                <div class="col-12">
                  <label class="form-label">Tema KKN</label>
                  <select
                    name="tema"
                    id="choices-tema"
                    class="choices-tema"
                    v-model="input.id_tema"
                  >
                    <option value="" selected disabled hidden>
                      -- Pilih KKN --
                    </option>
                  </select>
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
                    v-model="input.kecamatan"
                    required
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label class="form-label">Jumlah Desa</label>
                  <input
                    class="form-control"
                    id="jumlah-desa"
                    name="jumlah-desa"
                    type="number"
                    placeholder="Jumlah desa"
                    v-model="jmlDesa"
                    @input="showFormDesa()"
                    required
                  />
                </div>
              </div>
              <div v-for="(form, key) in formDesa" v-bind:key="key">
                <span v-html="form"></span>
              </div>
              <div id="potensi-row" class="row mt-3">
                <div class="col-12">
                  <label class="mt-2">Potensi</label>
                  <quill-editor
                    id="potensi-editor"
                    v-model:content="input.potensi"
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
                    :onclick="() => $router.push({ name: 'Pengajuan Lokasi' })"
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    type="submit"
                    form="form-kec"
                    class="mb-0 me-lg-2"
                    color="success"
                    variant="gradient"
                    size="sm"
                    >Tambah Kecamatan</argon-button
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
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import img from "@/assets/img/team-3.jpg";
import d$wilayah from "@/store/wilayah";
import d$auth from "@/store/auth";
import d$tema from "@/store/tema";
import { mapActions, mapState } from "pinia";
import markerIcon from "@/assets/img/icons/marker.png";

export default {
  name: "AddKecamatan",
  components: {
    HeaderProfileCard,
    QuillEditor,
    ArgonButton,
  },
  data() {
    return {
      img,
      markerIcon,
      GeocodingControl,
      marker: undefined,
      circle: undefined,
      radius: 500,
      choicesTema: undefined,
      jmlDesa: 1,
      formDesa: [],
      valueFormDesa: "",
      input: {
        id_tema: "",
        kecamatan: "",
        desa: [
          {
            nama: "",
          },
        ],
        potensi: "",
      },
      listKabupatenTerdaftar: [],
      lat: -6.990632,
      long: 110.422941,
    };
  },
  computed: {
    ...mapState(d$tema, ["g$listTemaActive"]),
    ...mapState(d$auth, ["g$infoUser"]),
    ...mapState(d$wilayah, ["g$listKabupaten"]),
  },
  async created() {
    await this.getListTemaRegistered();
    // this.formDesa.push(this.valueFormDesa);
  },
  mounted() {
    this.initMap();
    this.showFormDesa();
    this.choicesTema = this.getChoices("choices-tema");
  },
  beforeUnmount() {
    if (this.choicesTema) this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$wilayah, ["a$addKecamatan", "a$listKabupatenTemaBappeda"]),
    ...mapActions(d$tema, ["a$listTema"]),

    async getListTemaRegistered() {
      try {
        this.listKabupatenTerdaftar = [];
        // this.choicesTema.clearChoices();
        await this.a$listTema();
        await this.g$listTemaActive.forEach((tema) => {
          this.getListKabupaten(tema.id_tema, tema.nama);
        });
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
    },

    async getListKabupaten(id_tema, nama_tema) {
      try {
        let temaData = {
          nama_tema,
        };
        await this.a$listKabupatenTemaBappeda(
          id_tema,
          this.g$infoUser.id_bappeda
        );
        await this.g$listKabupaten.forEach((kabupaten) => {
          let newData = {
            ...kabupaten,
            ...temaData,
          };
          this.listKabupatenTerdaftar.push(newData);
        });
        this.setChoices(this.choicesTema, this.listKabupatenTerdaftar);
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
    },

    async addKecamatan() {
      this.showSwal("loading");

      var jml = this.jmlDesa;
      this.input.desa = [];
      for (let i = 1; i <= jml; i++) {
        if (document.getElementById("desa_" + i)) {
          this.input.desa.push({
            nama: document.getElementById("desa_" + i).value,
          });
        }
      }

      // validation
      if (
        !this.input.id_tema ||
        this.input.id_tema === "" ||
        this.input.id_tema === "0"
      ) {
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
          id_kabupaten: parseInt(this.input.id_tema),
          nama: this.input.kecamatan,
          desa: this.input.desa,
          potensi: this.input.potensi,
          latitude: this.lat,
          longitude: this.long,
          radius: this.radius,
        };

        try {
          await this.a$addKecamatan(data);
          this.$router.push({ name: "Pengajuan Lokasi" });
          this.showSwal(
            "success-message",
            "Data kecamatan berhasil ditambahkan!"
          );
        } catch (error) {
          console.log(error);
          let msg = "";
          if (error.error && error.error != undefined) msg = error.error;
          else msg = error;
          this.showSwal("failed-message", "Data gagal ditambahkan! " + msg);
        }
      }
    },

    showFormDesa() {
      var jml = this.jmlDesa;

      var contentForm = "";
      var row = 1;
      if (jml % 4 == 0) {
        row = ~~(jml / 4);
      } else {
        row += ~~(jml / 4);
      }

      var counterTotalDesa = 1;
      for (let i = 1; i <= row; i++) {
        contentForm += `<div class="row mt-3">`;

        var counterCol = 1;
        for (let j = counterTotalDesa; j <= jml; j++) {
          if (counterCol > 4) {
            break;
          }

          contentForm +=
            `<div class="col-md-3 col-12">
                <label class="form-label">Desa ` +
            j +
            `</label>
                <input
                  class="form-control"
                  id="desa_` +
            j +
            `"
            name="desa_` +
            j +
            `"
                  type="text"
                  placeholder="Nama desa ` +
            j +
            `"
            required
                />
              </div>`;

          counterTotalDesa++;
          counterCol++;
        }
        contentForm += `</div>`;
      }
      this.valueFormDesa = contentForm;
      this.formDesa = [];
      this.formDesa.push(this.valueFormDesa);
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

      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        map.flyTo([this.lat, this.long], 15);
        this.marker.setLatLng([this.lat, this.long]);
        this.circle.setLatLng([this.lat, this.long]);
      });

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

    setChoices(choices, option) {
      if (choices) {
        choices.clearChoices();
        let newOption = [];
        option.forEach((item) => {
          newOption.push({
            value: Object.values(item)[0], // id_kabupaten
            label: item.nama_tema,
          });
        });
        choices.setChoices(newOption);
      }
    },

    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
          shouldSort: false,
        });
      }
    },

    isEmptyPotensi() {
      if (this.input.potensi == "" || this.input.potensi == "<p><br></p>") {
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
