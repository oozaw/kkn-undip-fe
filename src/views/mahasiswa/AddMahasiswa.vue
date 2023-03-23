<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-6">
        <h4 class="text-white">Tambah Mahasiswa</h4>
        <p class="text-white">
          We’re constantly trying to express ourselves and actualize our dreams.
          If you have the opportunity to play.
        </p>
      </div>
      <div
        class="text-right col-lg-6 d-flex flex-column justify-content-center"
      >
        <button
          type="button"
          class="mt-2 mb-0 btn btn-primary ms-lg-auto me-lg-0 me-auto mt-lg-0"
        >
          Tambah
        </button>
      </div>
    </div>
    <div class="mt-4">
      <div class="mt-4 mt-lg-0">
        <div class="card">
          <div class="card-body pb-5">
            <h5 class="font-weight-bolder">Data Mahasiswa</h5>
            <div class="row">
              <div class="col-12 col-sm-6">
                <label>Nama</label>
                <input
                  class="form-control"
                  type="text"
                  name="nama"
                  id="nama"
                  placeholder="Nama mahasiswa"
                />
              </div>
              <div class="mt-3 col-12 col-sm-6 mt-sm-0">
                <label>NIM</label>
                <input
                  class="form-control"
                  type="number"
                  name="nim"
                  id="nim"
                  placeholder="NIM mahasiswa"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <label class="mt-4">Fakultas</label>
                <select id="fakultas-add" class="form-control" name="fakultas">
                  <option value="0" selected disabled hidden>
                    -- Pilih fakultas --
                  </option>
                  <option value="Choice 2">Real Estate</option>
                  <option value="Choice 3">Electronics</option>
                  <option value="Choice 4">Clothing</option>
                  <option value="Choice 5">Others</option>
                </select>
              </div>
              <div class="col-3">
                <label class="mt-4">Jurusan</label>
                <select id="jurusan-add" class="form-control" name="fakultas">
                  <option value="0" selected disabled hidden>
                    -- Pilih jurusan --
                  </option>
                  <option value="Choice 2">Real Estate</option>
                  <option value="Choice 3">Electronics</option>
                  <option value="Choice 4">Clothing</option>
                  <option value="Choice 5">Others</option>
                </select>
              </div>
              <div class="col-3">
                <label class="mt-4">Price</label>
                <input class="form-control" type="text" value="$90" />
              </div>
              <div class="col-3">
                <label class="mt-4">Quantity</label>
                <input class="form-control" type="number" value="50" />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <label class="mt-4">Description</label>
                <p class="text-xs form-text text-muted ms-1 d-inline">
                  (optional)
                </p>
                <div id="edit-description-edit" class="h-50">
                  Long sleeves black denim jacket with a twisted design.
                  Contrast stitching. Button up closure. White arrow prints on
                  the back.
                </div>
              </div>
              <div class="col-sm-6">
                <label class="mt-4">Category</label>
                <select
                  id="choices-category-edit"
                  class="form-control"
                  name="choices-category"
                >
                  <option value="Choice 1" selected>Furniture</option>
                  <option value="Choice 2">Real Estate</option>
                  <option value="Choice 3">Electronics</option>
                  <option value="Choice 4">Clothing</option>
                  <option value="Choice 5">Others</option>
                </select>
                <label>Color</label>
                <select
                  id="choices-color-edit"
                  class="form-control"
                  name="choices-color"
                >
                  <option value="Choice 1" selected>Black</option>
                  <option value="Choice 2">White</option>
                  <option value="Choice 3">Blue</option>
                  <option value="Choice 4">Orange</option>
                  <option value="Choice 5">Green</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from "quill";
import Choices from "choices.js";

export default {
  name: "AddMahasiswa",

  mounted() {
    if (document.getElementById("edit-description-edit")) {
      new Quill("#edit-description-edit", {
        theme: "snow", // Specify theme in configuration
      });
    }
    this.getChoices("fakultas-add");
    this.getChoices("jurusan-add");
    this.getChoices("choices-color-edit");
    this.getChoices("choices-currency-edit");

    if (document.getElementById("choices-tags-edit")) {
      var tags = document.getElementById("choices-tags-edit");
      const examples = new Choices(tags, {
        removeItemButton: true,
        allowHTML: true,
      });

      examples.setChoices(
        [
          {
            value: "One",
            label: "Expired",
            disabled: true,
          },
          {
            value: "Two",
            label: "Out of Stock",
            selected: true,
          },
        ],
        "value",
        "label",
        false
      );
    }
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
