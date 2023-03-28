<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Data Diri"
              title-color="primary"
              :value="{ text: 'Sudah Lengkap', color: 'success' }"
              description="Terakhir diubah 12/12/2020, 12.30 PM"
              :icon="{
                component: 'ni ni-money-coins',
                background: 'bg-gradient-primary',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Lokasi KKN"
              value="Desa XYZ"
              :icon="{
                component: 'ni ni-world',
                background: 'bg-gradient-danger',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Status LRK"
              :value="{ text: 'Sudah Diupload', color: 'success' }"
              description="Terakhir diubah 12/12/2020, 12.30 AM"
              :icon="{
                component: 'ni ni-paper-diploma',
                background: 'bg-gradient-success',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Status LPK"
              :value="{ text: 'Belum Diupload', color: 'danger' }"
              description=""
              :icon="{
                component: 'ni ni-cart',
                background: 'bg-gradient-warning',
                shape: 'rounded-circle',
              }"
            />
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-8 col-12">
            <calendar title="Kalender KKN" />
          </div>
          <div class="col-lg-4 col-12 mt-lg-0 mt-4">
            <div class="col-lg-12 col-sm-12">
              <categories-list
                :categories="[
                  {
                    icon: {
                      component: 'ni ni-mobile-button',
                      background: 'dark',
                    },
                    label: 'Devices',
                    description: '250 in stock <strong>346+ sold</strong>',
                  },
                  {
                    icon: {
                      component: 'ni ni-tag',
                      background: 'dark',
                    },
                    label: 'Tickets',
                    description: '123 closed <strong>15 open</strong>',
                  },
                  {
                    icon: { component: 'ni ni-box-2', background: 'dark' },
                    label: 'Error logs',
                    description: '1 is active <strong>40 closed</strong>',
                  },
                ]"
              />
            </div>
            <div class="col-lg-12 col-sm-12">
              <message-card
                message="Today is Martina's birthday. Wish her the best of luck!"
                :image="{ url: image, alt: 'Kal' }"
                :action="{
                  route: '/',
                  label: 'Send message',
                  color: 'dark',
                }"
              />
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-12 mb-4 mb-md-0">
            <members-table />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MiniStatisticsCard from "@/views/dashboards/components/Cards/MiniStatisticsCard.vue";
import Calendar from "@/views/dashboards/components/Calendar.vue";
import CategoriesList from "@/views/dashboards/components/Cards/CategoriesList.vue";
import MessageCard from "@/views/dashboards/components/MessageCard.vue";
import image from "@/assets/img/kal-visuals-square.jpg";
import MembersTable from "@/views/dashboards/components/MembersTable.vue";

import team1 from "../../assets/img/team-1.jpg";
import team2 from "../../assets/img/team-2.jpg";
import team5 from "../../assets/img/team-5.jpg";
import team4 from "../../assets/img/team-4.jpg";

export default {
  name: "DashboardDefault",
  components: {
    MiniStatisticsCard,
    Calendar,
    CategoriesList,
    MessageCard,
    MembersTable,
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
