<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard
          :button="true"
          button-text="Simpan data wilayah"
          name="BAPPEDA Kota Semarang"
          description="Kota Semarang, Jawa Tengah, Indonesia"
          :img="img"
        />
        <div id="card-profile-wilayah" class="card mt-4 pb-3">
          <div class="card-header">
            <h5>Profil Wilayah</h5>
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
                <argon-input id="nim" type="text" placeholder="NIM" />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-4 col-12">
                <label class="form-label mt-2">Jenis Kelamin</label>
                <select
                  id="choices-gender"
                  class="form-control"
                  name="choices-gender"
                >
                  <option value="Male">Laki-laki</option>
                  <option value="Female">Perempuan</option>
                </select>
              </div>
              <div class="col-sm-8 mt-3 mt-sm-0">
                <div class="row">
                  <label class="form-label mt-2">Tanggal Lahir</label>
                  <div class="col-sm-4 col-3">
                    <select
                      id="choices-day"
                      class="form-control"
                      name="choices-day"
                    ></select>
                  </div>
                  <div class="col-sm-5 col-5">
                    <select
                      id="choices-month"
                      class="form-control"
                      name="choices-month"
                    ></select>
                  </div>
                  <div class="col-sm-3 col-4">
                    <select
                      id="choices-year"
                      class="form-control"
                      name="choices-year"
                    ></select>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-sm-6 col-12">
                <label class="form-label mt-2">Email</label>
                <argon-input
                  id="email"
                  type="email"
                  placeholder="eg. contoh@email.com"
                />
              </div>
              <div class="col-sm-6 col-12">
                <label class="form-label mt-2">Domisili</label>
                <argon-input
                  id="domisili"
                  type="text"
                  placeholder="eg. Jakarta, Indonesia"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 col-12">
                <label class="form-label mt-2">Angkatan</label>
                <argon-input id="angkatan" type="text" placeholder="eg. 2019" />
              </div>
              <div class="col-sm-6 col-12">
                <label class="form-label mt-2">No. Telepon</label>
                <argon-input
                  id="phone"
                  type="text"
                  placeholder="+628 745 765 439"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 align-self-center">
                <label class="form-label mt-2">Fakultas</label>
                <select
                  id="choices-fakultas"
                  class="form-control"
                  name="choices-fakultas"
                >
                  <option value="FSM">FSM</option>
                  <option value="FT">FT</option>
                  <option value="FPsi">FPsi</option>
                </select>
              </div>
              <div class="col-sm-6 align-self-center">
                <label class="form-label mt-4 mt-sm-2">Jurusan</label>
                <select
                  id="choices-jurusan"
                  class="form-control"
                  name="choices-jurusan"
                >
                  <option value="Informatika">Informatika</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Fisika">Fisika</option>
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
  name: "EditDataDiri",
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
    // mhs-section
    this.getChoices("choices-gender");
    this.getChoices("choices-fakultas");
    this.getChoices("choices-jurusan");

    if (document.getElementById("choices-month")) {
      var monthMhs = document.getElementById("choices-month");
      setTimeout(function () {
        new Choices(monthMhs, { allowHTML: true });
      }, 1);

      // eslint-disable-next-line no-unused-vars
      var dMhs = new Date();
      var monthArrayMhs = new Array();
      monthArrayMhs[0] = "January";
      monthArrayMhs[1] = "February";
      monthArrayMhs[2] = "March";
      monthArrayMhs[3] = "April";
      monthArrayMhs[4] = "May";
      monthArrayMhs[5] = "June";
      monthArrayMhs[6] = "July";
      monthArrayMhs[7] = "August";
      monthArrayMhs[8] = "September";
      monthArrayMhs[9] = "October";
      monthArrayMhs[10] = "November";
      monthArrayMhs[11] = "December";
      for (let m = 0; m <= 11; m++) {
        var optnMhs = document.createElement("OPTION");
        optnMhs.text = monthArrayMhs[m];
        // server side month start from one\
        optnMhs.value = m + 1;
        // if june selected
        if (m == 1) {
          optnMhs.selected = true;
        }
        monthMhs.options.add(optnMhs);
      }
    }

    if (document.getElementById("choices-day")) {
      var dayMhs = document.getElementById("choices-day");
      setTimeout(function () {
        new Choices(dayMhs, { allowHTML: true });
      }, 1);

      for (let y = 1; y <= 31; y++) {
        var optn1Mhs = document.createElement("OPTION");
        optn1Mhs.text = y;
        optn1Mhs.value = y;

        if (y == 1) {
          optn1Mhs.selected = true;
        }

        dayMhs.options.add(optn1Mhs);
      }
    }

    if (document.getElementById("choices-year")) {
      var yearMhs = document.getElementById("choices-year");
      setTimeout(function () {
        new Choices(yearMhs, { allowHTML: true });
      }, 1);

      for (let y = 1900; y <= 2020; y++) {
        var optn2Mhs = document.createElement("OPTION");
        optn2Mhs.text = y;
        optn2Mhs.value = y;

        if (y == 2020) {
          optn2Mhs.selected = true;
        }

        yearMhs.options.add(optn2Mhs);
      }
    }
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
