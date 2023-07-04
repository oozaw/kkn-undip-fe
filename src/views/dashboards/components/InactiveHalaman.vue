<template>
  <main class="main-content mt-0">
    <div class="card">
      <div class="page-header min-vh-70">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-7 mx-auto text-center">
              <h1 class="display-2 text-bolder text-primary">Maaf</h1>
              <h3>Halaman ini tidak aktif</h3>
              <p class="lead">
                Jika anda merasa ini adalah kesalahan, silahkan hubungi admin.
              </p>
              <argon-button
                @click="$router.go(-1)"
                color="secondary"
                variant="gradient"
                class="mt-3"
                >Kembali</argon-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
export default {
  name: "InactiveHalaman",
  components: {
    ArgonButton,
  },
};
</script>
