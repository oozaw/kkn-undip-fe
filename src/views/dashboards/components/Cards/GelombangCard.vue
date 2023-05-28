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
            <span v-if="status" class="font-weight-bolder text-success">
              Dibuka
            </span>
            <span v-else class="font-weight-bolder text-danger">Ditutup</span>
          </p>
        </div>
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="text-secondary">
        <p class="mt-3 mb-0">
          Status Pendaftaran:
          <span
            v-if="statusPendaftaran == 1"
            class="font-weight-bolder text-success"
          >
            Diterima
          </span>
          <span
            v-else-if="statusPendaftaran == 0"
            class="font-weight-bolder text-warning"
          >
            Sedang diproses
          </span>
          <span
            v-else-if="statusPendaftaran == -1"
            class="font-weight-bolder text-danger"
          >
            Ditolak
          </span>
          <span v-else class="font-weight-bolder text-secondary">
            Belum Mendaftar
          </span>
        </p>
      </div>
      <div class="text-secondary">
        <p class="mb-0" v-html="'Batas Pengisian: ' + deadline" />
      </div>
      <hr class="horizontal dark" />
      <div class="d-flex">
        <button type="button" class="mb-0 btn btn-sm me-2 bg-gradient-info">
          Lihat
        </button>
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
      type: Boolean,
      default: false,
    },
    statusPendaftaran: {
      type: Number,
      default: -2,
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
