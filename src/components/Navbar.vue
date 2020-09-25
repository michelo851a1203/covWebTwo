<template>
  <div class="fixed top-0 bg-gray-300 shadow-2xl w-full h-16">
    <div class="flex items-center h-full">
      <div class="ml-10">COVID-19 Certificate Verification System</div>
      <!-- <div
        v-if="getnavRole === 999  && !isMobileRef"
        @click="changeAdminComponent('usertable')"
        :class="{'bg-blue-300':navbarActive === 'usertable'}"
        class="hidden sm:flex ml-auto mr-4 hover:bg-gray-500 h-full items-center"
      >
        <button
          class="text-black focus:outline-none hover:underline text-lg font-medium py-1 px-2"
        >User list</button>
      </div>

      <div
        v-if="getnavRole === 999  && !isMobileRef"
        @click="changeAdminComponent('doctortable')"
        :class="{'bg-blue-300':navbarActive === 'doctortable'}"
        class="hidden sm:flex mr-4 hover:bg-gray-500 h-full items-center"
      >
        <button
          class="text-black focus:outline-none hover:underline text-lg font-medium py-1 px-2"
        >Doctor list</button>
      </div>

      <div
        v-if="getnavRole === 999  && !isMobileRef"
        @click="changeAdminComponent('detecttype')"
        :class="{'bg-blue-300':navbarActive === 'detecttype'}"
        class="hidden sm:flex mr-4 hover:bg-gray-500 h-full items-center"
      >
        <button
          class="text-black focus:outline-none hover:underline text-lg font-medium py-1 px-2"
        >Test type</button>
      </div> -
      <div
        @click="testCenterTriggerSwitch"
        class="cursor-pointer"
        v-if="getnavRole === 3"
        :class="{ 'ml-auto': getnavRole === 3 }"
      >
        <svg class="w-6" viewBox="0 0 512.000000 512.000000">
          <g
            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            :fill="testCenterTriggerFill"
            stroke="none"
          >
            <path
              d="M2160 5098 c-66 -46 -70 -56 -101 -314 -16 -131 -33 -241 -37 -245
        -4 -4 -52 -21 -107 -39 -104 -34 -244 -93 -317 -135 -24 -14 -49 -25 -56 -25
        -8 0 -84 55 -170 123 -208 164 -213 167 -256 177 -77 17 -93 6 -354 -254 -134
        -132 -253 -256 -264 -275 -25 -40 -27 -105 -5 -147 9 -16 77 -106 151 -201 75
        -94 136 -178 136 -185 0 -7 -11 -32 -25 -56 -42 -73 -101 -213 -135 -317 -18
        -55 -36 -103 -39 -108 -4 -4 -114 -20 -245 -36 -258 -31 -268 -35 -313 -101
        -23 -33 -23 -36 -23 -400 0 -491 -22 -458 331 -501 129 -16 238 -30 244 -33 6
        -2 19 -30 29 -62 33 -109 69 -198 122 -307 30 -59 54 -112 54 -118 0 -6 -61
        -88 -136 -182 -74 -95 -142 -185 -151 -201 -24 -46 -20 -109 10 -153 15 -21
        134 -145 264 -275 197 -196 245 -238 278 -247 71 -19 100 -4 299 153 102 80
        191 146 198 146 7 0 33 -12 58 -26 71 -41 207 -99 316 -134 54 -18 102 -35
        106 -39 4 -4 21 -114 37 -245 31 -258 35 -268 101 -313 33 -23 36 -23 400 -23
        492 0 457 -23 501 336 16 131 33 241 37 245 4 4 52 21 107 39 104 34 244 93
        317 135 24 14 49 25 56 25 8 0 84 -55 170 -123 238 -187 224 -178 280 -179 34
        -1 60 5 83 20 19 11 143 130 275 264 255 256 267 273 256 348 -6 42 -12 51
        -174 256 -71 89 -128 167 -128 173 0 6 22 55 49 109 52 103 90 196 123 302 11
        36 23 68 27 72 3 4 114 21 245 37 258 31 268 35 313 101 23 33 23 36 23 400 0
        492 23 457 -336 501 -131 16 -241 33 -245 37 -4 4 -21 52 -39 107 -34 104 -93
        244 -135 317 -14 24 -25 49 -25 56 0 8 62 93 138 190 77 98 145 188 151 201
        20 37 17 104 -7 142 -11 19 -130 143 -264 276 -202 200 -250 243 -283 252 -71
        19 -100 4 -299 -153 -102 -80 -190 -146 -196 -146 -5 0 -55 23 -110 51 -107
        53 -193 88 -300 121 -36 11 -68 23 -72 27 -4 3 -21 114 -37 245 -31 258 -35
        268 -101 314 -33 22 -36 22 -400 22 -364 0 -367 0 -400 -22z m645 -1283 c538
        -111 938 -532 1020 -1075 105 -691 -388 -1345 -1090 -1445 -383 -55 -772 70
        -1054 340 -521 497 -533 1312 -28 1823 199 203 459 332 743 371 95 14 313 6
        409 -14z"
            />
          </g>
        </svg>
      </div>
      -->
      <div
        @click="changeTag('scanQrcode')"
        v-if="getnavRole !== 3 && getnavRole !== 999 && !isMobileRef"
        :class="{ 'bg-blue-300': navTag === 'scanQrcode' }"
        class="hidden sm:flex ml-auto mr-4 hover:bg-gray-500 h-full items-center"
      >
        <button
          class="text-black focus:outline-none hover:underline text-lg font-medium py-1 px-2"
        >
          Scan Qrcode
        </button>
      </div>
      <div
        v-if="getnavRole !== 3 && getnavRole !== 999 && !isMobileRef"
        @click="changeTag('genQrcode')"
        :class="{ 'bg-blue-300': navTag === 'genQrcode' }"
        class="hidden sm:flex mr-4 hover:bg-gray-500 h-full items-center"
      >
        <button
          class="text-black focus:outline-none hover:underline text-lg font-medium py-1 px-2"
        >
          Generate Qrcode
        </button>
      </div>
      <div
        @click="triggerEnableCredential"
        :class="{ 'ml-auto sm:ml-0': getnavRole === 1 }"
        v-if="getnavRole === 1"
        class="flex mr-4 hover:sm:bg-blue-300 h-full items-center"
      >
        <button
          class="hidden sm:inline text-black focus:outline-none hover:underline text-lg font-medium py-1 px-2"
        >
          <label for>{{ credStatusName }}</label>
        </button>
        <svg
          v-if="credStatusName === 'Disable Credential'"
          class="w-6 sm:hidden"
          x="0px"
          y="0px"
          viewBox="0 0 1000 1000"
        >
          <g>
            <path
              d="M321.8,455.5h356.4V321.8c0-49.2-17.4-91.2-52.2-126c-34.8-34.8-76.8-52.2-126-52.2c-49.2,0-91.2,17.4-126,52.2c-34.8,34.8-52.2,76.8-52.2,126L321.8,455.5L321.8,455.5z M900.9,522.3v400.9c0,18.6-6.5,34.3-19.5,47.3c-13,13-28.8,19.5-47.3,19.5H165.9c-18.6,0-34.3-6.5-47.3-19.5c-13-13-19.5-28.8-19.5-47.3V522.3c0-18.6,6.5-34.3,19.5-47.3c13-13,28.8-19.5,47.3-19.5h22.3V321.8c0-85.4,30.6-158.7,91.9-219.9C341.3,40.7,414.7,10,500,10c85.3,0,158.7,30.6,219.9,91.9c61.3,61.3,91.9,134.6,91.9,219.9v133.6h22.3c18.6,0,34.3,6.5,47.3,19.5C894.4,488,900.9,503.7,900.9,522.3L900.9,522.3z"
            />
          </g>
        </svg>
        <svg
          v-if="credStatusName === 'Enable Credential'"
          class="w-8 sm:hidden"
          x="0px"
          y="0px"
          viewBox="0 0 24 24"
        >
          <g transform="matrix(1 0 0 -1 0 1638)">
            <path
              d="M16.5,1630.688h-2.484c0,0.734-0.168,1.305-0.504,1.711s-0.848,0.609-1.535,0.609c-1.336,0-2.004-0.777-2.004-2.332v-2.801
            h8.578v-9.07H7.125c-0.461,0-0.855,0.164-1.184,0.492s-0.492,0.727-0.492,1.195v7.383H7.5v2.812c0,1.406,0.43,2.594,1.289,3.562
            s1.93,1.453,3.211,1.453s2.352-0.484,3.211-1.453S16.5,1632.094,16.5,1630.688z"
            />
          </g>
        </svg>
      </div>
      <div
        :class="{
          'ml-2': getnavRole === 3,
          'ml-auto': getnavRole === 999,
          'ml-auto sm:ml-0': getnavRole === 2,
        }"
        class="mr-10 select-none"
      >
        <button
          @click="logout"
          class="text-black hover:underline text-lg font-medium py-1 px-2"
        >
          <label class="hidden sm:inline">Log out</label>
          <svg
            class="block sm:hidden"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path d="M3 3h8V1H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8v-2H3z" />
            <path d="M19 10l-6-5v4H5v2h8v4l6-5z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import router from "@/router";
import Login from "@/api/Login.js";
import Navbar from "@/api/Navbar.js";
import Admin from "@/api/Admin.js";
import config from "@/api/request/config.js";
export default {
  name: "Navbar",
  setup() {
    const isMobileRef = ref(config.mobileCheck());
    const loginModule = Login();
    loginModule.regainLoginUser();
    const getnavRole = ref(-1);
    getnavRole.value = loginModule.userData.role;
    const logout = () => {
      router.push({
        name: "signIn",
      });
    };
    const AdminModule = Admin();
    const initial = getnavRole.value === 2 ? "scanqrcode" : "reportlist";
    const NavbarModule = Navbar({
      initial,
      role: getnavRole.value,
    });
    return { ...AdminModule, ...NavbarModule, logout, getnavRole, isMobileRef };
  },
};
</script>

<style scoped lang="postcss">
.switch {
  position: relative;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>