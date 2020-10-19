<template>
  <div class="relative" :class="{ 'w-full': isFull, 'w-48': !isFull }">
    <section
      class="flex items-center cursor-pointer select-none rounded-md px-3 py-2 bg-gray-200"
      :class="{
        'border border-gray-500': !showContent,
        'border-2 sm:rounded-b-none sm:border-b-0 border border-orange-500': showContent,
      }"
      @click.prevent.stop="showContentChange"
    >
      <div class="w-4/5 truncate">
        {{ getCurrentName }}
      </div>
      <svg
        :class="{ reverseIndicator: !showContent, indicator: showContent }"
        class="origin-center ml-auto w-6 h-6 stroke-current text-black"
        viewbox="0 0 100 100"
      >
        <polyline
          class="transform scale-20"
          stroke-width="15"
          fill="transparent"
          stroke-linecap="round"
          stroke-linejoin="round"
          points="10,25 50,80 90,25"
        ></polyline>
      </svg>
    </section>
    <transition name="fade">
      <div
        :class="{ 'sm:w-48': !isFull }"
        class="ddlContent overflow-y-scroll fixed w-full bottom-0 sm:bottom-auto sm:absolute bg-gray-300 border-2 sm:border-t-0 border-orange-500 rounded-b-md flex flex-col"
        v-if="showContent"
      >
        <button
          :class="{
            'bg-gray-400 sm:bg-transparent': getCurrentName === item.name,
          }"
          class="btnContent truncate px-3 py-2 hover:bg-gray-500 shadow-inner border-t border-gray-500"
          @click.prevent="setCurrentValue(item.value)"
          v-for="item in iData"
          :key="item.value"
        >
          {{ item.name }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
// ============================================================================
// ** element **
// <DropdownList
//   :isFull="false"
//   v-model:ddlValue="ddlValue"
//   :iData="iData"
// ></DropdownList>
// ** script : **
// ----------------------------------------------------------------------------
// const ddlData = reactive({
//   iData: [
//     {
//       value: initialValue,
//       name: "mainName11321321321321321321321321321321321323",
//     },
//     {
//       value: uuild(),
//       name: "mainName2",
//     },
//   ],
//   ddlValue: initialValue,
// });
// ----------------------------------------------------------------------------
// iData : dropdownlist data
// ddlValue : current selected data
// isFull : is device is w-full
// ============================================================================
import { reactive, computed, onMounted, onUnmounted, toRefs } from "vue";
export default {
  name: "Dropdownlist",
  props: {
    ddlValue: {
      type: [String, Number],
      required: true,
    },
    iData: {
      type: Array,
      required: true,
      validator: (iDataArray) => {
        return (
          iDataArray.filter(
            (item) =>
              (!item.value && item.value !== 0 && item.value !== false) ||
              !item.name
          ).length === 0
        );
      },
    },
    isFull: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const ddlCluster = reactive({
      showContent: false,
      getCurrentName: computed(() => {
        const currentName = props.iData.find(
          (item) => item.value === props.ddlValue
        );
        return currentName.name;
      }),
      showContentChange: () => {
        ddlCluster.showContent = !ddlCluster.showContent;
      },
      hideContent: () => {
        ddlCluster.showContent = false;
      },
      setCurrentValue: (selectValue) => {
        emit("update:ddlValue", selectValue);
        ddlCluster.showContentChange();
      },
    });

    onMounted(() => {
      document
        .querySelector("body")
        .addEventListener("click", ddlCluster.hideContent, false);
    });

    onUnmounted(() => {
      document
        .querySelector("body")
        .removeEventListener("click", ddlCluster.hideContent, false);
    });

    return { ...toRefs(ddlCluster) };
  },
};
</script>

<style scoped lang="postcss">
.fade-enter {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.05s ease-out;
}
.fade-leave-to {
  opacity: 0;
}

.scale-20 {
  --transform-scale-x: 0.2;
  --transform-scale-y: 0.2;
}

@keyframes rotate {
  100% {
    transform: rotate(180deg);
  }
}

@keyframes ReverseRotate {
  0% {
    transform: rotate(-180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.indicator {
  animation: rotate 0.3s forwards;
}
.reverseIndicator {
  animation: ReverseRotate 0.3s forwards;
}
@media only screen and (min-width: theme(screens.sm)) {
  .ddlContent {
    max-height: 20rem;
  }
}
.ddlContent {
  @apply z-20 left-0;
  max-height: 10rem;
}
.btnContent {
  min-height: 3rem;
}
</style>