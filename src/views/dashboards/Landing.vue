<template>
  <main class="main-content position-relative border-radius-lg">
    <div class="container-fluid py-4">
      <div class="row min-vh-80">
        <div class="d-none d-lg-block">
          <div class="col-lg-10">
            <div
              class="position-absolute p-3 border-radius-xl blur shadow-xl perspective-right z-index-3 mt-7"
            >
              <router-link class="w-100" to="/dashboards/dashboard-default">
                <img
                  class="w-100 border-radius-lg"
                  src="../../assets/img/default.png"
                  alt="default page"
                />
              </router-link>
            </div>
            <div
              class="position-absolute p-3 border-radius-xl blur shadow-xl perspective-right-sm z-index-2 mt-3"
            >
              <img
                class="w-100 border-radius-lg"
                src="../../assets/img/automotive.png"
                alt="default page"
              />
            </div>
            <div
              class="position-absolute p-3 border-radius-xl blur shadow-xl perspective-right-xs z-index-1"
            >
              <img
                class="w-100 border-radius-lg"
                src="../../assets/img/crm.png"
                alt="default page"
              />
            </div>
          </div>
        </div>
        <div class="d-lg-none d-none d-md-block">
          <div class="col-lg-10">
            <div class="p-3 border-radius-xl blur shadow-xl z-index-3 mt-5">
              <img
                class="w-100 border-radius-lg"
                src="../../assets/img/default.png"
                alt="default page"
              />
            </div>
            <div class="p-3 border-radius-xl blur shadow-xl z-index-2 mt-4">
              <img
                class="w-100 border-radius-lg"
                src="../../assets/img/automotive.png"
                alt="default page"
              />
            </div>
          </div>
        </div>
        <div class="d-lg-none d-md-none">
          <div class="col-lg-10">
            <div class="p-3 border-radius-xl blur shadow-xl z-index-3 mt-5">
              <img
                class="w-100 border-radius-lg"
                src="../../assets/img/default.png"
                alt="default page"
              />
            </div>
            <div class="p-3 border-radius-xl blur shadow-xl z-index-2 mt-4">
              <img
                class="w-100 border-radius-lg"
                src="../../assets/img/automotive.png"
                alt="default page"
              />
            </div>
            <div class="p-3 border-radius-xl blur shadow-xl z-index-1 mt-4">
              <img
                class="w-100 border-radius-lg"
                src="../../assets/img/crm.png"
                alt="default page"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
const body = document.getElementsByTagName("body")[0];

export default {
  name: "Landing",
  beforeMount() {
    this.$store.state.layout = "landing";
    this.$store.state.showNavbar = false;
    this.$store.state.showFooter = false;
    this.$store.state.hideConfigButton = true;
    body.classList.add("landing");
  },
  beforeUnmount() {
    this.$store.state.layout = "default";
    this.$store.state.showNavbar = true;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = false;
    body.classList.remove("landing");
  }
};
</script>
