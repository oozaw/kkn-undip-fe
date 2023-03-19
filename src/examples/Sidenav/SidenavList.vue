<template>
  <div
    id="sidenav-collapse-main"
    class="collapse navbar-collapse w-auto h-auto h-100"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="dashboardsExamples"
          nav-text="Dashboards"
          :class="getRoute() === 'dashboards' ? 'active' : ''"
        >
          <template #icon>
            <i class="ni ni-shop text-primary text-sm opacity-10"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <!-- nav links -->
              <sidenav-item
                :to="{ name: 'Landing' }"
                mini-icon="L"
                text="Landing"
              />
              <sidenav-item
                :to="{ name: 'Default' }"
                mini-icon="D"
                text="Default"
              />
              <sidenav-item
                :to="{ name: 'Automotive' }"
                mini-icon="A"
                text="Automotive"
              />
              <sidenav-item
                :to="{ name: 'Smart Home' }"
                mini-icon="S"
                text="Smart Home"
              />
              <sidenav-collapse-item
                refer="vrExamples"
                mini-icon="V"
                text="Virtual Reality"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'VR Default' }"
                    mini-icon="V"
                    text="VR Default"
                  />
                  <sidenav-item
                    :to="{ name: 'VR Info' }"
                    mini-icon="V"
                    text="VR Info"
                  />
                </template>
              </sidenav-collapse-item>
              <sidenav-item :to="{ name: 'CRM' }" mini-icon="C" text="CRM" />
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          PAGES
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="pagesExamples"
          nav-text="Pages"
          :class="getRoute() === 'pages' ? 'active' : ''"
        >
          <template #icon>
            <i class="ni ni-ungroup text-warning text-sm opacity-10"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <!-- nav links -->
              <sidenav-collapse-item
                refer="profileExample"
                mini-icon="P"
                text="Profile"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Profile Overview' }"
                    mini-icon="P"
                    text="Profile Overview"
                  />
                  <sidenav-item
                    :to="{ name: 'Teams' }"
                    mini-icon="T"
                    text="Teams"
                  />
                  <sidenav-item
                    :to="{ name: 'All Projects' }"
                    mini-icon="A"
                    text="All Projects"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="usersExample"
                mini-icon="U"
                text="Users"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Reports' }"
                    mini-icon="R"
                    text="Reports"
                  />
                  <sidenav-item
                    :to="{ name: 'New User' }"
                    mini-icon="N"
                    text="New User"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="accountExample"
                mini-icon="A"
                text="Account"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Settings' }"
                    mini-icon="S"
                    text="Settings"
                  />
                  <sidenav-item
                    :to="{ name: 'Billing' }"
                    mini-icon="B"
                    text="Billing"
                  />
                  <sidenav-item
                    :to="{ name: 'Invoice' }"
                    mini-icon="I"
                    text="Invoice"
                  />
                  <sidenav-item
                    :to="{ name: 'Security' }"
                    mini-icon="S"
                    text="Security"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="projectsExample"
                mini-icon="P"
                text="Projects"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'General' }"
                    mini-icon="G"
                    text="General"
                  />
                  <sidenav-item
                    :to="{ name: 'Timeline' }"
                    mini-icon="T"
                    text="Timeline"
                  />
                  <sidenav-item
                    :to="{ name: 'New Project' }"
                    mini-icon="N"
                    text="New Project"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-item
                :to="{ name: 'Pricing Page' }"
                mini-icon="P"
                text="Pricing Page"
              />
              <sidenav-item :to="{ name: 'RTL' }" mini-icon="R" text="RTL" />
              <sidenav-item
                :to="{ name: 'Widgets' }"
                mini-icon="W"
                text="Widgets"
              />
              <sidenav-item
                :to="{ name: 'Charts' }"
                mini-icon="C"
                text="Charts"
              />
              <sidenav-item
                :to="{ name: 'Sweet Alerts' }"
                mini-icon="S"
                text="Sweet Alerts"
              />
              <sidenav-item
                :to="{ name: 'Notifications' }"
                mini-icon="N"
                text="Notifications"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="applicationsExamples"
          nav-text="Applications"
          :class="getRoute() === 'applications' ? 'active' : ''"
        >
          <template #icon>
            <i class="ni ni-ui-04 text-info text-sm opacity-10"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <!-- nav links -->

              <sidenav-item
                :to="{ name: 'Kanban' }"
                mini-icon="K"
                text="Kanban"
              />
              <sidenav-item
                :to="{ name: 'Wizard' }"
                mini-icon="W"
                text="Wizard"
              />
              <sidenav-item
                :to="{ name: 'Data Tables' }"
                mini-icon="D"
                text="Data Tables"
              />
              <sidenav-item
                :to="{ name: 'Calendar' }"
                mini-icon="C"
                text="Calendar"
              />
              <sidenav-item
                :to="{ name: 'Analytics' }"
                mini-icon="A"
                text="Analytics"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="ecommerceExamples"
          nav-text="Ecommerce"
          :class="getRoute() === 'ecommerce' ? 'active' : ''"
        >
          <template #icon>
            <i class="ni ni-archive-2 text-success text-sm opacity-10"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <!-- nav links -->
              <sidenav-item
                :to="{ name: 'Overview' }"
                mini-icon="O"
                text="Overview"
              />

              <sidenav-collapse-item
                refer="productsExample"
                mini-icon="P"
                text="Products"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'New Product' }"
                    mini-icon="N"
                    text="New Product"
                  />
                  <sidenav-item
                    :to="{ name: 'Edit Product' }"
                    mini-icon="E"
                    text="Edit Product"
                  />
                  <sidenav-item
                    :to="{ name: 'Product Page' }"
                    mini-icon="P"
                    text="Product page"
                  />
                  <sidenav-item
                    :to="{ name: 'Products List' }"
                    mini-icon="P"
                    text="Products List"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="ordersExample"
                mini-icon="O"
                text="Orders"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Order List' }"
                    mini-icon="O"
                    text="Order List"
                  />
                  <sidenav-item
                    :to="{ name: 'Order Details' }"
                    mini-icon="O"
                    text="Order Details"
                  />
                </template>
              </sidenav-collapse-item>
              <sidenav-item
                :to="{ name: 'Referral' }"
                mini-icon="R"
                text="Referral"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="authExamples"
          nav-text="Authentication"
          :class="getRoute() === 'authentication' ? 'active' : ''"
        >
          <template #icon>
            <i class="ni ni-single-copy-04 text-danger text-sm opacity-10"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <!-- nav links -->
              <sidenav-collapse-item
                refer="signinExample"
                mini-icon="S"
                text="Sign In"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Signin Basic' }"
                    mini-icon="B"
                    text="Basic"
                  />
                  <sidenav-item
                    :to="{ name: 'Signin Cover' }"
                    mini-icon="C"
                    text="Cover"
                  />
                  <sidenav-item
                    :to="{ name: 'Signin Illustration' }"
                    mini-icon="I"
                    text="Illustration"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="signupExample"
                mini-icon="S"
                text="Sign Up"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Signup Basic' }"
                    mini-icon="B"
                    text="Basic"
                  />
                  <sidenav-item
                    :to="{ name: 'Signup Cover' }"
                    mini-icon="C"
                    text="Cover"
                  />
                  <sidenav-item
                    :to="{ name: 'Signup Illustration' }"
                    mini-icon="I"
                    text="Illustration"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="resetExample"
                mini-icon="R"
                text="Reset Password"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Reset Basic' }"
                    mini-icon="B"
                    text="Basic"
                  />
                  <sidenav-item
                    :to="{ name: 'Reset Cover' }"
                    mini-icon="C"
                    text="Cover"
                  />
                  <sidenav-item
                    :to="{ name: 'Reset Illustration' }"
                    mini-icon="I"
                    text="Illustration"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="lockExample"
                mini-icon="L"
                text="Lock"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Lock Basic' }"
                    mini-icon="B"
                    text="Basic"
                  />
                  <sidenav-item
                    :to="{ name: 'Lock Cover' }"
                    mini-icon="C"
                    text="Cover"
                  />
                  <sidenav-item
                    :to="{ name: 'Lock Illustration' }"
                    mini-icon="I"
                    text="Illustration"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="StepExample"
                mini-icon="2"
                text="2-Step Verification"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Verification Basic' }"
                    mini-icon="B"
                    text="Basic"
                  />
                  <sidenav-item
                    :to="{ name: 'Verification Cover' }"
                    mini-icon="C"
                    text="Cover"
                  />
                  <sidenav-item
                    :to="{ name: 'Verification Illustration' }"
                    mini-icon="I"
                    text="Illustration"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="errorExample"
                mini-icon="E"
                text="Error"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Error Error404' }"
                    mini-icon="E"
                    text="Error 404"
                  />
                  <sidenav-item
                    :to="{ name: 'Error Error500' }"
                    mini-icon="E"
                    text="Error 500"
                  />
                </template>
              </sidenav-collapse-item>
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <hr class="mt-0 horizontal dark" />
        <h6
          class="text-xs ps-4 ms-2 text-uppercase font-weight-bolder opacity-6"
          :class="$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          DOCS
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="basicExamples"
          nav-text="Basic"
          :class="getRoute() === 'basic' ? 'active' : ''"
        >
          <template #icon>
            <i
              class="ni ni-spaceship text-sm"
              :class="
                $store.state.sidebarType === 'bg-default' ||
                $store.state.darkMode
                  ? 'text-white'
                  : 'text-dark'
              "
            ></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <!-- nav links -->
              <sidenav-collapse-item
                refer="gettingStartedExample"
                mini-icon="G"
                text="Getting Started"
              >
                <template #nav-child-item>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/quick-start/argon-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">Q</span>
                      <span class="sidenav-normal">Quick Start</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/license/argon-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">L</span>
                      <span class="sidenav-normal">License</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/overview/argon-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">C</span>
                      <span class="sidenav-normal">Contents</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/build-tools/argon-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">B</span>
                      <span class="sidenav-normal">Build Tools</span>
                    </a>
                  </li>
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="foundationExample"
                mini-icon="F"
                text="Foundation"
              >
                <template #nav-child-item>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/colors/argon-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">C</span>
                      <span class="sidenav-normal">Colors</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/grid/argon-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">G</span>
                      <span class="sidenav-normal">Grid</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/typography/argon-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">T</span>
                      <span class="sidenav-normal">Typography</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/icons/argon-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">I</span>
                      <span class="sidenav-normal">Icons</span>
                    </a>
                  </li>
                </template>
              </sidenav-collapse-item>
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="componentsExamples"
          nav-text="Components"
          :class="getRoute() === 'components' ? 'active' : ''"
        >
          <template #icon>
            <i
              class="ni ni-app text-sm"
              :class="
                $store.state.sidebarType === 'bg-default' ||
                $store.state.darkMode
                  ? 'text-white'
                  : 'text-dark'
              "
            ></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <!-- nav links -->
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/alerts/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">A</span>
                  <span class="sidenav-normal">Alerts</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/badge/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">B</span>
                  <span class="sidenav-normal">Badge</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/buttons/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">B</span>
                  <span class="sidenav-normal">Buttons</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/cards/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">C</span>
                  <span class="sidenav-normal">Card</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/carousel/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">C</span>
                  <span class="sidenav-normal">Carousel</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/collapse/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">C</span>
                  <span class="sidenav-normal">Collapse</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/dropdowns/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">D</span>
                  <span class="sidenav-normal">Dropdowns</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/forms/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">F</span>
                  <span class="sidenav-normal">Forms</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/modal/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">M</span>
                  <span class="sidenav-normal">Modal</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/navs/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">N</span>
                  <span class="sidenav-normal">Navs</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/navbar/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">N</span>
                  <span class="sidenav-normal">Navbar</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/pagination/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">P</span>
                  <span class="sidenav-normal">Pagination</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/popovers/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">P</span>
                  <span class="sidenav-normal">Popovers</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/progress/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">P</span>
                  <span class="sidenav-normal">Progress</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/spinners/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">S</span>
                  <span class="sidenav-normal">Spinners</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/tables/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">T</span>
                  <span class="sidenav-normal">Tables</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/tooltips/argon-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon">T</span>
                  <span class="sidenav-normal">Tooltips</span>
                </a>
              </li>
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          nav-text="Changelog"
          :collapse="false"
          url="#"
          :aria-controls="''"
          collapse-ref="https://github.com/creativetimofficial/ct-vue-argon-dashboard-pro/blob/main/CHANGELOG.md"
        >
          <template #icon>
            <i
              class="ni ni-align-left-2 text-sm"
              :class="
                $store.state.sidebarType === 'bg-default' ||
                $store.state.darkMode
                  ? 'text-white'
                  : 'text-dark'
              "
            ></i>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
  <div class="mt-3 sidenav-footer">
    <sidenav-card
      :card="{
        title: 'Need Help?',
        description: 'Please check our docs',
        links: [
          {
            label: 'Documentation',
            route:
              'https://www.creative-tim.com/learning-lab/vue/overview/argon-dashboard/',
            color: 'dark'
          },
          {
            label: 'Buy now',
            route:
              'https://www.creative-tim.com/product/vue-argon-dashboard-pro?ref=vadp',
            color: 'success'
          }
        ]
      }"
    />
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCard from "./SidenavCard.vue";
import SidenavCollapseItem from "./SidenavCollapseItem.vue";

export default {
  name: "SidenavList",
  components: {
    SidenavItem,
    SidenavCollapse,
    SidenavCard,
    SidenavCollapseItem
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  }
};
</script>
