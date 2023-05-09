<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 mt-lg-0">
        <HeaderProfileCard
          :button="true"
          button-text="Tambah Bappeda"
          description="KKN Reguler Tim 1 2023"
        />
      </div>
    </div>
    <div class="mt-4">
      <div class="mt-4 mt-lg-0">
        <div class="card">
          <div class="card-body pb-5">
            <h5 class="font-weight-bolder mb-3">Tambah Bappeda</h5>
            <div class="row">
              <div class="col-12 col-sm-6">
                <label>Nama</label>
                <input
                  class="form-control"
                  type="text"
                  name="nama"
                  id="nama"
                  placeholder="Masukkan nama BAPPEDA"
                  v-model="body.nama"
                />
              </div>
              <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                <label>Nomor BAPPEDA</label>
                <input
                  class="form-control"
                  type="number"
                  name="nomor"
                  id="nomor"
                  placeholder="Masukkan nomor BAPPEDA"
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
import d$bappeda from "@/store/bappeda";
import { mapActions } from "pinia";

export default {
  name: "AddBappeda",
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
    ...mapActions(d$bappeda, ["a$addBappeda"]),
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
