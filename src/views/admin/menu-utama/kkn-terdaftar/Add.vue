<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard
          :button="true"
          button-text="Tambah KKN"
          description="KKN Reguler Tim 1 2023"
          :img="img3"
        />
        <div class="card mt-4">
          <div class="card-header">
            <h5>Tambah KKN Baru</h5>
          </div>
          <div class="card-body pt-0">
            <div class="row">
              <div class="col-sm-6 col-12">
                <label class="form-label mt-2">Jenis KKN</label>
                <select
                  id="choices-jenis"
                  class="form-control"
                  name="choices-jenis"
                  @change="checkJenisSelection()"
                >
                  <option value="reguler">Reguler</option>
                  <option value="tematik">Tematik</option>
                </select>
              </div>
              <div class="col-sm-6 col-12">
                <label class="form-label mt-2">Periode</label>
                <select
                  id="choices-periode"
                  class="form-control"
                  name="choices-periode"
                >
                  <option value="reguler">2022/2023</option>
                  <option value="tematik">2023/2024</option>
                </select>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12">
                <label class="form-label mt-2">Tema</label>
                <argon-input
                  id="tema"
                  type="tema"
                  placeholder="Masukkan Tema KKN"
                />
              </div>
            </div>
            <div class="tematik-section" v-if="filterJenis === 'tematik'">
              <div class="row">
                <div class="col-sm-6 col-12">
                  <label class="form-label mt-2">Lokasi Provinsi</label>
                  <argon-input
                    id="provinsi"
                    name="provinsi"
                    type="text"
                    placeholder="Masukkan Provinsi"
                  />
                </div>
                <div class="col-sm-6 col-12">
                  <label class="form-label mt-2">Lokasi Kabupaten</label>
                  <argon-input
                    id="kabupaten"
                    name="kabupaten"
                    type="text"
                    placeholder="Masukkan kabupaten"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6 align-self-center">
                  <label class="form-label mt-2">Lokasi Kecamatan</label>
                  <argon-input
                    id="kecamatan"
                    name="kecamatan"
                    type="text"
                    placeholder="Masukkan kecamatan"
                  />
                </div>
                <div class="col-sm-6 align-self-center">
                  <label class="form-label mt-4 mt-sm-2"
                    >Lokasi Desa/ Kelurahan</label
                  >
                  <argon-input
                    id="desa"
                    name="desa"
                    type="text"
                    placeholder="Masukkan desa/ kelurahan"
                  />
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
import { ref } from "vue";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import img from "@/assets/img/team-3.jpg";
import img1 from "@/assets/img/small-logos/logo-slack.svg";
import img2 from "@/assets/img/small-logos/logo-spotify.svg";
import img3 from "@/assets/img/small-logos/logo-atlassian.svg";
import img4 from "@/assets/img/small-logos/logo-asana.svg";

export default {
  name: "TambahKKNTerdaftar",
  components: {
    HeaderProfileCard,
    ArgonInput,
  },
  data() {
    const filterJenis = ref("reguler");

    return {
      img,
      img1,
      img2,
      img3,
      img4,
      filterJenis,
      choicesJenis: Choices,
      choicesPeriode: Choices,
    };
  },
  mounted() {
    // mhs-section
    this.choicesJenis = this.getChoices("choices-jenis");
    this.choicesPeriode = this.getChoices("choices-periode");
  },
  beforeUnmount() {
    // mhs-section
    this.choicesJenis.destroy();
    this.choicesPeriode.destroy();
  },
  methods: {
    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
        });
      }
    },
    removeAllOptions(id) {
      var element = document.getElementById(id);
      if (element) {
        while (element.options.length > 0) {
          element.remove(0);
        }
      }
    },
    checkJenisSelection() {
      var element = document.getElementById("choices-jenis");
      if (element) {
        this.filterJenis = element.value;
      }
    },
  },
};
</script>
