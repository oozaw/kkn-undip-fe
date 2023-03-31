<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-6">
        <h4 class="text-white">Tambah Pengguna</h4>
      </div>
    </div>
    <div class="mt-4">
      <div class="mt-4 mt-lg-0">
        <div class="card">
          <div class="card-body pb-5">
            <h5 class="font-weight-bolder mb-2">Data Pengguna Baru</h5>
            <div class="row">
              <div class="col-12 col-sm-6">
                <label>Username</label>
                <input
                  class="form-control"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                />
              </div>
              <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                <label>Kata sandi</label>
                <input
                  class="form-control"
                  type="number"
                  name="password"
                  id="password"
                  placeholder="Kata sandi"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <label class="mt-4">Tipe Pengguna</label>
                <select id="tipe-add" class="form-control" name="tipe">
                  <option value="0" selected disabled hidden>
                    -- Pilih tipe --
                  </option>
                  <option value="Choice 2">Real Estate</option>
                  <option value="Choice 3">Electronics</option>
                  <option value="Choice 4">Clothing</option>
                  <option value="Choice 5">Others</option>
                </select>
              </div>
              <div class="col-6 d-flex flex-column justify-content-center">
                <button type="button" class="mt-5 mb-0 btn btn-primary ms-auto">
                  Tambah
                </button>
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

export default {
  name: "AddPengguna",

  mounted() {
    this.getChoices("tipe-add");
  },

  methods: {
    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: false,
          allowHTML: true,
        });
      }
    },
  },
};
</script>
