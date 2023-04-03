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
              <h5 class="mb-2">Edit Reportase</h5>
            </div>
          </div>
          <div class="ms-2 pt-1 ps-3 card-body">
            <div class="mt-2 row">
              <div class="col-12">
                <label>Judul Program Kerja</label>
                <input
                  id="judul-program-kerja"
                  name="judul-program-kerja"
                  class="form-control"
                  type="text"
                  placeholder="eg. Program Edukasi Kesehatan pada Masyarakat Desa Kedungkandang"
                  value="Program Edukasi Kesehatan pada Masyarakat Desa Kedungkandang"
                />
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-12">
                <label class="pt-3">Dokumentasi</label>
                <p class="text-xs form-text text-muted ms-1 d-inline">
                  (Header)
                </p>
                <form
                  id="dropzone-dokumentasi-header"
                  action="/file-upload"
                  class="form-control dropzone"
                >
                  <div class="fallback">
                    <input
                      name="file-dokumentasi-header"
                      type="file"
                      multiple
                    />
                  </div>
                </form>
              </div>
            </div>
            <div class="mt-3 row">
              <div class="col-12">
                <label>Judul Dokumentasi</label>
                <p class="text-xs form-text text-muted ms-1 d-inline">
                  (Header)
                </p>
                <input
                  id="judul-dokumentasi-header"
                  name="judul-dokumentasi-header"
                  class="form-control"
                  type="text"
                  placeholder="eg. Gambar 1. Pakaian Adat Desa Kedungkandang"
                  value="Gambar 1. Pakaian Adat Desa Kedungkandang"
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12">
                <label>Deskripsi</label>
                <div id="edit-deskripsi" class="h-50">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Accusamus provident magni doloribus possimus quidem odit
                    dolor officiis minus reprehenderit commodi facilis, nulla
                    temporibus adipisci soluta porro id aliquam perspiciatis!
                    Quidem.
                  </p>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12">
                <label class="pt-3">Dokumentasi</label>
                <p class="text-xs form-text text-muted ms-1 d-inline">(2)</p>
                <form
                  id="dropzone-dokumentasi-2"
                  kripsi-2
                  action="/file-upload"
                  class="form-control dropzone"
                >
                  <div class="fallback">
                    <input name="file-dokumentasi-2" type="file" multiple />
                  </div>
                </form>
              </div>
            </div>
            <div class="mt-3 row">
              <div class="col-12">
                <label>Judul Dokumentasi</label>
                <p class="text-xs form-text text-muted ms-1 d-inline">(2)</p>
                <input
                  id="judul-dokumentasi-2"
                  name="judul-dokumentasi-2"
                  class="form-control"
                  type="text"
                  placeholder="eg. Gambar 2. Pakaian Adat Desa Kedungkandang 2"
                  value="Gambar 2. Pakaian Adat Desa Kedungkandang 2"
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-12">
                <label class="pt-3">Deskripsi</label>
                <p class="text-xs form-text text-muted ms-1 d-inline">
                  (Lanjutan)
                </p>
                <div id="edit-deskripsi-lanjutan" class="h-50">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Autem eos harum eaque molestiae assumenda praesentium
                    sapiente alias ad commodi ducimus, ea doloribus, cumque
                    dolorem perferendis, cum provident quibusdam. Eos, dolorem.
                  </p>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12">
                <label class="pt-3">Dokumentasi</label>
                <p class="text-xs form-text text-muted ms-1 d-inline">(3)</p>
                <form
                  id="dropzone-dokumentasi-3"
                  action="/file-upload"
                  class="form-control dropzone"
                >
                  <div class="fallback">
                    <input name="file-dokumentasi-3" type="file" multiple />
                  </div>
                </form>
              </div>
            </div>
            <div class="mt-3 row">
              <div class="col-12">
                <label>Judul Dokumentasi</label>
                <p class="text-xs form-text text-muted ms-1 d-inline">(3)</p>
                <input
                  id="judul-dokumentasi-3"
                  name="judul-dokumentasi-3"
                  class="form-control"
                  type="text"
                  placeholder="eg. Gambar 3. Pakaian Adat Desa Kedungkandang 3"
                  value="Gambar 3. Pakaian Adat Desa Kedungkandang 3"
                />
              </div>
            </div>
            <div class="mt-3 row">
              <div class="col-12">
                <label>Penulis</label>
                <input
                  id="penulis"
                  name="penulis"
                  class="form-control"
                  type="text"
                  placeholder="Nama penulis"
                  value="Tazki Hanifan Amri"
                />
              </div>
            </div>
            <div class="mt-3 row">
              <div class="col-12">
                <label>DPL (Dosen Pembimbing Lapangan)</label>
                <input
                  id="dpl"
                  name="dpl"
                  class="form-control"
                  type="text"
                  placeholder="Nama dosen pembimbing lapangan"
                  value="Bambang Sutrisno, S.Pd., M.Pd."
                />
              </div>
            </div>
            <div class="mt-3 row">
              <div class="col-12">
                <label>Lokasi KKN</label>
                <input
                  id="lokasi"
                  name="lokasi"
                  class="form-control"
                  type="text"
                  placeholder="eg. Desa Kedungkandang"
                  value="Desa Kedungkandang"
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-12 mt-3 d-flex justify-content-end">
                <argon-button
                  :onclick="() => $router.push({ name: 'Reportase' })"
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
  name: "EditReportase",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  mounted() {
    if (document.getElementById("edit-deskripsi")) {
      new Quill("#edit-deskripsi", {
        placeholder: "Deskripsikan dokumentasi 1 yang akan ditambahkan",
        theme: "snow",
      });
    }
    if (document.getElementById("edit-deskripsi-lanjutan")) {
      new Quill("#edit-deskripsi-lanjutan", {
        placeholder: "Deskripsikan dokumentasi 2 yang akan ditambahkan",
        theme: "snow",
      });
    }

    Dropzone.autoDiscover = false;
    var drop_dokumentasi_2 = document.getElementById("dropzone-dokumentasi-2");
    new Dropzone(drop_dokumentasi_2, {
      url: "/file/post",
      addRemoveLinks: true,
    });

    var drop_dokumentasi = document.getElementById("dropzone-dokumentasi-3");
    new Dropzone(drop_dokumentasi, {
      url: "/file/post",
      addRemoveLinks: true,
    });

    var drop_dokumentasi_header = document.getElementById(
      "dropzone-dokumentasi-header"
    );
    new Dropzone(drop_dokumentasi_header, {
      url: "/file/post",
      addRemoveLinks: true,
    });
  },
};
</script>
