<template>
  <div class="bg-white card mt-4 py-4 pb-5">
    <content-loader
      viewBox="0 0 476 145"
      :speed="1"
      primaryColor="#f3f3f3"
      secondaryColor="#d6d6d6"
    >
      <rect x="10" y="0" rx="4" ry="4" width="140" height="11" />
      <rect x="10" y="18" rx="4" ry="4" width="130" height="8" />
      <rect x="15" y="71" rx="4" ry="4" width="446" height="10" />
      <rect x="15" y="93" rx="4" ry="4" width="446" height="10" />
      <rect x="15" y="49" rx="4" ry="4" width="446" height="10" />
      <rect x="15" y="114" rx="4" ry="4" width="446" height="10" />
      <rect x="15" y="135" rx="4" ry="4" width="446" height="10" />
    </content-loader>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
  name: "TableContentLoader",
  components: {
    ContentLoader,
  },
};
</script>
