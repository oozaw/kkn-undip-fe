<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard
          name="Tazki Hanifan Amri"
          description="KKN Reguler Tim 1 2023"
        />
      </div>
      <div class="col-lg-6">
        <test-card
          title="Post Test"
          status="Tidak Lulus"
          statusColor="danger"
          deadline="31 Juni 2023 | 11:00 AM"
          batasKelulusan="> 60"
          nilai="50 / 100"
          :img="slackLogo"
          :action="{
            route: '',
            label: 'Join',
            color: 'success',
          }"
        />
      </div>
      <div class="col-lg-6">
        <test-card
          title="Remidi Post Test 1"
          status="Lulus"
          statusColor="success"
          deadline="31 Juni 2023 | 11:00 AM"
          batasKelulusan="> 60"
          nilai="80 / 100"
          :img="slackLogo"
          :action="{
            route: '',
            label: 'Join',
            color: 'success',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TestCard from "@/views/dashboards/components/Cards/TestCard.vue";

import slackLogo from "../../../assets/img/small-logos/logo-slack.svg";

export default {
  name: "IndexPostTest",
  components: {
    HeaderProfileCard,
    TestCard,
  },
  data() {
    return {
      slackLogo,
    };
  },
};
</script>
