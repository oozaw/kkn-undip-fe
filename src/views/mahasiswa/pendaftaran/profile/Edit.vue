<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard
          :button="true"
          button-text="Simpan data diri"
          name="Tazki Hanifan Amri"
          description="KKN Reguler Tim 1 2023"
          :img="img3"
        />
        <div id="basic-info" class="card mt-4 pb-3">
          <div class="card-header">
            <h5>Data Diri</h5>
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
import * as Choices from "choices.js";
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
    if (document.getElementById("choices-gender")) {
      var gender = document.getElementById("choices-gender");
      new Choices(gender, { allowHTML: true });
    }

    if (document.getElementById("choices-fakultas")) {
      var fakultas = document.getElementById("choices-fakultas");
      new Choices(fakultas, { allowHTML: true });
    }

    if (document.getElementById("choices-jurusan")) {
      var jurusan = document.getElementById("choices-jurusan");
      new Choices(jurusan, { allowHTML: true });
    }

    if (document.getElementById("choices-month")) {
      var month = document.getElementById("choices-month");
      setTimeout(function () {
        new Choices(month, { allowHTML: true });
      }, 1);

      // eslint-disable-next-line no-unused-vars
      var d = new Date();
      var monthArray = new Array();
      monthArray[0] = "January";
      monthArray[1] = "February";
      monthArray[2] = "March";
      monthArray[3] = "April";
      monthArray[4] = "May";
      monthArray[5] = "June";
      monthArray[6] = "July";
      monthArray[7] = "August";
      monthArray[8] = "September";
      monthArray[9] = "October";
      monthArray[10] = "November";
      monthArray[11] = "December";
      for (let m = 0; m <= 11; m++) {
        var optn = document.createElement("OPTION");
        optn.text = monthArray[m];
        // server side month start from one\
        optn.value = m + 1;
        // if june selected
        if (m == 1) {
          optn.selected = true;
        }
        month.options.add(optn);
      }
    }

    if (document.getElementById("choices-day")) {
      var day = document.getElementById("choices-day");
      setTimeout(function () {
        new Choices(day, { allowHTML: true });
      }, 1);

      for (let y = 1; y <= 31; y++) {
        var optn1 = document.createElement("OPTION");
        optn1.text = y;
        optn1.value = y;

        if (y == 1) {
          optn1.selected = true;
        }

        day.options.add(optn1);
      }
    }

    if (document.getElementById("choices-year")) {
      var year = document.getElementById("choices-year");
      setTimeout(function () {
        new Choices(year, { allowHTML: true });
      }, 1);

      for (let y = 1900; y <= 2020; y++) {
        var optn2 = document.createElement("OPTION");
        optn2.text = y;
        optn2.value = y;

        if (y == 2020) {
          optn.selected = true;
        }

        year.options.add(optn2);
      }
    }

    if (document.getElementById("choices-skills")) {
      var skills = document.getElementById("choices-skills");
      new Choices(skills, {
        delimiter: ",",
        editItems: true,
        maxItemCount: 5,
        removeItemButton: true,
        addItems: true,
        allowHTML: true,
      });
    }
  },
};
</script>
