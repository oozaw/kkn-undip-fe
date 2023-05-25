<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <div class="bg-white card mt-4">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Data Registrasi KKN</h5>
                <p class="text-sm mb-0">
                  Registrasi KKN, Submit Proposal, Daftar Lokasi
                </p>
              </div>
              <!-- <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link
                    class="mb-0 btn bg-gradient-success btn-sm"
                    :to="{ name: 'Tambah Registrasi' }"
                    >+&nbsp; Tambah Data Registrasi
                  </router-link>
                </div>
              </div> -->
            </div>
          </div>
          <div class="ms-2 pt-1 px-0 pb-0 card-body">
            <div class="table-responsive">
              <table id="registrasi-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Wilayah KKN</th>
                    <th>Jenis</th>
                    <th>Periode</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-sm">1</td>
                    <td>
                      <h6 class="my-auto">Desa Bergas, Kecamatan Bergas</h6>
                    </td>
                    <td class="text-sm">Reguler Tim I</td>
                    <td class="text-sm">2022/2023</td>
                    <td class="text-sm">
                      <span class="badge badge-success">Diterima</span>
                    </td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Preview product"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit product"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm">2</td>
                    <td>
                      <h6 class="my-auto">Desa Hankaf, Kecamatan Hankaf</h6>
                    </td>
                    <td class="text-sm">Reguler Tim II</td>
                    <td class="text-sm">2022/2023</td>
                    <td class="text-sm">
                      <span class="badge badge-danger">Ditolak</span>
                    </td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Preview product"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit product"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm">3</td>
                    <td>
                      <h6 class="my-auto">
                        Desa Gunungmas, Kecamatan Gunungmas
                      </h6>
                    </td>
                    <td class="text-sm">Reguler Tim I</td>
                    <td class="text-sm">2022/2023</td>
                    <td class="text-sm">
                      <span class="badge badge-secondary">Ditunda</span>
                    </td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Preview product"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit product"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm">4</td>
                    <td>
                      <h6 class="my-auto">
                        Desa Jatimulyo, Kecamatan Jatimulyo
                      </h6>
                    </td>
                    <td class="text-sm">Tematik</td>
                    <td class="text-sm">2022/2023</td>
                    <td class="text-sm">
                      <span class="badge badge-success">Diterima</span>
                    </td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Preview product"
                      >
                        <i class="fas fa-eye text-info"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit product"
                      >
                        <i class="fas fa-user-edit text-primary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th class="col-1">No.</th>
                    <th>Wilayah KKN</th>
                    <th>Jenis</th>
                    <th>Periode</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
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
                v-model="tema"
                @change="getListGelombang()"
              >
                <option value="1" selected>KKN Reguler Tim I</option>
                <option value="2">
                  KKN Tematik Pengurangan Risiko Bencana Berbasis Partisipasi
                  Masyarakat dan Komunitas
                </option>
              </select>
            </div>
          </div>
        </div>
        <div id="card-section" class="row pe-0" :key="indexComponent">
          <div
            class="col-lg-6 pe-0"
            v-for="gel in listGelombang"
            :key="gel.id_gelombang"
          >
            <GelombangCard
              :title="gel.nama"
              :status="gel.status"
              :statusColor="gel.status_color"
              deadline="31 Juni 2023 | 11:00 AM"
              :action="{
                route: '/pendaftaran/lokasi',
                label: 'Lihat',
                color: 'secondary',
              }"
            >
              <template #button v-if="gel.status === 'Diterima'">
                <router-link
                  :to="{
                    name: 'Tambah Registrasi',
                    params: {
                      id_gelombang: gel.id_gelombang,
                    },
                  }"
                  type="button"
                  class="mb-0 btn btn-sm bg-gradient-primary"
                >
                  Tambah
                </router-link>
              </template>
            </GelombangCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Choices from "choices.js";
import { DataTable } from "simple-datatables";
import setTooltip from "@/assets/js/tooltip.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import GelombangCard from "@/views/dashboards/components/Cards/GelombangCard.vue";
import { mapActions, mapState } from "pinia";
import d$proposal from "@/store/proposal";
import d$gelombang from "@/store/gelombang";

export default {
  name: "IndexRegistrasiKKN",
  components: {
    HeaderProfileCard,
    GelombangCard,
  },
  data() {
    return {
      tema: 1,
      choicesTema: undefined,
      indexComponent: 0,
      listGelombang: [],
    };
  },
  computed: {
    ...mapState(d$proposal, ["g$listProposal"]),
    ...mapState(d$gelombang, ["g$listGelombang"]),
  },
  mounted() {
    // this.a$listProposal();
    this.getListGelombang();

    this.setupDataTable();

    setTooltip(this.$store.state.bootstrap);
  },
  methods: {
    ...mapActions(d$proposal, ["a$listProposal"]),
    ...mapActions(d$gelombang, ["a$listGelombang"]),

    async getListGelombang() {
      this.indexComponent++;
      this.tema = parseInt(this.tema);
      this.listGelombang = [];
      if (this.tema === 1) {
        this.listGelombang.push(
          {
            id_gelombang: 1,
            id_tema: 1,
            nama: "Gelombang 1 Dosen",
            status: 1,
          },
          {
            id_gelombang: 3,
            id_tema: 1,
            nama: "Gelombang 3 Dosen",
            status: 0,
          }
        );
      } else if (this.tema === 2) {
        this.listGelombang.push(
          {
            id_gelombang: 2,
            id_tema: 2,
            nama: "Gelombang 2 Dosen",
            status: -1,
          },
          {
            id_gelombang: 4,
            id_tema: 2,
            nama: "Gelombang 4 Dosen",
            status: 1,
          }
        );
      }

      var newListGelombang = [];
      this.listGelombang.forEach((gelombang) => {
        if (gelombang.status === 0) {
          gelombang.status = "Sedang diproses";
          let newGelombang = Object.assign({}, gelombang, {
            status_color: "secondary",
          });
          newListGelombang.push(newGelombang);
        } else if (gelombang.status === 1) {
          gelombang.status = "Diterima";
          let newGelombang = Object.assign({}, gelombang, {
            status_color: "success",
          });
          newListGelombang.push(newGelombang);
        } else {
          gelombang.status = "Ditolak";
          let newGelombang = Object.assign({}, gelombang, {
            status_color: "danger",
          });
          newListGelombang.push(newGelombang);
        }
      });

      this.listGelombang = newListGelombang;

      console.log(this.listGelombang);

      // try {
      //   await this.a$listGelombang(this.tema);
      // } catch (error) {
      //   this.showSwal(
      //     "failed-message",
      //     error ?? "Terjadi kesalahan saat memuat data"
      //   );
      //   console.log(error);
      // }
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

    getChoices(id) {
      var element = document.getElementById(id);
      if (element) {
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
        });
      }
    },

    setupDataTable() {
      if (document.getElementById("registrasi-list")) {
        const dataTableSearch = new DataTable("#registrasi-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Registrasi Dosen",
            };

            if (type === "csv") {
              data.columnDelimiter = "|";
            }

            dataTableSearch.export(data);
          });
        });
      }
    },
  },
};
</script>
