<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard
          :button="true"
          button-text="Simpan data kecamatan"
          name="BAPPEDA Kota Semarang"
          description="Kota Semarang, Jawa Tengah, Indonesia"
          :img="img"
        />
        <div id="card-profile-wilayah" class="card mt-4 pb-3">
          <div class="card-header">
            <h5>Edit Lokasi Kecamatan dan Potensi</h5>
          </div>
          <div class="card-body pt-0">
            <div class="row">
              <div class="col-12">
                <label class="form-label">Kecamatan</label>
                <argon-input
                  id="nama-kecamatan"
                  type="text"
                  placeholder="Nama kecamatan"
                  value="Gajahmungkur"
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
                  value="12"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <label class="mt-2">Potensi</label>
                <div id="edit-potensi" class="h-50">
                  Potensi kecamatan Gajahmungkur adalah potensi yang ada di
                  wilayah kecamatan Gajahmungkur yang dapat dikembangkan untuk
                  meningkatkan kesejahteraan masyarakat. Potensi tersebut dapat
                  di dalam bentuk sumber daya alam, sumber daya manusia, sumber
                  daya sosial budaya, sumber daya ekonomi, sumber daya
                  teknologi, sumber daya lingkungan, dan sumber daya lainnya.
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
import Quill from "quill";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import img from "@/assets/img/team-3.jpg";

export default {
  name: "EditKecamatan",
  components: {
    HeaderProfileCard,
    ArgonInput,
  },
  data() {
    return {
      img,
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
