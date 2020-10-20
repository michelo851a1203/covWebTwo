<template>
  <div>
    <button
      ref="mainBtnRef"
      @click="clickToCopied"
      class="focus:outline-none font-medium py-1 px-2"
    >
      <svg class="w-6" viewBox="0 0 24 24">
        <rect
          x="9"
          y="9"
          width="13"
          height="13"
          rx="2"
          ry="2"
          fill="none"
          stroke="#000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <path
          d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
          fill="none"
          stroke="#000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </button>
    <div
      v-if="isShow"
      ref="mainContentRef"
      class="tipContent absolute mt-6 border"
      :style="positionStyle"
    >
      <div class="speech-bubble">{{ tipText }}</div>
    </div>
  </div>
</template>

<script>
// ============================================================================
// ** element **
// <TagTemplate tipText="AAAAAAAAAAAAAAAAA"></TagTemplate>
// ----------------------------------------------------------------------------
// ** props **
// tipText : tip name
// ----------------------------------------------------------------------------
// ** emit **
// actionevent
// ============================================================================
import { reactive, ref, computed, onUpdated, toRefs } from "vue";
export default {
  name: "copybutton",
  props: {
    tipText: {
      type: [String, Number],
      required: true,
    },
    bindData: {
      type: [String, Number],
      default: "",
    },
  },
  setup(props, { emit }) {
    const mainBtnRef = ref(null);
    const mainContentRef = ref(null);
    const tagCluseter = reactive({
      initialleft: 0,
      initialtop: 0,
      timeout: null,
      isShow: false,
      clickToCopied: () => {
        tagCluseter.isShow = true;
        emit("actionevent", props.bindData);
      },
      setContentPosition: () => {
        const mainBtn = mainBtnRef.value;
        const mainContent = mainContentRef.value;

        tagCluseter.initialtop =
          mainBtn.offsetTop + tagCluseter.getEleH(mainBtn) - 8;
        tagCluseter.initialleft =
          mainBtn.offsetLeft - tagCluseter.getEleW(mainContent) / 2 + 30;
      },
      getEleW: (div) => {
        if (typeof div === "undefined" || div === null) return;
        return Number(window.getComputedStyle(div).width.replace("px", ""));
      },
      getEleH: (div) => {
        if (typeof div === "undefined" || div === null) return;
        return Number(window.getComputedStyle(div).height.replace("px", ""));
      },
      positionStyle: computed(() => {
        return `--mainleft:${tagCluseter.initialleft}px;--maintop:${tagCluseter.initialtop}px;`;
      }),
    });
    onUpdated(() => {
      if (!mainContentRef.value === null) return;
      tagCluseter.setContentPosition();
      if (!tagCluseter.isShow) return;
      tagCluseter.timeout = setTimeout(() => {
        tagCluseter.isShow = false;
        clearInterval(tagCluseter.timeout);
        tagCluseter.timeout = null;
      }, 1000);
    });
    return { mainBtnRef, mainContentRef, ...toRefs(tagCluseter) };
  },
};
</script>

<style scoped lang="postcss">
.speech-bubble {
  @apply inline relative px-3 py-2 rounded-md text-gray-300;
  background: theme(colors.gray.700);
}

.speech-bubble:after {
  content: "";
  @apply absolute top-0 w-0 h-0;
  left: 50%;
  border: 8px solid transparent;
  border-bottom-color: theme(colors.gray.700);
  border-top: 0;
  border-left: 0;
  margin-left: -8.5px;
  margin-top: -8px;
}
.tipContent {
  top: var(--maintop);
  left: var(--mainleft);
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  /* 如果要加入其他元素 opacity 這裡要改成 all */
  transition: opacity 0.5s ease-out;
}
.fade-leave-to {
  opacity: 0;
}
</style>