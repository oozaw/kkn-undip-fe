<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard
          :button="true"
          button-text="Simpan nilai akhir"
          name="Tazki Hanifan Amri"
          description="KKN Reguler Tim 1 2023"
          :img="img"
        />
        <div id="card-nilai-akhir" class="card mt-4 pb-3">
          <div class="card-header">
            <h5>Edit Nilai Akhir Mahasiswa KKN</h5>
          </div>
          <div class="card-body pt-0">
            <div class="row">
              <div class="col-sm-6 col-12">
                <label class="form-label">Nama Lengkap</label>
                <argon-input
                  id="fullname"
                  type="text"
                  placeholder="Nama lengkap"
                />
              </div>
              <div class="col-sm-6 col-12">
                <label class="form-label">NIM</label>
                <argon-input id="nim" type="number" placeholder="NIM" />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-3 col-12">
                <label class="form-label mt-2">Nilai Pembekalan</label>
                <argon-input
                  id="nilai_pembekalan"
                  name="nilai_pembekalan"
                  type="number"
                  placeholder="Nilai pembekalan"
                />
              </div>
              <div class="col-sm-3 col-12">
                <label class="form-label mt-2">Nilai Penerjunan</label>
                <argon-input
                  id="nilai_penerjunan"
                  name="nilai_penerjunan"
                  type="number"
                  placeholder="Nilai penerjunan"
                />
              </div>
              <div class="col-sm-3 col-12">
                <label class="form-label mt-2">Nilai Kehadiran</label>
                <argon-input
                  id="nilai_kehadiran"
                  name="nilai_kehadiran"
                  type="number"
                  placeholder="Nilai kehadiran"
                />
              </div>
              <div class="col-sm-3 col-12">
                <label class="form-label mt-2">Nilai Integritas</label>
                <argon-input
                  id="nilai_integritas"
                  name="nilai_integritas"
                  type="number"
                  placeholder="Nilai integritas"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-3 col-12">
                <label class="form-label mt-2">Nilai LRK</label>
                <argon-input
                  id="nila_lrk"
                  name="nila_lrk"
                  type="number"
                  placeholder="Nilai LRK"
                />
              </div>
              <div class="col-sm-3 col-12">
                <label class="form-label mt-2">Nilai Sosial</label>
                <argon-input
                  id="nilai_sosial"
                  name="nilai_sosial"
                  type="number"
                  placeholder="Nilai sosial"
                />
              </div>
              <div class="col-sm-3 col-12">
                <label class="form-label mt-2">Nilai LPK</label>
                <argon-input
                  id="nilai_lpk"
                  name="nilai_lpk"
                  type="number"
                  placeholder="Nilai LPK"
                />
              </div>
              <div class="col-sm-3 col-12">
                <label class="form-label mt-2">Nilai Ujian Akhir</label>
                <argon-input
                  id="nilai_ujian_akhir"
                  name="nilai_ujian_akhir"
                  type="number"
                  placeholder="Nilai ujian akhir"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-3 col-12">
                <label class="form-label mt-2">Nilai Tugas</label>
                <argon-input
                  id="nilai_tugas"
                  name="nilai_tugas"
                  type="number"
                  placeholder="Nilai tugas"
                />
              </div>
              <div class="col-sm-3 col-12">
                <label class="form-label mt-2">Nilai Praktek</label>
                <argon-input
                  id="nilai_praktek"
                  name="nilai_praktek"
                  type="number"
                  placeholder="Nilai praktek"
                />
              </div>
              <div class="col-sm-3 col-12">
                <label class="form-label mt-2">Nilai UTS</label>
                <argon-input
                  id="nilai_uts"
                  name="nilai_uts"
                  type="number"
                  placeholder="Nilai UTS"
                />
              </div>
              <div class="col-sm-3 col-12">
                <label class="form-label mt-2">Nilai UAS</label>
                <argon-input
                  id="nilai_uas"
                  name="nilai_uas"
                  type="number"
                  placeholder="Nilai UAS"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 align-self-center">
                <label class="form-label mt-2">Status Kelulusan</label>
                <select
                  id="choices-status-kelulusan"
                  class="form-control"
                  name="choices-status-kelulusan"
                >
                  <option value="lulus" selected>Diluluskan</option>
                  <option value="tidak-lulus">Digagalkan</option>
                  <option value="ditangguhkan">Ditangguhkan</option>
                </select>
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
  name: "EditNilaiAkhir",
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
    this.getChoices("choices-status-kelulusan");
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
  },
};
</script>
