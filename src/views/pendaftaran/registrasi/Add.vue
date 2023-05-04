<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard
          :button="true"
          button-text="Simpan data registrasi"
          name="Tazki Hanifan Amri"
          description="KKN Reguler Tim 1 2023"
          :img="team1"
        />
        <div class="p-4 pt-3 bg-white card mt-4">
          <h5 class="">Registrasi KKN</h5>
          <div class="mt-2 row">
            <div class="col-md-6 col-12">
              <div class="row">
                <div class="col-12 col-md-6 align-self-center">
                  <label class="form-label mt-2">Jenis KKN</label>
                  <select
                    id="choices-jenis"
                    class="form-control"
                    name="choices-jenis"
                  >
                    <option value="reguler">Reguler</option>
                    <option value="tematik">Tematik</option>
                  </select>
                </div>
                <div class="col-12 col-md-6 align-self-center">
                  <label class="form-label mt-2">Periode</label>
                  <select
                    id="choices-periode"
                    class="form-control"
                    name="choices-periode"
                  >
                    <option value="2022/2023">2022/2023</option>
                    <option value="2023/2024">2023/2024</option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12 align-self-center">
                  <label class="form-label mt-2">Wilayah</label>
                  <select
                    id="choices-wilayah"
                    class="form-control"
                    name="choices-wilayah"
                  >
                    <option value="kota_semarang">
                      Desa Bergas, Kecamatan Bergas
                    </option>
                    <option value="FT">
                      Desa Kuningan, Kecamatan Kuningan
                    </option>
                    <option value="FPsi">
                      Desa Platarejo, Kecamatan Platarejo
                    </option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12 mt-3 mt-lg-0">
                  <label for="file-prposal" class="form-label"
                    >Proposal (*.pdf)</label
                  >
                  <input class="form-control" type="file" id="file-prposal" />
                </div>
              </div>
            </div>
            <div class="col-md-6 col-12 mt-3 mt-md-0">
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
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";

import team1 from "@/assets/img/team-1.jpg";

export default {
  name: "EditBerkas",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      team1,
      choicesJenis: Choices,
      choicesPeriode: Choices,
      choicesWilayah: Choices,
    };
  },
  mounted() {
    if (document.getElementById("choices-jenis")) {
      var jenis = document.getElementById("choices-jenis");
      this.choicesJenis = new Choices(jenis, { allowHTML: true });
    }
    if (document.getElementById("choices-periode")) {
      var periode = document.getElementById("choices-periode");
      this.choicesPeriode = new Choices(periode, { allowHTML: true });
    }
    if (document.getElementById("choices-wilayah")) {
      var kab = document.getElementById("choices-wilayah");
      this.choicesWilayah = new Choices(kab, { allowHTML: true });
    }
  },
  beforeUnmount() {
    this.choicesJenis.destroy();
    this.choicesPeriode.destroy();
    this.choicesWilayah.destroy();
  },
};
</script>
