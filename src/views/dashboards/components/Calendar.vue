<template>
  <div class="card widget-calendar">
    <div class="p-3 pb-0 card-header mb-0">
      <h6 class="mb-0">{{ title }}</h6>
      <div class="d-flex">
        <div class="mb-0 text-sm p font-weight-bold widget-calendar-day">
          {{ day }}
        </div>
        <div class="mb-1 text-sm p font-weight-bold widget-calendar-year">
          {{ year }}
        </div>
      </div>
    </div>
    <div class="p-3 pt-0 card-body">
      <div :id="id" data-toggle="widget-calendar"></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import moment from "moment";
import setTooltip from "@/assets/js/tooltip.js";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
let calendar;
export default {
  name: "Calendar",
  props: {
    id: {
      type: String,
      default: "widget-calendar",
    },
    title: {
      type: String,
      default: "",
    },
    day: {
      type: String,
      default: "",
    },
    year: {
      type: String,
      default: "",
    },
    initialView: {
      type: String,
      default: "dayGridMonth",
    },
    initialDate: {
      type: String,
      default: moment(new Date()).format("YYYY-MM-DD"),
    },
    events: {
      type: Array,
      default: () => [
        {
          title: "Call with Dave",
          start: "2020-11-18",
          end: "2020-11-18",
          className: "bg-gradient-danger",
        },

        {
          title: "Lunch meeting",
          start: "2020-11-21",
          end: "2020-11-22",
          className: "bg-gradient-warning",
        },

        {
          title: "All day conference",
          start: "2020-11-29",
          end: "2020-11-29",
          className: "bg-gradient-success",
        },

        {
          title: "Meeting with Mary",
          start: "2020-12-01",
          end: "2020-12-01",
          className: "bg-gradient-info",
        },

        {
          title: "Winter Hackaton",
          start: "2020-12-03",
          end: "2020-12-03",
          className: "bg-gradient-danger",
        },

        {
          title: "Digital event",
          start: "2020-12-07",
          end: "2020-12-09",
          className: "bg-gradient-warning",
        },

        {
          title: "Marketing event",
          start: "2020-12-10",
          end: "2020-12-10",
          className: "bg-gradient-success",
        },

        {
          title: "Dinner with Family",
          start: "2020-12-19",
          end: "2020-12-19",
          className: "bg-gradient-danger",
        },

        {
          title: "Black Friday",
          start: "2020-12-23",
          end: "2020-12-23",
          className: "bg-gradient-info",
        },

        {
          title: "Cyber Week",
          start: "2020-12-02",
          end: "2020-12-02",
          className: "bg-gradient-warning",
        },
      ],
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      moment: moment,
    };
  },
  mounted() {
    calendar = new Calendar(document.getElementById(this.id), {
      contentHeight: "auto",
      plugins: [dayGridPlugin],
      initialView: this.initialView,
      selectable: this.selectable,
      editable: this.editable,
      events: this.events,
      initialDate: this.initialDate,
      headerToolbar: {
        start: "title", // will normally be on the left. if RTL, will be on the right
        center: "",
        end: "today prev,next", // will normally be on the right. if RTL, will be on the left
      },
      views: {
        month: {
          titleFormat: {
            month: "long",
            year: "numeric",
          },
        },
        agendaWeek: {
          titleFormat: {
            month: "long",
            year: "numeric",
            day: "numeric",
          },
        },
        agendaDay: {
          titleFormat: {
            month: "short",
            year: "numeric",
            day: "numeric",
          },
        },
      },
      eventDidMount: function (info) {
        // info.el.title = `${info.event.title} di ${info.event.extendedProps.tempat}`;
        $(info.el).attr("data-bs-toggle", "tooltip");
        $(info.el).attr("data-bs-placement", "top");
        $(info.el).attr(
          "data-bs-title",
          `${info.event.title} di ${info.event.extendedProps.tempat}. ${
            info.event.extendedProps.keterangan ?? ""
          }`
        );
        // $(info.el).attr("data-bs-content", info.event.extendedProps.tempat);
      },
    });

    calendar.render();

    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    if (calendar) {
      calendar.destroy();
    }
  },
};
</script>
