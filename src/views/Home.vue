<template>
  <div class="home sm:bg-green-600">
    <navbar></navbar>
    <navbarcontent
      v-if="testCenterTrigger"
      :locx="listLocX"
      :locy="listLocY"
      @notthisplace="testCenterListClose"
      :idata="testCenterList"
    ></navbarcontent>
    <router-view></router-view>
    <belowlist v-if="isMobileRef && getmainRole !== 3"></belowlist>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from "vue";
import navbar from "@/components/Navbar.vue";
import TestCenterNavbar from "@/api/TestCenterNavbar.js";
import belowlist from "@/components/BelowList.vue";
import navbarcontent from "@/components/NavbarContent.vue";
import config from "@/api/request/config.js";
import Login from "@/api/Login.js";
export default {
  name: "Home",
  components: {
    navbar,
    belowlist,
    navbarcontent,
  },
  setup() {
    const isMobileRef = ref(config.mobileCheck());
    const loginModule = Login();
    const TestCenterNavbarModule = TestCenterNavbar();
    loginModule.regainLoginUser();
    const getmainRole = ref(-1);
    getmainRole.value = loginModule.userData.role;
    return { isMobileRef, getmainRole, ...TestCenterNavbarModule };
  },
};
</script>

<style scoped lang="postcss">
.home {
  min-height: 100vh;
  padding-top: 10vh;
  @apply pb-4;
}
@media only screen and (min-width: theme(screens.ultra)) {
  .home {
    padding-top: 20vh;
  }
}
</style>
