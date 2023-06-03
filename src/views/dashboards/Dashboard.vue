<template>
  <div class="card shadow-lg mx-4 mt-4">
    <div class="card shadow-lg">
      <HeaderProfileCard
        :button="false"
        description="KKN Reguler Tim 1 2023"
        :img="team2"
      />
    </div>
  </div>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row mt-1">
          <div class="col-lg-6 col-12">
            <calendar title="Kalender KKN" />
            <div class="mt-4">
              <timeline-list class="h-100" title="Pengumuman KKN">
                <timeline-item
                  :icon="{ component: 'ni ni-bell-55', color: 'success' }"
                  title="Deadline Pengambilan Post Test"
                  date-time="22 DEC 7:20 PM"
                  description="Lorep ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
                <TimelineItem
                  :icon="{ component: 'ni ni-html5', color: 'danger' }"
                  title="Deadline Pengumpulan LRK"
                  date-time="21 DEC 11 PM"
                  description="Lorep ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
                <TimelineItem
                  :icon="{ component: 'ni ni-cart', color: 'info' }"
                  title="Deadline Pengumpulan LPK"
                  date-time="21 DEC 9:34 PM"
                  description="Lorep ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
                <TimelineItem
                  :icon="{ component: 'ni ni-credit-card', color: 'warning' }"
                  title="Deadline Pengumpulan Laporan Akhir"
                  date-time="20 DEC 2:20 AM"
                  description="Lorep ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
                <TimelineItem
                  :icon="{ component: 'ni ni-key-25', color: 'primary' }"
                  title="Deadline Pengumpulan Reportase"
                  date-time="18 DEC 4:54 AM"
                  description="Lorep ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
                <TimelineItem
                  :icon="{ component: 'ni ni-box-2', color: 'dark' }"
                  title="Pelaksanaan Pembekalan"
                  date-time="21 DEC 09:00 AM"
                  description="Lorep ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
              </timeline-list>
            </div>
          </div>
          <div class="col-lg-6 col-12 mt-lg-0 mt-4">
            <div class="col-lg-12 col-sm-12">
              <mini-statistics-card
                class="py-2"
                :style="'margin-left: 85.5%'"
                title="Dosen Pembimbing"
                :value="{
                  text: 'Kurniawan Teguh Martono, ST., MT.',
                  color: 'dark',
                }"
                :icon="{
                  component: 'fa-solid fa-user-tie',
                  background: 'bg-gradient-info',
                  shape: 'rounded-circle',
                }"
              />
              <mini-statistics-card
                :style="'margin-left: 70%'"
                title="Data Diri"
                title-color="primary"
                :value="{ text: 'Sudah Lengkap', color: 'success' }"
                description="Terakhir diubah 12/12/2020, 12.30 PM"
                :icon="{
                  component: 'fa-solid fa-address-card',
                  background: 'bg-gradient-primary',
                  shape: 'rounded-circle',
                }"
              />
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    :style="'margin-left: 70%'"
                    title="Data Diri"
                    title-color="primary"
                    :value="{ text: 'Sudah Lengkap', color: 'success' }"
                    description="Terakhir diubah 12/12/2020, 12.30 PM"
                    :icon="{
                      component: 'fa-solid fa-address-card',
                      background: 'bg-gradient-primary',
                      shape: 'rounded-circle',
                    }"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    :style="'margin-left: 70%'"
                    title="Lokasi KKN"
                    value="Desa XYZ"
                    description="Kec. Tembalang, Jawa Tengah"
                    :icon="{
                      component: 'fa-solid fa-map-location-dot',
                      background: 'bg-gradient-danger',
                      shape: 'rounded-circle',
                    }"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    :style="'margin-left: 70%'"
                    title="Status LRK"
                    :value="{ text: 'Sudah Diupload', color: 'success' }"
                    description="Terakhir diubah 12/12/2020, 12.30 AM"
                    :icon="{
                      component: 'fa-solid fa-file-lines',
                      background: 'bg-gradient-success',
                      shape: 'rounded-circle',
                    }"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    :style="'margin-left: 70%'"
                    title="Status LPK"
                    :value="{ text: 'Belum Diupload', color: 'danger' }"
                    description=""
                    :icon="{
                      component: 'fa-solid fa-file-lines',
                      background: 'bg-gradient-warning',
                      shape: 'rounded-circle',
                    }"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    :style="'margin-left: 70%'"
                    title="Total Kecamatan Terdaftar"
                    :value="{ text: '16', color: 'success' }"
                    description="Diperbarui pada 12/12/2020, 12.30 AM"
                    :icon="{
                      component: 'fa-solid fa-list-check',
                      background: 'bg-gradient-success',
                      shape: 'rounded-circle',
                    }"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <mini-statistics-card
                    :style="'margin-left: 70%'"
                    title="Total Kelurahan Terdaftar"
                    :value="{ text: '177', color: 'success' }"
                    description="Diperbarui pada 12/12/2020, 12.30 AM"
                    :icon="{
                      component: 'fa-solid fa-list-check',
                      background: 'bg-gradient-warning',
                      shape: 'rounded-circle',
                    }"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-12 col-sm-12 mt-sm-2">
              <members-table />
            </div>
          </div>
          <div class="col-lg-12 col-sm-12">
            <div class="bg-white card mt-4">
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
import { DataTable } from "simple-datatables";
import setTooltip from "@/assets/js/tooltip.js";
import MiniStatisticsCard from "@/views/dashboards/components/Cards/MiniStatisticsCard.vue";
import Calendar from "@/views/dashboards/components/Calendar.vue";
import image from "@/assets/img/kal-visuals-square.jpg";
import MembersTable from "@/views/dashboards/components/MembersTable.vue";
import TimelineList from "@/views/dashboards/components/Cards/TimelineList.vue";
import TimelineItem from "@/views/dashboards/components/Cards/TimelineItem.vue";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";

import team1 from "../../assets/img/team-1.jpg";
import team2 from "../../assets/img/team-2.jpg";
import team5 from "../../assets/img/team-5.jpg";
import team4 from "../../assets/img/team-4.jpg";

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
      image,
      team1,
      team2,
      team5,
      team4,
    };
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

          if (type === "csv") {
            data.columnDelimiter = "|";
          }

          dataTableSearch.export(data);
        });
      });
    }
    setTooltip(this.$store.state.bootstrap);
  },
  methods: {
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
            this.$swal.isLoading();
            if (this.$swal.isLoading()) this.$swal.showLoading();
          },
          didDestroy: () => {
            !this.$swal.isLoading();
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
