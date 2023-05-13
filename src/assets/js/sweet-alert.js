function showSwal(type, text) {
  if (type === "success-message") {
    this.$swal({
      icon: "success",
      title: "Berhasil!",
      text: text,
      timer: 2500,
      type: type,
      timerProgressBar: true,
      showConfirmButton: false,
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
  }
}

export default showSwal;
