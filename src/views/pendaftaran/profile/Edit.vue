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
        <div id="card-profile-mhs" class="card mt-4 pb-3">
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
                  <div class="col-sm-3 col-3">
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
                  <div class="col-sm-4 col-4">
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
        <div id="car-profile-dosen" class="card mt-4 pb-3">
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
                <label class="form-label">NIP</label>
                <argon-input id="nip" type="number" placeholder="NIP" />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-4 col-12">
                <label class="form-label mt-2">Jenis Kelamin</label>
                <select
                  id="choices-gender-dosen"
                  class="form-control"
                  name="choices-gender-dosen"
                >
                  <option value="Male">Laki-laki</option>
                  <option value="Female">Perempuan</option>
                </select>
              </div>
              <div class="col-sm-8 mt-3 mt-sm-0">
                <div class="row">
                  <label class="form-label mt-2">Tanggal Lahir</label>
                  <div class="col-sm-3 col-3">
                    <select
                      id="choices-day-dosen"
                      class="form-control"
                      name="choices-day-dosen"
                    ></select>
                  </div>
                  <div class="col-sm-5 col-5">
                    <select
                      id="choices-month-dosen"
                      class="form-control"
                      name="choices-month-dosen"
                    ></select>
                  </div>
                  <div class="col-sm-4 col-4">
                    <select
                      id="choices-year-dosen"
                      class="form-control"
                      name="choices-year-dosen"
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
                  id="choices-fakultas-dosen"
                  class="form-control"
                  name="choices-fakultas-dosen"
                >
                  <option value="FSM">FSM</option>
                  <option value="FT">FT</option>
                  <option value="FPsi">FPsi</option>
                </select>
              </div>
              <div class="col-sm-6 align-self-center">
                <label class="form-label mt-4 mt-sm-2">Jurusan</label>
                <select
                  id="choices-jurusan-dosen"
                  class="form-control"
                  name="choices-jurusan-dosen"
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
      choicesGender: Choices,
      choicesFakultas: Choices,
      choicesJurusan: Choices,
      choicesMonth: Choices,
      choicesDay: Choices,
      choicesYear: Choices,
      choicesGenderDosen: Choices,
      choicesFakultasDosen: Choices,
      choicesJurusanDosen: Choices,
      choicesMonthDosen: Choices,
      choicesDayDosen: Choices,
      choicesYearDosen: Choices,
    };
  },
  mounted() {
    // mhs-section
    this.choicesGender = this.getChoices("choices-gender");
    this.choicesFakultas = this.getChoices("choices-fakultas");
    this.choicesJurusan = this.getChoices("choices-jurusan");

    if (document.getElementById("choices-month")) {
      var monthMhs = document.getElementById("choices-month");
      setTimeout(() => {
        this.choicesMonth = new Choices(monthMhs, {
          allowHTML: true,
          shouldSort: false,
        });
      }, 1);

      // eslint-disable-next-line no-unused-vars
      var dMhs = new Date();
      var monthArrayMhs = new Array();
      monthArrayMhs[0] = "Januari";
      monthArrayMhs[1] = "Februari";
      monthArrayMhs[2] = "Maret";
      monthArrayMhs[3] = "April";
      monthArrayMhs[4] = "Mei";
      monthArrayMhs[5] = "Juni";
      monthArrayMhs[6] = "Juli";
      monthArrayMhs[7] = "Agustus";
      monthArrayMhs[8] = "September";
      monthArrayMhs[9] = "Oktober";
      monthArrayMhs[10] = "November";
      monthArrayMhs[11] = "Desember";
      for (let m = 0; m <= 11; m++) {
        var optnMhs = document.createElement("OPTION");
        optnMhs.text = monthArrayMhs[m];
        // server side month start from one\
        optnMhs.value = m + 1;
        // if june selected
        if (m == 0) {
          optnMhs.selected = true;
        }
        monthMhs.options.add(optnMhs);
      }
    }

    if (document.getElementById("choices-day")) {
      var dayMhs = document.getElementById("choices-day");
      setTimeout(() => {
        this.choicesDay = new Choices(dayMhs, { allowHTML: true });
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
      setTimeout(() => {
        this.choicesYear = new Choices(yearMhs, { allowHTML: true });
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

    // dosen-section
    this.choicesGenderDosen = this.getChoices("choices-gender-dosen");
    this.choicesFakultasDosen = this.getChoices("choices-fakultas-dosen");
    this.choicesJurusanDosen = this.getChoices("choices-jurusan-dosen");

    if (document.getElementById("choices-month-dosen")) {
      var monthDosen = document.getElementById("choices-month-dosen");
      setTimeout(() => {
        this.choicesMonthDosen = new Choices(monthDosen, {
          allowHTML: true,
          shouldSort: false,
        });
      }, 1);

      // eslint-disable-next-line no-unused-vars
      var dDosen = new Date();
      var monthArrayDosen = new Array();
      monthArrayDosen[0] = "Januari";
      monthArrayDosen[1] = "Februari";
      monthArrayDosen[2] = "Maret";
      monthArrayDosen[3] = "April";
      monthArrayDosen[4] = "Mei";
      monthArrayDosen[5] = "Juni";
      monthArrayDosen[6] = "Juli";
      monthArrayDosen[7] = "Agustus";
      monthArrayDosen[8] = "September";
      monthArrayDosen[9] = "Oktober";
      monthArrayDosen[10] = "November";
      monthArrayDosen[11] = "Desember";
      for (let m = 0; m <= 11; m++) {
        var optnDosen = document.createElement("OPTION");
        optnDosen.text = monthArrayDosen[m];
        // server side month start from one\
        optnDosen.value = m + 1;
        // if june selected
        if (m == 0) {
          optnDosen.selected = true;
        }
        monthDosen.options.add(optnDosen);
      }
    }

    if (document.getElementById("choices-day-dosen")) {
      var dayDosen = document.getElementById("choices-day-dosen");
      setTimeout(() => {
        this.choicesDayDosen = new Choices(dayDosen, { allowHTML: true });
      }, 1);

      for (let y = 1; y <= 31; y++) {
        var optn1Dosen = document.createElement("OPTION");
        optn1Dosen.text = y;
        optn1Dosen.value = y;

        if (y == 1) {
          optn1Dosen.selected = true;
        }

        dayDosen.options.add(optn1Dosen);
      }
    }

    if (document.getElementById("choices-year-dosen")) {
      var yearDosen = document.getElementById("choices-year-dosen");
      setTimeout(() => {
        this.choicesYearDosen = new Choices(yearDosen, { allowHTML: true });
      }, 1);

      for (let y = 1900; y <= 2020; y++) {
        var optn2Dosen = document.createElement("OPTION");
        optn2Dosen.text = y;
        optn2Dosen.value = y;

        if (y == 2020) {
          optn2Dosen.selected = true;
        }

        yearDosen.options.add(optn2Dosen);
      }
    }
  },
  beforeUnmount() {
    // mhs-section
    this.choicesGender.destroy();
    this.choicesFakultas.destroy();
    this.choicesJurusan.destroy();
    this.choicesMonth.destroy();
    this.removeAllOptions("choices-month");
    this.choicesDay.destroy();
    this.removeAllOptions("choices-day");
    this.choicesYear.destroy();
    this.removeAllOptions("choices-year");

    // dosen-section
    this.choicesGenderDosen.destroy();
    this.choicesFakultasDosen.destroy();
    this.choicesJurusanDosen.destroy();
    this.choicesMonthDosen.destroy();
    this.removeAllOptions("choices-month-dosen");
    this.choicesDayDosen.destroy();
    this.removeAllOptions("choices-day-dosen");
    this.choicesYearDosen.destroy();
    this.removeAllOptions("choices-year-dosen");
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
    removeAllOptions(id) {
      var element = document.getElementById(id);
      if (element) {
        while (element.options.length > 0) {
          element.remove(0);
        }
      }
    },
  },
};
</script>
