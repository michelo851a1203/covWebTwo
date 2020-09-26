<template>
  <div @click="notThisPlace" class="placeshow" :style="mainStyle">
    <div class="sppechBox rightUpBox">
      <ul>
        <li class="py-1" v-for="item in idata" :key="item.id">
          <button
            v-if="!item.routeName"
            @click="speechClick(item.emitData)"
            class="focus:outline-none"
          >
            {{ item.title }}
          </button>
          <router-link
            v-if="item.routeName && item.routeName !== ''"
            :to="item.routeName"
            >{{ item.title }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// ============================================================================
// ** element  **
// <SpeechList
//       v-if="mainShow"
//       :locx="x"
//       :locy="y"
//       @listaction="mainAction"
//       @notthisplace="cols"
//       :idata="mainRef"
//     ></SpeechList>
// ** props  **
// idata :
// [
//     {
//         id:1, // only id
//         title:"",
//         emitData:"", // not necessary if having routeName
//         routeName:"" // not necessary if having emitName
//     }
// ]

// ** emit **
// listaction : btn send action

// notthisplace : to colse this content if emit function is false
// do not close
// ============================================================================
// ** close sample solution  **
// parent event
// close event
// cols: (action) => {
//   if (!action) return;
//   tool.mainShow = false;
// },
// onMounted(() => {
//     document.addEventListener("click", function (event) {
//       if (btnRef.value === event.target) return;
//       tool.cols(true);
//     });
//   });
// ============================================================================
import { reactive, toRefs, computed } from "vue";
export default {
  name: "SpeechList",
  props: {
    locx: {
      type: Number,
      required: true,
    },
    locy: {
      type: Number,
      required: true,
    },
    idata: {
      type: Array,
      required: true,
      validator: (propsValue) => {
        let isValid = true;
        propsValue.forEach((item) => {
          if (!item.title || item.title === "") {
            isValid = false;
          }
        });
        return isValid;
      },
    },
  },
  setup(props, { emit }) {
    const mainTool = reactive({
      speechClick: (emitData) => {
        if (!emit) return;
        emit("listaction", emitData);
      },
      notThisPlace: () => {
        emit("notthisplace", false);
      },
      mainStyle: computed(() => {
        return `left:${props.locx - 120}px;top:${props.locy + 8}px;`;
      }),
    });
    return { ...toRefs(mainTool) };
  },
};
</script>

<style lang="postcss">
.placeshow {
  @apply w-32 mt-4 fixed;
}
.sppechBox {
  @apply relative rounded w-full bg-gray-400 p-5 text-center shadow-lg font-bold select-none;
}

.rightUpBox:before {
  content: "";
  @apply absolute w-0 h-0;
  border-left: 8px solid theme(colors.transparent);
  border-right: 8px solid theme(colors.gray.400);
  border-top: 8px solid theme(colors.transparent);
  border-bottom: 8px solid theme(colors.gray.400);
  right: 0px;
  top: -12px;
}
</style>
