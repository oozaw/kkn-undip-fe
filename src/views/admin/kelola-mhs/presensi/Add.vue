<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0">
        <HeaderProfileCard> </HeaderProfileCard>
      </div>
    </div>
    <div class="mt-4">
      <div class="mt-4 mt-lg-0">
        <div class="card">
          <form
            id="form-add-presensi-mhs"
            role="form"
            @submit.prevent="addPresensi()"
          >
            <div class="card-body pb-4">
              <h5 class="font-weight-bolder mb-3">Tambah Presensi</h5>
              <div class="row">
                <div class="col-12">
                  <label>Tema</label>
                  <input
                    class="form-control"
                    type="text"
                    name="tema"
                    id="tema"
                    placeholder="Tema"
                    :value="kecamatan?.nama_tema"
                    required
                    readonly
                  />
                </div>
                <div class="mt-3 col-12 col-sm-6 mt-sm-0"></div>
              </div>
              <div class="row mt-3">
                <div class="col-12 col-sm-6">
                  <label>Kecamatan</label>
                  <input
                    class="form-control"
                    type="text"
                    name="kecamatan"
                    id="kecamatan"
                    placeholder="Kecamatan"
                    :value="kecamatan?.nama"
                    required
                    readonly
                  />
                </div>
                <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                  <label>Mahasiswa</label>
                  <select
                    id="choices-mahasiswa"
                    class="form-control"
                    name="choices-mahasiswa"
                    v-model="id_mahasiswa"
                  >
                    <option value="" disabled>-- Pilih mahasiswa --</option>
                    <option
                      v-for="mahasiswa in g$listMahasiswa"
                      :key="mahasiswa.mahasiswa?.id_mahasiswa"
                      :value="mahasiswa.mahasiswa?.id_mahasiswa"
                    >
                      {{ mahasiswa.mahasiswa?.nama }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12 col-sm-6">
                  <label>Tanggal</label>
                  <select
                    id="choices-tanggal"
                    class="form-control"
                    name="choices-tanggal"
                    v-model="id_presensi"
                  >
                    <option value="" disabled>-- Pilih tanggal --</option>
                    <option
                      v-for="presensi in g$listPresensi"
                      :key="presensi.id_presensi"
                      :value="presensi.id_presensi"
                    >
                      {{ moment(presensi.tgl).format("dddd, DD MMMM YYYY") }}
                    </option>
                  </select>
                </div>
                <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                  <label>Status</label>
                  <select
                    id="choices-status"
                    class="form-control"
                    name="choices-status"
                    v-model="status"
                  >
                    <option value="" disabled>-- Pilih status --</option>
                    <option value="-1">Tidak Hadir</option>
                    <option value="1">Hadir</option>
                    <option value="2">Izin</option>
                  </select>
                </div>
              </div>
              <div class="row mt-4">
                <div
                  class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-end"
                >
                  <argon-button
                    v-if="this.g$user.role === 'ADMIN'"
                    type="button"
                    :onclick="
                      () => $router.push({ name: 'Presensi Mahasiswa Admin' })
                    "
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    v-else-if="this.g$user.role === 'DOSEN'"
                    type="button"
                    :onclick="
                      () => $router.push({ name: 'Review Presensi Mahasiswa' })
                    "
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Batal</argon-button
                  >
                  <argon-button
                    type="submit"
                    form="form-add-presensi-mhs"
                    class="mb-0 me-lg-2"
                    color="success"
                    variant="gradient"
                    size="sm"
                    >Tambah Presensi</argon-button
                  >
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Choices from "choices.js";
import ArgonButton from "@/components/ArgonButton.vue";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$presensi from "@/store/presensi";
import d$mahasiswa from "@/store/mahasiswa";
import d$wilayah from "@/store/wilayah";
import d$auth from "@/store/auth";

export default {
  name: "AddPresensiMhs",
  components: {
    HeaderProfileCard,
    ArgonButton,
  },
  data() {
    return {
      presensi: undefined,
      kecamatan: undefined,
      id_kecamatan: parseInt(this.$route.params.id_kecamatan),
      id_mahasiswa: "",
      id_presensi: "",
      status: "",
      choicesMahasiswa: undefined,
      choicesTanggal: undefined,
      choicesStatus: undefined,
      moment,
    };
  },
  computed: {
    ...mapState(d$auth, ["g$user"]),
    ...mapState(d$presensi, ["g$listPresensi"]),
    ...mapState(d$mahasiswa, ["g$listMahasiswa"]),
    ...mapState(d$wilayah, ["g$kecamatan"]),
  },
  async created() {
    moment.locale("id");
    await this.getInitData();
  },
  mounted() {
    this.choicesStatus = this.getChoices("choices-status", false);
  },
  beforeUnmount() {
    if (this.choicesMahasiswa) this.choicesMahasiswa.destroy();
    if (this.choicesTanggal) this.choicesTanggal.destroy();
    if (this.choicesStatus) this.choicesStatus.destroy();
  },
  methods: {
    ...mapActions(d$presensi, [
      "a$addPresensi",
      "a$listJadwalPresensiTema",
      "a$addPresensi",
    ]),
    ...mapActions(d$mahasiswa, ["a$listMahasiswaAcceptedByKecamatan"]),
    ...mapActions(d$wilayah, ["a$getKecamatan"]),

    async getInitData() {
      this.showSwal("loading");

      try {
        await this.a$getKecamatan(this.id_kecamatan);
        this.kecamatan = this.g$kecamatan;
        await this.a$listJadwalPresensiTema(parseInt(this.kecamatan.id_tema));
        await this.a$listMahasiswaAcceptedByKecamatan(
          parseInt(this.kecamatan.id_kecamatan)
        );

        this.choicesMahasiswa = this.getChoices("choices-mahasiswa", true);
        this.choicesTanggal = this.getChoices("choices-tanggal", false);

        setTimeout(() => {
          this.showSwal("close");
        }, 100);
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal ditambahkan! " + msg);
      }
    },

    async addPresensi() {
      this.showSwal("loading");

      if (
        this.id_mahasiswa === "" ||
        this.id_presensi === "" ||
        this.status === ""
      ) {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      const body = {
        id_mahasiswa: parseInt(this.id_mahasiswa),
        id_presensi: parseInt(this.id_presensi),
        status: parseInt(this.status),
      };

      try {
        await this.a$addPresensi(body);
        this.showSwal("success-message", "Data presensi berhasil ditambahkan!");
        if (this.g$user.role === "ADMIN")
          this.$router.push({ name: "Presensi Mahasiswa Admin" });
        else if (this.g$user.role === "DOSEN")
          this.$router.push({ name: "Review Presensi Mahasiswa" });
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal ditambahkan! " + msg);
      }
    },

    setChoices(choices, option) {
      if (choices) {
        choices.clearChoices();
        choices.removeActiveItems();

        let newOption = [
          {
            value: "",
            label: "-- Pilih prodi --",
            selected: true,
            disabled: true,
          },
        ];

        option.forEach((item) => {
          newOption.push({
            value: Object.values(item)[0],
            label: Object.values(item)[2],
            selected: false,
          });
        });
        choices.setChoices(newOption);
      }
    },

    getChoices(id, isSort) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
          shouldSort: isSort,
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
