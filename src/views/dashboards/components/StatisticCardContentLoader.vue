<template>
  <div class="bg-white card py-2 pb-2 mb-3">
    <content-loader
      viewBox="0 0 200 68"
      :speed="1"
      primaryColor="#f3f3f3"
      secondaryColor="#d6d6d6"
    >
      <rect x="12" y="10" rx="4" ry="4" width="110" height="12" />
      <circle cx="168" cy="26" r="18" />
      <rect x="12" y="28" rx="4" ry="4" width="40" height="12" />
      <rect x="12" y="52" rx="4" ry="4" width="80" height="8" />
    </content-loader>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
  name: "StatisticCardContentLoader",
  components: {
    ContentLoader,
  },
};
</script>
