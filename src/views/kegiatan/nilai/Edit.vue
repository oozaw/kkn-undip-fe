<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard>
          <template #button>
            <argon-button
              type="button"
              :onclick="() => $router.push({ name: 'Nilai Akhir' })"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Batal</argon-button
            >
            <argon-button
              type="submit"
              form="form-edit-nilai"
              class="mb-0 me-lg-2"
              color="primary"
              variant="gradient"
              size="sm"
              >Simpan Nilai</argon-button
            >
          </template>
        </HeaderProfileCard>
        <div id="card-nilai-akhir" class="card mt-4 pb-3">
          <div class="card-header">
            <h5>Edit Nilai Akhir Mahasiswa KKN</h5>
          </div>
          <div class="card-body pt-0">
            <form
              role="form"
              id="form-edit-nilai"
              @submit.prevent="editNilai()"
            >
              <div class="row">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Nama Lengkap</label>
                  <input
                    class="form-control"
                    id="nama-lengkap"
                    name="nama-lengkap"
                    type="text"
                    placeholder="Nama lengkap"
                    :value="nilai.mahasiswa?.nama"
                    disabled
                    readonly
                  />
                </div>
                <div class="col-sm-6 col-12">
                  <label class="form-label">NIM</label>
                  <input
                    class="form-control"
                    id="nim"
                    name="nim"
                    type="text"
                    placeholder="NIM"
                    :value="nilai.mahasiswa?.nim"
                    disabled
                    readonly
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-sm-3 col-12">
                  <label class="form-label mt-2">Nilai Pembekalan</label>
                  <input
                    class="form-control"
                    id="pembekalan"
                    name="pembekalan"
                    v-model="body.pembekalan"
                    type="number"
                    placeholder="Nilai pembekalan"
                    @keyup="updateValueNilai()"
                  />
                </div>
                <div class="col-sm-3 col-12">
                  <label class="form-label mt-2">Nilai Upacara</label>
                  <input
                    class="form-control"
                    id="upacara"
                    name="upacara"
                    v-model="body.upacara"
                    type="number"
                    placeholder="Nilai upacara"
                    @keyup="updateValueNilai()"
                  />
                </div>
                <div class="col-sm-3 col-12">
                  <label class="form-label mt-2">Nilai Kehadiran</label>
                  <input
                    class="form-control"
                    v-model="body.kehadiran_dilokasi"
                    id="kehadiran_dilokasi"
                    name="kehadiran_dilokasi"
                    type="number"
                    placeholder="Nilai kehadiran"
                    @keyup="updateValueNilai()"
                  />
                </div>
                <div class="col-sm-3 col-12">
                  <label class="form-label mt-2">Nilai Integritas</label>
                  <input
                    class="form-control"
                    v-model="body.integritas"
                    id="integritas"
                    name="integritas"
                    type="number"
                    placeholder="Nilai integritas"
                    @keyup="updateValueNilai()"
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-sm-3 col-12">
                  <label class="form-label mt-2">Nilai LRK</label>
                  <input
                    class="form-control"
                    v-model="body.lrk"
                    id="lrk"
                    name="lrk"
                    type="number"
                    placeholder="Nilai LRK"
                    @keyup="updateValueNilai()"
                  />
                </div>
                <div class="col-sm-3 col-12">
                  <label class="form-label mt-2">Nilai Sosial</label>
                  <input
                    class="form-control"
                    v-model="body.sosial_kemasyarakatan"
                    id="sosial_kemasyarakatan"
                    name="sosial_kemasyarakatan"
                    type="number"
                    placeholder="Nilai sosial"
                    @keyup="updateValueNilai()"
                  />
                </div>
                <div class="col-sm-3 col-12">
                  <label class="form-label mt-2">Nilai LPK</label>
                  <input
                    class="form-control"
                    v-model="body.lpk"
                    id="lpk"
                    name="lpk"
                    type="number"
                    placeholder="Nilai LPK"
                    @keyup="updateValueNilai()"
                  />
                </div>
                <div class="col-sm-3 col-12">
                  <label class="form-label mt-2">Nilai Ujian Akhir</label>
                  <input
                    class="form-control"
                    v-model="body.ujian_akhir"
                    id="ujian_akhir"
                    name="ujian_akhir"
                    type="number"
                    placeholder="Nilai ujian akhir"
                    @keyup="updateValueNilai()"
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-sm-3 col-12">
                  <label class="form-label mt-2">Nilai Tugas</label>
                  <input
                    class="form-control"
                    v-model="body.tugas"
                    id="tugas"
                    name="tugas"
                    type="number"
                    placeholder="Nilai tugas"
                    readonly
                  />
                </div>
                <div class="col-sm-3 col-12">
                  <label class="form-label mt-2">Nilai UTS</label>
                  <input
                    class="form-control"
                    v-model="body.uts"
                    id="uts"
                    name="uts"
                    type="number"
                    placeholder="Nilai UTS"
                    readonly
                  />
                </div>
                <div class="col-sm-3 col-12">
                  <label class="form-label mt-2">Nilai UAS</label>
                  <input
                    class="form-control"
                    v-model="body.uas"
                    id="uas"
                    name="uas"
                    type="number"
                    placeholder="Nilai UAS"
                    readonly
                  />
                </div>
                <div class="col-sm-3 col-12">
                  <label class="form-label mt-2">Jumlah Keseluruhan</label>
                  <input
                    class="form-control"
                    v-model="jumlah_nilai"
                    id="jumlah_nilai"
                    name="jumlah_nilai"
                    type="number"
                    placeholder="Jumlah keseluruhan nilai"
                    readonly
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-sm-6 col-12">
                  <label class="form-label mt-2">Nilai Akhir</label>
                  <input
                    class="form-control"
                    v-model="body.nilai_akhir"
                    id="nilai_akhir"
                    name="nilai_akhir"
                    type="number"
                    placeholder="Nilai akhir"
                    readonly
                  />
                </div>
                <div class="col-sm-6 col-12">
                  <label class="form-label mt-2">Nilai Huruf</label>
                  <input
                    class="form-control"
                    v-model="body.nilai_huruf"
                    id="nilai_huruf"
                    name="nilai_huruf"
                    type="text"
                    placeholder="Nilai akhir dalam huruf"
                    readonly
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-12 mt-3 d-flex justify-content-end">
                  <argon-button
                    type="button"
                    :onclick="() => $router.push({ name: 'Nilai Akhir' })"
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    class="mb-0 me-lg-2"
                    form="form-edit-nilai"
                    color="primary"
                    variant="gradient"
                    size="sm"
                    >Simpan Nilai</argon-button
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import d$nilai from "@/store/nilai";
import { mapActions, mapState } from "pinia";

export default {
  name: "EditNilaiAkhir",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      jumlah_nilai: "",
      nilai: "",
      body: {
        id_nilai: parseInt(this.$route.params.id_nilai),
        pembekalan: "",
        upacara: "",
        kehadiran_dilokasi: "",
        integritas: "",
        lrk: "",
        sosial_kemasyarakatan: "",
        lpk: "",
        ujian_akhir: "",
        tugas: "",
        uts: "",
        uas: "",
        nilai_akhir: "",
        nilai_huruf: "",
      },
      choicesKelulusan: undefined,
    };
  },
  computed: {
    ...mapState(d$nilai, ["g$nilai"]),
  },
  async created() {
    await this.getInitData();
  },
  mounted() {
    this.choicesKelulusan = this.getChoices("choices-status-kelulusan");
  },
  beforeUnmount() {
    if (this.choicesKelulusan) this.choicesKelulusan.destroy();
  },
  methods: {
    ...mapActions(d$nilai, ["a$getNilai", "a$editNilai"]),

    async getInitData() {
      try {
        await this.a$getNilai(this.body.id_nilai);
        this.assignNilai();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat memuat data! " + msg
        );
      }
    },

    async editNilai() {
      this.body.nilai_akhir = parseFloat(this.body.nilai_akhir);

      try {
        await this.a$editNilai(this.body);
        this.showSwal("success-message", "Nilai berhasil diubah!");
        this.$router.push({ name: "Nilai Akhir" });
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal disimpan! " + msg);
      }
    },

    updateValueNilai() {
      this.getNilaiUas();
      this.getNilaiUts();
      this.getJumlahNilai();
      this.getNilaiTugas();
      this.getNilaiAkhir();
      this.getNilaiHuruf();
    },

    getNilaiHuruf() {
      if (this.body.nilai_akhir >= 80) {
        this.body.nilai_huruf = "A";
      } else if (this.body.nilai_akhir >= 70) {
        this.body.nilai_huruf = "B";
      } else if (this.body.nilai_akhir >= 60) {
        this.body.nilai_huruf = "C";
      } else if (this.body.nilai_akhir >= 50) {
        this.body.nilai_huruf = "D";
      } else {
        this.body.nilai_huruf = "E";
      }
    },

    getNilaiAkhir() {
      this.body.nilai_akhir = (
        this.body.tugas * (50 / 100) +
        this.body.uts * (25 / 100) +
        this.body.uas * (25 / 100)
      ).toFixed;
    },

    getNilaiTugas() {
      this.body.tugas = Math.round(
        (this.body.pembekalan +
          this.body.upacara +
          this.body.integritas +
          this.body.kehadiran_dilokasi +
          this.body.sosial_kemasyarakatan) /
          5
      );
    },

    getNilaiUas() {
      this.body.uas = this.body.ujian_akhir;
    },

    getNilaiUts() {
      this.body.uts = Math.round((this.body.lrk + this.body.lpk) / 2);
    },

    getJumlahNilai() {
      this.jumlah_nilai =
        this.parseNilaiToInt(this.body.integritas) +
        this.parseNilaiToInt(this.body.kehadiran_dilokasi) +
        this.parseNilaiToInt(this.body.lpk) +
        this.parseNilaiToInt(this.body.lrk) +
        this.parseNilaiToInt(this.body.pembekalan) +
        this.parseNilaiToInt(this.body.sosial_kemasyarakatan) +
        this.parseNilaiToInt(this.body.tugas) +
        this.parseNilaiToInt(this.body.uas) +
        this.parseNilaiToInt(this.body.ujian_akhir) +
        this.parseNilaiToInt(this.body.uts) +
        this.parseNilaiToInt(this.body.upacara);
    },

    parseNilaiToInt(value) {
      let nilai =
        value == null || value == "" || value == undefined || isNaN(value)
          ? 0
          : parseInt(value);
      return nilai;
    },

    assignNilai() {
      this.nilai = this.g$nilai;

      this.body.integritas = this.g$nilai.integritas;
      this.body.kehadiran_dilokasi = this.g$nilai.kehadiran_dilokasi;
      this.body.lpk = this.g$nilai.lpk;
      this.body.lrk = this.g$nilai.lrk;
      this.body.pembekalan = this.g$nilai.pembekalan;
      this.body.sosial_kemasyarakatan = this.g$nilai.sosial_kemasyarakatan;
      this.body.tugas = this.g$nilai.tugas;
      this.body.uas = this.g$nilai.uas;
      this.body.ujian_akhir = this.g$nilai.ujian_akhir;
      this.body.uts = this.g$nilai.uts;
      this.body.upacara = this.g$nilai.upacara;

      this.updateValueNilai();
    },

    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
        });
      }
    },

    showSwal(type, text) {
      if (type === "success-message") {
        this.$swal({
          icon: "success",
          title: "Berhasil!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
        });
      } else if (type === "warning-message") {
        this.$swal({
          icon: "warning",
          title: "Peringatan!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
        });
      } else if (type === "failed-message") {
        this.$swal({
          icon: "error",
          title: "Gagal!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
        });
      } else if (type === "auto-close") {
        let timerInterval;
        this.$swal({
          title: "Auto close alert!",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            this.$swal.showLoading();
            const b = this.$swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = this.$swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      } else if (type === "loading") {
        this.$swal({
          title: "Memuat...",
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            this.$swal.showLoading();
          },
          didDestroy: () => {
            this.$swal.hideLoading();
          },
        });
      } else if (type === "close") {
        this.$swal.close();
      }
    },
  },
};
</script>
