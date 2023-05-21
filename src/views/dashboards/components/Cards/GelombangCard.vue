<template>
  <div class="mt-4 card">
    <div class="p-3 card-body">
      <div class="d-flex">
        <div class="icon me-4 mt-1 ms-2">
          <!-- <img alt="Image placeholder" :src="img" /> -->
          <font-awesome-icon
            icon="fa-solid fa-clone"
            class="text-info"
            size="2xl"
          />
        </div>
        <div class="my-auto ms-2">
          <h6 class="mb-0 font-weight-bolder">{{ title }}</h6>
          <p class="mb-0 text-sm">
            Status:
            <span class="font-weight-bolder" :class="'text-' + statusColor">
              {{ status }}
            </span>
          </p>
        </div>
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="text-secondary">
        <p class="mt-3 mb-0" v-html="'Batas Pengisian: ' + deadline" />
      </div>
      <hr class="horizontal dark" />
      <div class="d-flex">
        <router-link
          :to="action.route"
          type="button"
          class="mb-0 btn btn-sm me-2"
          :class="`bg-gradient-${action.color}`"
        >
          {{ action.label }}
        </router-link>
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    nilai: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
    statusColor: {
      type: String,
      default: "",
    },
    deadline: {
      type: String,
      default: "",
    },
    batasKelulusan: {
      type: String,
      default: "",
    },
    action: {
      type: Object,
      route: String,
      color: String,
      label: String,
      default: () => {},
    },
  },
};
</script>
