<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-0">Daftar Mahasiswa</h5>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link
                    class="mb-0 btn bg-gradient-success btn-sm"
                    :to="{ name: 'Tambah Mahasiswa' }"
                    >+&nbsp; Tambah Mahasiswa
                  </router-link>
                  <button
                    type="button"
                    class="mx-1 mb-0 btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#import-mhs"
                  >
                    Impor
                  </button>
                  <div
                    id="import-mhs"
                    class="modal fade"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog mt-lg-10">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 id="ModalLabel" class="modal-title">
                            Impor Data Mahasiswa via File Excel
                          </h5>
                          <i class="fas fa-upload ms-3"></i>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <p>
                            Silahkan cari dan pilih file excel berisi data
                            mahasiswa
                          </p>
                          <input
                            type="file"
                            placeholder="Browse file..."
                            class="mb-1 form-control"
                          />
                          <div>
                            <small class="text-danger text-sm-start">
                              <i class="fas fa-info-circle"></i>
                              File yang diizinkan hanya file excel dengan
                              ekstensi .xls atau .xlsx
                            </small>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn bg-gradient-secondary btn-sm"
                            data-bs-dismiss="modal"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            class="btn bg-gradient-success btn-sm"
                          >
                            Unggah
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    class="mt-1 mb-0 btn btn-outline-success btn-sm export mt-sm-0"
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
          <div class="px-0 pb-0 card-body">
            <div class="table-responsive">
              <table id="mhs-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>Fakultas</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-sm">1</td>
                    <td>
                      <div class="d-flex">
                        <img
                          class="w-10 ms-3"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/adidas-hoodie.jpg"
                          alt="hoodie"
                        />
                        <h6 class="my-auto ms-3">BKLGO Full Zip Hoodie</h6>
                      </div>
                    </td>
                    <td class="text-sm">Clothing</td>
                    <td class="text-sm">$1,321</td>
                    <td class="text-sm">243598234</td>
                    <td class="text-sm">0</td>
                    <td>
                      <span class="badge badge-danger badge-sm"
                        >Out of Stock</span
                      >
                    </td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Preview product"
                      >
                        <i class="fas fa-eye text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit product"
                      >
                        <i class="fas fa-user-edit text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-secondary"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm">2</td>
                    <td>
                      <div class="d-flex">
                        <img
                          class="w-10 ms-3"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/macbook-pro.jpg"
                          alt="mac"
                        />
                        <h6 class="my-auto ms-3">MacBook Pro</h6>
                      </div>
                    </td>
                    <td class="text-sm">Electronics</td>
                    <td class="text-sm">$1,869</td>
                    <td class="text-sm">877712</td>
                    <td class="text-sm">0</td>
                    <td>
                      <span class="badge badge-danger badge-sm"
                        >Out of Stock</span
                      >
                    </td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Preview product"
                      >
                        <i class="fas fa-eye text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit product"
                      >
                        <i class="fas fa-user-edit text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-secondary"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm">3</td>
                    <td>
                      <div class="d-flex">
                        <img
                          class="w-10 ms-3"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/metro-chair.jpg"
                          alt="metro-chair"
                        />
                        <h6 class="my-auto ms-3">Metro Bar Stool</h6>
                      </div>
                    </td>
                    <td class="text-sm">Furniture</td>
                    <td class="text-sm">$99</td>
                    <td class="text-sm">0134729</td>
                    <td class="text-sm">978</td>
                    <td>
                      <span class="badge badge-success badge-sm">in Stock</span>
                    </td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Preview product"
                      >
                        <i class="fas fa-eye text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit product"
                      >
                        <i class="fas fa-user-edit text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-secondary"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm">4</td>
                    <td>
                      <div class="d-flex">
                        <img
                          class="w-10 ms-3"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/alchimia-chair.jpg"
                          alt="alchimia"
                        />
                        <h6 class="my-auto ms-3">Alchimia Chair</h6>
                      </div>
                    </td>
                    <td class="text-sm">Furniture</td>
                    <td class="text-sm">$2,999</td>
                    <td class="text-sm">113213</td>
                    <td class="text-sm">0</td>
                    <td>
                      <span class="badge badge-danger badge-sm"
                        >Out of Stock</span
                      >
                    </td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Preview product"
                      >
                        <i class="fas fa-eye text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit product"
                      >
                        <i class="fas fa-user-edit text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-secondary"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm">5</td>
                    <td>
                      <div class="d-flex">
                        <img
                          class="w-10 ms-3"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/fendi-coat.jpg"
                          alt="fendi"
                        />
                        <h6 class="my-auto ms-3">Fendi Gradient Coat</h6>
                      </div>
                    </td>
                    <td class="text-sm">Clothing</td>
                    <td class="text-sm">$869</td>
                    <td class="text-sm">634729</td>
                    <td class="text-sm">725</td>
                    <td>
                      <span class="badge badge-success badge-sm">in Stock</span>
                    </td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Preview product"
                      >
                        <i class="fas fa-eye text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit product"
                      >
                        <i class="fas fa-user-edit text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-secondary"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm">6</td>
                    <td>
                      <div class="d-flex">
                        <img
                          class="w-10 ms-3"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/off-white-jacket.jpg"
                          alt="off_white"
                        />
                        <h6 class="my-auto ms-3">Off White Cotton Bomber</h6>
                      </div>
                    </td>
                    <td class="text-sm">Clothing</td>
                    <td class="text-sm">$1,869</td>
                    <td class="text-sm">634729</td>
                    <td class="text-sm">725</td>
                    <td>
                      <span class="badge badge-success badge-sm">in Stock</span>
                    </td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Preview product"
                      >
                        <i class="fas fa-eye text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit product"
                      >
                        <i class="fas fa-user-edit text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-secondary"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm">7</td>
                    <td>
                      <div class="d-flex">
                        <img
                          class="w-10 ms-3"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/yohji-yamamoto.jpg"
                          alt="yohji"
                        />
                        <h6 class="my-auto ms-3">Y-3 Yohji Yamamoto</h6>
                      </div>
                    </td>
                    <td class="text-sm">Shoes</td>
                    <td class="text-sm">$869</td>
                    <td class="text-sm">634729</td>
                    <td class="text-sm">725</td>
                    <td>
                      <span class="badge badge-success badge-sm">In Stock</span>
                    </td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Preview product"
                      >
                        <i class="fas fa-eye text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit product"
                      >
                        <i class="fas fa-user-edit text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-secondary"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm">8</td>
                    <td>
                      <div class="d-flex">
                        <img
                          class="w-10 ms-3"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/mcqueen-shirt.jpg"
                          alt="mcqueen"
                        />
                        <h6 class="my-auto ms-3">Alexander McQueen</h6>
                      </div>
                    </td>
                    <td class="text-sm">Clothing</td>
                    <td class="text-sm">$1,199</td>
                    <td class="text-sm">00121399</td>
                    <td class="text-sm">51293</td>
                    <td>
                      <span class="badge badge-success badge-sm">in Stock</span>
                    </td>
                    <td class="text-sm">
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Preview product"
                      >
                        <i class="fas fa-eye text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Edit product"
                      >
                        <i class="fas fa-user-edit text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                      >
                        <i class="fas fa-trash text-secondary"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>SKU</th>
                    <th>Quantity</th>
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
import { DataTable } from "simple-datatables";
import setTooltip from "@/assets/js/tooltip.js";

export default {
  name: "IndexMahasiswa",
  mounted() {
    if (document.getElementById("mhs-list")) {
      const dataTableSearch = new DataTable("#mhs-list", {
        searchable: true,
        fixedHeight: false,
        perPage: 7,
      });

      document.querySelectorAll(".export").forEach(function (el) {
        el.addEventListener("click", function () {
          var type = el.dataset.type;

          var data = {
            type: type,
            filename: "soft-ui-" + type,
          };

          if (type === "csv") {
            data.columnDelimiter = "|";
          }

          dataTableSearch.export(data);
        });
      });
    }
    setTooltip(this.$store.state.bootstrap);
  },
};
</script>
