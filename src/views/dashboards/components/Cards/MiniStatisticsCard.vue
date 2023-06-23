<template>
  <div class="mb-3 card" style="min-height: 88%">
    <div class="p-3 card-body">
      <div class="d-flex justify-content-end">
        <div
          class="text-center shadow icon icon-shape position-absolute"
          :style="style"
          :class="[
            typeof icon === 'object'
              ? `${icon.background} ${icon.shape}`
              : 'border-radius-md',
            rowReverse ? 'me-2' : '',
          ]"
        >
          <font-awesome-icon
            class="text-lg opacity-10 text-white"
            style="margin-top: 30%"
            :icon="typeof icon === 'string' ? icon : icon.component"
            aria-hidden="true"
          ></font-awesome-icon>
        </div>
      </div>
      <div class="d-flex">
        <div :class="classContent">
          <div class="numbers">
            <p class="mb-0 text-sm font-weight-bold" :class="title.color">
              {{ typeof title === "string" ? title : title.text }}
            </p>
            <h6
              :class="`mb-0 font-weight-bolder text-${value.color}`"
              v-if="isValueList"
            >
              <span v-for="(val, i) in value.list" :key="i">
                {{ val }}
                <br />
              </span>
              <span
                v-if="percentage && typeof percentage === 'string'"
                class="text-sm font-weight-bolder"
              >
                {{ percentage }}
              </span>
              <span
                v-if="percentage && typeof percentage === 'object'"
                :class="`text-sm font-weight-bolder text-${percentage.color}`"
              >
                {{ percentage.value }}
              </span>
            </h6>
            <h6
              :class="
                `mb-0 font-weight-bolder text-${value.color} ` +
                (description == '' ? 'mt-2' : '')
              "
              v-else
            >
              {{
                (value && typeof value === "string") ||
                (value && typeof value === "number")
                  ? value
                  : value.text
              }}
              <span
                v-if="percentage && typeof percentage === 'string'"
                class="text-sm font-weight-bolder"
              >
                {{ percentage }}
              </span>
              <span
                v-if="percentage && typeof percentage === 'object'"
                :class="`text-sm font-weight-bolder text-${percentage.color}`"
              >
                {{ percentage.value }}
              </span>
            </h6>
            <!--  eslint-disable-next-line vue/no-v-html -->
            <p
              v-if="description"
              class="mt-2 mb-0"
              style="font-size: small"
              v-html="description"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniStatisticsCard",
  props: {
    rowReverse: {
      type: Boolean,
      default: false,
    },
    title: {
      type: [Object, String],
      required: true,
      text: {
        type: String,
      },
      color: {
        type: String,
      },
    },
    description: {
      type: String,
      default: "",
    },
    isValueList: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Object, String, Number],
      required: true,
      list: {
        type: Array,
      },
      text: {
        type: [String, Number],
      },
      color: {
        type: String,
      },
    },
    percentage: {
      type: [Object, String],
      value: {
        type: String,
      },
      color: {
        type: String,
      },
      default: () => ({
        color: "success",
      }),
    },
    icon: {
      type: [String, Object],
      component: {
        type: String,
      },
      background: {
        type: String,
      },
      shape: {
        type: String,
      },
      default: () => ({
        background: "bg-white",
        shape: " border-radius-md",
      }),
    },
    classContent: {
      type: String,
      default: "",
    },
    style: {
      type: String,
      default: "",
    },
  },
};
</script>
