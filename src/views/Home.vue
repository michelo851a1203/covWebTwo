<template>
  <div class="home sm:bg-green-600">
    <navbar></navbar>
    <navbarcontent
      v-if="testCenterTrigger"
      :locx="listLocX"
      :locy="listLocY"
      @notthisplace="testCenterListClose"
      :iData="testCenterList"
    ></navbarcontent>
    <router-view></router-view>
    <belowlist v-if="isMobileRef && getmainRole !== 3"></belowlist>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from "vue";
import navbar from "@/components/Navbar.vue";
import belowlist from "@/components/BelowList.vue";
import navbarcontent from "@/components/NavbarContent.vue";
import config from "@/api/request/config.js";
import Login from "@/api/Login.js";
import NavbarAction from "@/api/Navbar.js";
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
    const NavbarModule = NavbarAction();
    loginModule.regainLoginUser();
    const getmainRole = ref(-1);
    getmainRole.value = loginModule.userData.role;
    return { isMobileRef, getmainRole, ...NavbarModule };
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
