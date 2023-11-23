<template>
  <table :id="id" class="table table-flush">
    <thead class="thead-light">
      <tr>
        <th
          class="thead-light font-weight-bolder text-xxs text-uppercase text-secondary"
          :class="column.class ?? ''"
          v-for="(column, index) in columns"
          :key="index"
        >
          {{ column.name ?? column }}
        </th>
      </tr>
    </thead>
    <tbody>
      <slot name="body"></slot>
    </tbody>
  </table>
</template>

<script>
import $ from "jquery";
import DataTable from "datatables.net-vue3";
import DataTableLib from "datatables.net-bs5";
import Buttons from "datatables.net-buttons-bs5";
import ButtonHtml5 from "datatables.net-buttons/js/buttons.html5";
import print from "datatables.net-buttons/js/buttons.print";
import pdfmake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "datatables.net-responsive-bs5";
import JsZip from "jszip";
import { array, string } from "@linways/table-to-excel";
pdfmake.vfs = pdfFonts.pdfMake.vfs;
window.JsZip = JsZip;
DataTable.use(DataTableLib);
DataTable.use(pdfmake);
DataTable.use(Buttons);
DataTable.use(ButtonHtml5);
DataTable.use(print);

export default {
  name: "DataTable",
  props: {
    id: {
      type: string,
      default: "",
    },
    columns: {
      type: array,
      default: () => [],
    },
    pageLength: {
      type: Number,
      default: 5,
    },
    lengthChange: {
      type: Boolean,
      default: true,
    },
    lengthMenu: {
      type: array,
      default: () => [5, 10, 25, 50, 75, 100],
    },
    language: {
      type: Object,
      default: () => {},
    },
    responsive: {
      type: Boolean,
      default: true,
    },
    autoWidth: {
      type: Boolean,
      default: false,
    },
    buttons: {
      type: array,
      default: () => [],
    },
  },
  data() {
    let dataButtons = this.buttons;
    let dataId = this.id;
    let dataColumns = this.columns;
    let dataPageLength = this.pageLength;
    let dataLengthChange = this.lengthChange;
    let dataLengthMenu = this.lengthMenu;
    let dataLanguage = this.language;
    let dataResponsive = this.responsive;
    let dataAutoWidth = this.autoWidth;

    return {
      dataTable: null,
      dataButtons,
      dataId,
      dataColumns,
      dataPageLength,
      dataLengthChange,
      dataLengthMenu,
      dataLanguage,
      dataResponsive,
      dataAutoWidth,
    };
  },
  mounted() {
    this.setupDataTable();
  },
  methods: {
    setupDataTable() {
      this.dataLanguage = {
        paginate: {
          next: "&#155;", // or '→'
          previous: "&#139;", // or '←'
        },
        ...this.datalanguage,
      };

      if (document.getElementById(this.dataId)) {
        const dataTableSearch = $(`#${this.dataId}`).DataTable({
          pageLength: this.pageLength,
          lengthChange: this.lengthChange,
          lengthMenu: this.lengthMenu,
          language: this.language,
          responsive: this.responsive,
          autoWidth: this.autoWidth,
          initComplete: function () {
            var api = this.api();

            new $.fn.dataTable.Buttons(api, {
              buttons: this.buttons,
            });

            api.buttons().container().appendTo("#button-table");
          },
        });

        this.dataTable = dataTableSearch;
      }
    },
  },
};
</script>
