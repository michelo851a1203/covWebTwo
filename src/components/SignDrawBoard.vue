<template>
  <div>
    <canvas v-on="cavasEvent" ref="signature"></canvas>
  </div>
</template>

<script>
// ============================================================================
// ** element **
// <drawingboard v-model:triggerimage="coolRef" @getimage="imageSetting" :w="w" :h="500"></drawingboard>

// PS : trigger coolRef to implement to image
// const mainClick = () => {
//   coolRef.value = true;
//   const tmpInterval = setTimeout(() => {
//     coolRef.value = false;
//     clearInterval(tmpInterval);
//   }, 0);
// };

// ** props **
// w : canvas width
// h : canvas height
// linewidth : pen bold width
// triggerimage : trigger to download canvas to image
// ============================================================================
import { ref, onMounted, computed, reactive, toRefs, watch } from "vue";
export default {
  name: "drawingboard",
  props: {
    w: {
      type: [Number, String],
      required: true,
      validator: (propsValue) => {
        if (isNaN(parseFloat(propsValue))) return false;
        return true;
      },
    },
    h: {
      type: [Number, String],
      required: true,
      validator: (propsValue) => {
        if (isNaN(parseFloat(propsValue))) return false;
        return true;
      },
    },
    linewidth: {
      type: [Number, String],
      default: 5,
      validator: (propsValue) => {
        if (isNaN(parseFloat(propsValue))) return false;
        return true;
      },
    },
    triggerimage: {
      type: Boolean,
      default: false,
    },
    // quality: {
    //   type: String,
    //   default: "HIGH", // HIGH,MEDIUM,LOW
    // },
  },
  setup(props, { emit }) {
    const signature = ref(null);
    const canvasRelated = reactive({
      offsetX: null,
      offsetY: null,
      isEnable: false,
    });

    onMounted(() => {
      const canvas = signature.value;
      canvas.width = props.w;
      canvas.height = props.h;
      canvasRelated.offsetX = canvas.offsetLeft;
      canvasRelated.offsetY = canvas.offsetTop;
    });

    const cancelDraw = () => {
      if (!canvasRelated.isEnable) return;
      canvasRelated.isEnable = false;
      if (!signature.value) return;
      const ctx = signature.value.getContext("2d");
      ctx.beginPath();
    };
    // skill : apply beginPath to reset drawing
    // lineCap and lineWidth to solve attribute
    const cavasEvent = computed(() => {
      return {
        mousedown: () => {
          if (canvasRelated.isEnable) return;
          canvasRelated.isEnable = true;
        },
        mouseup: cancelDraw,
        mouseleave: cancelDraw,
        mousemove: (event) => {
          if (!canvasRelated.isEnable) return;

          const penX = event.pageX - canvasRelated.offsetX;
          const penY = event.pageY - canvasRelated.offsetY;
          if (!signature.value) return;
          const ctx = signature.value.getContext("2d");
          ctx.lineCap = "round";
          ctx.lineWidth = props.linewidth;
          ctx.lineTo(penX, penY);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(penX, penY);
        },
      };
    });
    // ps. watch props only this solution
    watch(
      () => props.triggerimage,
      (val) => {
        if (!val) return;
        if (!signature.value) return;
        // const dataUrl = signature.value.toDataURL();
        const dataUrl = signature.value.toDataURL("image/png", 1.0);
        // ============================================================================
        // let dataUrl = null
        // switch (props.quality) {
        //   case "HIGH":
        //     dataUrl = canvas.toDataURL("image/png", 1);
        //     break;
        //   case "MEDIUM":
        //     dataUrl = canvas.toDataURL("image/jpeg", 0.5);
        //     break;
        //   case "LOW":
        //     dataUrl = canvas.toDataURL("image/jpeg", 0.1);
        //     break;
        //   default:
        //     break;
        // }
        // var fullQuality = canvas.toDataURL("image/jpeg", 1.0);
        // var mediumQuality = canvas.toDataURL("image/jpeg", 0.5);
        // var lowQuality = canvas.toDataURL("image/jpeg", 0.1);
        // ============================================================================
        emit("getimage", dataUrl);
      }
    );

    return { signature, cavasEvent, ...toRefs(canvasRelated) };
  },
};
</script>