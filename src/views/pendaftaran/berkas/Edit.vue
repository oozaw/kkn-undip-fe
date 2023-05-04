<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card
          :button="true"
          button-text="Simpan data berkas"
          name="Tazki Hanifan Amri"
          description="KKN Reguler Tim 1 2023"
          :img="img"
        />
        <div class="p-4 pt-3 bg-white card mt-4">
          <h5 class="">Submit Berkas</h5>
          <div class="mt-3 row">
            <div class="col-lg-6 col-12">
              <label for="file-pas-photo" class="form-label"
                >Foto Resmi/ Pas Photo (*.jpg, .jpeg, .png)</label
              >
              <input class="form-control" type="file" id="file-pas-photo" />
            </div>
            <div class="col-lg-6 col-12 mt-3 mt-lg-0">
              <label for="file-khs" class="form-label"
                >KHS (Kartu Hasil Studi *.pdf)</label
              >
              <input class="form-control" type="file" id="file-khs" />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-lg-6 col-12">
              <label for="file-sp" class="form-label"
                >Surat Pernyataan (*pdf)</label
              >
              <input class="form-control" type="file" id="file-sp" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";

import img from "@/assets/img/team-3.jpg";

export default {
  name: "EditBerkas",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      img,
    };
  },
  mounted() {},
};
</script>
