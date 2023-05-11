<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard
          :button="true"
          button-text="Tambah Jadwal"
          description="KKN Reguler Tim 1 2023"
          :img="img3"
        />
        <div class="card mt-4">
          <div class="card-header">
            <h5>Tambah Jadwal Kegiatan Baru</h5>
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
  name: "TambahKalender",
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
      choicesJenis: Choices,
      choicesPeriode: Choices,
      startDate: "",
      endDate: "",
      config: {
        allowInput: true,
      },
    };
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
