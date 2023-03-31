<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <div id="profile" class="card card-body">
          <div class="row align-items-center">
            <div class="col-sm-auto col-4">
              <argon-avatar
                :img="img"
                alt="team-3"
                size="xl"
                shadow="sm"
                border-radius="lg"
              />
            </div>
            <div class="col-sm-auto col-8 my-auto">
              <div class="h-100">
                <h5 class="mb-1 font-weight-bolder">Tazki Hanifan Amri</h5>
                <p class="mb-0 font-weight-bold text-sm">
                  KKN Reguler Tim 1 2023
                </p>
              </div>
            </div>
            <div
              class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-center"
            >
              <argon-button
                :onclick="() => $router.push('/lokasi')"
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
                >Simpan data lokasi</argon-button
              >
            </div>
          </div>
        </div>
        <div class="p-4 pt-3 bg-white card mt-4">
          <h5 class="">Daftar Lokasi</h5>
          <div class="mt-2 row">
            <div class="col-md-4 col-12">
              <div class="row">
                <div class="col-12 align-self-center">
                  <label class="form-label mt-2">Pilih Provinsi</label>
                  <select
                    id="choices-prov"
                    class="form-control"
                    name="choices-prov"
                  >
                    <option value="jateng">Jawa Tengah</option>
                    <option value="FT">FT</option>
                    <option value="FPsi">FPsi</option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12 align-self-center">
                  <label class="form-label mt-2">Pilih Kabupaten</label>
                  <select
                    id="choices-kab"
                    class="form-control"
                    name="choices-kab"
                  >
                    <option value="kota_semarang">Kota Semarang</option>
                    <option value="FT">FT</option>
                    <option value="FPsi">FPsi</option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12 align-self-center">
                  <label class="form-label mt-2">Pilih Kecamatan</label>
                  <select
                    id="choices-kec"
                    class="form-control"
                    name="choices-kec"
                  >
                    <option value="Banyumanik">Banyumanik</option>
                    <option value="FT">FT</option>
                    <option value="FPsi">FPsi</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-8 col-12 mt-3 mt-md-0">
              <div class="col-12 ms-md-2 pe-1">
                <label class="form-label">Deskripsi:</label>
                <span id="description" class=""
                  ><ul>
                    <li>
                      The most beautiful curves of this swivel stool adds an
                      elegant touch to any environment
                    </li>
                    <li>
                      Memory swivel seat returns to original seat position
                    </li>
                    <li>
                      Comfortable integrated layered chair seat cushion design
                    </li>
                    <li>Fully assembled! No assembly required</li>
                  </ul></span
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
import * as Choices from "choices.js";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonAvatar from "@/components/ArgonAvatar.vue";
import img from "@/assets/img/team-3.jpg";

export default {
  name: "EditBerkas",
  components: {
    ArgonButton,
    ArgonAvatar,
  },
  data() {
    return {
      img,
    };
  },
  mounted() {
    if (document.getElementById("choices-prov")) {
      var prov = document.getElementById("choices-prov");
      new Choices(prov, { allowHTML: true });
    }
    if (document.getElementById("choices-kab")) {
      var kab = document.getElementById("choices-kab");
      new Choices(kab, { allowHTML: true });
    }
    if (document.getElementById("choices-kec")) {
      var kec = document.getElementById("choices-kec");
      new Choices(kec, { allowHTML: true });
    }
  },
};
</script>
