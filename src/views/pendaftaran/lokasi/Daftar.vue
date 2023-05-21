<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              :onclick="() => $router.push({ name: 'Index Lokasi' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-daftar-lokasi"
              class="mb-0 me-lg-2"
              color="success"
              variant="gradient"
              size="sm"
              >Submit Lokasi</argon-button
            >
          </template>
        </HeaderProfileCard>
        <div class="p-4 pt-3 bg-white card mt-4">
          <h5 class="">
            {{ "Daftar Lokasi di Gelombang " + $route.params.id_gelombang }}
          </h5>
          <div class="mt-2 row">
            <div class="col-md-4 col-12">
              <div class="row">
                <div class="col-12 align-self-center">
                  <label class="form-label mt-2">Provinsi</label>
                  <select
                    id="choices-prov"
                    class="form-control"
                    name="choices-prov"
                    v-model="body.id_provinsi"
                  >
                    <option value="" disabled hidden>
                      -- Pilih Provinsi --
                    </option>
                    <option value="jateng">Jawa Tengah</option>
                    <option value="FT">FT</option>
                    <option value="FPsi">FPsi</option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12 align-self-center">
                  <label class="form-label mt-2">Kabupaten</label>
                  <select
                    id="choices-kab"
                    class="form-control"
                    name="choices-kab"
                    v-model="body.id_kabupaten"
                  >
                    <option value="" disabled hidden>
                      -- Pilih Kabupaten --
                    </option>
                    <option value="kota_semarang">Kota Semarang</option>
                    <option value="FT">FT</option>
                    <option value="FPsi">FPsi</option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12 align-self-center">
                  <label class="form-label mt-2">Kecamatan</label>
                  <select
                    id="choices-kec"
                    class="form-control"
                    name="choices-kec"
                    v-model="body.id_kecamatan"
                  >
                    <option value="" disabled hidden>
                      -- Pilih Kecamatan --
                    </option>
                    <option value="Banyumanik">Banyumanik</option>
                    <option value="FT">FT</option>
                    <option value="FPsi">FPsi</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-8 col-12 mt-3 mt-md-0">
              <div class="col-12 ms-md-2 pe-1">
                <label class="form-label">Potensi Kecamatan ....:</label>
                <span id="potensi" class=""
                  ><ul>
                    <li>
                      The most beautiful curves of this swivel stool adds an
                      elegant touch to any environment
                    </li>
                    <li>
                      Memory swivel seat returns to original seat position
                    </li>
                    <li>
                      Comfortable integrated layered chair seat cushion design
                    </li>
                    <li>Fully assembled! No assembly required</li>
                  </ul></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$mahasiswa from "@/store/mahasiswa";
import d$wilayah from "@/store/wilayah";
import d$gelombang from "@/store/gelombang";

import team1 from "@/assets/img/team-1.jpg";

export default {
  name: "DaftarLokasi",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      body: {
        id_provinsi: "",
        id_kabupaten: "",
        id_kecamatan: "",
      },
      team1,
      prov: undefined,
      kab: undefined,
      kec: undefined,
    };
  },
  computed: {
    ...mapState(d$wilayah, ["g$listWilayah"]),
    ...mapState(d$gelombang, ["g$listGelombang"]),
  },
  mounted() {
    this.prov = this.getChoices("choices-prov");
    this.kab = this.getChoices("choices-kab");
    this.kec = this.getChoices("choices-kec");
  },
  beforeUnmount() {
    this.prov.destroy();
    this.kab.destroy();
    this.kec.destroy();
  },
  methods: {
    ...mapActions(d$mahasiswa, ["a$daftarLokasi"]),
    ...mapActions(d$wilayah, ["a$listWilayah"]),
    ...mapActions(d$gelombang, ["a$listGelombang"]),

    getChoices(id) {
      var element = document.getElementById(id);
      if (element) {
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
          shouldSort: true,
        });
      }
    },
  },
};
</script>
