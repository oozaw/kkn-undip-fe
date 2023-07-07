<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              type="button"
              :onclick="() => $router.push({ name: 'Halaman' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-gelombang"
              class="mb-0 me-lg-2"
              color="primary"
              variant="gradient"
              size="sm"
              >Simpan Halaman</argon-button
            >
          </template>
        </HeaderProfileCard>
        <div class="card mt-4">
          <div class="card-header">
            <h5>Edit Halaman</h5>
          </div>
          <div class="card-body pt-0">
            <div class="row">
              <div class="col-12">
                <label class="form-label mt-2">Judul</label>
                <argon-input
                  id="judul"
                  name="judul"
                  type="text"
                  placeholder="Masukkan judul kegiatan"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 col-12">
                <label class="form-label mt-2">Tanggal Mulai</label>
                <flat-pickr
                  id="tanggal-mulai"
                  name="tanggal-mulai"
                  v-model="startDate"
                  class="form-control datetimepicker"
                  placeholder="Pilih tanggal mulai"
                  :config="config"
                ></flat-pickr>
              </div>
              <div class="col-sm-6 col-12">
                <label class="form-label mt-2">Tanggal Berakhir</label>
                <flat-pickr
                  id="tanggal-berakhir"
                  name="tanggal-berakhir"
                  v-model="endDate"
                  class="form-control datetimepicker"
                  placeholder="Pilih tanggal berakhir"
                  :config="config"
                ></flat-pickr>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-sm-6 col-12">
                <label for="choices-aktor" class="form-label">Aktor</label>
                <select
                  id="choices-aktor"
                  class="form-control"
                  name="choices-aktor"
                >
                  <option value="dosen">Dosen</option>
                  <option value="mahasiswa">Mahasiswa</option>
                  <option value="bappeda">BAPPEDA</option>
                </select>
              </div>
              <div class="col-sm-6 col-12">
                <label for="choices-status" class="form-label">Status</label>
                <select
                  id="choices-status"
                  class="form-control"
                  name="choices-status"
                >
                  <option value="1">Aktif</option>
                  <option value="0">Non-Aktif</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/material_blue.css";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import img from "@/assets/img/team-3.jpg";
import img1 from "@/assets/img/small-logos/logo-slack.svg";
import img2 from "@/assets/img/small-logos/logo-spotify.svg";
import img3 from "@/assets/img/small-logos/logo-atlassian.svg";
import img4 from "@/assets/img/small-logos/logo-asana.svg";

export default {
  name: "EditHalaman",
  components: {
    HeaderProfileCard,
    ArgonInput,
    flatPickr,
  },
  data() {
    return {
      img,
      img1,
      img2,
      img3,
      img4,
      choicesAktor: Choices,
      choicesStatus: Choices,
      startDate: "",
      endDate: "",
      config: {
        allowInput: true,
      },
    };
  },
  mounted() {
    this.choicesAktor = this.getChoices("choices-aktor");
    this.choicesStatus = this.getChoices("choices-status");
  },
  beforeUnmount() {
    this.choicesAktor.destroy();
    this.choicesStatus.destroy();
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
  },
};
</script>
