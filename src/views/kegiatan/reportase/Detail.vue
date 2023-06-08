<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <div class="bg-white pb-2 card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <h5 class="mb-2">Detail Reportase</h5>
            </div>
          </div>
          <div class="ms-2 pt-1 ps-3 card-body">
            <div class="mt-2 row">
              <div class="col-12">
                <ul class="list-group">
                  <li class="text-sm border-0 list-group-item ps-0">
                    <strong class="text-dark">Judul:</strong>
                    &nbsp; {{ g$reportase?.judul }}
                  </li>
                  <li class="text-sm border-0 list-group-item ps-0">
                    <strong class="text-dark">Diunggah pada:</strong>
                    &nbsp;
                    {{ moment(g$reportase?.created_at).format("DD-MM-YYYY") }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="row mt-0 pb-4">
              <div class="col-12">
                <ul class="list-group">
                  <li class="text-sm border-0 list-group-item ps-0">
                    <strong class="text-dark">Komentar:</strong>
                  </li>
                </ul>
                <quill-editor
                  class="bg-white"
                  :options="options"
                  id="komentar-editor"
                  v-model:content="g$reportase.komentar"
                  contentType="html"
                  theme="snow"
                ></quill-editor>
              </div>
            </div>
            <div class="mt-3 row pb-5">
              <div class="col-12">
                <ul class="list-group">
                  <li class="text-sm border-0 list-group-item ps-0">
                    <strong class="text-dark">Isi Reportase:</strong>
                  </li>
                </ul>
                <quill-editor
                  class="bg-white"
                  :options="options"
                  id="isi-editor"
                  v-model:content="g$reportase.isi"
                  contentType="html"
                  theme="snow"
                ></quill-editor>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import moment from "moment";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$reportase from "@/store/reportase";

export default {
  name: "DetailReportase",
  components: {
    HeaderProfileCard,
    QuillEditor,
  },
  data() {
    return {
      id_reportase: parseInt(this.$route.params.id_reportase),
      options: {
        modules: {
          toolbar: false,
        },
        readOnly: true,
      },
      moment,
    };
  },
  computed: {
    ...mapState(d$reportase, ["g$reportase"]),
  },
  async created() {
    await this.a$getReportase(this.id_reportase);
  },
  methods: {
    ...mapActions(d$reportase, ["a$getReportase"]),
  },
};
</script>
