<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card
          name="Tazki Hanifan Amri"
          description="KKN Reguler Tim 1 2023"
        />
        <div class="bg-white pb-2 card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <h5 class="mb-2">Edit LRK</h5>
            </div>
          </div>
          <div class="ms-2 pt-1 ps-3 card-body">
            <div class="mt-2 row">
              <div class="col-12">
                <label>Judul Program Kerja</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="eg. Program Edukasi Kesehatan pada Masyarakat Desa Kedungkandang"
                  value="Program Edukasi Kesehatan pada Masyarakat Desa Kedungkandang"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <label class="mt-4">1. Latar Belakang</label>
                <div id="edit-latar-belakang" class="h-50">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    obcaecati commodi magni suscipit veniam recusandae eos,
                    officia corrupti, rerum, magnam dolores voluptates quis
                    impedit labore? Minus, repudiandae? Nostrum, error
                    asperiores!
                  </p>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12">
                <label class="pt-3">2. Usulan Program</label>
                <div id="edit-usulan-program" class="h-50">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    obcaecati commodi magni suscipit veniam recusandae eos,
                    officia corrupti, rerum, magnam dolores voluptates quis
                    impedit labore? Minus, repudiandae? Nostrum, error
                    asperiores!
                  </p>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12">
                <label class="pt-3">3. Rencana Pelaksanaan</label>
                <form
                  id="dropzone_rencana_pelaksanaan"
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
              <div class="col-12">
                <label>4. Metode IPTEKS yang Digunakan</label>
                <div id="edit-metode" class="h-50">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    obcaecati commodi magni suscipit veniam recusandae eos,
                    officia corrupti, rerum, magnam dolores voluptates quis
                    impedit labore? Minus, repudiandae? Nostrum, error
                    asperiores!
                  </p>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12">
                <label class="pt-3">5. Hambatan</label>
                <div id="edit-hambatan" class="h-50">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    obcaecati commodi magni suscipit veniam recusandae eos,
                    officia corrupti, rerum, magnam dolores voluptates quis
                    impedit labore? Minus, repudiandae? Nostrum, error
                    asperiores!
                  </p>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12">
                <label class="pt-3">6. Output Program</label>
                <div id="edit-output" class="h-50">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    obcaecati commodi magni suscipit veniam recusandae eos,
                    officia corrupti, rerum, magnam dolores voluptates quis
                    impedit labore? Minus, repudiandae? Nostrum, error
                    asperiores!
                  </p>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12">
                <label class="pt-3">7. Keberlanjutan Program</label>
                <div id="edit-keberlanjutan" class="h-50">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    obcaecati commodi magni suscipit veniam recusandae eos,
                    officia corrupti, rerum, magnam dolores voluptates quis
                    impedit labore? Minus, repudiandae? Nostrum, error
                    asperiores!
                  </p>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12">
                <label class="pt-3">8. Dokumentasi</label>
                <p class="text-xs form-text text-muted ms-1 d-inline">
                  (*.rar)
                </p>
                <form
                  id="dropzone-dokumentasi"
                  action="/file-upload"
                  class="form-control dropzone"
                >
                  <div class="fallback">
                    <input name="file" type="file" multiple />
                  </div>
                </form>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-12 mt-3 d-flex justify-content-end">
                <argon-button
                  :onclick="() => $router.push('/lrk')"
                  class="mb-0 me-2"
                  color="secondary"
                  size="sm"
                  >Batal</argon-button
                >
                <argon-button
                  class="mb-0 me-lg-2"
                  color="primary"
                  variant="gradient"
                  size="sm"
                  >Simpan Perubahan</argon-button
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
import Quill from "quill";
import Dropzone from "dropzone";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "EditLRK",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  mounted() {
    if (document.getElementById("edit-latar-belakang")) {
      new Quill("#edit-latar-belakang", {
        placeholder: "Isi dengan paragraf latar belakang program kerja",
        theme: "snow",
      });
    }
    if (document.getElementById("edit-usulan-program")) {
      new Quill("#edit-usulan-program", {
        placeholder: "Isi dengan usulan program yang diajukan",
        theme: "snow",
      });
    }
    if (document.getElementById("edit-metode")) {
      new Quill("#edit-metode", {
        placeholder: "Isi dengan metode yang digunakan",
        theme: "snow",
      });
    }
    if (document.getElementById("edit-hambatan")) {
      new Quill("#edit-hambatan", {
        placeholder: "Isi dengan hambatan yang dialami",
        theme: "snow",
      });
    }
    if (document.getElementById("edit-output")) {
      new Quill("#edit-output", {
        placeholder: "Isi dengan keluaran yang diharapkan",
        theme: "snow",
      });
    }
    if (document.getElementById("edit-keberlanjutan")) {
      new Quill("#edit-keberlanjutan", {
        placeholder: "Isi dengan keberlanjutan program",
        theme: "snow",
      });
    }

    Dropzone.autoDiscover = false;
    var drop_rencana_pelaksanaan = document.getElementById(
      "dropzone_rencana_pelaksanaan"
    );
    new Dropzone(drop_rencana_pelaksanaan, {
      url: "/file/post",
      addRemoveLinks: true,
    });

    var drop_dokumentasi = document.getElementById("dropzone-dokumentasi");
    new Dropzone(drop_dokumentasi, {
      url: "/file/post",
      addRemoveLinks: true,
    });
  },
};
</script>
