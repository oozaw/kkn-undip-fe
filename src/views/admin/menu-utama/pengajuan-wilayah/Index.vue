<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <HeaderProfileCard
          name="BAPPEDA Kota Semarang"
          description="Kota Semarang, Jawa Tengah, Indonesia"
        />
        <div class="bg-white card mt-4">
          <div class="card-header pb-0 pt-3">
            <p class="font-weight-bold text-dark mb-2">
              Pilih Tema KKN Terdaftar
            </p>
          </div>
          <div class="pb-3 pt-0 card-body">
            <div class="col-12 align-self-center">
              <select
                id="choices-tema"
                class="form-control"
                name="choices-tema"
                @change="getListKecamatan()"
                v-model="tema"
              >
                <option value="1">KKN Reguler Tim I</option>
                <option value="2">
                  KKN Tematik Pengurangan Risiko Bencana Berbasis Partisipasi
                  Masyarakat dan Komunitas
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="bg-white card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Pengajuan Lokasi Kecamatan KKN</h5>
                <p class="text-sm mb-0">
                  Daftar Lokasi Kecataman KKN Beserta Potensi
                </p>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    class="mt-2 mb-0 btn btn-outline-success btn-sm export-kec mt-sm-0"
                    data-type="csv"
                    type="button"
                    name="button"
                  >
                    Expor
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="ms-2 pt-1 px-0 pb-0 card-body">
            <div class="table-responsive" :key="indexComponent">
              <table id="wilayah-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="col-3 ps-0">Kecamatan</th>
                    <th class="ps-0">Total Desa</th>
                    <th>BAPPEDA</th>
                    <th>Potensi</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(kec, index) in g$listKecamatan"
                    :key="kec.id_kecamatan"
                  >
                    <td class="text-sm ps-3">{{ index + 1 }}</td>
                    <td class="ms-0 px-0">
                      <h6 class="my-auto">{{ kec.nama }}</h6>
                    </td>
                    <td class="text-sm">{{ kec.desa.length }}</td>
                    <td class="text-sm">{{ kec.nama_kabupaten }}</td>
                    <td class="text-sm">
                      <a
                        type="button"
                        class="mb-0 text-primary"
                        data-bs-toggle="modal"
                        :data-bs-target="'#potensi_' + kec.id_kecamatan"
                      >
                        Lihat
                      </a>
                      <div
                        :id="'potensi_' + kec.id_kecamatan"
                        class="modal fade"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-10">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="ModalLabel" class="modal-title">
                                Potensi Kecamatan {{ kec.nama }}
                              </h5>
                              <button
                                type="button"
                                class="btn-close text-dark mb-0"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                <font-awesome-icon icon="fa-solid fa-xmark" />
                              </button>
                            </div>
                            <div class="modal-body">
                              <span v-html="kec.potensi"></span>
                            </div>
                            <div class="modal-footer"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="text-sm">
                      <span
                        class="badge badge-secondary"
                        v-if="kec.status === 0"
                        >Dalam Proses</span
                      >
                      <span
                        class="badge badge-success"
                        v-else-if="kec.status === 1"
                        >Diterima</span
                      >
                      <span class="badge badge-danger" v-else>Ditolak</span>
                    </td>
                    <td class="text-sm">
                      <a
                        class="me-3"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Detail Kecamatan"
                        title="Detail Kecamatan"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        class="me-3"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Hapus Kecamatan"
                        title="Hapus"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                      <a
                        :id="kec.id_kecamatan"
                        :name="kec.nama"
                        class="me-3 tolak"
                        href=""
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Tolak Kecamatan"
                        title="Tolak"
                      >
                        <font-awesome-icon
                          class="text-danger"
                          icon="fa-solid fa-square-xmark"
                          size="xl"
                        />
                      </a>
                      <!-- <a
                        class="me-3"
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Verifikasi Kecamatan"
                        title="Verifikasi"
                      >
                        <font-awesome-icon
                          class="text-warning"
                          icon="fa-solid fa-square-minus"
                          size="xl"
                        />
                      </a> -->
                      <a
                        :id="kec.id_kecamatan"
                        :name="kec.nama"
                        class="me-3 terima"
                        href=""
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Terima Kecamatan"
                        title="Terima"
                      >
                        <font-awesome-icon
                          class="text-success"
                          icon="fa-solid fa-square-check"
                          size="xl"
                        />
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th class="col-1 ps-2">No.</th>
                    <th class="ps-0">Kecamatan</th>
                    <th>Total Desa</th>
                    <th>BAPPEDA</th>
                    <th>Potensi</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { DataTable } from "simple-datatables";
import Choices from "choices.js";
import setTooltip from "@/assets/js/tooltip.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import { mapActions, mapState } from "pinia";
import d$wilayah from "@/store/wilayah";

export default {
  name: "IndexPengajuanWilayah",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      indexComponent: 0,
      choicesTema: undefined,
      tema: "1",
    };
  },
  computed: {
    ...mapState(d$wilayah, ["g$listKecamatan"]),
  },
  async created() {
    await this.getListKecamatan();
    this.choicesTema = this.getChoices("choices-tema");

    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    this.choicesTema.destroy();
  },
  methods: {
    ...mapActions(d$wilayah, [
      "a$listAllKabupaten",
      "a$accKecamatan",
      "a$decKecamatan",
    ]),

    async getListKecamatan() {
      this.tema = parseInt(this.tema);
      this.indexComponent++;

      try {
        await this.a$listAllKabupaten(this.tema);
      } catch (error) {
        this.showSwal(
          "failed-message",
          error ?? "Terjadi kesalahaan saat memuat data"
        );
        // console.log(error);
      }

      this.setupDataTable();
      this.setupTableAction();
    },

    async accKecamatan(id_kecamatan) {
      this.showSwal("loading");

      try {
        await this.a$accKecamatan(id_kecamatan);
        await this.getListKecamatan();
      } catch (error) {
        this.showSwal(
          "failed-message",
          error ?? "Terjadi kesalahan saat mengubah data"
        );
        // console.log(error);
      }

      // this.showSwal("close");
    },

    async decKecamatan(id_kecamatan) {
      this.showSwal("loading");

      try {
        await this.a$decKecamatan(id_kecamatan);
        await this.getListKecamatan();
      } catch (error) {
        this.showSwal(
          "failed-message",
          error ?? "Terjadi kesalahan saat mengubah data"
        );
        // console.log(error);
      }

      // this.showSwal("close");
    },

    setupDataTable() {
      if (document.getElementById("wilayah-list")) {
        const dataTableSearch = new DataTable("#wilayah-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export-kec").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Pengajuan Wilayah",
            };

            // if (type === "csv") {
            //   data.columnDelimiter = "|";
            // }

            dataTableSearch.export(data);
          });
        });
      }
    },

    setupTableAction() {
      let outerThis = this;
      $("#wilayah-list").on("click", `.terima`, function (e) {
        let kec = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menerima pengajuan kecamatan ${kec.name}?`,
          "Berhasil memperbarui data",
          kec.id,
          true
        );
        e.preventDefault();
      });
      $("#wilayah-list").on("click", `.tolak`, function (e) {
        let kec = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Menolak pengajuan kecamatan ${kec.name}?`,
          "Berhasil memperbarui data",
          kec.id,
          false
        );
        e.preventDefault();
      });
    },

    getChoices(id) {
      var element = document.getElementById(id);
      if (element) {
        return new Choices(element, {
          searchEnabled: true,
          allowHTML: true,
        });
      }
    },

    showSwal(type, text, toastText, id_kecamatan, status) {
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
      } else if (type === "warning-confirmation") {
        this.$swal({
          title: "Apakah Anda yakin?",
          text: text,
          showCancelButton: true,
          confirmButtonText: "Ya!",
          cancelButtonText: "Batal!",
          customClass: {
            confirmButton: "btn bg-gradient-success",
            cancelButton: "btn bg-gradient-secondary",
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.isConfirmed) {
            if (status) this.accKecamatan(id_kecamatan);
            else this.decKecamatan(id_kecamatan);
            this.$swal({
              toast: true,
              position: "top-end",
              title: toastText,
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            this.$swal.close();
          }
        });
      } else if (type === "loading") {
        this.$swal({
          title: "Memuat...",
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            this.$swal.isLoading();
            if (this.$swal.isLoading()) this.$swal.showLoading();
          },
          didDestroy: () => {
            !this.$swal.isLoading();
            this.$swal.hideLoading();
          },
        });
      } else if (type === "close") {
        this.$swal.close();
      }
    },
  },
};
</script>
