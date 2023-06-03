function showSwal(type, text, toastText, id_kecamatan, status) {
  if (type === "success-message") {
    this.$swal({
      icon: "success",
      title: "Berhasil!",
      text: text,
      timer: 2500,
      type: type,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        this.$swal.hideLoading();
      },
    });
  } else if (type === "warning-message") {
    this.$swal({
      icon: "warning",
      title: "Peringatan!",
      text: text,
      timer: 2500,
      type: type,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        this.$swal.hideLoading();
      },
    });
  } else if (type === "failed-message") {
    this.$swal({
      icon: "error",
      title: "Gagal!",
      text: text,
      timer: 2500,
      type: type,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        this.$swal.hideLoading();
      },
    });
  } else if (type === "auto-close") {
    let timerInterval;
    this.$swal({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        this.$swal.showLoading();
        const b = this.$swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = this.$swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  } else if (type === "warning-confirmation") {
    this.$swal({
      title: "Apakah Anda yakin?",
      text: text,
      showCancelButton: true,
      confirmButtonText: "Ya!",
      cancelButtonText: "Batal!",
      customClass: {
        confirmButton: "btn bg-gradient-success",
        cancelButton: "btn bg-gradient-secondary",
      },
      buttonsStyling: false,
      didOpen: () => {
        this.$swal.hideLoading();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.$swal({
          toast: true,
          position: "top-end",
          title: toastText,
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === this.$swal.DismissReason.cancel
      ) {
        this.$swal.close();
      }
    });
  } else if (type === "loading") {
    this.$swal({
      title: "Memuat...",
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        this.$swal.isLoading();
      },
      didDestroy: () => {
        this.$swal.hideLoading();
      },
    });
  } else if (type === "close") {
    this.$swal.close();
  }
}

export default showSwal;
