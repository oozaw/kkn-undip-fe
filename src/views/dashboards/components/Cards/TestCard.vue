<template>
  <div class="mt-4 card">
    <div class="p-3 card-body">
      <div class="d-flex">
        <div class="avatar avatar-lg">
          <img alt="Image placeholder" :src="img" />
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
        <p class="mt-3 mb-0" v-html="'Deadline: ' + deadline" />
        <p class="mt-0" v-html="'Batas Kelulusan: ' + batasKelulusan" />
      </div>
      <p class="mb-0 text-dark">
        <b>Nilai: {{ nilai }}</b>
      </p>
      <hr class="horizontal dark" />
      <div class="d-flex">
        <button
          type="button"
          class="mb-0 btn btn-sm"
          :class="`bg-gradient-${action.color}`"
        >
          {{ action.label }}
        </button>
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
    img: {
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
