<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card>
          <template #button>
            <div class="d-flex align-items-center">
              <a
                type="button"
                class="mb-0 me-2 btn btn-sm bg-gradient-danger"
                data-bs-toggle="modal"
                data-bs-target="#delete-koordinator"
                title="Detail Mahasiswa"
              >
                <i class="fas fa-minus me-1"></i>
                Hapus Koordinator
              </a>
              <div
                id="delete-koordinator"
                class="modal fade"
                tabindex="-1"
                aria-hidden="true"
              >
                <div class="modal-dialog mt-lg-5" :key="indexComponent">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 id="ModalLabel" class="modal-title text-wrap">
                        Hapus Koordinator
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
                    <div class="modal-body p-4">
                      <div class="row">
                        <div class="col-12">
                          <label
                            for="delete-koor"
                            class="align-items-center mt-2 ms-0 me-3"
                            >Koordinator:</label
                          >
                          <select
                            name="delete-koor"
                            id="delete-koor"
                            class="form-select"
                            v-model="idDeleteKoordinator"
                          >
                            <option value="" disabled hidden>
                              -- Pilih koordinator --
                            </option>
                            <option
                              :value="koordinator.id_koordinator"
                              v-for="(
                                koordinator, i
                              ) in g$struktur?.koordinator"
                              :key="koordinator.id_koordinator"
                            >
                              {{
                                `Koor. ${i + 1} - ${koordinator.pimpinan.nama} `
                              }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        id="button-close-modal-delete"
                        class="btn bg-gradient-secondary btn-sm"
                        data-bs-dismiss="modal"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        class="btn bg-gradient-danger btn-sm"
                        @click="deleteKoordinator()"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <a
                type="button"
                class="mb-0 me-3 btn btn-sm bg-gradient-success"
                data-bs-toggle="modal"
                data-bs-target="#add-koordinator"
                title="Detail Mahasiswa"
              >
                <i class="fas fa-plus me-1"></i>
                Tambah Koordinator
              </a>
              <div
                id="add-koordinator"
                class="modal fade"
                tabindex="-1"
                aria-hidden="true"
              >
                <div class="modal-dialog mt-lg-5" :key="indexComponent">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 id="ModalLabel" class="modal-title text-wrap">
                        Tambah Koordinator
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
                    <div class="modal-body p-4">
                      <div class="row">
                        <div class="col-12">
                          <label
                            for="add-koor"
                            class="align-items-center mt-2 ms-0 me-3"
                            >Koordinator:</label
                          >
                          <select
                            name="add-koor"
                            id="add-koor"
                            class="form-select"
                            v-model="idNewKoordinator"
                          >
                            <option value="" disabled hidden>
                              -- Pilih koordinator --
                            </option>
                            <option
                              :value="pimpinan.id_pimpinan"
                              v-for="pimpinan in g$listPimpinan"
                              :key="pimpinan.id_pimpinan"
                            >
                              {{ pimpinan.nama }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        id="button-close-modal-add"
                        class="btn bg-gradient-secondary btn-sm"
                        data-bs-dismiss="modal"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        class="btn bg-gradient-success btn-sm"
                        @click="addKoordinator()"
                      >
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </header-profile-card>
        <TableContentLoader v-if="isLoading" />
        <div
          class="bg-white card mt-4"
          :hidden="isLoading"
          :key="indexComponent"
        >
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-2">Struktur P2KKN</h5>
                <p class="text-sm mb-0">
                  Struktur Organisasi P2KKN Universitas Diponegoro
                </p>
              </div>
            </div>
          </div>
          <div class="pt-4 px-4 card-body">
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="d-flex align-items-center">
                  <label for="kepala" class="align-items-center mt-2 ms-0 me-3"
                    >Kepala:</label
                  >
                  <div class="w-100">
                    <select
                      name="kepala"
                      id="kepala"
                      class="form-select"
                      v-model="idKepala"
                      @change="editStruktur()"
                    ></select>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 mt-3 mt-md-0">
                <div class="d-flex align-items-center">
                  <label
                    for="sekretaris"
                    class="align-items-center mt-2 ms-0 me-3"
                    >Sekretaris:</label
                  >
                  <div class="w-100">
                    <select
                      name="sekretaris"
                      id="sekretaris"
                      class="form-select"
                      v-model="idSekretaris"
                      @change="editStruktur()"
                    ></select>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <h6>Koordinator</h6>
              <div class="d-flex flex-wrap">
                <div
                  class="col-12 col-md-6 pe-3 mb-3"
                  v-for="(koor, i) in g$listKoordinator"
                  :key="i"
                >
                  <div class="d-flex align-items-center">
                    <label
                      class="align-items-center text-nowrap mt-2 ms-0 me-3"
                    >
                      {{ `Koor. ${i + 1}` }}:
                    </label>
                    <div class="w-100 choices-koor-placeholder">
                      <select
                        :name="koor.id_koordinator"
                        :id="`koor-${i}`"
                        class="form-select ms-3 choices-koordinator"
                      ></select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import { mapState, mapActions } from "pinia";
import d$struktur from "@/store/struktur";
import d$koordinator from "@/store/koordinator";
import d$pimpinan from "@/store/pimpinan";

export default {
  name: "IndexStruktur",
  components: {
    HeaderProfileCard,
    TableContentLoader,
  },
  data() {
    return {
      indexComponent: 0,
      isLoading: true,
      idKepala: "",
      idSekretaris: "",
      idNewKoordinator: "",
      idDeleteKoordinator: "",
      struktur: undefined,
      choicesKepala: undefined,
      choicesSekretaris: undefined,
      choicesAddKoordinator: undefined,
      choicesDeleteKoordinator: undefined,
      choicesKoor: [],
    };
  },
  computed: {
    ...mapState(d$struktur, ["g$struktur"]),
    ...mapState(d$koordinator, ["g$listKoordinator"]),
    ...mapState(d$pimpinan, ["g$listPimpinan"]),
  },
  async created() {
    await this.getInitData();
  },
  beforeUnmount() {
    this.clearChoices();
  },
  methods: {
    ...mapActions(d$struktur, ["a$getStruktur", "a$editStruktur"]),
    ...mapActions(d$koordinator, [
      "a$listKoordinator",
      "a$addKoordinator",
      "a$editKoordinator",
      "a$deleteKoordinator",
    ]),
    ...mapActions(d$pimpinan, ["a$listPimpinan"]),

    async getInitData() {
      this.isLoading = true;
      this.indexComponent++;

      try {
        await this.a$listPimpinan();
        await this.getStruktur();
        await this.getKoordinator();
        this.choicesAddKoordinator = this.getChoices("add-koor");
        this.choicesDeleteKoordinator = this.getChoices("delete-koor");
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
        this.isLoading = false;
      }, 300);
    },

    async getStruktur() {
      try {
        await this.a$getStruktur();
        this.struktur = this.g$struktur;
        this.idKepala = this.g$struktur.kepala;
        this.idSekretaris = this.g$struktur.sekretaris;
        this.getChoicesStruktur();
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
    },

    async getKoordinator() {
      try {
        await this.a$listKoordinator();
        this.getChoicesKoordinator();
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
    },

    async editStruktur() {
      this.showSwal("loading");

      try {
        if (this.idKepala == "" || this.idSekretaris == "") {
          this.showSwal(
            "warning-message",
            "Kepala dan Sekretaris tidak boleh kosong!"
          );
          return;
        }

        const body = {
          id_kepala: parseInt(this.idKepala),
          id_sekretaris: parseInt(this.idSekretaris),
        };

        await this.a$editStruktur(body);
        this.clearChoices();

        this.getInitData();

        this.showSwal("success-message", "Struktur berhasil diubah!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat mengubah struktur! " + msg
        );
      }
    },

    async addKoordinator() {
      this.showSwal("loading");

      try {
        if (this.idNewKoordinator == "") {
          this.showSwal(
            "warning-message",
            "Pilih koordinator terlebih dahulu!"
          );
          return;
        }

        const body = {
          id_pimpinan: parseInt(this.idNewKoordinator),
          id_struktur: this.g$struktur.id_struktur,
        };

        await this.a$addKoordinator(body);

        const buttonCloseModal = document.getElementById(
          "button-close-modal-add"
        );
        buttonCloseModal.click();
        this.idNewKoordinator = "";

        this.clearChoices();

        await this.getInitData();

        this.showSwal("success-message", "Koordinator berhasil ditambahkan!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat menambahkan koordinator! " + msg
        );
      }
    },

    async deleteKoordinator() {
      this.showSwal("loading");

      try {
        if (this.idDeleteKoordinator == "") {
          this.showSwal(
            "warning-message",
            "Pilih koordinator terlebih dahulu!"
          );
          return;
        }

        await this.a$deleteKoordinator(parseInt(this.idDeleteKoordinator));

        const buttonCloseModal = document.getElementById(
          "button-close-modal-delete"
        );
        buttonCloseModal.click();
        this.idDeleteKoordinator = "";

        this.clearChoices();

        await this.getInitData();

        this.showSwal("success-message", "Koordinator berhasil dihapus!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat menambahkan koordinator! " + msg
        );
      }
    },

    async editKoordinator(id_koordinator, id_pimpinan) {
      this.showSwal("loading");

      try {
        if (!id_pimpinan || id_pimpinan == "") {
          this.showSwal("warning-message", "Koordinator tidak boleh kosong!");
          return;
        }

        const body = {
          id_pimpinan: parseInt(id_pimpinan),
          id_struktur: this.g$struktur.id_struktur,
        };

        await this.a$editKoordinator(parseInt(id_koordinator), body);
        this.clearChoices();

        this.getInitData();
        this.showSwal("success-message", "Koordinator berhasil diubah!");
      } catch (error) {
        console.log(error);
        let msg = "";
        if (error.error && error.error != undefined) msg = error.error;
        else msg = error;
        this.showSwal(
          "failed-message",
          "Terjadi kesalahan saat mengubah koordinator! " + msg
        );
      }
    },

    getChoicesStruktur() {
      this.choicesKepala = this.getChoices("kepala");
      this.choicesSekretaris = this.getChoices("sekretaris");
      this.setChoices(
        this.choicesKepala,
        this.g$listPimpinan,
        this.struktur.kepala
      );
      this.setChoices(
        this.choicesSekretaris,
        this.g$listPimpinan,
        this.struktur.sekretaris
      );
    },

    getChoicesKoordinator() {
      const outerThis = this;

      $(".choices-koor-placeholder").on(
        "change",
        ".choices-koordinator",
        function (e) {
          const koordinator = this;
          outerThis.editKoordinator(koordinator.name, koordinator.value);
          e.preventDefault();
        }
      );

      this.choicesKoor = [];
      this.g$listKoordinator.forEach((item, i) => {
        this.choicesKoor.push(this.getChoices(`koor-${i}`));
        this.setChoices(
          this.choicesKoor[i],
          this.g$listPimpinan,
          Object.values(item)[1]
        );
      });
    },

    clearChoices() {
      if (this.choicesKepala) this.choicesKepala.destroy();
      if (this.choicesSekretaris) this.choicesSekretaris.destroy();
      this.choicesKoor.forEach((item) => {
        item.destroy();
      });
      if (this.choicesAddKoordinator) this.choicesAddKoordinator.destroy();
      if (this.choicesDeleteKoordinator)
        this.choicesDeleteKoordinator.destroy();
    },

    setChoices(choices, option, value) {
      if (choices) {
        choices.clearChoices();
        choices.removeActiveItems();

        if (option.length !== 0) {
          let newOption = [];
          option.forEach((item) => {
            newOption.push({
              value: Object.values(item)[0],
              label: Object.values(item)[2],
              selected: Object.values(item)[0] == value,
            });
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

    showSwal(type, text, toastText, id_proposal, isDelete, status) {
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
            if (isDelete) this.deletePendaftaran(id_proposal);
            else if (!isDelete && status) this.accMahasiswa(id_proposal);
            else this.decMahasiswa(id_proposal);
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
