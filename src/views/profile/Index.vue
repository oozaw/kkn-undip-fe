<template>
  <div class="container-fluid">
    <div class="row mb-5 mt-4">
      <div class="col-lg-12 mt-lg-0 mt-4">
        <header-profile-card>
          <template #button>
            <div class="my-auto ms-auto">
              <router-link
                class="mb-0 me-2 btn bg-gradient-primary btn-sm"
                :to="{ name: 'Edit Landing Profile' }"
                >+&nbsp; Edit Profile
              </router-link>
            </div>
          </template>
        </header-profile-card>
        <section id="mhs-section">
          <TableContentLoader v-if="isLoading" />
          <div class="bg-white card mt-4" :hidden="isLoading">
            <!-- Card header -->
            <div class="pb-0 card-header">
              <div class="d-lg-flex">
                <div>
                  <h5 class="mb-2">Profil P2KKN</h5>
                  <p class="text-sm mb-0">
                    Profil, Visi Misi, dan Kontak P2KKN
                  </p>
                </div>
              </div>
            </div>
            <div class="pt-4 px-6 pb-3 card-body">
              <div class="text-center">
                <h5 class="">Profil</h5>
                <p class="" v-html="g$profile?.profile"></p>
              </div>
              <div class="text-center mt-3">
                <h5 class="">Visi</h5>
                <p class="" v-html="g$profile?.visi"></p>
              </div>
              <div class="text-center mt-3">
                <h5 class="">Misi</h5>
                <p class="" v-html="g$profile?.misi"></p>
              </div>
              <div class="text-center mt-3">
                <h5 class="">Alamat</h5>
                <p class="" v-html="g$profile?.alamat"></p>
              </div>
              <div class="text-center mt-3">
                <h5 class="mb-1">Kontak</h5>
                <div class="d-flex justify-content-center">
                  <span>
                    <font-awesome-icon icon="fa-solid fa-phone" />
                    <p class="me-3">{{ g$profile?.no_hp }}</p>
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-envelope" />
                    <p class="me-3">{{ g$profile?.email }}</p>
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-brands fa-instagram" />
                    <p class="me-3">{{ g$profile?.instagram }}</p>
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-brands fa-facebook" />
                    <p class="me-3">{{ g$profile?.facebook }}</p>
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-brands fa-twitter" />
                    <p class="me-3">{{ g$profile?.twitter }}</p>
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-brands fa-youtube" />
                    <p class="me-3">{{ g$profile?.youtube }}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderProfileCard from "@/views/dashboards/components/HeaderProfileCard.vue";
import TableContentLoader from "@/views/dashboards/components/TableContentLoader.vue";
import { mapActions, mapState } from "pinia";
import d$auth from "@/store/auth";
import d$profile from "@/store/profile";

export default {
  name: "IndexLandingProfile",
  components: {
    HeaderProfileCard,
    TableContentLoader,
  },
  data() {
    return {
      isLoading: true,
      indexComponent: 0,
    };
  },
  computed: {
    ...mapState(d$auth, ["g$user"]),
    ...mapState(d$profile, ["g$profile"]),
  },
  async created() {
    await this.getInitData();
  },
  methods: {
    ...mapActions(d$auth, ["a$getUser"]),
    ...mapActions(d$profile, ["a$getProfile"]),

    async getInitData() {
      this.isLoading = true;

      try {
        await this.a$getProfile();
      } catch (error) {
        console.log(error);
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
      }, 400);
    },
  },
};
</script>
