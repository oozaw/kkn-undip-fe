<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard
          :button="true"
          button-text="Tambah data kecamatan"
          name="BAPPEDA Kota Semarang"
          description="Kota Semarang, Jawa Tengah, Indonesia"
          :img="img"
        />
        <div id="card-profile-wilayah" class="card mt-4 pb-3">
          <div class="card-header">
            <h5>Tambah Lokasi Kecamatan dan Potensi</h5>
          </div>
          <div class="card-body pt-0">
            <div class="row">
              <div class="col-12">
                <label class="form-label">Kecamatan</label>
                <argon-input
                  id="nama-kecamatan"
                  type="text"
                  placeholder="Nama kecamatan"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <label class="form-label">Jumlah Desa</label>
                <argon-input
                  id="jumlah-desa"
                  type="number"
                  placeholder="Jumlah desa"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <label class="mt-2">Potensi</label>
                <div id="edit-potensi" class="h-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from "quill";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import img from "@/assets/img/team-3.jpg";
import img1 from "@/assets/img/small-logos/logo-slack.svg";
import img2 from "@/assets/img/small-logos/logo-spotify.svg";
import img3 from "@/assets/img/small-logos/logo-atlassian.svg";
import img4 from "@/assets/img/small-logos/logo-asana.svg";

export default {
  name: "AddKecamatan",
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
    if (document.getElementById("edit-potensi")) {
      new Quill("#edit-potensi", {
        placeholder: "Isi dengan potensi kecamatan",
        theme: "snow",
      });
    }
  },
};
</script>
