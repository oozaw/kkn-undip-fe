<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0">
        <HeaderProfileCard
          :button="true"
          button-text="Tambah Pimpinan"
          description="KKN Reguler Tim 1 2023"
        />
      </div>
    </div>
    <div class="mt-4">
      <div class="mt-4 mt-lg-0">
        <div class="card">
          <div class="card-body pb-5">
            <h5 class="font-weight-bolder mb-3">Tambah Pimpinan</h5>
            <div class="row">
              <div class="col-12">
                <label>Status</label>
                <input
                  id="status"
                  name="status"
                  class="form-control"
                  type="text"
                  placeholder="Masukkan status pimpinan, contoh Pimpinan LPPM"
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12 col-sm-6">
                <label>Nama</label>
                <input
                  class="form-control"
                  type="text"
                  name="nama"
                  id="nama"
                  placeholder="Masukkan nama pimpinan"
                  v-model="body.nama"
                />
              </div>
              <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                <label>NIP</label>
                <input
                  class="form-control"
                  type="number"
                  name="nip"
                  id="nip"
                  placeholder="Masukkan NIP pimpinan"
                  v-model="body.nomor"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <label class="mt-4">Username</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Masukkan username"
                  v-model="body.username"
                />
              </div>
              <div class="col-6">
                <label class="mt-4">Password</label>
                <input
                  class="form-control"
                  type="password"
                  placeholder="Masukkan password"
                  v-model="body.password"
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
  name: "AddPimpinan",
  components: {
    HeaderProfileCard,
  },
  data() {
    return {
      body: {
        nama: "",
        nomor: "",
        username: "",
        password: "",
      },
    };
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
