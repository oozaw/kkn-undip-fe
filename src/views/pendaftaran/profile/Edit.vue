<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard :key="indexComponent">
          <template #button>
            <argon-button
              :onclick="() => $router.go(-1)"
              type="button"
              class="mb-0 me-2"
              color="secondary"
              size="sm"
              >Kembali</argon-button
            >
            <argon-button
              type="submit"
              form="form-edit-profile"
              class="mb-0 me-lg-2"
              color="primary"
              variant="gradient"
              size="sm"
              >Simpan Data Diri</argon-button
            >
          </template>
        </HeaderProfileCard>
        <!-- Mahasiswa -->
        <div
          id="card-profile-mhs"
          class="card mt-4 pb-3"
          v-if="g$user.role === 'MAHASISWA'"
        >
          <div class="card-header">
            <h5>Data Diri</h5>
          </div>
          <div class="card-body pt-0">
            <form
              role="form"
              id="form-edit-profile"
              @submit.prevent="updateProfile()"
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
                    v-model="nama"
                    required
                  />
                </div>
                <div class="col-sm-6 col-12 mt-3 mt-sm-0">
                  <label class="form-label">NIM</label>
                  <input
                    class="form-control"
                    id="nim"
                    name="nim"
                    type="text"
                    placeholder="NIM"
                    v-model="body.nim"
                    readonly
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Fakultas</label>
                  <select
                    id="choices-fakultas"
                    class="form-control"
                    name="choices-fakultas"
                    v-model="idFakultas"
                    @change="getListProdi()"
                  >
                    <option value="" disabled>-- Pilih Fakultas --</option>
                    <option
                      v-for="fakultas in g$listFakultas"
                      :key="fakultas.id_fakultas"
                      :value="fakultas.id_fakultas"
                    >
                      {{ fakultas.nama }}
                    </option>
                  </select>
                </div>
                <div class="col-sm-6 col-12 mt-3 mt-sm-0">
                  <label class="form-label">Program Studi</label>
                  <select
                    id="choices-prodi"
                    class="form-control"
                    name="choices-prodi"
                    v-model="idProdi"
                  >
                    <option value="" disabled>-- Pilih Prodi --</option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Jenis Kelamin</label>
                  <select
                    id="choices-gender"
                    class="form-control"
                    name="choices-gender"
                    v-model="jenisKelamin"
                  >
                    <option value="" disabled>-- Pilih jenis kelamin --</option>
                    <option value="1">Laki-laki</option>
                    <option value="2">Perempuan</option>
                  </select>
                </div>
                <div class="col-sm-6 col-12 mt-3 mt-sm-0">
                  <label class="form-label">Tanggal Lahir</label>
                  <VueDatePicker
                    id="ttl"
                    name="ttl"
                    v-model="body.ttl"
                    placeholder="Pilih tanggal lahir"
                    :enable-time-picker="false"
                    locale="id"
                    cancel-text="Batal"
                    select-text="Pilih"
                    :format="'dd MMMM yyyy'"
                    :format-locale="id"
                    no-today
                    required
                  ></VueDatePicker>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Riwayat Penyakit</label>
                  <textarea
                    class="form-control"
                    id="riwayat-penyakit"
                    name="riwayat-penyakit"
                    rows="3"
                    placeholder="Riwayat penyakit yang pernah diderita"
                    v-model="body.riwayat_penyakit"
                    required
                  ></textarea>
                </div>
                <div class="col-sm-6 col-12 mt-3 mt-sm-0">
                  <label class="form-label">No. Telepon</label>
                  <input
                    class="form-control"
                    id="no-hp"
                    name="no-hp"
                    type="number"
                    placeholder="Nomor telepon aktif mahasiswa"
                    v-model="body.no_hp"
                    required
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label class="form-label">Alamat</label>
                  <textarea
                    class="form-control"
                    id="alamat"
                    name="alamat"
                    rows="3"
                    placeholder="Alamat tempat tinggal saat ini"
                    v-model="body.alamat"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Nama Orang Tua</label>
                  <input
                    class="form-control"
                    id="nama-ortu"
                    name="nama-ortu"
                    type="text"
                    placeholder="Nama orang tua atau wali"
                    v-model="body.nama_ortu"
                    required
                  />
                </div>
                <div class="col-sm-6 col-12 mt-3 mt-sm-0">
                  <label class="form-label">No. Telepon Orang Tua</label>
                  <input
                    class="form-control"
                    id="no-hp-ortu"
                    name="no-hp-ortu"
                    type="text"
                    placeholder="Nomor telepon orang tua atau wali"
                    v-model="body.no_hp_ortu"
                    required
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label class="form-label">Alamat Orang Tua</label>
                  <textarea
                    class="form-control"
                    id="alamat-ortu"
                    name="alamat-ortu"
                    rows="3"
                    placeholder="Alamat orang tua atau wali"
                    v-model="body.alamat_ortu"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Nama Contact Person Darurat</label>
                  <input
                    class="form-control"
                    id="nama-cp"
                    name="nama-cp"
                    type="text"
                    placeholder="Nama contact person darurat"
                    v-model="body.nama_cp_urgent"
                    required
                  />
                </div>
                <div class="col-sm-6 col-12 mt-3 mt-sm-0">
                  <label class="form-label">No. Telepon Contact Person</label>
                  <input
                    class="form-control"
                    id="no-hp-cp"
                    name="no-hp-cp"
                    type="number"
                    placeholder="Nomor telepon contact person darurat"
                    v-model="body.no_hp_cp_urgent"
                    required
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label class="form-label">Alamat Contact Person</label>
                  <textarea
                    class="form-control"
                    id="alamat-cp"
                    name="alamat-cp"
                    rows="3"
                    placeholder="Alamat contact person darurat"
                    v-model="body.alamat_cp_urgent"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label class="form-label"
                    >Hubungan dengan Contact Person</label
                  >
                  <input
                    class="form-control"
                    id="hubungan-cp"
                    name="hubungan-cp"
                    type="text"
                    placeholder="Status hubungan dengan contact person darurat, contoh: Ibu kandung atau Paman"
                    v-model="body.hubungan"
                    required
                  />
                </div>
              </div>
              <div class="row mt-4">
                <div
                  class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-center"
                >
                  <argon-button
                    :onclick="() => $router.go(-1)"
                    type="button"
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Kembali</argon-button
                  >
                  <argon-button
                    type="submit"
                    form="form-edit-profile"
                    class="mb-0 me-lg-2"
                    color="primary"
                    variant="gradient"
                    size="sm"
                    >Simpan Data Diri</argon-button
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- Lainnya -->
        <div id="card-profile-mhs" class="card mt-4 pb-3" v-else>
          <div class="card-header">
            <h5>Data Diri</h5>
          </div>
          <div class="card-body pt-0">
            <form
              role="form"
              id="form-edit-profile"
              @submit.prevent="updateProfile()"
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
                    v-model="nama"
                    required
                  />
                </div>
                <div
                  v-if="g$user.role === 'BAPPEDA'"
                  class="col-sm-6 col-12 mt-3 mt-sm-0"
                >
                  <label class="form-label">Nomor BAPPEDA</label>
                  <input
                    class="form-control"
                    id="nb"
                    name="nb"
                    type="text"
                    placeholder="Nomor Induk BAPPEDA"
                    v-model="body.nb"
                    readonly
                  />
                </div>
                <div v-else class="col-sm-6 col-12 mt-3 mt-sm-0">
                  <label class="form-label">NIP</label>
                  <input
                    class="form-control"
                    id="nip"
                    name="nip"
                    type="text"
                    placeholder="NIP"
                    v-model="body.nip"
                    readonly
                  />
                </div>
              </div>
              <div v-if="g$user.role === 'BAPPEDA'" class="row mt-3">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Nama Kabupaten</label>
                  <input
                    class="form-control"
                    id="nama_kabupaten"
                    name="nama_kabupaten"
                    type="text"
                    placeholder="Nama Kabupaten, contoh: Kab. Wonogiri atau Kota Semarang"
                    v-model="body.nama_kabupaten"
                    required
                  />
                </div>
                <div class="col-sm-6 col-12 mt-3 mt-sm-0">
                  <label class="form-label">Nama Penanggung Jawab</label>
                  <input
                    class="form-control"
                    id="nama_pj"
                    name="nama_pj"
                    type="text"
                    placeholder="Nama penanggung jawab BAPPEDA"
                    v-model="body.nama_pj"
                    required
                  />
                </div>
              </div>
              <div v-else class="row mt-3">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Jenis Kelamin</label>
                  <select
                    id="choices-gender"
                    class="form-control"
                    name="choices-gender"
                    v-model="jenisKelamin"
                  >
                    <option value="" selected disabled>
                      -- Pilih jenis kelamin --
                    </option>
                    <option value="1">Laki-laki</option>
                    <option value="2">Perempuan</option>
                  </select>
                </div>
                <div class="col-sm-6 col-12 mt-3 mt-sm-0">
                  <label class="form-label">Tanggal Lahir</label>
                  <VueDatePicker
                    id="ttl"
                    name="ttl"
                    v-model="body.ttl"
                    placeholder="Pilih tanggal lahir"
                    :enable-time-picker="false"
                    locale="id"
                    cancel-text="Batal"
                    select-text="Pilih"
                    :format="'dd MMMM yyyy'"
                    :format-locale="id"
                    no-today
                    required
                  ></VueDatePicker>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-sm-6 col-12">
                  <label class="form-label">Alamat</label>
                  <textarea
                    class="form-control"
                    id="alamat"
                    name="alamat"
                    rows="3"
                    placeholder="Alamat tempat tinggal saat ini"
                    v-model="body.alamat"
                    required
                  ></textarea>
                </div>
                <div class="col-sm-6 col-12 mt-3 mt-sm-0">
                  <label class="form-label">No. Telepon</label>
                  <input
                    class="form-control"
                    id="no-hp"
                    name="no-hp"
                    type="number"
                    placeholder="Nomor telepon aktif"
                    v-model="body.no_hp"
                    required
                  />
                </div>
              </div>
              <div class="row mt-4">
                <div
                  class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-center"
                >
                  <argon-button
                    :onclick="() => $router.go(-1)"
                    type="button"
                    class="mb-0 me-2"
                    color="secondary"
                    size="sm"
                    >Kembali</argon-button
                  >
                  <argon-button
                    type="submit"
                    form="form-edit-profile"
                    class="mb-0 me-lg-2"
                    color="primary"
                    variant="gradient"
                    size="sm"
                    >Simpan Data Diri</argon-button
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
import { id } from "date-fns/locale";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapActions, mapState } from "pinia";
import d$auth from "@/store/auth";
import d$fakultas from "@/store/fakultas";

export default {
  name: "EditDataDiri",
  components: {
    HeaderProfileCard,
    ArgonButton,
    VueDatePicker,
  },
  data() {
    return {
      indexComponent: 0,
      mahasiswa: "",
      dosen: "",
      bappeda: "",
      admin: "",
      reviewer: "",
      pimpinan: "",
      body: {},
      nama: "",
      idFakultas: "",
      idProdi: "",
      jenisKelamin: "",
      id: id,
      choicesGender: undefined,
      choicesFakultas: undefined,
      choicesProdi: undefined,
      choicesGenderDosen: undefined,
      config: {
        allowInput: true,
        dateFormat: "Z",
        enableTime: false,
        altInput: true,
        altFormat: "j F, Y",
      },
    };
  },
  computed: {
    ...mapState(d$auth, ["g$user", "g$infoUser"]),
    ...mapState(d$fakultas, ["g$listFakultas"]),
  },
  async created() {
    await this.getInitData();
  },
  beforeUnmount() {
    this.destroyChoices();
  },
  methods: {
    ...mapActions(d$auth, ["a$getUser", "a$editUser"]),
    ...mapActions(d$fakultas, ["a$listFakultas"]),

    async getInitData() {
      try {
        await this.a$getUser();
        this.nama = this.g$infoUser.nama ?? "";
        this.idFakultas = this.g$infoUser.id_fakultas ?? "";
        this.idProdi = this.g$infoUser.id_prodi ?? "";
        this.jenisKelamin = this.g$infoUser.jenis_kelamin ?? "";
        this.body = this.g$infoUser;

        await this.a$listFakultas();

        this.initChoices();

        if (this.body.jenis_kelamin) this.setChoicesGender(this.choicesGender);
        if (this.g$user.role === "MAHASISWA" && this.body.id_prodi != "")
          this.getListProdi();
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

    async updateProfile() {
      var data = {
        nama: this.nama,
        jenis_kelamin: parseInt(this.jenisKelamin),
        ttl: this.body.ttl,
        no_hp: String(this.body.no_hp),
        alamat: this.body.alamat,
      };

      switch (this.g$user.role) {
        case "MAHASISWA":
          data.id_prodi = parseInt(this.idProdi);
          data.riwayat_penyakit = this.body.riwayat_penyakit;
          data.nama_ortu = this.body.nama_ortu;
          data.no_hp_ortu = this.body.no_hp_ortu;
          data.alamat_ortu = this.body.alamat_ortu;
          data.nama_cp_urgent = this.body.nama_cp_urgent;
          data.no_hp_cp_urgent = String(this.body.no_hp_cp_urgent);
          data.alamat_cp_urgent = this.body.alamat_cp_urgent;
          data.hubungan = this.body.hubungan;

          break;

        case "BAPPEDA":
          delete data.jenis_kelamin;
          delete data.ttl;
          data.nama_kabupaten = this.body.nama_kabupaten;
          data.nama_pj = this.body.nama_pj;
          break;

        default:
          break;
      }

      if (!this.validation(data)) {
        this.showSwal("warning-message", "Lengkapi data terlebih dahulu!");
        return;
      }

      try {
        await this.a$editUser(data);

        this.destroyChoices();
        this.showSwal("success-message", "Data diri berhasil diperbarui!");
        await this.getInitData();
        this.indexComponent++;
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal disimpan! " + msg);
      }
    },

    validation(body) {
      if (
        this.isNullEmptyOrUndefined(body.nama) ||
        this.isNullEmptyOrUndefined(body.no_hp) ||
        this.isNullEmptyOrUndefined(body.alamat)
      ) {
        // console.log("val 1");
        return false;
      }

      switch (this.g$user.role) {
        case "MAHASISWA":
          if (
            this.isNullEmptyOrUndefined(body.riwayat_penyakit) ||
            this.isNullEmptyOrUndefined(body.nama_ortu) ||
            this.isNullEmptyOrUndefined(body.no_hp_ortu) ||
            this.isNullEmptyOrUndefined(body.alamat_ortu) ||
            this.isNullEmptyOrUndefined(body.nama_cp_urgent) ||
            this.isNullEmptyOrUndefined(body.no_hp_cp_urgent) ||
            this.isNullEmptyOrUndefined(body.alamat_cp_urgent) ||
            this.isNullEmptyOrUndefined(body.hubungan)
          ) {
            // console.log("val 2");
            return false;
          }
          break;

        case "BAPPEDA":
          if (
            this.isNullEmptyOrUndefined(body.nama_kabupaten) ||
            this.isNullEmptyOrUndefined(body.nama_pj)
          ) {
            // console.log("val 3");
            return false;
          }
          break;

        default:
          if (
            !(body.jenis_kelamin == 1 || body.jenis_kelamin == 2) ||
            this.isNullEmptyOrUndefined(body.ttl)
          ) {
            // console.log("val 4");
            return false;
          }
          break;
      }

      return true;
    },

    isNullEmptyOrUndefined(value) {
      return value === null || value === "" || value === undefined;
    },

    initChoices() {
      // if (this.g$user.role === "MAHASISWA") {
      // mhs-section
      this.choicesGender = this.getChoices("choices-gender");
      this.choicesFakultas = this.getChoices("choices-fakultas");
      this.choicesProdi = this.getChoices("choices-prodi");
      // } else if (this.g$user.role === "DOSEN") {
      //   // dosen-section
      //   this.choicesGenderDosen = this.getChoices("choices-gender-dosen");
      // }
    },

    destroyChoices() {
      // mhs-section
      if (this.choicesGender) this.choicesGender.destroy();
      if (this.choicesFakultas) this.choicesFakultas.destroy();
      if (this.choicesProdi) this.choicesProdi.destroy();

      // dosen-section
      if (this.choicesGenderDosen) this.choicesGenderDosen.destroy();
    },

    getListProdi() {
      this.g$listFakultas.forEach((fakultas) => {
        if (fakultas.id_fakultas == this.idFakultas) {
          this.setChoicesProdi(this.choicesProdi, fakultas.prodi);
        }
      });
    },

    setChoicesGender() {
      let choices = this.choicesGender;
      if (this.g$user.role === "DOSEN") choices = this.choicesGenderDosen;

      if (choices) {
        choices.clearChoices();
        choices.removeActiveItems();

        let option = {
          value: "",
          label: "-- Pilih jenis kelamin --",
          selected: true,
          disabled: true,
        };

        if (
          this.body.jenis_kelamin == "" ||
          this.body.jenis_kelamin == null ||
          this.body.jenis_kelamin == 0
        )
          option.selected = true;
        else option.selected = false;

        choices.setChoices([
          option,
          {
            value: "1",
            label: "Laki-laki",
            selected: this.body.jenis_kelamin == 1,
            disabled: false,
          },
          {
            value: "2",
            label: "Perempuan",
            selected: this.body.jenis_kelamin == 2,
            disabled: false,
          },
        ]);
      }
    },

    setChoicesProdi(choices, option) {
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

        if (this.body.id_prodi == "" || this.body.id_prodi == null)
          newOption.selected = true;
        else newOption.selected = false;

        option.forEach((item) => {
          newOption.push({
            value: Object.values(item)[0],
            label: Object.values(item)[2],
            selected: Object.values(item)[0] == this.body.id_prodi,
          });
        });
        choices.setChoices(newOption);
      }
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

    removeAllOptions(id) {
      var element = document.getElementById(id);
      if (element) {
        while (element.options.length > 0) {
          element.remove(0);
        }
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
