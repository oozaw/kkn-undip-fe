<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard
          :button="true"
          button-text="Simpan data desa"
          name="BAPPEDA Kota Semarang"
          description="Kota Semarang, Jawa Tengah, Indonesia"
          :img="img"
        />
        <div id="card-profile-wilayah" class="card mt-4 pb-2">
          <div class="card-header">
            <h5>Edit Lokasi Desa</h5>
          </div>
          <div class="card-body pt-0">
            <div class="row">
              <div class="col-sm-6 col-12">
                <label class="form-label">Kecamatan</label>
                <select
                  id="choices-kecamatan"
                  class="form-control"
                  name="choices-kecamatan"
                >
                  <option value="kec-a">Kecamatan A</option>
                  <option value="kec-b">Kecamatan B</option>
                  <option value="kec-C">Kecamatan C</option>
                </select>
              </div>
              <div class="col-sm-6 col-12">
                <label class="form-label">Kelurahan</label>
                <argon-input
                  id="kelurahan"
                  name="kelurahan"
                  type="text"
                  placeholder="Nama Kelurahan"
                  value="Kelurahan A"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <label class="form-label">Desa</label>
                <argon-input
                  id="desa"
                  name="desa"
                  type="text"
                  placeholder="Nama desa"
                  value="Desa A"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import img from "@/assets/img/team-3.jpg";
import img1 from "@/assets/img/small-logos/logo-slack.svg";
import img2 from "@/assets/img/small-logos/logo-spotify.svg";
import img3 from "@/assets/img/small-logos/logo-atlassian.svg";
import img4 from "@/assets/img/small-logos/logo-asana.svg";

export default {
  name: "EditDesa",
  components: {
    HeaderProfileCard,
    ArgonInput,
  },
  data() {
    return {
      img,
      img1,
      img2,
      img3,
      img4,
    };
  },
  mounted() {
    if (document.getElementById("choices-kecamatan")) {
      new Choices("#choices-kecamatan", {
        searchEnabled: true,
        allowHTML: true,
      });
    }
  },
};
</script>
