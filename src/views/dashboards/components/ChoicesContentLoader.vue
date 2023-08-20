<template>
  <div class="bg-white card mt-4 py-4 pb-2">
    <content-loader
      viewBox="0 0 476 31"
      :speed="1"
      primaryColor="#f3f3f3"
      secondaryColor="#d6d6d6"
    >
      <rect x="10" y="0" rx="4" ry="4" width="120" height="8" />
      <rect x="10" y="14" rx="4" ry="4" width="456" height="12" />
    </content-loader>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
  name: "ChoicesContentLoader",
  components: {
    ContentLoader,
  },
};
</script>
