<template>
  <li class="nav-item">
    <router-link
      class="nav-link"
      :to="to"
      :class="{ active: isActive, disabled: isDisabled }"
      :aria-disabled="isDisabled"
    >
      <span class="sidenav-mini-icon"> {{ miniIcon }} </span>
      <span class="sidenav-normal"> {{ text }} </span>
    </router-link>
  </li>
</template>
<script>
export default {
  name: "SidenavItem",
  props: {
    to: {
      type: [Object, String],
      required: true,
    },
    miniIcon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="css" scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
