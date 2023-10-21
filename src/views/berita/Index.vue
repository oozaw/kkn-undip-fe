<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card />
        <section id="mhs-section">
          <TableContentLoader v-if="isLoading" />
          <div class="bg-white card mt-4" :hidden="isLoading">
            <!-- Card header -->
            <div class="pb-0 card-header">
              <div class="d-lg-flex">
                <div>
                  <h5 class="mb-2">Berita</h5>
                  <p class="text-sm mb-0">Daftar Berita Tersimpan</p>
                </div>
                <div class="my-auto mt-4 ms-auto mt-lg-0">
                  <div class="my-auto ms-auto">
                    <router-link
                      class="mb-0 me-2 btn bg-gradient-success btn-sm"
                      :to="{ name: 'Landing Tambah Berita' }"
                      >+&nbsp; Tambah Berita
                    </router-link>
                    <button
                      class="mt-1 mb-0 btn btn-outline-success btn-sm export-mhs-sec mt-sm-0"
                      data-type="csv"
                      type="button"
                      name="button"
                    >
                      Ekspor
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="ms-2 pt-1 px-0 pb-0 card-body">
              <div class="table-responsive" :key="indexComponent">
                <table id="berita-list" class="table table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th class="col-1">No.</th>
                      <th>Judul</th>
                      <th>Kategori</th>
                      <th>Author</th>
                      <th>Tanggal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(berita, i) in g$listBerita"
                      :key="berita.id_berita"
                    >
                      <td class="text-sm">{{ i + 1 }}</td>
                      <td>
                        <h6 class="my-auto">{{ berita.judul }}</h6>
                      </td>
                      <td class="text-sm">{{ berita.kategori }}</td>
                      <td class="text-sm">{{ berita.author }}</td>
                      <td class="text-sm">
                        {{ moment(berita.created_at).format("DD MMMM YYYY") }}
                      </td>
                      <td class="text-sm">
                        <a
                          :id="berita.id_berita"
                          type="button"
                          class="mb-0 text-primary detail"
                          title="Detail Berita"
                        >
                          <i class="fas fa-eye text-info"></i>
                        </a>
                        <a
                          :id="berita.id_berita"
                          href="#"
                          class="mx-3 edit"
                          data-bs-toggle="tooltip"
                          title="Edit Berita"
                        >
                          <i class="fas fa-user-edit text-primary"></i>
                        </a>
                        <a
                          :id="berita.id_berita"
                          :name="berita.judul"
                          class="delete"
                          href="#"
                          data-bs-toggle="tooltip"
                          data-bs-original-title="Hapus Berita"
                          title="Hapus Berita"
                        >
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th class="col-1">No.</th>
                      <th>Judul</th>
                      <th>Kategori</th>
                      <th>Author</th>
                      <th>Tanggal</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { DataTable } from "simple-datatables";
import moment from "moment";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import { mapActions, mapState } from "pinia";
import d$auth from "@/store/auth";
import d$berita from "@/store/berita";

export default {
  name: "IndexBerita",
  components: {
    HeaderProfileCard,
    TableContentLoader,
  },
  data() {
    return {
      indexComponent: 0,
      moment,
      isLoading: true,
    };
  },
  computed: {
    ...mapState(d$auth, ["g$user"]),
    ...mapState(d$berita, ["g$listBerita"]),
  },
  async created() {
    moment.locale("id");
    await this.getInitData();
  },
  methods: {
    ...mapActions(d$berita, ["a$listBerita", "a$deleteBerita"]),

    async getInitData() {
      this.isLoading = true;
      this.indexComponent++;

      try {
        await this.a$listBerita();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat memuat data! " + msg
        );
      }

      setTimeout(() => {
        this.setupDataTable("berita-list");
        this.setupTableAction();
      }, 10);

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },

    async deleteBerita(id_berita) {
      this.showSwal("loading");

      try {
        await this.a$deleteBerita(id_berita);
        await this.getInitData();
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal("failed-message", "Data gagal dihapus! " + msg);
      }
    },

    setupTableAction() {
      let outerThis = this;

      // detail berita
      $("#berita-list").on("click", `.detail`, function (e) {
        let berita = this;
        outerThis.$router.push({
          name: "Landing Detail Berita",
          params: { id_berita: berita.id },
        });
        e.preventDefault();
      });

      // edit berita
      $("#berita-list").on("click", `.edit`, function (e) {
        let berita = this;
        outerThis.$router.push({
          name: "Landing Edit Berita",
          params: { id_berita: berita.id },
        });
        e.preventDefault();
      });

      // delete
      $("#berita-list").on("click", `.delete`, function (e) {
        let berita = this;
        outerThis.showSwal(
          "warning-confirmation",
          `Hapus berita ${berita.name}?`,
          "Berhasil menghapus data",
          berita.id
        );
        e.preventDefault();
      });
    },

    setupDataTable(id) {
      let element = document.getElementById(id);

      if (element) {
        const dataTableSearch = new DataTable(element, {
          searchable: true,
          fixedHeight: false,
          perPage: 5,
        });

        document.querySelectorAll(".export-mhs-sec").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "Data Reportase",
            };

            // if (type === "csv") {
            //   data.columnDelimiter = "|";
            // }

            dataTableSearch.export(data);
          });
        });

        document.querySelectorAll(".export-dosen-sec").forEach(function (el) {
          el.addEventListener("click", function () {
            var type = el.dataset.type;
            var tema =
              document.getElementById("choices-tema").selectedOptions[0].text;

            var data = {
              type: type,
              filename: "Data Reportase " + tema,
            };

            // if (type === "csv") {
            //   data.columnDelimiter = "|";
            // }

            dataTableSearch.export(data);
          });
        });
      }
    },

    setChoices(choices, option) {
      if (choices) {
        choices.clearChoices();
        choices.removeActiveItems();

        if (option.length !== 0) {
          let newOption = [];
          option.forEach((item) => {
            if (Object.values(item)[7] == 1) {
              newOption.push({
                value: Object.values(item)[1],
                label: Object.values(item)[10].nama,
                selected: Object.values(item)[1] == this.id_kecamatan,
              });
            }
          });
          choices.setChoices(newOption);
        } else {
          choices.setChoices([
            {
              value: "",
              label: "Tidak ada data",
              selected: true,
              disabled: true,
            },
          ]);
        }
      }
    },

    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
          shouldSort: false,
        });
      }
    },

    getOutOfTagP(element) {
      var temp = $("<div>").html(element);
      temp.find("p").each(function () {
        $(this).replaceWith(this.childNodes);
      });

      var output = temp.html();
      return output;
    },

    getTema() {
      this.tema =
        document.getElementById("choices-tema").selectedOptions[0].text;
    },

    showSwal(type, text, toastText, id_berita) {
      if (type === "success-message") {
        this.$swal({
          icon: "success",
          title: "Berhasil!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
        });
      } else if (type === "warning-message") {
        this.$swal({
          icon: "warning",
          title: "Peringatan!",
          text: text,
          timer: 2500,
          type: type,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            this.$swal.hideLoading();
          },
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
          didOpen: () => {
            this.$swal.hideLoading();
          },
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
          didOpen: () => {
            this.$swal.hideLoading();
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteBerita(id_berita);
            this.$swal({
              toast: true,
              position: "top-end",
              title: toastText,
              icon: "success",
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
              didOpen: () => {
                this.$swal.hideLoading();
              },
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
            this.$swal.showLoading();
          },
          didDestroy: () => {
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
