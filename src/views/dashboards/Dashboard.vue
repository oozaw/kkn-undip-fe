<template>
  <div class="card shadow-lg mx-4 mt-4">
    <div class="card shadow-lg">
      <HeaderProfileCard />
    </div>
  </div>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row mt-1">
          <div class="col-lg-6 col-12">
            <calendar
              v-if="listEvent != undefined"
              title="Kalender KKN"
              :events="listEvent"
              :initial-date="initialDate"
            />
            <!-- <div class="mt-4" v-if="g$user.role === 'ADMIN'">
              <timeline-list
                v-if="listPengumuman != undefined"
                class="h-100"
                title="Pengumuman KKN"
              >
                <timeline-item
                  v-for="pengumuman in listPengumuman"
                  :key="pengumuman.id_pengumuman"
                  :title="pengumuman.judul"
                  :date-time="
                    moment(pengumuman.created_at).format('DD MMMM YYYY')
                  "
                  :description="pengumuman.isi"
                />
              </timeline-list>
            </div> -->
          </div>
          <div class="col-lg-6 col-12 mt-lg-0 mt-4">
            <div class="col-lg-12 col-sm-12">
              <mini-statistics-card
                v-if="g$user.role === 'MAHASISWA'"
                class="py-2"
                :style="'margin-left: 85.5%'"
                title="Dosen Pembimbing"
                :isValueList="true"
                :value="{
                  list: dosenName,
                  color: 'dark',
                }"
                :icon="{
                  component: 'fa-solid fa-user-tie',
                  background: 'bg-gradient-info',
                  shape: 'rounded-circle',
                }"
              />
              <mini-statistics-card
                v-if="
                  g$user.role === 'DOSEN' ||
                  g$user.role === 'BAPPEDA' ||
                  g$user.role === 'REVIEWER' ||
                  g$user.role === 'PIMPINAN'
                "
                :style="'margin-left: 70%'"
                role="button"
                title="Data Diri"
                title-color="primary"
                :value="{
                  text:
                    checkProgressDataDiriDosen() == 100
                      ? `Sudah Lengkap (${checkProgressDataDiriDosen()}%)`
                      : `Belum Lengkap (${checkProgressDataDiriDosen()}%)`,
                  color:
                    checkProgressDataDiriDosen() == 100 ? 'success' : 'danger',
                }"
                :icon="{
                  component: 'fa-solid fa-address-card',
                  background: 'bg-gradient-primary',
                  shape: 'rounded-circle',
                }"
                @click="() => $router.push({ name: 'Edit Data Diri' })"
              />
              <mini-statistics-card
                v-if="g$user.role === 'DOSEN' || g$user.role === 'BAPPEDA'"
                :style="'margin-left: 70%'"
                role="button"
                title="Daftar Lokasi KKN"
                title-color="primary"
                :isValueList="true"
                :value="{
                  list: listWilayahDosen,
                  color: 'dark',
                }"
                :icon="{
                  component: 'fa-solid fa-map-location-dot',
                  background: 'bg-gradient-danger',
                  shape: 'rounded-circle',
                }"
                @click="() => $router.push({ name: 'Registrasi' })"
              />
              <div
                class="mt-2"
                v-if="
                  g$user.role === 'DOSEN' ||
                  g$user.role === 'BAPPEDA' ||
                  g$user.role === 'REVIEWER' ||
                  g$user.role === 'PIMPINAN'
                "
              >
                <timeline-list
                  v-if="listPengumuman != undefined"
                  class="h-100"
                  title="Pengumuman KKN"
                >
                  <timeline-item
                    v-for="pengumuman in listPengumuman"
                    :key="pengumuman.id_pengumuman"
                    :title="pengumuman.judul"
                    :date-time="
                      moment(pengumuman.created_at).format('DD MMMM YYYY')
                    "
                    :description="pengumuman.isi"
                  />
                </timeline-list>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    v-if="g$user.role === 'MAHASISWA'"
                    :style="'margin-left: 70%'"
                    role="button"
                    title="Data Diri"
                    title-color="primary"
                    :value="{
                      text:
                        checkProgressDataDiriMhs() == 100
                          ? `Sudah Lengkap (${checkProgressDataDiriMhs()}%)`
                          : `Belum Lengkap (${checkProgressDataDiriMhs()}%)`,
                      color:
                        checkProgressDataDiriMhs() == 100
                          ? 'success'
                          : 'danger',
                    }"
                    :icon="{
                      component: 'fa-solid fa-address-card',
                      background: 'bg-gradient-primary',
                      shape: 'rounded-circle',
                    }"
                    @click="() => $router.push({ name: 'Edit Data Diri' })"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    v-if="g$user.role === 'MAHASISWA'"
                    :style="'margin-left: 70%'"
                    role="button"
                    title="Lokasi KKN"
                    :value="
                      lokasi.kecamatan == ''
                        ? 'Belum terdaftar'
                        : `Kec. ${lokasi.kecamatan}`
                    "
                    :description="
                      lokasi.kabupaten == '' ? '' : `Kab. ${lokasi.kabupaten}`
                    "
                    :icon="{
                      component: 'fa-solid fa-map-location-dot',
                      background: 'bg-gradient-danger',
                      shape: 'rounded-circle',
                    }"
                    @click="() => $router.push({ name: 'Index Lokasi' })"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    v-if="g$user.role === 'MAHASISWA'"
                    :style="'margin-left: 70%'"
                    role="button"
                    title="Status LRK"
                    :value="{
                      text:
                        checkProgressLRK() == 100
                          ? `Sudah Lengkap (${checkProgressLRK()}%)`
                          : `Belum Lengkap (${checkProgressLRK()}%)`,
                      color: checkProgressLRK() == 100 ? 'success' : 'danger',
                    }"
                    :description="`Jumlah LRK: ${g$listLRK.length}`"
                    :icon="{
                      component: 'fa-solid fa-file-lines',
                      background: 'bg-gradient-success',
                      shape: 'rounded-circle',
                    }"
                    @click="() => $router.push({ name: 'LRK' })"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    v-if="g$user.role === 'MAHASISWA'"
                    :style="'margin-left: 70%'"
                    role="button"
                    title="Status LPK"
                    :value="{
                      text:
                        checkProgressLPK() == 100
                          ? `Sudah Lengkap (${checkProgressLPK()}%)`
                          : `Belum Lengkap (${checkProgressLPK()}%)`,
                      color: checkProgressLPK() == 100 ? 'success' : 'danger',
                    }"
                    :description="`Jumlah LPK: ${g$listLPK.length}`"
                    :icon="{
                      component: 'fa-solid fa-file-lines',
                      background: 'bg-gradient-warning',
                      shape: 'rounded-circle',
                    }"
                    @click="() => $router.push({ name: 'LPK' })"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    v-if="g$user.role === 'ADMIN'"
                    :style="'margin-left: 70%'"
                    title="Total Kecamatan Terdaftar"
                    :value="{ text: total.kecamatan, color: 'success' }"
                    :description="`Dari total ${total.temaActive} tema aktif`"
                    :icon="{
                      component: 'fa-solid fa-list-check',
                      background: 'bg-gradient-success',
                      shape: 'rounded-circle',
                    }"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    v-if="g$user.role === 'ADMIN'"
                    :style="'margin-left: 70%'"
                    title="Total Kelurahan Terdaftar"
                    :value="{ text: total.desa, color: 'success' }"
                    :description="`Dari total ${total.temaActive} tema aktif`"
                    :icon="{
                      component: 'fa-solid fa-list-check',
                      background: 'bg-gradient-warning',
                      shape: 'rounded-circle',
                    }"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    v-if="g$user.role === 'ADMIN'"
                    :style="'margin-left: 70%'"
                    title="Total Mahasiswa"
                    :value="{ text: total.mahasiswa, color: 'success' }"
                    :description="`Dari total ${total.temaActive} tema aktif`"
                    :icon="{
                      component: 'fa-solid fa-users',
                      background: 'bg-gradient-info',
                      shape: 'rounded-circle',
                    }"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    v-if="g$user.role === 'ADMIN'"
                    :style="'margin-left: 70%'"
                    title="Total Mahasiswa Terdaftar"
                    :value="{
                      text: total.mahasiswaRegistered,
                      color: 'success',
                    }"
                    :description="`Dari total ${total.temaActive} tema aktif`"
                    :icon="{
                      component: 'fa-solid fa-users',
                      background: 'bg-gradient-primary',
                      shape: 'rounded-circle',
                    }"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    v-if="g$user.role === 'ADMIN'"
                    :style="'margin-left: 70%'"
                    title="Total BAPPEDA"
                    :value="{ text: total.bappeda, color: 'success' }"
                    :description="`Dari total ${total.temaActive} tema aktif`"
                    :icon="{
                      component: 'fa-solid fa-users',
                      background: 'bg-gradient-danger',
                      shape: 'rounded-circle',
                    }"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    v-if="g$user.role === 'ADMIN'"
                    :style="'margin-left: 70%'"
                    title="Total Dosen"
                    :value="{ text: total.dosen, color: 'success' }"
                    :description="`Dari total ${total.temaActive} tema aktif`"
                    :icon="{
                      component: 'fa-solid fa-users',
                      background: 'bg-gradient-secondary',
                      shape: 'rounded-circle',
                    }"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    v-if="g$user.role === 'ADMIN'"
                    :style="'margin-left: 70%'"
                    title="Total Reviewer"
                    :value="{ text: total.reviewer, color: 'success' }"
                    :icon="{
                      component: 'fa-solid fa-users',
                      background: 'bg-gradient-success',
                      shape: 'rounded-circle',
                    }"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    v-if="g$user.role === 'ADMIN'"
                    :style="'margin-left: 70%'"
                    title="Total Pimpinan"
                    :value="{
                      text: total.pimpinan,
                      color: 'success',
                    }"
                    :icon="{
                      component: 'fa-solid fa-users',
                      background: 'bg-gradient-dark',
                      shape: 'rounded-circle',
                    }"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-12 col-sm-12 mt-sm-2">
              <members-table
                v-if="g$user.role === 'MAHASISWA'"
                :value="g$kecamatan.mahasiswa"
              />
            </div>
          </div>
        </div>
        <div class="row mt">
          <div class="col-12">
            <div class="mt-lg-4 mt-3" v-if="g$user.role === 'ADMIN'">
              <timeline-list
                v-if="listPengumuman != undefined"
                class="h-100"
                title="Pengumuman KKN"
              >
                <timeline-item
                  v-for="pengumuman in listPengumuman"
                  :key="pengumuman.id_pengumuman"
                  :title="pengumuman.judul"
                  :date-time="
                    moment(pengumuman.created_at).format('DD MMMM YYYY')
                  "
                  :description="pengumuman.isi"
                />
              </timeline-list>
            </div>
          </div>
          <div class="col-lg-12 col-sm-12 mt-4" v-if="g$user.role === 'ADMIN'">
            <div class="bg-white card">
              <!-- Card header -->
              <div class="pb-0 card-header">
                <div class="d-lg-flex">
                  <div>
                    <h5 class="mb-2">List Lokasi KKN</h5>
                  </div>
                </div>
              </div>
              <div class="ms-2 pt-1 px-0 pb-0 card-body">
                <div class="table-responsive">
                  <table id="location-list" class="table table-flush">
                    <thead class="thead-light">
                      <tr>
                        <th class="col-1">No.</th>
                        <th style="max-width: 50cm">Nama/ Tema KKN</th>
                        <th>Lokasi</th>
                        <th>Periode</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-sm font-weight-bold">1</td>
                        <td>
                          <h6 class="my-auto">KKN Reguler Tim I</h6>
                        </td>
                        <td class="text-sm font-weight-bold font-weight-bold">
                          Desa Bergas, Kecamatan Bergas
                        </td>
                        <td class="text-sm font-weight-bold">2022/2023</td>
                      </tr>
                      <tr>
                        <td class="text-sm font-weight-bold">2</td>
                        <td>
                          <h6 class="my-auto">KKN Reguler Tim II</h6>
                        </td>
                        <td class="text-sm font-weight-bold">
                          Desa Gangga, Kecamatan Gangga
                        </td>
                        <td class="text-sm font-weight-bold">2022/2023</td>
                      </tr>
                      <tr>
                        <td class="text-sm font-weight-bold">3</td>
                        <td>
                          <h6 class="my-auto">
                            KKN Tematik Tanggap Bencana Banjir Cianjur
                          </h6>
                        </td>
                        <td class="text-sm font-weight-bold">
                          Desa Cianjur, Kecamatan Cianjur
                        </td>
                        <td class="text-sm font-weight-bold">2022/2023</td>
                      </tr>
                      <tr>
                        <td class="text-sm font-weight-bold">4</td>
                        <td>
                          <h6 class="my-auto">
                            KKN Tematik Pengurangan Risiko Bencana Berbasis
                            Partisipasi Masyarakat dan Komunitas
                          </h6>
                        </td>
                        <td class="text-sm font-weight-bold">
                          Desa Kungkat, Kecamatan Kungkat
                        </td>
                        <td class="text-sm font-weight-bold">2022/2023</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th class="col-1">No.</th>
                        <th>Nama/ Tema KKN</th>
                        <th>Lokasi</th>
                        <th>Periode</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { DataTable } from "simple-datatables";
import setTooltip from "@/assets/js/tooltip.js";
import MiniStatisticsCard from "@/views/dashboards/components/Cards/MiniStatisticsCard.vue";
import Calendar from "@/views/dashboards/components/Calendar.vue";
import MembersTable from "@/views/dashboards/components/MembersTable.vue";
import TimelineList from "@/views/dashboards/components/Cards/TimelineList.vue";
import TimelineItem from "@/views/dashboards/components/Cards/TimelineItem.vue";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapState, mapActions } from "pinia";
import d$auth from "@/store/auth";
import d$wilayah from "@/store/wilayah";
import d$laporan from "@/store/laporan";
import d$tema from "@/store/tema";
import d$event from "@/store/event";
import d$pengumuman from "@/store/pengumuman";
import d$proposal from "@/store/proposal";
import d$mahasiswa from "@/store/mahasiswa";
import d$dosen from "@/store/dosen";
import d$reviewer from "@/store/reviewer";
import d$bappeda from "@/store/bappeda";
import d$pimpinan from "@/store/pimpinan";

export default {
  name: "Dashboard",
  components: {
    MiniStatisticsCard,
    Calendar,
    MembersTable,
    TimelineList,
    TimelineItem,
    HeaderProfileCard,
  },
  data() {
    return {
      dosenName: [],
      lokasi: {
        desa: "",
        kecamatan: "",
        kabupaten: "",
        provinsi: "",
      },
      total: {
        temaActive: 0,
        kabupaten: 0,
        kecamatan: 0,
        desa: 0,
        mahasiswa: 0,
        mahasiswaRegistered: 0,
        dosen: 0,
        pimpinan: 0,
        bappeda: 0,
        reviewer: 0,
      },
      initialDate: "",
      listEvent: undefined,
      listPengumuman: undefined,
      listWilayahDosen: undefined,
      moment,
      progresDataDiri: 0,
    };
  },
  computed: {
    ...mapState(d$auth, ["g$user", "g$infoUser"]),
    ...mapState(d$wilayah, ["g$kecamatan"]),
    ...mapState(d$laporan, ["g$listLRK", "g$listLPK"]),
    ...mapState(d$tema, ["g$listTemaActive"]),
    ...mapState(d$event, ["g$listEvent"]),
    ...mapState(d$pengumuman, ["g$listPengumuman"]),
    ...mapState(d$proposal, ["g$listProposal"]),
    ...mapState(d$mahasiswa, ["g$listMahasiswa"]),
    ...mapState(d$dosen, ["g$listDosen"]),
    ...mapState(d$reviewer, ["g$listReviewer"]),
    ...mapState(d$bappeda, ["g$listBappeda"]),
    ...mapState(d$pimpinan, ["g$listPimpinan"]),
  },
  async created() {
    this.moment.locale("id");

    switch (this.g$user.role) {
      case "MAHASISWA":
        if (!this.g$infoUser.id_tema) {
          this.dosenName.push("Belum terdaftar");
        } else {
          await this.getDosenAndLokasi();
          await this.a$listLRK();
          await this.a$listLPK();
        }

        // kegiatan
        await this.a$listMahasiswaEvent();
        this.parsingEvents();

        // pengumuman
        await this.a$listMahasiswaPengumuman();
        this.listPengumuman = this.g$listPengumuman;

        // progress
        // this.checkProgressDataDiriMhs();
        // this.checkProgressLRK();
        break;

      case "ADMIN":
        // tema
        await this.getDataTema();

        // kegiatan
        await this.a$listAllEvent();
        this.parsingEvents();

        // total
        await this.getTotalMahasiswa();
        await this.getTotalDosen();
        await this.getTotalPimpinan();
        await this.getTotalBappeda();
        await this.getTotalReviewer();

        // pengumuman
        await this.a$listAllPengumuman();
        this.listPengumuman = this.g$listPengumuman;
        break;

      case "DOSEN":
        // kegiatan
        await this.a$listDosenEvent();
        this.parsingEvents();

        // wilayah
        await this.getListWilayahDosen();

        // pengumuman
        await this.a$listMahasiswaPengumuman();
        this.listPengumuman = this.g$listPengumuman;

        break;

      case "REVIEWER":
        // kegiatan
        await this.a$listAllEvent();
        this.parsingEvents();

        // pengumuman
        await this.a$listAllPengumuman();
        this.listPengumuman = this.g$listPengumuman;

        break;

      default:
        break;
    }
  },
  mounted() {
    this.checkError();

    if (document.getElementById("location-list")) {
      const dataTableSearch = new DataTable("#location-list", {
        searchable: true,
        fixedHeight: false,
        perPage: 7,
      });

      document.querySelectorAll(".export").forEach(function (el) {
        el.addEventListener("click", function () {
          var type = el.dataset.type;

          var data = {
            type: type,
            filename: "soft-ui-" + type,
          };

          // if (type === "csv") {
          //   data.columnDelimiter = "|";
          // }

          dataTableSearch.export(data);
        });
      });
    }
    setTooltip(this.$store.state.bootstrap);
  },
  methods: {
    ...mapActions(d$wilayah, ["a$getKecamatanMhs"]),
    ...mapActions(d$laporan, ["a$listLRK", "a$listLPK"]),
    ...mapActions(d$tema, ["a$listTema"]),
    ...mapActions(d$event, [
      "a$listAllEvent",
      "a$listMahasiswaEvent",
      "a$listDosenEvent",
      "a$listBappedaEvent",
    ]),
    ...mapActions(d$pengumuman, [
      "a$listAllPengumuman",
      "a$listMahasiswaPengumuman",
      "a$listDosenPengumuman",
      "a$listBappedaPengumuman",
    ]),
    ...mapActions(d$proposal, ["a$listAllProposalDosen"]),
    ...mapActions(d$mahasiswa, ["a$listMahasiswa", "a$listMahasiswaAccepted"]),
    ...mapActions(d$dosen, ["a$listDosen"]),
    ...mapActions(d$reviewer, ["a$listReviewer"]),
    ...mapActions(d$bappeda, ["a$listBappeda"]),
    ...mapActions(d$pimpinan, ["a$listPimpinan"]),

    async getDosenAndLokasi() {
      try {
        await this.a$getKecamatanMhs();
        this.g$kecamatan.dosen.forEach((item) => {
          this.dosenName.push(item.nama);
        });
        this.lokasi.kecamatan = this.g$kecamatan.nama;
        this.lokasi.kabupaten = this.g$kecamatan.kabupaten;
      } catch (error) {
        console.log(error);
      }
    },

    async getListLaporan() {
      try {
        await this.a$listLRK();
        await this.a$listLPK();
      } catch (error) {
        console.log(error);
      }
    },

    async getListWilayahDosen() {
      try {
        await this.a$listAllProposalDosen();
        this.listWilayahDosen = [];
        this.g$listProposal.forEach((item) => {
          if (item.status == 1)
            this.listWilayahDosen.push(
              `Kec. ${item.kecamatan.nama}, Kab. ${item.kecamatan.kabupaten.nama}`
            );
        });
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

    async getDataTema() {
      try {
        await this.a$listTema();
        this.total.temaActive = this.g$listTemaActive.length;
        this.g$listTemaActive.forEach((item) => {
          this.total.kabupaten += item.total_kabupaten;
          this.total.kecamatan += item.total_kecamatan;
          this.total.desa += item.total_desa;
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getTotalMahasiswa() {
      try {
        await this.a$listMahasiswa();
        this.total.mahasiswa = this.g$listMahasiswa.length;
        await this.a$listMahasiswaAccepted();
        this.total.mahasiswaRegistered = this.g$listMahasiswa.length;
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

    async getTotalDosen() {
      try {
        await this.a$listDosen();
        this.total.dosen = this.g$listDosen.length;
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

    async getTotalReviewer() {
      try {
        await this.a$listReviewer();
        this.total.reviewer = this.g$listReviewer.length;
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

    async getTotalBappeda() {
      try {
        await this.a$listBappeda();
        this.total.bappeda = this.g$listBappeda.length;
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

    async getTotalPimpinan() {
      try {
        await this.a$listPimpinan();
        this.total.pimpinan = this.g$listPimpinan.length;
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

    parsingEvents() {
      this.initialDate = this.moment(new Date()).format("YYYY-MM-DD");

      this.listEvent = [];

      this.g$listEvent.forEach((event) => {
        let newEvent = {
          id: event.id_event,
          title: event.judul,
          tempat: event.tempat,
          start: this.moment(event.tgl_mulai).format("YYYY-MM-DD"),
          end: this.moment(event.tgl_akhir).format("YYYY-MM-DD"),
          className: "bg-gradient-info",
        };

        this.listEvent.push(newEvent);
      });
    },

    checkProgressDataDiriMhs() {
      let totalAttribute = Object.keys(this.g$infoUser).length;
      let totalAttributeMustBeFilled = Object.keys(this.g$infoUser).length - 8; // minus 8
      let indexMustNotBeFilled = [0, 1, 2, 18, 19, 20, 21, 22];
      let attributeFilled = 0;

      for (let index = 0; index < totalAttribute; index++) {
        if (indexMustNotBeFilled.includes(index)) continue;

        if (
          !this.isNullEmptyOrUndefined(
            this.g$infoUser[Object.keys(this.g$infoUser)[index]]
          )
        ) {
          // console.log(Object.keys(this.g$infoUser)[index]);
          // console.log(this.g$infoUser[Object.keys(this.g$infoUser)[index]]);
          attributeFilled++;
        }
      }

      return this.percentage(attributeFilled, totalAttributeMustBeFilled);
    },

    checkProgressDataDiriDosen() {
      let totalAttribute = Object.keys(this.g$infoUser).length;
      let totalAttributeMustBeFilled = Object.keys(this.g$infoUser).length - 5;
      let indexMustNotBeFilled = [0, 1, 2, 9, 10];
      let attributeFilled = 0;

      for (let index = 0; index < totalAttribute; index++) {
        if (indexMustNotBeFilled.includes(index)) continue;

        if (
          !this.isNullEmptyOrUndefined(
            this.g$infoUser[Object.keys(this.g$infoUser)[index]]
          )
        ) {
          attributeFilled++;
        }
      }

      return this.percentage(attributeFilled, totalAttributeMustBeFilled);
    },

    checkProgressLRK() {
      let totalLRK = this.g$listLRK.length;

      if (totalLRK === 0) return 0;

      let totalAttribute = 0;
      let totalAttributePerLRK = Object.keys(this.g$listLRK[0]).length;

      let indexMustNotBeFilled = [0, 1, 2, 8, 9];
      let attributeFilled = 0;

      this.g$listLRK.forEach((item) => {
        totalAttribute += Object.keys(item).length;
        for (let index = 0; index < totalAttributePerLRK; index++) {
          if (indexMustNotBeFilled.includes(index)) continue;

          if (!this.isNullEmptyOrUndefined(item[Object.keys(item)[index]])) {
            attributeFilled++;
          }
        }
      });

      let totalAttributeMustBeFilled = totalAttribute - totalLRK * 5;

      return this.percentage(attributeFilled, totalAttributeMustBeFilled);
    },

    checkProgressLPK() {
      let totalLPK = this.g$listLPK.length;

      if (totalLPK === 0) return 0;

      let totalAttribute = 0;
      let totalAttributePerLPK = Object.keys(this.g$listLPK[0]).length;

      let indexMustNotBeFilled = [0, 1, 2, 12, 13, 14];
      let attributeFilled = 0;

      this.g$listLPK.forEach((item) => {
        totalAttribute += Object.keys(item).length;
        for (let index = 0; index < totalAttributePerLPK; index++) {
          if (indexMustNotBeFilled.includes(index)) continue;

          if (!this.isNullEmptyOrUndefined(item[Object.keys(item)[index]])) {
            attributeFilled++;
          }
        }
      });

      let totalAttributeMustBeFilled = totalAttribute - totalLPK * 6;

      return this.percentage(attributeFilled, totalAttributeMustBeFilled);
    },

    percentage(partialValue, totalValue) {
      return Math.round((100 * partialValue) / totalValue);
    },

    checkError() {
      const error = this.$route.params.error;

      if (error) {
        if (error === "unauthorized")
          this.showSwal(
            "warning-message",
            "Anda tidak mempunyai akses ke halaman tersebut!"
          );
      }
    },

    isNullEmptyOrUndefined(value) {
      return value === null || value === "" || value === undefined;
    },

    showSwal(type, text, toastText) {
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
      } else if (type === "warning-confirmation") {
        this.$swal({
          title: "Apakah Anda yakin?",
          text: text,
          showCancelButton: true,
          confirmButtonText: "Ya!",
          cancelButtonText: "Batal!",
          customClass: {
            confirmButton: "btn bg-gradient-success",
            cancelButton: "btn bg-gradient-secondary",
          },
          buttonsStyling: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal({
              toast: true,
              position: "top-end",
              title: toastText,
              icon: "success",
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            this.$swal.close();
          }
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
