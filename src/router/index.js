import { createRouter, createWebHistory } from "vue-router";
import { certCookies } from "@/utils/cookies";
import { Role } from "@/utils/role";

import Dashboard from "../views/dashboards/Dashboard.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Reset from "../views/auth/Reset.vue";
import Mahasiswa from "../views/admin/akun/mahasiswa/Index.vue";
import AddMahasiswa from "../views/admin/akun/mahasiswa/Add.vue";
import EditMahasiswa from "../views/admin/akun/mahasiswa/Edit.vue";
import IndexDosen from "../views/admin/akun/dosen/Index.vue";
import AddDosen from "../views/admin/akun/dosen/Add.vue";
import EditDosen from "../views/admin/akun/dosen/Edit.vue";
import IndexBappeda from "../views/admin/akun/bappeda/Index.vue";
import AddBappeda from "../views/admin/akun/bappeda/Add.vue";
import EditBappeda from "../views/admin/akun/bappeda/Edit.vue";
import IndexAdministrator from "../views/admin/akun/administrator/Index.vue";
import AddAdministrator from "../views/admin/akun/administrator/Add.vue";
import IndexReviewer from "../views/admin/akun/reviewer/Index.vue";
import AddReviewer from "../views/admin/akun/reviewer/Add.vue";
import IndexPimpinan from "../views/admin/akun/pimpinan/Index.vue";
import AddPimpinan from "../views/admin/akun/pimpinan/Add.vue";
import EditProfile from "../views/pendaftaran/profile/Edit.vue";
import EditBerkasMhs from "../views/pendaftaran/berkas/Edit.vue";
import IndexGelombangMhs from "../views/pendaftaran/lokasi/gelombang/Index.vue";
import IndexLokasiMhs from "../views/pendaftaran/lokasi/Index.vue";
import DaftarLokasi from "../views/pendaftaran/lokasi/Daftar.vue";
import IndexPostTest from "../views/test/Index.vue";
import IndexLRK from "../views/kegiatan/lrk/Index.vue";
import AddLRK from "../views/kegiatan/lrk/Add.vue";
import EditLRK from "../views/kegiatan/lrk/Edit.vue";
import EvaluateLRK from "../views/kegiatan/lrk/Evaluate.vue";
import IndexLPK from "../views/kegiatan/lpk/Index.vue";
import EditLPK from "../views/kegiatan/lpk/Edit.vue";
import EvaluateLPK from "../views/kegiatan/lpk/Evaluate.vue";
import IndexReportase from "../views/kegiatan/reportase/Index.vue";
import DetailReportase from "../views/kegiatan/reportase/Detail.vue";
import AddReportase from "../views/kegiatan/reportase/Add.vue";
import EditReportase from "../views/kegiatan/reportase/Edit.vue";
import EvaluateReportase from "../views/kegiatan/reportase/Evaluate.vue";
import IndexRegistrasi from "../views/pendaftaran/registrasi/Index.vue";
import AddRegistrasi from "../views/pendaftaran/registrasi/Add.vue";
import SeleksiMhs from "../views/seleksi/Index.vue";
import Presensi from "../views/kegiatan/presensi/Index.vue";
import PresensiQR from "../views/kegiatan/presensi/qr/Index.vue";
import IndexNilai from "../views/kegiatan/nilai/Index.vue";
import EditNilai from "../views/kegiatan/nilai/Edit.vue";
// import EditProfilWilayah from "../views/profile-wilayah/Edit.vue";
import IndexKeikutsertaanWilayah from "../views/keikutsertaan-wilayah/Index.vue";
import IndexPengajuanLokasi from "../views/pengajuan-lokasi/Index.vue";
import AddKecamatan from "../views/pengajuan-lokasi/kecamatan/Add.vue";
import EditKecamatan from "../views/pengajuan-lokasi/kecamatan/Edit.vue";
import DetailKecamatan from "../views/pengajuan-lokasi/kecamatan/Detail.vue";
import AddDesa from "../views/pengajuan-lokasi/desa/Add.vue";
import EditDesa from "../views/pengajuan-lokasi/desa/Edit.vue";
import IndexTemaKKN from "../views/admin/menu-utama/tema/Index.vue";
import DetailTemaKKN from "../views/admin/menu-utama/tema/Detail.vue";
import TambahTemaKKN from "../views/admin/menu-utama/tema/Add.vue";
import EditTemaKKN from "../views/admin/menu-utama/tema/Edit.vue";
import IndexGelombang from "../views/admin/menu-utama/gelombang/Index.vue";
import EditGelombang from "../views/admin/menu-utama/gelombang/Edit.vue";
import IndexPengajuanWilayah from "../views/admin/menu-utama/pengajuan-wilayah/Index.vue";
import IndexKalender from "../views/admin/menu-utama/kalender/Index.vue";
import TambahKalender from "../views/admin/menu-utama/kalender/Add.vue";
import EditKalender from "../views/admin/menu-utama/kalender/Edt.vue";
import IndexPengumuman from "../views/admin/menu-utama/pengumuman/Index.vue";
import TambahPengumuman from "../views/admin/menu-utama/pengumuman/Add.vue";
import EditPengumuman from "../views/admin/menu-utama/pengumuman/Edt.vue";
import IndexKelolaHalaman from "../views/admin/menu-utama/halaman/Index.vue";
import EditHalaman from "../views/admin/menu-utama/halaman/Edit.vue";
import IndexPendaftaranMhsAdmin from "../views/admin/kelola-mhs/pendaftaran/Index.vue";
import IndexNilaiPostTestMhsAdmin from "../views/admin/kelola-mhs/post-test/Index.vue";
import IndexPresensiMhs from "../views/admin/kelola-mhs/presensi/Index.vue";
import AddPresensiMhs from "../views/admin/kelola-mhs/presensi/Add.vue";
import IndexLRKLPKMhsAdmin from "../views/admin/kelola-mhs/lrk-lpk/Index.vue";
import IndexReportaseMhsAdmin from "../views/admin/kelola-mhs/reportase/Index.vue";
import IndexPendaftaranDosenAdmin from "../views/admin/kelola-dosen/pendaftaran-lokasi/Index.vue";
import DetailPendaftaranDosenAdmin from "../views/admin/kelola-dosen/pendaftaran-lokasi/Detail.vue";
import EditEvaluasiProposalDosen from "../views/admin/kelola-dosen/pendaftaran-lokasi/Edit.vue";
import IndexPemilihanMhsAdmin from "../views/admin/kelola-dosen/pemilihan-mhs/Index.vue";
import IndexPresensiDosenAdmin from "../views/admin/kelola-dosen/presensi/Index.vue";
import IndexNilaiAkhirMhsAdmin from "../views/admin/kelola-dosen/nilai-akhir-mhs/Index.vue";
import IndexKorwil from "../views/admin/korwil/Index.vue";
import IndexExport from "../views/export/Index.vue";
import IndexJadwalPresensi from "../views/admin/menu-utama/jadwal-presensi/Index.vue";
import IndexBerita from "../views/berita/Index.vue";
import AddBerita from "../views/berita/Add.vue";
import EditBerita from "../views/berita/Edit.vue";
import DetailBerita from "../views/berita/Detail.vue";
import IndexLandingProfile from "../views/profile/Index.vue";
import EditLandingProfile from "../views/profile/Edit.vue";
import IndexStruktur from "../views/struktur/Index.vue";

// Landing Page
import IndexLanding from "../views/landing/Index.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/login",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard/:error?",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: [],
    },
  },
  {
    path: "/login/:error?",
    name: "Login",
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      guest: true,
    },
  },
  {
    path: "/reset",
    name: "Reset",
    component: Reset,
    meta: {
      guest: true,
    },
  },
  // Akun
  {
    path: "/akun/mahasiswa",
    name: "Mahasiswa",
    component: Mahasiswa,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/akun/mahasiswa/add",
    name: "Tambah Mahasiswa",
    component: AddMahasiswa,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/akun/mahasiswa/edit/:id_mahasiswa",
    name: "Edit Mahasiswa",
    component: EditMahasiswa,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/akun/dosen",
    name: "Dosen",
    component: IndexDosen,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/akun/dosen/add",
    name: "Tambah Dosen",
    component: AddDosen,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/akun/dosen/edit/:id_dosen",
    name: "Edit Dosen",
    component: EditDosen,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/akun/bappeda",
    name: "Bappeda",
    component: IndexBappeda,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/akun/bappeda/add",
    name: "Tambah Bappeda",
    component: AddBappeda,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/akun/bappeda/edit/:id_bappeda",
    name: "Edit Bappeda",
    component: EditBappeda,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/akun/administrator",
    name: "Administrator",
    component: IndexAdministrator,
    meta: {
      requiresAuth: [Role.superadmin],
    },
  },
  {
    path: "/akun/administrator/add",
    name: "Tambah Administrator",
    component: AddAdministrator,
    meta: {
      requiresAuth: [Role.superadmin],
    },
  },
  {
    path: "/akun/reviewer",
    name: "Reviewer",
    component: IndexReviewer,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/akun/reviewer/add",
    name: "Tambah Reviewer",
    component: AddReviewer,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/akun/pimpinan",
    name: "Pimpinan",
    component: IndexPimpinan,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/akun/pimpinan/add",
    name: "Tambah Pimpinan",
    component: AddPimpinan,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/korwil",
    name: "Koordinator Wilayah",
    component: IndexKorwil,
    meta: {
      requiresAuth: [Role.admin, Role.bappeda, Role.pimpinan],
    },
  },
  {
    path: "/pendaftaran/data-diri/edit",
    name: "Edit Data Diri",
    component: EditProfile,
    meta: {
      requiresAuth: [Role.mahasiswa, Role.dosen, Role.reviewer, Role.pimpinan],
    },
  },
  {
    path: "/pendaftaran/berkas/edit",
    name: "Edit Data Berkas",
    component: EditBerkasMhs,
    meta: {
      requiresAuth: [Role.mahasiswa],
    },
  },
  {
    path: "/pendaftaran/lokasi/gelombang",
    name: "Index Gelombang Daftar Lokasi",
    component: IndexGelombangMhs,
    meta: {
      requiresAuth: [Role.mahasiswa],
    },
  },
  {
    path: "/pendaftaran/lokasi",
    name: "Index Lokasi",
    component: IndexLokasiMhs,
    meta: {
      requiresAuth: [Role.mahasiswa],
    },
  },
  {
    path: "/pendaftaran/lokasi/daftar/:id_tema/:id_gelombang",
    name: "Daftar Lokasi",
    component: DaftarLokasi,
    meta: {
      requiresAuth: [Role.mahasiswa],
    },
  },
  {
    path: "/post-test",
    name: "Post Test",
    component: IndexPostTest,
    meta: {
      requiresAuth: [Role.mahasiswa],
    },
  },
  {
    path: "/kegiatan/lrk",
    name: "LRK",
    component: IndexLRK,
    meta: {
      requiresAuth: [Role.mahasiswa, Role.dosen],
    },
  },
  {
    path: "/kegiatan/lrk/add/:id_tema",
    name: "Tambah LRK",
    component: AddLRK,
    meta: {
      requiresAuth: [Role.mahasiswa],
    },
  },
  {
    path: "/kegiatan/lrk/edit/:id_laporan",
    name: "Edit LRK",
    component: EditLRK,
    meta: {
      requiresAuth: [Role.mahasiswa],
    },
  },
  {
    path: "/kegiatan/lrk/evaluate/:id_laporan",
    name: "Evaluate LRK",
    component: EvaluateLRK,
    meta: {
      requiresAuth: [Role.dosen],
    },
  },
  {
    path: "/kegiatan/lpk",
    name: "LPK",
    component: IndexLPK,
    meta: {
      requiresAuth: [Role.mahasiswa, Role.dosen],
    },
  },
  {
    path: "/kegiatan/lpk/edit/:id_laporan",
    name: "Edit LPK",
    component: EditLPK,
    meta: {
      requiresAuth: [Role.mahasiswa],
    },
  },
  {
    path: "/kegiatan/lpk/evaluate/:id_laporan",
    name: "Evaluate LPK",
    component: EvaluateLPK,
    meta: {
      requiresAuth: [Role.dosen],
    },
  },
  {
    path: "/kegiatan/reportase",
    name: "Reportase",
    component: IndexReportase,
    meta: {
      requiresAuth: [Role.mahasiswa, Role.dosen],
    },
  },
  {
    path: "/kegiatan/reportase/:id_reportase",
    name: "Detail Reportase",
    component: DetailReportase,
    meta: {
      requiresAuth: [Role.mahasiswa, Role.dosen],
    },
  },
  {
    path: "/kegiatan/reportase/add",
    name: "Tambah Reportase",
    component: AddReportase,
    meta: {
      requiresAuth: [Role.mahasiswa],
    },
  },
  {
    path: "/kegiatan/reportase/edit/:id_reportase",
    name: "Edit Reportase",
    component: EditReportase,
    meta: {
      requiresAuth: [Role.mahasiswa],
    },
  },
  {
    path: "/kegiatan/reportase/evaluasi/:id_reportase",
    name: "Evaluasi Reportase",
    component: EvaluateReportase,
    meta: {
      requiresAuth: [Role.dosen],
    },
  },
  {
    path: "/pendaftaran/registrasi",
    name: "Registrasi",
    component: IndexRegistrasi,
    meta: {
      requiresAuth: [Role.dosen],
    },
  },
  {
    path: "/pendaftaran/registrasi/add/:id_tema/:id_gelombang",
    name: "Tambah Registrasi",
    component: AddRegistrasi,
    meta: {
      requiresAuth: [Role.dosen],
    },
  },
  {
    path: "/seleksi-mhs",
    name: "Seleksi",
    component: SeleksiMhs,
    meta: {
      requiresAuth: [Role.dosen],
    },
  },
  {
    path: "/kegiatan/presensi",
    name: "Presensi",
    component: Presensi,
    meta: {
      requiresAuth: [Role.mahasiswa, Role.dosen],
    },
  },
  {
    path: "/kegiatan/presensi/qr/:tgl",
    name: "Presensi QR",
    component: PresensiQR,
    meta: {
      requiresAuth: [Role.mahasiswa],
    },
  },
  {
    path: "/kegiatan/presensi-mhs",
    name: "Review Presensi Mahasiswa",
    component: IndexPresensiMhs,
    meta: {
      requiresAuth: [Role.dosen],
    },
  },
  {
    path: "/kegiatan/presensi-mhs/add/:id_kecamatan",
    name: "Tambah Presensi Mahasiswa",
    component: AddPresensiMhs,
    meta: {
      requiresAuth: [Role.dosen],
    },
  },
  {
    path: "/kegiatan/nilai",
    name: "Nilai Akhir",
    component: IndexNilai,
    meta: {
      requiresAuth: [Role.dosen],
    },
  },
  {
    path: "/kegiatan/nilai/edit/:id_nilai",
    name: "Edit Nilai Akhir",
    component: EditNilai,
    meta: {
      requiresAuth: [Role.dosen],
    },
  },
  {
    path: "/profil-wilayah/edit",
    name: "Profil Wilayah",
    component: EditProfile,
    meta: {
      requiresAuth: [Role.bappeda],
    },
  },
  {
    path: "/keikutsertaan-wilayah",
    name: "Keikutsertaan Wilayah",
    component: IndexKeikutsertaanWilayah,
    meta: {
      requiresAuth: [Role.bappeda],
    },
  },
  {
    path: "/pengajuan-lokasi",
    name: "Pengajuan Lokasi",
    props: true,
    component: IndexPengajuanLokasi,
    meta: {
      requiresAuth: [Role.bappeda],
    },
  },
  {
    path: "/pengajuan-lokasi/kecamatan/add",
    name: "Tambah Kecamatan",
    component: AddKecamatan,
    meta: {
      requiresAuth: [Role.bappeda],
    },
  },
  {
    path: "/pengajuan-lokasi/kecamatan/edit/:id_kecamatan",
    name: "Edit Kecamatan",
    component: EditKecamatan,
    meta: {
      requiresAuth: [Role.bappeda],
    },
  },
  {
    path: "/pengajuan-lokasi/kecamatan/detail/:id_kecamatan",
    name: "Detail Kecamatan",
    component: DetailKecamatan,
    meta: {
      requiresAuth: [Role.bappeda, Role.admin],
    },
  },
  {
    path: "/pengajuan-lokasi/desa/add",
    name: "Tambah Desa",
    component: AddDesa,
    meta: {
      requiresAuth: [Role.bappeda],
    },
  },
  {
    path: "/pengajuan-lokasi/desa/edit/:id_desa",
    name: "Edit Desa",
    component: EditDesa,
    meta: {
      requiresAuth: [Role.bappeda],
    },
  },
  {
    path: "/admin/tema",
    name: "Tema KKN",
    component: IndexTemaKKN,
    meta: {
      requiresAuth: [Role.admin, Role.pimpinan],
    },
  },
  {
    path: "/admin/tema/detail/:id_tema",
    name: "Detail Tema KKN",
    component: DetailTemaKKN,
    meta: {
      requiresAuth: [Role.admin, Role.pimpinan],
    },
  },
  {
    path: "/admin/tema/tambah",
    name: "Tambah Tema KKN",
    component: TambahTemaKKN,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/admin/tema/edit/:id_tema",
    name: "Edit Tema KKN",
    component: EditTemaKKN,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/admin/gelombang",
    name: "Gelombang",
    component: IndexGelombang,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/admin/gelombang/edit/:id_tema/:id_gelombang",
    name: "Edit Gelombang",
    component: EditGelombang,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/admin/pengajuan-wilayah",
    name: "Pengajuan Wilayah",
    component: IndexPengajuanWilayah,
    meta: {
      requiresAuth: [Role.admin, Role.pimpinan],
    },
  },
  {
    path: "/admin/presensi",
    name: "Jadwal Presensi",
    component: IndexJadwalPresensi,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/admin/kalender",
    name: "Kalender",
    component: IndexKalender,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/admin/kalender/tambah",
    name: "Tambah Kalender",
    component: TambahKalender,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/admin/kalender/edit/:id_event",
    name: "Edit Kalender",
    component: EditKalender,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/admin/pengumuman",
    name: "Pengumuman",
    component: IndexPengumuman,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/admin/pengumuman/tambah",
    name: "Tambah Pengumuman",
    component: TambahPengumuman,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/admin/pengumuman/edit/:id_pengumuman",
    name: "Edit Pengumuman",
    component: EditPengumuman,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/admin/halaman",
    name: "Halaman",
    component: IndexKelolaHalaman,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/admin/halaman/edit/:id_tema_halaman",
    name: "Edit Halaman",
    component: EditHalaman,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  // Kelola Mahasiswa
  {
    path: "/mahasiswa/pendaftaran",
    name: "Pendaftaran Mahasiswa Admin",
    component: IndexPendaftaranMhsAdmin,
    meta: {
      requiresAuth: [Role.admin, Role.pimpinan],
    },
  },
  {
    path: "/mahasiswa/post-test",
    name: "Nilai Post Test Mahasiswa Admin",
    component: IndexNilaiPostTestMhsAdmin,
    meta: {
      requiresAuth: [Role.admin, Role.pimpinan],
    },
  },
  {
    path: "/mahasiswa/presensi",
    name: "Presensi Mahasiswa Admin",
    component: IndexPresensiMhs,
    meta: {
      requiresAuth: [Role.admin, Role.pimpinan],
    },
  },
  {
    path: "/mahasiswa/presensi/add/:id_kecamatan",
    name: "Tambah Presensi Mahasiswa Admin",
    component: AddPresensiMhs,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/mahasiswa/lrk-lpk",
    name: "LRK & LPK Mahasiswa Admin",
    component: IndexLRKLPKMhsAdmin,
    meta: {
      requiresAuth: [Role.admin, Role.pimpinan],
    },
  },
  {
    path: "/mahasiswa/reportase",
    name: "Reportase Mahasiswa Admin",
    component: IndexReportaseMhsAdmin,
    meta: {
      requiresAuth: [Role.admin, Role.pimpinan],
    },
  },
  {
    path: "/mahasiswa/reportase/detail/:id_reportase",
    name: "Detail Reportase Mahasiswa Admin",
    component: DetailReportase,
    meta: {
      requiresAuth: [Role.admin, Role.pimpinan],
    },
  },
  // Kelola Dosen
  {
    path: "/dosen/pendaftaran",
    name: "Pendaftaran Dosen Admin",
    component: IndexPendaftaranDosenAdmin,
    meta: {
      requiresAuth: [Role.admin, Role.reviewer, Role.pimpinan],
    },
  },
  {
    path: "/dosen/pendaftaran/:id_proposal",
    name: "Detail Pendaftaran Dosen Admin",
    component: DetailPendaftaranDosenAdmin,
    meta: {
      requiresAuth: [Role.admin, Role.reviewer, Role.dosen],
    },
  },
  {
    path: "/dosen/pendaftaran/evaluasi/:id_proposal",
    name: "Evaluasi Proposal",
    component: EditEvaluasiProposalDosen,
    meta: {
      requiresAuth: [Role.admin, Role.reviewer],
    },
  },
  {
    path: "/dosen/pemilihan-mhs",
    name: "Seleksi Mahasiswa",
    component: IndexPemilihanMhsAdmin,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/dosen/presensi",
    name: "Presensi Dosen Admin",
    component: IndexPresensiDosenAdmin,
    meta: {
      requiresAuth: [Role.admin, Role.pimpinan],
    },
  },
  {
    path: "/dosen/nilai-akhir",
    name: "Nilai Akhir Mahasiswa Admin",
    component: IndexNilaiAkhirMhsAdmin,
    meta: {
      requiresAuth: [Role.admin, Role.pimpinan],
    },
  },

  // Landing page
  {
    path: "/landing/profile",
    name: "Landing Profile",
    component: IndexLandingProfile,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/landing/profile/edit",
    name: "Edit Landing Profile",
    component: EditLandingProfile,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/landing/berita",
    name: "Landing Berita",
    component: IndexBerita,
    meta: {
      requiresAuth: [Role.admin, Role.dosen, Role.reviewer, Role.pimpinan],
    },
  },
  {
    path: "/landing/berita/:id_berita",
    name: "Landing Detail Berita",
    component: DetailBerita,
    meta: {
      requiresAuth: [Role.admin, Role.dosen, Role.reviewer, Role.pimpinan],
    },
  },
  {
    path: "/landing/berita/add",
    name: "Landing Tambah Berita",
    component: AddBerita,
    meta: {
      requiresAuth: [Role.admin, Role.dosen, Role.reviewer, Role.pimpinan],
    },
  },
  {
    path: "/landing/berita/edit/:id_berita",
    name: "Landing Edit Berita",
    component: EditBerita,
    meta: {
      requiresAuth: [Role.admin, Role.dosen, Role.reviewer, Role.pimpinan],
    },
  },
  {
    path: "/landing/struktur",
    name: "Struktur Organisasi",
    component: IndexStruktur,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/landing/galeri",
    name: "Landing Galeri",
    component: IndexPresensiDosenAdmin,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/landing/reportase",
    name: "Landing Reportase",
    component: IndexPresensiDosenAdmin,
    meta: {
      requiresAuth: [Role.admin],
    },
  },
  {
    path: "/home",
    name: "Home",
    component: IndexLanding,
    meta: {
      guest: true,
    },
  },

  // Export
  {
    path: "/export",
    name: "Export",
    component: IndexExport,
    meta: {
      requiresAuth: [Role.admin, Role.dosen, Role.pimpinan],
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const { role } = certCookies();
  const { requiresAuth, guest } = to.meta;
  // console.log(requiresAuth.length, role);

  if (requiresAuth) {
    if (!role) {
      // not logged in so redirect to login page with the return url
      return next({
        name: "Login",
        params: { error: "unauthenticated" },
        query: { redirect: to.fullPath },
      });
    }

    // check if route is restricted by role
    if (requiresAuth.length && !requiresAuth.includes(role)) {
      // role not authorised so redirect to home page
      return next({ name: "Dashboard", params: { error: "unauthorized" } });
    }
  } else if (guest && role) {
    return next({ name: "Dashboard" });
  }

  next();

  // if (to.meta.requiresAuth && !id) {
  //   next({ name: "Login", query: { redirect: to.fullPath } });
  //   // console.log("ini redirect");
  // } else if (to.meta.guest && id) {
  //   next({ name: "Dashboard" });
  //   // console.log("ini ke dashboard");
  // } else {
  //   next();
  //   // console.log("ini langsung");
  // }
});

export default router;
