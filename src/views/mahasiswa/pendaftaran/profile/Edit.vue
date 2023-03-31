<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <side-nav-item />
      </div>
    </div>
  </div>
</template>

<script>
import SideNavItem from "@/views/dashboards/components/SideNavItem.vue";

export default {
  name: "EditDataDiri",
  components: {
    SideNavItem,
  },
};
</script>
