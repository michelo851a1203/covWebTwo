<template>
  <div>
    <div class="self-start ml-10 mb-4">
      <label>{{ title }}</label>
    </div>
    <div
      v-for="item in iData"
      :key="item.id"
      class="w-full ml-10"
      :class="{ 
        'mb-4':item.margin === 'small',
        'mb-10':item.amrgin === 'medium',
        'mb-12':item.amrgin === 'large',
        'self-start' : item.type === 'ddl' || item.type === 'checkbox' || item.type === 'radio' 
      }"
    >
      <!-- label -->
      <label>{{ outputFortitle ? item.title : item.id }} : {{ item.label }}</label>
      <!-- textbox -->
      <input
        v-model.trim="formDataRef[outputFortitle ? item.title : item.id]"
        v-if="item.type === 'text'"
        class="w-4/5 border-b-2 border-gray-600 placeholder-gray-600 bg-transparent sm:border-gray-400 px-4 pt-1 focus:outline-none"
        :placeholder="item.title"
        type="text"
      />
      <!-- password -->
      <input
        v-model.trim="formDataRef[outputFortitle ? item.title : item.id]"
        v-if="item.type === 'password'"
        class="w-4/5 border-b-2 border-gray-600 placeholder-gray-600 bg-transparent sm:border-gray-400 px-4 pt-1 focus:outline-none"
        :placeholder="item.title"
        type="password"
      />
      <!-- dropdownlist -->
      <div v-if="item.type === 'ddl'">
        <label for>{{ item.title }}</label>
        <select
          v-model="formDataRef[outputFortitle ? item.title : item.id]"
          class="ml-4 border rounded border-gray-500 px-2 py-1"
        >
          <option class="bg-white" value>please Select</option>
          <option
            v-for="ddlItem in item.ddl"
            :key="ddlItem.value"
            class="bg-white"
            :value="ddlItem.value"
          >{{ ddlItem.title }}</option>
        </select>
      </div>
      <!-- checkbox -->
      <div v-if="item.type === 'checkbox'" class="flex items-center">
        <input
          v-model.trim="formDataRef[outputFortitle ? item.title : item.id]"
          :true-value="(item.cb && item.cb.trueValue) ? item.cb.trueValue : true"
          :false-value="(item.cb && item.cb.falseValue) ? item.cb.falseValue : false"
          :id="item.id + item.title"
          type="checkbox"
        />
        <label class="cursor-pointer text-xs ml-2" :for="item.id + item.title">{{ item.title }}</label>
      </div>
      <!-- radiobox (when spare time) -->
    </div>

    <div class="w-4/5 mb-2 flex justify-around">
      <button
        @click="btnClick(item.emitname,item.needSendData)"
        v-for="item in funcbtn"
        :key="item.id"
        :class="{ 
          'bg-gray-700 hover:bg-gray-900': item.style === 'normal',
          'bg-green-700 hover:bg-green-900': item.style === 'info',
          'bg-blue-700 hover:bg-blue-900': item.style === 'primary',
          'bg-red-700 hover:bg-red-900': item.style === 'danger',
          'bg-orange-700 hover:bg-orange-900': item.style === 'warn',
        }"
        class="focus:outline-none text-white font-medium py-2 px-4 rounded"
      >{{ item.title }}</button>
    </div>
  </div>
</template>

<script>
// ============================================================================
// ** element **
// <mainform
//       v-if="boardTitle !== '' && boardiData.length > 0"
//       :outputFortitle="true"
//       :iData="boardiData"
//       :funcbtn="boardFunc"
//       @clear="clearFrom"
//       @AddUser="adminAddUser"
//     ></mainform>

// ** props **

// title:"maintitle"
// outputFortitle: true
// iData: [
//   {
//     id:"id",
//     title: "placeHolder",
//     type: "label,text,password,ddl,datetimepicker,checkbox,radio,",
//     margin: "small,medium,large",
//     ep: "bold,none",
//     label: "to set a label text",
//     ddl: [{ value, title }], // if type is ddl need this one
//     cb: { trueValue: "", falseValue: "" }, // if is checkbox apply this
//   },
// ];
// funcbtn: [
//   {
//     id: "id",
//     title: "btn title",
//     style: "normal,info,primary,danger,warn",
//     // normal:gray,info:green,primary:blue,danger:red,warn:yellow
//     emitname: "do some action outside",
//     needSendData:false, // if yes will emit all form
//   },
// ];

// ============================================================================
import { ref } from "vue";
export default {
  name: "mainform",
  props: {
    title: {
      type: String,
      default: "",
    },
    outputFortitle: {
      type: Boolean,
      default: false,
    },
    iData: {
      default: () => [],
      type: Array,
    },
    funcbtn: {
      default: () => [],
      type: Array,
    },
  },
  setup(props, { emit }) {
    const formDataRef = ref({});

    props.iData.forEach((item) => {
      if (item.type === "ddl") {
        formDataRef.value[props.outputFortitle ? item.title : item.id] = "";
      }
      if (item.type === "label") {
        formDataRef.value[props.outputFortitle ? item.title : item.id] =
          item.label;
      }
    });

    const btnClick = (emitName, needSendData = true) => {
      if (needSendData) {
        props.iData.forEach((item) => {
          const key = props.outputFortitle ? item.title : item.id;
          if (Object.keys(formDataRef.value).includes(key)) {
            return;
          }
          formDataRef.value[key] = "";
        });

        emit(emitName, formDataRef.value);
        return;
      }
      emit(emitName);
    };
    return { formDataRef, btnClick };
  },
};
</script>