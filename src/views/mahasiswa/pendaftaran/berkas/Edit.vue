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
              <label>Foto Resmi/ Pas Photo</label>
              <form
                id="dropzone_pas_photo"
                action="/file-upload"
                class="form-control dropzone"
              >
                <div class="fallback">
                  <input name="file" type="file" multiple />
                </div>
              </form>
            </div>
            <div class="col-lg-6 col-12 mt-3 mt-lg-0">
              <label>KHS (Kartu Hasil Studi)</label>
              <form
                id="dropzone_khs"
                action="/file-upload"
                class="form-control dropzone"
              >
                <div class="fallback">
                  <input name="file" type="file" multiple />
                </div>
              </form>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-lg-6 col-12">
              <label>Surat Pernyataan</label>
              <form
                id="dropzone_sp"
                action="/file-upload"
                class="form-control dropzone"
              >
                <div class="fallback">
                  <input name="file" type="file" multiple />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import Dropzone from "dropzone";

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
  mounted() {
    Dropzone.autoDiscover = false;
    var drop_pas_photo = document.getElementById("dropzone_pas_photo");
    new Dropzone(drop_pas_photo, {
      url: "/file/post",
      addRemoveLinks: true,
    });
    var drop_khs = document.getElementById("dropzone_khs");
    new Dropzone(drop_khs, {
      url: "/file/post",
      addRemoveLinks: true,
    });
    var drop_sp = document.getElementById("dropzone_sp");
    new Dropzone(drop_sp, {
      url: "/file/post",
      addRemoveLinks: true,
    });
  },
};
</script>
