<template>
  <div class="container-fluid py-5">
    <div class="row">
      <div class="col-12">
        <div class="multisteps-form">
          <div class="row">
            <div class="col-12 col-lg-8 mx-auto mb-4">
              <div class="card">
                <div class="card-body">
                  <div class="multisteps-form__progress">
                    <button
                      class="multisteps-form__progress-btn js-active"
                      type="button"
                      title="User Info"
                      :class="activeStep >= 0 ? activeClass : ''"
                      @click="activeStep = 0"
                    >
                      <span>User Info</span>
                    </button>
                    <button
                      class="multisteps-form__progress-btn"
                      type="button"
                      title="Address"
                      :class="activeStep >= 1 ? activeClass : ''"
                      @click="activeStep = 1"
                    >
                      Address
                    </button>
                    <button
                      class="multisteps-form__progress-btn"
                      type="button"
                      title="Socials"
                      :class="activeStep >= 2 ? activeClass : ''"
                      @click="activeStep = 2"
                    >
                      Socials
                    </button>
                    <button
                      class="multisteps-form__progress-btn"
                      type="button"
                      title="Profile"
                      :class="activeStep >= 3 ? activeClass : ''"
                      @click="activeStep = 3"
                    >
                      Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--form panels-->
          <div class="row">
            <div class="col-12 col-lg-8 m-auto">
              <form class="multisteps-form__form">
                <!--single form panel-->
                <user-info :class="activeStep === 0 ? activeClass : ''" />
                <!--single form panel-->
                <user-address :class="activeStep === 1 ? activeClass : ''" />
                <!--single form panel-->
                <user-socials :class="activeStep === 2 ? activeClass : ''" />
                <!--single form panel-->
                <user-profile :class="activeStep === 3 ? activeClass : ''" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from "./components/UserInfo.vue";
import UserAddress from "./components/UserAddress.vue";
import UserSocials from "./components/UserSocials.vue";
import UserProfile from "./components/UserProfile.vue";

export default {
  name: "NewUser",
  components: {
    UserInfo,
    UserAddress,
    UserSocials,
    UserProfile,
  },
  data() {
    return {
      showMenu: false,
      activeClass: "js-active position-relative",
      activeStep: 0,
      formSteps: 3,
    };
  },
  methods: {
    nextStep() {
      if (this.activeStep < this.formSteps) {
        this.activeStep += 1;
      } else {
        this.activeStep -= 1;
      }
    },
    prevStep() {
      if (this.activeStep > 0) {
        this.activeStep -= 1;
      }
    },
  },
};
</script>
