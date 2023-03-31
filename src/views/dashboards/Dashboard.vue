<template>
  <div class="card shadow-lg mx-4 mt-4">
    <div class="card shadow-lg">
      <div class="card-body p-3">
        <div class="row gx-4">
          <div class="col-auto">
            <div class="avatar avatar-xl position-relative">
              <img
                :src="team4"
                alt="profile_image"
                class="shadow-sm w-100 border-radius-lg"
              />
            </div>
          </div>
          <div class="col-auto my-auto">
            <div class="h-100">
              <h5 class="mb-1">Tazki Hanifan Amri</h5>
              <p class="mb-0 font-weight-bold text-sm">
                KKN Reguler Tim 1 2023
              </p>
            </div>
          </div>
        </div>
      </div>
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
            </div>
            <div class="col-lg-12 col-sm-12 mt-sm-2">
              <members-table />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MiniStatisticsCard from "@/views/dashboards/components/Cards/MiniStatisticsCard.vue";
import Calendar from "@/views/dashboards/components/Calendar.vue";
import image from "@/assets/img/kal-visuals-square.jpg";
import MembersTable from "@/views/dashboards/components/MembersTable.vue";
import TimelineList from "@/views/dashboards/components/Cards/TimelineList.vue";
import TimelineItem from "@/views/dashboards/components/Cards/TimelineItem.vue";

import team1 from "../../assets/img/team-1.jpg";
import team2 from "../../assets/img/team-2.jpg";
import team5 from "../../assets/img/team-5.jpg";
import team4 from "../../assets/img/team-4.jpg";

export default {
  name: "DashboardDefault",
  components: {
    MiniStatisticsCard,
    Calendar,
    MembersTable,
    TimelineList,
    TimelineItem,
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
};
</script>
