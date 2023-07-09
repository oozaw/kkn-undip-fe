console.log(error);
let msg = "";
if (error.error && error.error != undefined) msg = error.error;
else msg = error;
this.showSwal("failed-message", "Terjadi kesalahan saat memuat data! " + msg);

console.log(error);
let msg = "";
if (error.error && error.error != undefined) msg = error.error;
else msg = error;
this.showSwal(
  "failed-message",
  "Terjadi kesalahan saat mengunggah data! " + msg
);

console.log(error);
let msg = "";
if (error.error && error.error != undefined) msg = error.error;
else msg = error;
this.showSwal("failed-message", "Data gagal ditambahkan! " + msg);

console.log(error);
let msg = "";
if (error.error && error.error != undefined) msg = error.error;
else msg = error;
this.showSwal("failed-message", "Data gagal disimpan! " + msg);

console.log(error);
let msg = "";
if (error.error && error.error != undefined) msg = error.error;
else msg = error;
this.showSwal("failed-message", "Data gagal dihapus! " + msg);

console.log(error);
let msg = "";
if (error.error && error.error != undefined) msg = error.error;
else msg = error;
this.showSwal("failed-message", "Data gagal diperbarui! " + msg);

console.log(error);
let msg = "";
if (error.error && error.error != undefined) msg = error.error;
else msg = error;
this.showSwal("failed-message", "Login gagal! " + msg);
