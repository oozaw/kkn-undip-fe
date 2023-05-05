<template>
  <!-- Navbar -->
  <nav
    class="navbar navbar-expand-lg top-0 z-index-3 position-absolute mt-4"
    :class="isBlur ? isBlur : 'shadow-none my-2 navbar-transparent w-100'"
  >
    <div class="container ps-1 pe-0">
      <router-link class="navbar-brand ms-lg-0 me-0 w-25" to="/">
        <img
          :src="logo"
          class="navbar-brand-img"
          style="height: 20px; width: auto"
          alt="main_logo"
        />
        <span
          class="font-weight-bolder ms-1"
          :class="darkMode ? 'text-black' : 'text-white'"
        >
          KKN Universitas Diponegoro
        </span>
      </router-link>
      <button
        class="shadow-none navbar-toggler ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="mt-2 navbar-toggler-icon">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div
        id="navigation"
        class="pt-3 pb-2 collapse navbar-collapse w-100 py-lg-0"
      >
        <ul class="mx-auto navbar-nav navbar-nav-hover">
          <li class="mx-2 nav-item dropdown dropdown-hover">
            <a
              id="dropdownMenuAccount"
              role="button"
              class="cursor-pointer nav-link ps-2 d-flex justify-content-between align-items-center"
              :class="[darkModes]"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Authentication
              <img
                :src="downArrWhite"
                alt="down-arrow"
                class="arrow ms-1"
                :class="darkMode ? 'd-none' : 'd-lg-block d-none'"
              />
              <img
                :src="downArrBlack"
                alt="down-arrow"
                class="arrow ms-1 d-block"
                :class="darkMode ? 'd-lg-block' : 'd-lg-none'"
              />
            </a>
            <div
              class="p-3 mt-0 dropdown-menu dropdown-menu-animation dropdown-lg border-radius-xl mt-lg-3"
              aria-labelledby="dropdownMenuAccount"
            >
              <div class="row d-none d-lg-flex">
                <div class="col-6">
                  <div
                    class="py-6 h-100 w-100 d-flex border-radius-lg position-relative dropdown-image"
                    :style="{ 'background-image': 'url(' + curved8 + ')' }"
                  >
                    <div
                      class="mask bg-gradient-success border-radius-lg"
                    ></div>
                    <div
                      class="d-flex justify-content-center align-items-center text-center text-white font-weight-bold w-100 z-index-1 flex-column"
                    >
                      <span class="text-lg mt-2">
                        Explore our
                        <br />Authentication pages
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="col-6 ps-0 d-flex justify-content-center flex-column"
                >
                  <ul class="list-group">
                    <li
                      class="p-0 border-0 nav-item dropdown dropdown-hover dropdown-subitem list-group-item"
                    >
                      <a
                        id="dropdownSignIn"
                        class="mb-1 dropdown-item border-radius-md ps-3 d-flex align-items-center justify-content-between"
                      >
                        <span>Sign In</span>
                        <img
                          src="@/assets/img/down-arrow.svg"
                          alt="down-arrow"
                          class="arrow"
                        />
                      </a>
                      <div
                        class="px-2 py-3 mt-0 dropdown-menu"
                        aria-labelledby="dropdownSignIn"
                      >
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Signin Basic' }"
                        >
                          <span>Basic</span>
                        </router-link>
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Signin Cover' }"
                        >
                          <span>Cover</span>
                        </router-link>
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Signin Illustration' }"
                        >
                          <span>Illustration</span>
                        </router-link>
                      </div>
                    </li>
                    <li
                      class="p-0 border-0 nav-item dropdown dropdown-hover dropdown-subitem list-group-item"
                    >
                      <a
                        id="dropdownSignUp"
                        class="mb-1 dropdown-item border-radius-md ps-3 d-flex align-items-center justify-content-between"
                      >
                        <span>Sign Up</span>
                        <img
                          src="@/assets/img/down-arrow.svg"
                          alt="down-arrow"
                          class="arrow"
                        />
                      </a>
                      <div
                        class="px-2 py-3 mt-0 dropdown-menu"
                        aria-labelledby="dropdownSignUp"
                      >
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Signup Basic' }"
                        >
                          <span>Basic</span>
                        </router-link>
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Signup Cover' }"
                        >
                          <span>Cover</span>
                        </router-link>
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Signup Illustration' }"
                        >
                          <span>Illustration</span>
                        </router-link>
                      </div>
                    </li>
                    <li
                      class="p-0 border-0 nav-item dropdown dropdown-hover dropdown-subitem list-group-item"
                    >
                      <a
                        id="dropdownPasswordReset"
                        class="mb-1 dropdown-item border-radius-md ps-3 d-flex align-items-center justify-content-between"
                      >
                        <span>Reset Password</span>
                        <img
                          src="@/assets/img/down-arrow.svg"
                          alt="down-arrow"
                          class="arrow"
                        />
                      </a>
                      <div
                        class="px-2 py-3 mt-0 dropdown-menu"
                        aria-labelledby="dropdownPasswordReset"
                      >
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Reset Basic' }"
                        >
                          <span>Basic</span>
                        </router-link>
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Reset Cover' }"
                        >
                          <span>Cover</span>
                        </router-link>
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Reset Illustration' }"
                        >
                          <span>Illustration</span>
                        </router-link>
                      </div>
                    </li>
                    <li
                      class="p-0 border-0 nav-item dropdown dropdown-hover dropdown-subitem list-group-item"
                    >
                      <a
                        id="dropdownLock"
                        class="mb-1 dropdown-item border-radius-md ps-3 d-flex align-items-center justify-content-between"
                      >
                        <span>Lock</span>
                        <img
                          src="../../assets/img/down-arrow.svg"
                          alt="down-arrow"
                          class="arrow"
                        />
                      </a>
                      <div
                        class="px-2 py-3 mt-0 dropdown-menu"
                        aria-labelledby="dropdownLock"
                      >
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Lock Basic' }"
                        >
                          <span>Basic</span>
                        </router-link>
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Lock Cover' }"
                        >
                          <span>Cover</span>
                        </router-link>
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Lock Illustration' }"
                        >
                          <span>Illustration</span>
                        </router-link>
                      </div>
                    </li>
                    <li
                      class="p-0 border-0 nav-item dropdown dropdown-hover dropdown-subitem list-group-item"
                    >
                      <a
                        id="dropdown2fa"
                        class="mb-1 dropdown-item border-radius-md ps-3 d-flex align-items-center justify-content-between"
                      >
                        <span>2-Step Verification</span>
                        <img
                          src="@/assets/img/down-arrow.svg"
                          alt="down-arrow"
                          class="arrow"
                        />
                      </a>
                      <div
                        class="px-2 py-3 mt-0 dropdown-menu"
                        aria-labelledby="dropdown2fa"
                      >
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Verification Basic' }"
                        >
                          <span>Basic</span>
                        </router-link>
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Verification Cover' }"
                        >
                          <span>Cover</span>
                        </router-link>
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Verification Illustration' }"
                        >
                          <span>Illustration</span>
                        </router-link>
                      </div>
                    </li>
                    <li
                      class="p-0 border-0 nav-item dropdown dropdown-hover dropdown-subitem list-group-item"
                    >
                      <a
                        id="dropdownError"
                        class="mb-1 dropdown-item border-radius-md ps-3 d-flex align-items-center justify-content-between"
                      >
                        <span>Error</span>
                        <img
                          src="@/assets/img/down-arrow.svg"
                          alt="down-arrow"
                          class="arrow"
                        />
                      </a>
                      <div
                        class="px-2 py-3 mt-0 dropdown-menu"
                        aria-labelledby="dropdownError"
                      >
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Error Error404' }"
                        >
                          <span>404</span>
                        </router-link>
                        <router-link
                          class="mb-1 dropdown-item ps-3 border-radius-md"
                          :to="{ name: 'Error Error500' }"
                        >
                          <span>500</span>
                        </router-link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="d-lg-none">
                <div class="col-12 d-flex justify-content-center flex-column">
                  <h6
                    class="px-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                  >
                    Sign In
                  </h6>
                  <router-link
                    :to="{ name: 'Signin Basic' }"
                    class="dropdown-item border-radius-md"
                    >Basic</router-link
                  >
                  <router-link
                    :to="{ name: 'Signin Cover' }"
                    class="dropdown-item border-radius-md"
                    >Cover</router-link
                  >
                  <router-link
                    :to="{ name: 'Signin Illustration' }"
                    class="dropdown-item border-radius-md"
                    >Illustration</router-link
                  >
                  <h6
                    class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                  >
                    Sign Up
                  </h6>
                  <router-link
                    :to="{ name: 'Signup Basic' }"
                    class="dropdown-item border-radius-md"
                    >Basic</router-link
                  >
                  <router-link
                    :to="{ name: 'Signup Cover' }"
                    class="dropdown-item border-radius-md"
                    >Cover</router-link
                  >
                  <router-link
                    :to="{ name: 'Signup Illustration' }"
                    class="dropdown-item border-radius-md"
                    >Illustration</router-link
                  >
                  <h6
                    class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                  >
                    Reset Password
                  </h6>
                  <router-link
                    :to="{ name: 'Reset Basic' }"
                    class="dropdown-item border-radius-md"
                    >Basic</router-link
                  >
                  <router-link
                    :to="{ name: 'Reset Cover' }"
                    class="dropdown-item border-radius-md"
                    >Cover</router-link
                  >
                  <router-link
                    :to="{ name: 'Reset Illustration' }"
                    class="dropdown-item border-radius-md"
                    >Illustation</router-link
                  >
                  <h6
                    class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                  >
                    Lock
                  </h6>
                  <router-link
                    :to="{ name: 'Lock Basic' }"
                    class="dropdown-item border-radius-md"
                    >Basic</router-link
                  >
                  <router-link
                    :to="{ name: 'Lock Cover' }"
                    class="dropdown-item border-radius-md"
                    >Cover</router-link
                  >
                  <router-link
                    :to="{ name: 'Lock Illustration' }"
                    class="dropdown-item border-radius-md"
                    >Illustration</router-link
                  >
                  <h6
                    class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                  >
                    2-Step Verification
                  </h6>
                  <router-link
                    :to="{ name: 'Verification Basic' }"
                    class="dropdown-item border-radius-md"
                    >Basic</router-link
                  >
                  <router-link
                    :to="{ name: 'Verification Cover' }"
                    class="dropdown-item border-radius-md"
                    >Cover</router-link
                  >
                  <router-link
                    :to="{ name: 'Verification Illustration' }"
                    class="dropdown-item border-radius-md"
                    >Illustration</router-link
                  >
                  <h6
                    class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                  >
                    Error
                  </h6>

                  <router-link
                    :to="{ name: 'Error Error404' }"
                    class="dropdown-item border-radius-md"
                    >404</router-link
                  >
                  <router-link
                    :to="{ name: 'Error Error500' }"
                    class="dropdown-item border-radius-md"
                    >500</router-link
                  >
                </div>
              </div>
            </div>
          </li>
          <li class="mx-2 nav-item dropdown dropdown-hover">
            <a
              id="dropdownMenuBlocks"
              role="button"
              class="cursor-pointer nav-link ps-2 d-flex justify-content-between align-items-center"
              :class="[darkModes]"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Applications
              <img
                :src="downArrWhite"
                alt="down-arrow"
                class="arrow ms-1"
                :class="darkMode ? 'd-none' : 'd-lg-block d-none'"
              />
              <img
                :src="downArrBlack"
                alt="down-arrow"
                class="arrow ms-1 d-block"
                :class="darkMode ? 'd-lg-block' : 'd-lg-none'"
              />
            </a>
            <div
              class="p-3 mt-0 dropdown-menu dropdown-menu-animation dropdown-md dropdown-md-responsive border-radius-lg mt-lg-3"
              aria-labelledby="dropdownMenuBlocks"
            >
              <div class="d-none d-lg-block">
                <ul class="list-group">
                  <li
                    class="p-0 border-0 nav-item dropdown dropdown-hover dropdown-subitem list-group-item"
                  >
                    <router-link
                      class="py-2 dropdown-item ps-3 border-radius-md"
                      :to="{ name: 'Kanban' }"
                    >
                      <div class="d-flex">
                        <div class="h-10 mt-1 icon me-3 d-flex">
                          <i
                            class="ni ni-single-copy-04 text-gradient text-success"
                          ></i>
                        </div>
                        <div
                          class="w-100 d-flex align-items-center justify-content-between"
                        >
                          <div>
                            <p class="p-0 dropdown-header text-dark">Kanban</p>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </li>
                  <li
                    class="p-0 border-0 nav-item dropdown dropdown-hover dropdown-subitem list-group-item"
                  >
                    <router-link
                      class="py-2 dropdown-item ps-3 border-radius-md"
                      :to="{ name: 'Wizard' }"
                    >
                      <div class="d-flex">
                        <div class="h-10 mt-1 icon me-3 d-flex">
                          <i
                            class="ni ni-laptop text-gradient text-success"
                          ></i>
                        </div>
                        <div
                          class="w-100 d-flex align-items-center justify-content-between"
                        >
                          <div>
                            <p class="p-0 dropdown-header text-dark">Wizard</p>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </li>
                  <li
                    class="p-0 border-0 nav-item dropdown dropdown-hover dropdown-subitem list-group-item"
                  >
                    <router-link
                      class="py-2 dropdown-item ps-3 border-radius-md"
                      :to="{ name: 'Data Tables' }"
                    >
                      <div class="d-flex">
                        <div class="h-10 mt-1 icon me-3 d-flex">
                          <i class="ni ni-badge text-gradient text-success"></i>
                        </div>
                        <div
                          class="w-100 d-flex align-items-center justify-content-between"
                        >
                          <div>
                            <p class="p-0 dropdown-header text-dark">
                              DataTables
                            </p>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </li>
                  <li
                    class="p-0 border-0 nav-item dropdown dropdown-hover dropdown-subitem list-group-item"
                  >
                    <router-link
                      class="py-2 dropdown-item ps-3 border-radius-md"
                      :to="{ name: 'Calendar' }"
                    >
                      <div class="d-flex">
                        <div class="h-10 mt-1 icon me-3 d-flex">
                          <i
                            class="ni ni-notification-70 text-gradient text-success"
                          ></i>
                        </div>
                        <div
                          class="w-100 d-flex align-items-center justify-content-between"
                        >
                          <div>
                            <p class="p-0 dropdown-header text-dark">
                              Calendar
                            </p>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>
              <!-- responsive -->
              <div class="row d-lg-none">
                <div class="col-md-12">
                  <router-link
                    class="py-2 ps-3 border-radius-md"
                    :to="{ name: 'Kanban' }"
                  >
                    <div class="d-flex">
                      <div class="h-10 mt-1 icon me-3 d-flex">
                        <i
                          class="ni ni-single-copy-04 text-gradient text-success"
                        ></i>
                      </div>
                      <div
                        class="w-100 d-flex align-items-center justify-content-between"
                      >
                        <div>
                          <p class="p-0 dropdown-header text-dark">Kanban</p>
                        </div>
                      </div>
                    </div>
                  </router-link>
                  <router-link
                    class="py-2 ps-3 border-radius-md"
                    :to="{ name: 'Wizard' }"
                  >
                    <div class="d-flex">
                      <div class="h-10 mt-1 icon me-3 d-flex">
                        <i class="ni ni-laptop text-gradient text-success"></i>
                      </div>
                      <div
                        class="w-100 d-flex align-items-center justify-content-between"
                      >
                        <div>
                          <p class="p-0 dropdown-header text-dark">Wizard</p>
                        </div>
                      </div>
                    </div>
                  </router-link>
                  <router-link
                    class="py-2 ps-3 border-radius-md"
                    :to="{ name: 'Data Tables' }"
                  >
                    <div class="d-flex">
                      <div class="h-10 mt-1 icon me-3 d-flex">
                        <i class="ni ni-badge text-gradient text-success"></i>
                      </div>
                      <div
                        class="w-100 d-flex align-items-center justify-content-between"
                      >
                        <div>
                          <p class="p-0 dropdown-header text-dark">
                            DataTables
                          </p>
                        </div>
                      </div>
                    </div>
                  </router-link>
                  <router-link
                    class="py-2 ps-3 border-radius-md"
                    :to="{ name: 'Calendar' }"
                  >
                    <div class="d-flex">
                      <div class="h-10 mt-1 icon me-3 d-flex">
                        <i
                          class="ni ni-notification-70 text-gradient text-success"
                        ></i>
                      </div>
                      <div
                        class="w-100 d-flex align-items-center justify-content-between"
                      >
                        <div>
                          <p class="p-0 dropdown-header text-dark">Calendar</p>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </li>
          <li class="mx-2 nav-item dropdown dropdown-hover">
            <a
              id="dropdownMenuEcommerce"
              role="button"
              class="cursor-pointer nav-link ps-2 d-flex justify-content-between align-items-center"
              :class="[darkModes]"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Ecommerce
              <img
                :src="downArrWhite"
                alt="down-arrow"
                class="arrow ms-1"
                :class="darkMode ? 'd-none' : 'd-lg-block d-none'"
              />
              <img
                :src="downArrBlack"
                alt="down-arrow"
                class="arrow ms-1 d-block"
                :class="darkMode ? 'd-lg-block' : ' d-lg-none'"
              />
            </a>
            <div
              class="p-3 mt-0 dropdown-menu dropdown-menu-animation dropdown-lg border-radius-xl mt-lg-3"
              aria-labelledby="dropdownMenuEcommerce"
            >
              <div class="row d-none d-lg-block">
                <div class="px-4 py-2 col-12">
                  <div class="row">
                    <div class="col-6 position-relative">
                      <div
                        class="px-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                      >
                        <i class="ni ni-cart text-success me-3"></i>
                        Orders
                      </div>
                      <router-link
                        :to="{ name: 'Order List' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Order List</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'Order Details' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Order Details</span>
                      </router-link>
                      <div
                        class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                      >
                        <i class="ni ni-box-2 text-success me-3"></i>
                        General
                      </div>
                      <router-link
                        :to="{ name: 'Overview' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Overview</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'Referral' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Referral</span>
                      </router-link>
                      <hr class="vertical dark" />
                    </div>
                    <div class="col-6 position-relative">
                      <div
                        class="px-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                      >
                        <i class="ni ni-planet text-success me-3"></i>
                        Products
                      </div>
                      <router-link
                        :to="{ name: 'New Product' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">New Product</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'Edit Product' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Edit Product</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'Product Page' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Product Page</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'Products List' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Products List</span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
              <!-- responsive -->
              <div class="d-lg-none">
                <div
                  class="px-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                >
                  <i class="ni ni-cart text-success me-3"></i>
                  Orders
                </div>
                <router-link
                  :to="{ name: 'Order List' }"
                  class="dropdown-item border-radius-md"
                  >Order List</router-link
                >
                <router-link
                  :to="{ name: 'Order Details' }"
                  class="dropdown-item border-radius-md"
                  >Order Details</router-link
                >
                <div
                  class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                >
                  <i class="ni ni-box-2 text-success me-3"></i>
                  General
                </div>
                <router-link
                  :to="{ name: 'Overview' }"
                  class="dropdown-item border-radius-md"
                  >Overview</router-link
                >
                <router-link
                  :to="{ name: 'Referral' }"
                  class="dropdown-item border-radius-md"
                  >Referral</router-link
                >
                <div
                  class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                >
                  <i class="ni ni-planet text-success me-3"></i>
                  Products
                </div>
                <router-link
                  :to="{ name: 'New Product' }"
                  class="dropdown-item border-radius-md"
                  >New Product</router-link
                >
                <router-link
                  :to="{ name: 'Edit Product' }"
                  class="dropdown-item border-radius-md"
                  >Edit Product</router-link
                >
                <router-link
                  :to="{ name: 'Product Page' }"
                  class="dropdown-item border-radius-md"
                  >Product Page</router-link
                >
                <router-link
                  :to="{ name: 'Products List' }"
                  class="dropdown-item border-radius-md"
                  >Products List</router-link
                >
              </div>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav d-lg-block d-none">
          <li class="nav-item">
            <router-link
              :to="{ name: 'Default' }"
              class="mb-0 btn btn-sm me-1"
              :class="btnBackground ? btnBackground : 'bg-white text-dark'"
              >Dashboard</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import downArrWhite from "@/assets/img/down-arrow-white.svg";
import downArrBlack from "@/assets/img/down-arrow-dark.svg";
import logo from "@/assets/img/logos/undip.png";
import curved8 from "@/assets/img/curved-images/curved8.jpg";

export default {
  name: "Navbar",
  props: {
    btnBackground: {
      type: String,
      default: "",
    },
    isBlur: {
      type: String,
      default: "",
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      downArrWhite,
      downArrBlack,
      logo,
      curved8,
    };
  },
  computed: {
    darkModes() {
      return {
        "text-dark": this.darkMode,
      };
    },
  },
};
</script>
