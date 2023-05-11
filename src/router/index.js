import { createRouter, createWebHistory } from "vue-router";
import { certCookies } from "@/utils/cookies";

import Landing from "../views/dashboards/Landing.vue";
import Default from "../views/dashboards/Default.vue";
import Automotive from "../views/dashboards/Automotive.vue";
import SmartHome from "../views/dashboards/SmartHome.vue";
import VRDefault from "../views/dashboards/vr/VRDefault.vue";
import VRInfo from "../views/dashboards/vr/VRInfo.vue";
import CRM from "../views/dashboards/CRM.vue";
import Overview from "../views/pages/profile/Overview.vue";
import Teams from "../views/pages/profile/Teams.vue";
import Projects from "../views/pages/profile/Projects.vue";
import General from "../views/pages/projects/General.vue";
import Timeline from "../views/pages/projects/Timeline.vue";
import NewProject from "../views/pages/projects/NewProject.vue";
import Pricing from "../views/pages/Pricing.vue";
import RTL from "../views/pages/Rtl.vue";
import Charts from "../views/pages/Charts.vue";
import SweetAlerts from "../views/pages/SweetAlerts.vue";
import Notifications from "../views/pages/Notifications.vue";
import Kanban from "../views/applications/Kanban.vue";
import Wizard from "../views/applications/wizard/Wizard.vue";
import DataTables from "../views/applications/DataTables.vue";
import Calendar from "../views/applications/Calendar.vue";
import Analytics from "../views/applications/analytics/Analytics.vue";
import EcommerceOverview from "../views/ecommerce/overview/Overview.vue";
import NewProduct from "../views/ecommerce/products/NewProduct.vue";
import EditProduct from "../views/ecommerce/EditProduct.vue";
import ProductPage from "../views/ecommerce/ProductPage.vue";
import ProductsList from "../views/ecommerce/ProductsList.vue";
import OrderDetails from "../views/ecommerce/Orders/OrderDetails";
import OrderList from "../views/ecommerce/Orders/OrderList";
import Referral from "../views/ecommerce/Referral";
import Reports from "../views/pages/Users/Reports.vue";
import NewUser from "../views/pages/Users/NewUser.vue";
import Settings from "../views/pages/Account/Settings.vue";
import Billing from "../views/pages/Account/Billing.vue";
import Invoice from "../views/pages/Account/Invoice.vue";
import Security from "../views/pages/Account/Security.vue";
import Widgets from "../views/pages/Widgets.vue";
import Basic from "../views/auth/signin/Basic.vue";
import Cover from "../views/auth/signin/Cover.vue";
import Illustration from "../views/auth/signin/Illustration.vue";
import ResetBasic from "../views/auth/reset/Basic.vue";
import ResetCover from "../views/auth/reset/Cover.vue";
import ResetIllustration from "../views/auth/reset/Illustration.vue";
import VerificationBasic from "../views/auth/verification/Basic.vue";
import VerificationCover from "../views/auth/verification/Cover.vue";
import VerificationIllustration from "../views/auth/verification/Illustration.vue";
import SignupBasic from "../views/auth/signup/Basic.vue";
import SignupCover from "../views/auth/signup/Cover.vue";
import SignupIllustration from "../views/auth/signup/Illustration.vue";
import Error404 from "../views/auth/error/Error404.vue";
import Error500 from "../views/auth/error/Error500.vue";
import lockBasic from "../views/auth/lock/Basic.vue";
import lockCover from "../views/auth/lock/Cover.vue";
import lockIllustration from "../views/auth/lock/Illustration.vue";
//
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
import IndexAdministrator from "../views/admin/akun/administrator/Index.vue";
import AddAdministrator from "../views/admin/akun/administrator/Add.vue";
import IndexReviewer from "../views/admin/akun/reviewer/Index.vue";
import AddReviewer from "../views/admin/akun/reviewer/Add.vue";
import IndexPimpinan from "../views/admin/akun/pimpinan/Index.vue";
import AddPimpinan from "../views/admin/akun/pimpinan/Add.vue";
import EditProfile from "../views/pendaftaran/profile/Edit.vue";
import EditBerkasMhs from "../views/pendaftaran/berkas/Edit.vue";
import DaftarLokasi from "../views/pendaftaran/lokasi/Daftar.vue";
import IndexPostTest from "../views/test/Index.vue";
import IndexLRK from "../views/kegiatan/lrk/Index.vue";
import AddLRK from "../views/kegiatan/lrk/Add.vue";
import EditLRK from "../views/kegiatan/lrk/Edit.vue";
import IndexLPK from "../views/kegiatan/lpk/Index.vue";
import EditLPK from "../views/kegiatan/lpk/Edit.vue";
import IndexReportase from "../views/kegiatan/reportase/Index.vue";
import AddReportase from "../views/kegiatan/reportase/Add.vue";
import EditReportase from "../views/kegiatan/reportase/Edit.vue";
import IndexRegistrasi from "../views/pendaftaran/registrasi/Index.vue";
import AddRegistrasi from "../views/pendaftaran/registrasi/Add.vue";
import SeleksiMhs from "../views/seleksi/Index.vue";
import Presensi from "../views/kegiatan/presensi/Index.vue";
import IndexNilai from "../views/kegiatan/nilai/Index.vue";
import EditNilai from "../views/kegiatan/nilai/Edit.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
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
      requiresAuth: true,
    },
  },
  // Akun
  {
    path: "/akun/mahasiswa",
    name: "Mahasiswa",
    component: Mahasiswa,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/akun/mahasiswa/add",
    name: "Tambah Mahasiswa",
    component: AddMahasiswa,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/akun/mahasiswa/edit",
    name: "Edit Mahasiswa",
    component: EditMahasiswa,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/akun/dosen",
    name: "Dosen",
    component: IndexDosen,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/akun/dosen/add",
    name: "Tambah Dosen",
    component: AddDosen,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/akun/dosen/edit",
    name: "Edit Dosen",
    component: EditDosen,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/akun/bappeda",
    name: "Bappeda",
    component: IndexBappeda,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/akun/bappeda/add",
    name: "Tambah Bappeda",
    component: AddBappeda,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/akun/administrator",
    name: "Administrator",
    component: IndexAdministrator,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/akun/administrator/add",
    name: "Tambah Administrator",
    component: AddAdministrator,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/akun/reviewer",
    name: "Reviewer",
    component: IndexReviewer,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/akun/reviewer/add",
    name: "Tambah Reviewer",
    component: AddReviewer,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/akun/pimpinan",
    name: "Pimpinan",
    component: IndexPimpinan,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/akun/pimpinan/add",
    name: "Tambah Pimpinan",
    component: AddPimpinan,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pendaftaran/data-diri/edit",
    name: "Edit Data Diri",
    component: EditProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pendaftaran/berkas/edit",
    name: "Edit Data Berkas",
    component: EditBerkasMhs,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pendaftaran/lokasi/daftar",
    name: "Daftar Lokasi",
    component: DaftarLokasi,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/post-test",
    name: "Post Test",
    component: IndexPostTest,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/kegiatan/lrk",
    name: "LRK",
    component: IndexLRK,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/kegiatan/lrk/add",
    name: "Tambah LRK",
    component: AddLRK,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/kegiatan/lrk/edit",
    name: "Edit LRK",
    component: EditLRK,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/kegiatan/lpk",
    name: "LPK",
    component: IndexLPK,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/kegiatan/lpk/edit",
    name: "Edit LPK",
    component: EditLPK,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/kegiatan/reportase",
    name: "Reportase",
    component: IndexReportase,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/kegiatan/reportase/add",
    name: "Tambah Reportase",
    component: AddReportase,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/kegiatan/reportase/edit",
    name: "Edit Reportase",
    component: EditReportase,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pendaftaran/registrasi",
    name: "Registrasi",
    component: IndexRegistrasi,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pendaftaran/registrasi/add",
    name: "Tambah Registrasi",
    component: AddRegistrasi,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/seleksi-mhs",
    name: "Seleksi",
    component: SeleksiMhs,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/kegiatan/presensi",
    name: "Presensi",
    component: Presensi,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/kegiatan/nilai",
    name: "Nilai Akhir",
    component: IndexNilai,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/kegiatan/nilai/edit",
    name: "Edit Nilai Akhir",
    component: EditNilai,
  },

  // =================================================================================================
  {
    path: "/dashboards/dashboard-default",
    name: "Default",
    component: Default,
  },
  {
    path: "/dashboards/landing",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/dashboards/automotive",
    name: "Automotive",
    component: Automotive,
  },
  {
    path: "/dashboards/smart-home",
    name: "Smart Home",
    component: SmartHome,
  },
  {
    path: "/dashboards/vr/vr-default",
    name: "VR Default",
    component: VRDefault,
  },
  {
    path: "/dashboards/vr/vr-info",
    name: "VR Info",
    component: VRInfo,
  },
  {
    path: "/dashboards/crm",
    name: "CRM",
    component: CRM,
  },
  {
    path: "/pages/profile/overview",
    name: "Profile Overview",
    component: Overview,
  },
  {
    path: "/pages/profile/teams",
    name: "Teams",
    component: Teams,
  },
  {
    path: "/pages/profile/projects",
    name: "All Projects",
    component: Projects,
  },
  {
    path: "/pages/projects/general",
    name: "General",
    component: General,
  },
  {
    path: "/pages/projects/timeline",
    name: "Timeline",
    component: Timeline,
  },
  {
    path: "/pages/projects/new-project",
    name: "New Project",
    component: NewProject,
  },
  {
    path: "/pages/pricing-page",
    name: "Pricing Page",
    component: Pricing,
  },
  {
    path: "/pages/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/pages/charts",
    name: "Charts",
    component: Charts,
  },
  {
    path: "/pages/widgets",
    name: "Widgets",
    component: Widgets,
  },
  {
    path: "/pages/sweet-alerts",
    name: "Sweet Alerts",
    component: SweetAlerts,
  },
  {
    path: "/pages/notifications",
    name: "Notifications",
    component: Notifications,
  },
  {
    path: "/applications/kanban",
    name: "Kanban",
    component: Kanban,
  },
  {
    path: "/applications/wizard",
    name: "Wizard",
    component: Wizard,
  },
  {
    path: "/applications/data-tables",
    name: "Data Tables",
    component: DataTables,
  },
  {
    path: "/applications/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/applications/analytics",
    name: "Analytics",
    component: Analytics,
  },
  {
    path: "/ecommerce/overview",
    name: "Overview",
    component: EcommerceOverview,
  },
  {
    path: "/ecommerce/products/new-product",
    name: "New Product",
    component: NewProduct,
  },
  {
    path: "/ecommerce/products/edit-product",
    name: "Edit Product",
    component: EditProduct,
  },
  {
    path: "/ecommerce/products/product-page",
    name: "Product Page",
    component: ProductPage,
  },
  {
    path: "/ecommerce/products/products-list",
    name: "Products List",
    component: ProductsList,
  },
  {
    path: "/ecommerce/Orders/order-details",
    name: "Order Details",
    component: OrderDetails,
  },
  {
    path: "/ecommerce/Orders/order-list",
    name: "Order List",
    component: OrderList,
  },
  {
    path: "/ecommerce/referral",
    name: "Referral",
    component: Referral,
  },
  {
    path: "/pages/users/reports",
    name: "Reports",
    component: Reports,
  },
  {
    path: "/pages/users/new-user",
    name: "New User",
    component: NewUser,
  },
  {
    path: "/pages/account/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/pages/account/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/pages/account/invoice",
    name: "Invoice",
    component: Invoice,
  },
  {
    path: "/pages/account/Security",
    name: "Security",
    component: Security,
  },
  {
    path: "/authentication/signin/basic",
    name: "Signin Basic",
    component: Basic,
  },
  {
    path: "/authentication/signin/cover",
    name: "Signin Cover",
    component: Cover,
  },
  {
    path: "/authentication/signin/illustration",
    name: "Signin Illustration",
    component: Illustration,
  },
  {
    path: "/authentication/reset/basic",
    name: "Reset Basic",
    component: ResetBasic,
  },
  {
    path: "/authentication/reset/cover",
    name: "Reset Cover",
    component: ResetCover,
  },
  {
    path: "/authentication/reset/illustration",
    name: "Reset Illustration",
    component: ResetIllustration,
  },
  {
    path: "/authentication/lock/basic",
    name: "Lock Basic",
    component: lockBasic,
  },
  {
    path: "/authentication/lock/cover",
    name: "Lock Cover",
    component: lockCover,
  },
  {
    path: "/authentication/lock/illustration",
    name: "Lock Illustration",
    component: lockIllustration,
  },
  {
    path: "/authentication/verification/basic",
    name: "Verification Basic",
    component: VerificationBasic,
  },
  {
    path: "/authentication/verification/cover",
    name: "Verification Cover",
    component: VerificationCover,
  },
  {
    path: "/authentication/verification/illustration",
    name: "Verification Illustration",
    component: VerificationIllustration,
  },
  {
    path: "/authentication/signup/basic",
    name: "Signup Basic",
    component: SignupBasic,
  },
  {
    path: "/authentication/signup/cover",
    name: "Signup Cover",
    component: SignupCover,
  },
  {
    path: "/authentication/signup/illustration",
    name: "Signup Illustration",
    component: SignupIllustration,
  },
  {
    path: "/authentication/error/error404",
    name: "Error Error404",
    component: Error404,
  },
  {
    path: "/authentication/error/error500",
    name: "Error Error500",
    component: Error500,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const { id } = certCookies();
  if (to.meta.requiresAuth && !id) {
    next({ name: "Login", query: { redirect: to.fullPath } });
    console.log("ini redirect");
  } else if (to.meta.guest && id) {
    next({ name: "Dashboard" });
    console.log("ini ke dashboard");
  } else {
    next();
    console.log("ini langsung");
  }
});

export default router;
