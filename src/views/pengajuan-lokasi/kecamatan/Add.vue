<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard
          :button="false"
          button-text="Tambah data kecamatan"
          name="BAPPEDA Kota Semarang"
          description="Kota Semarang, Jawa Tengah, Indonesia"
          :img="img"
        >
          <template #button>
            <div
              class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex justify-content-center"
            >
              <argon-button
                :onclick="() => $router.push({ name: 'Pengajuan Lokasi' })"
                class="mb-0 me-2"
                color="secondary"
                size="sm"
                >Batal</argon-button
              >
              <argon-button
                type="submit"
                form="form-kec"
                class="mb-0 me-lg-2"
                color="success"
                variant="gradient"
                size="sm"
                >Tambah Kecamatan</argon-button
              >
            </div>
          </template>
        </HeaderProfileCard>
        <div id="card-profile-wilayah" class="card mt-4 pb-3">
          <div class="card-header">
            <h5>Tambah Lokasi Kecamatan dan Potensi</h5>
          </div>
          <div class="card-body pt-0">
            <form id="form-kec" role="form" @submit.prevent="addKecamatan()">
              <div class="row">
                <div class="col-12">
                  <label class="form-label">Jenis KKN</label>
                  <select
                    name="jenis"
                    id="choices-jenis"
                    class="choices-jenis"
                    v-model="input.id_periode"
                    required
                  >
                    <option value="0" selected disabled hidden>
                      -- Pilih KKN --
                    </option>
                    <option value="1">KKN Reguler Tim 1 2023</option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label class="form-label">Kecamatan</label>
                  <input
                    class="form-control"
                    id="nama-kecamatan"
                    type="text"
                    placeholder="Nama kecamatan"
                    v-model="input.kecamatan"
                    required
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label class="form-label">Jumlah Desa</label>
                  <input
                    class="form-control"
                    id="jumlah-desa"
                    name="jumlah-desa"
                    type="number"
                    placeholder="Jumlah desa"
                    v-model="jmlDesa"
                    @input="showFormDesa()"
                    required
                  />
                </div>
              </div>
              <div v-for="(form, key) in formDesa" v-bind:key="key">
                <span v-html="form"></span>
              </div>
              <div id="potensi-row" class="row mt-3 pb-6">
                <div class="col-12">
                  <label class="mt-2">Potensi</label>
                  <quill-editor
                    id="potensi-editor"
                    v-model:content="input.potensi"
                    contentType="html"
                    theme="snow"
                    placeholder="Isi dengan potensi kecamatan"
                  ></quill-editor>
                  <div class="invalid-feedback mb-3 ms-1">
                    <span id="potensi-validation"></span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import img from "@/assets/img/team-3.jpg";
import d$wilayah from "@/store/wilayah";
import { mapActions } from "pinia";

export default {
  name: "AddKecamatan",
  components: {
    HeaderProfileCard,
    QuillEditor,
    ArgonButton,
  },
  data() {
    return {
      img,
      choicesJenis: undefined,
      jmlDesa: 1,
      formDesa: [],
      valueFormDesa: "",
      input: {
        id_periode: 0,
        kecamatan: "",
        desa: [
          {
            nama: "",
          },
        ],
        potensi: "",
      },
    };
  },
  created() {
    this.formDesa.push(this.valueFormDesa);
  },
  mounted() {
    this.showFormDesa();
    this.choicesJenis = this.getChoices("choices-jenis");
  },
  beforeUnmount() {
    this.choicesJenis.destroy();
  },
  methods: {
    ...mapActions(d$wilayah, ["a$addKecamatan"]),

    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
          shouldSort: false,
        });
      }
    },

    showFormDesa() {
      var jml = this.jmlDesa;

      var contentForm = "";
      var row = 1;
      if (jml % 4 == 0) {
        row = ~~(jml / 4);
      } else {
        row += ~~(jml / 4);
      }

      var counterTotalDesa = 1;
      for (let i = 1; i <= row; i++) {
        contentForm += `<div class="row mt-3">`;

        var counterCol = 1;
        for (let j = counterTotalDesa; j <= jml; j++) {
          if (counterCol > 4) {
            break;
          }

          contentForm +=
            `<div class="col-md-3 col-12">
                <label class="form-label">Desa ` +
            j +
            `</label>
                <input
                  class="form-control"
                  id="desa_` +
            j +
            `"
            name="desa_` +
            j +
            `"
                  type="text"
                  placeholder="Nama desa ` +
            j +
            `"
            required
                />
              </div>`;

          counterTotalDesa++;
          counterCol++;
        }
        contentForm += `</div>`;
      }
      this.valueFormDesa = contentForm;
      this.formDesa = [];
      this.formDesa.push(this.valueFormDesa);
    },

    async addKecamatan() {
      var jml = this.jmlDesa;
      this.input.desa = [];
      for (let i = 1; i <= jml; i++) {
        if (document.getElementById("desa_" + i)) {
          this.input.desa.push({
            nama: document.getElementById("desa_" + i).value,
          });
        }
      }

      // validation
      var potensiEditor = document.getElementById("potensi-editor");
      var potensiValidation = document.getElementById("potensi-validation");
      var potensiRow = document.getElementById("potensi-row");
      if (this.isEmptyPotensi()) {
        potensiEditor.classList.add("is-invalid");
        potensiValidation.innerText = "Potensi tidak boleh kosong!";
        potensiRow.classList.add("pb-7");
        this.showSwal("failed-message", "Potensi tidak boleh kosong!");

        return;
      } else {
        potensiEditor.classList.remove("is-invalid");
        potensiValidation.innerText = "";
        potensiRow.classList.remove("pb-7");

        var data = {
          id_periode: parseInt(this.input.id_periode),
          nama: this.input.kecamatan,
          desa: this.input.desa,
          potensi: this.input.potensi,
        };

        try {
          await this.a$addKecamatan(data);
          // this.$router.push({ name: "Pengajuan Lokasi" });
          this.showSwal(
            "success-message",
            "Data kecamatan berhasil ditambahkan!"
          );
          setTimeout(() => {
            this.$router.push({ name: "Pengajuan Lokasi" });
          }, 2600);
        } catch (error) {
          this.showSwal("failed-message", error.meta.field_name);
          console.log(error);
        }
      }
    },

    isEmptyPotensi() {
      if (this.input.potensi == "" || this.input.potensi == "<p><br></p>") {
        return true;
      } else {
        return false;
      }
    },

    showSwal(type, text) {
      if (type === "success-message") {
        this.$swal({
          icon: "success",
          title: "Berhasil!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else if (type === "failed-message") {
        this.$swal({
          icon: "error",
          title: "Gagal!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else if (type === "auto-close") {
        let timerInterval;
        this.$swal({
          title: "Auto close alert!",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            this.$swal.showLoading();
            const b = this.$swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = this.$swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      }
    },
  },
};
</script>
