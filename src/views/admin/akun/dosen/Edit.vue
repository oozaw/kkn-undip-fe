<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0">
        <HeaderProfileCard
          :button="true"
          button-text="Simpan Perubahan"
          description="KKN Reguler Tim 1 2023"
        />
      </div>
    </div>
    <div class="mt-4">
      <div class="mt-4 mt-lg-0">
        <div class="card">
          <div class="card-body pb-5">
            <h5 class="font-weight-bolder mb-3">Edit Dosen</h5>
            <div class="row">
              <div class="col-12 col-sm-6">
                <label>Nama</label>
                <input
                  class="form-control"
                  type="text"
                  name="nama"
                  id="nama"
                  value="John Cena"
                />
              </div>
              <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                <label>NIP</label>
                <input
                  class="form-control"
                  type="number"
                  name="nip"
                  id="nip"
                  value="1234567890"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <label class="mt-4">Fakultas</label>
                <select id="fakultas-add" class="form-control" name="fakultas">
                  <option value="Choice 2">Real Estate</option>
                  <option value="Choice 3" selected>Electronics</option>
                  <option value="Choice 4">Clothing</option>
                  <option value="Choice 5">Others</option>
                </select>
              </div>
              <div class="col-3">
                <label class="mt-4">Jurusan</label>
                <select id="jurusan-add" class="form-control" name="fakultas">
                  <option value="Choice 2" selected>Real Estate</option>
                  <option value="Choice 3">Electronics</option>
                  <option value="Choice 4">Clothing</option>
                  <option value="Choice 5">Others</option>
                </select>
              </div>
              <div class="col-3">
                <label class="mt-4">Username</label>
                <input class="form-control" type="text" value="johncena123" />
              </div>
              <div class="col-3">
                <label class="mt-4">Password</label>
                <input
                  class="form-control"
                  type="password"
                  value="johncena123"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Choices from "choices.js";
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";

export default {
  name: "EditDosen",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      choicesFakultas: undefined,
      choicesJurusan: undefined,
    };
  },
  mounted() {
    this.choicesFakultas = this.getChoices("fakultas-add");
    this.choicesJurusan = this.getChoices("jurusan-add");
  },
  beforeUnmount() {
    this.choicesFakultas.destroy();
    this.choicesJurusan.destroy();
  },
  methods: {
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
  },
};
</script>
