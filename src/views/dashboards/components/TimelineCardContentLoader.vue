<template>
  <div class="bg-white card p-4">
    <content-loader
      v-if="col === 12"
      viewBox="0 0 790 138"
      :speed="1"
      primaryColor="#f3f3f3"
      secondaryColor="#d6d6d6"
    >
      <rect x="0" y="0" rx="4" ry="4" width="200" height="18" />
      <circle cx="10" cy="49" r="10" />
      <rect x="39" y="39" rx="4" ry="4" width="350" height="11" />
      <rect x="39" y="55" rx="4" ry="4" width="140" height="5" />
      <rect x="39" y="72" rx="4" ry="4" width="500" height="7" />
      <circle cx="10" cy="105" r="10" />
      <rect x="39" y="95" rx="4" ry="4" width="350" height="11" />
      <rect x="39" y="111" rx="4" ry="4" width="140" height="5" />
      <rect x="39" y="128" rx="4" ry="4" width="500" height="7" />
    </content-loader>
    <content-loader
      v-else-if="col === 6"
      viewBox="0 0 790 138"
      :speed="1"
      primaryColor="#f3f3f3"
      secondaryColor="#d6d6d6"
    >
      <rect x="0" y="0" rx="4" ry="4" width="150" height="18" />
      <circle cx="10" cy="49" r="10" />
      <rect x="39" y="39" rx="4" ry="4" width="150" height="11" />
      <rect x="39" y="55" rx="4" ry="4" width="60" height="5" />
      <rect x="39" y="72" rx="4" ry="4" width="119" height="7" />
      <circle cx="10" cy="105" r="10" />
      <rect x="39" y="95" rx="4" ry="4" width="150" height="11" />
      <rect x="39" y="111" rx="4" ry="4" width="60" height="5" />
      <rect x="39" y="128" rx="4" ry="4" width="119" height="7" />
    </content-loader>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
  name: "TimelineCardContentLoader",
  props: {
    col: {
      type: Number,
      default: 12,
    },
  },
  components: {
    ContentLoader,
  },
};
</script>
