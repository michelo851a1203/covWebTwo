<template>
  <div>
    <div class="self-start ml-10 mb-4">
      <label>{{ title }}</label>
    </div>
    <div v-for="item in iData" :key="item.id" class="w-full ml-10" :class="marginMainStyle(item)">
      <!-- label -->
      <label
        v-if="item.type === 'label'"
      >{{ outputFortitle ? item.title : item.id }} : {{ item.label }}</label>
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
      <!-- email -->
      <input
        v-model.trim="formDataRef[outputFortitle ? item.title : item.id]"
        v-if="item.type === 'email'"
        class="w-4/5 border-b-2 border-gray-600 placeholder-gray-600 bg-transparent sm:border-gray-400 px-4 pt-1 focus:outline-none"
        :placeholder="item.title"
        type="email"
      />
      <!-- datetimepicker -->
      <datetimepicker
        v-if="item.type === 'datetimepicker'"
        @isinner="dateTimePickerCloseClick"
        v-model:isShowCalender="isShowCalenderRef[outputFortitle ? item.title : item.id]"
        v-model:maintext="formDataRef[outputFortitle ? item.title : item.id]"
      ></datetimepicker>
      <!-- need append email validator -->
      <!-- dropdownlist -->
      <div v-if="item.type === 'ddl'">
        <label for>{{ item.title }}</label>
        <select
          v-model="formDataRef[outputFortitle ? item.title : item.id]"
          class="ml-4 border-b-2 bg-transparent focus:outline-none border-gray-500 px-2 py-1"
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
        :class="btnMainStyle(item.style)"
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
//       :defaultValue="updateDefault"
//       @clear="clearFrom"
//       @AddUser="addDataAction"
//       @UpdateUser="updateDataAction"
//     ></mainform>

// ** props **

// title:"maintitle"
// outputFortitle: true
// defaultValue:[
//   {
//     key:"titile or id",
//     value:"initialData"
//   }
// ]
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

// ** emit **
// failresponse : emit error response

// ============================================================================
import { ref } from "vue";
import config from "@/api/request/config.js";
import datetimepicker from "@/components/Datetimepicker.vue";
export default {
  name: "mainform",
  components: {
    datetimepicker,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    outputFortitle: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: Array,
      required: false,
    },
    iData: {
      default: () => [],
      type: Array,
      validator: (propValue) => {
        let isValid = true;
        propValue.forEach((item) => {
          if (!item.id) {
            isValid = false;
            return;
          }
          if (!item.title || item.title === "") {
            isValid = false;
            return;
          }
          if (!item.type || item.type === "") {
            isValid = false;
            return;
          }
        });
        return isValid;
      },
    },
    funcbtn: {
      default: () => [],
      type: Array,
    },
  },
  setup(props, { emit }) {
    const formDataRef = ref({});

    if (props.defaultValue && props.defaultValue.length > 0) {
      props.defaultValue.forEach((item) => {
        const propsData = props.iData.map((item) => {
          return props.outputFortitle ? item.title : item.id;
        });
        if (propsData.includes(item.key)) {
          formDataRef.value[item.key] = item.value;
        }
      });
    }

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
        const isEmailType = [];
        props.iData.forEach((item) => {
          const key = props.outputFortitle ? item.title : item.id;
          if (item.type === "email") {
            isEmailType.push(key);
          }
          if (Object.keys(formDataRef.value).includes(key)) {
            return;
          }
          formDataRef.value[key] = "";
        });

        // email permission
        // ============================================================================
        // validateEmail: (email) => {
        //   // change \ \ to \\
        //   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //   return re.test(email);
        // };
        // ============================================================================
        if (isEmailType.length > 0) {
          let emailFail = false;
          isEmailType.forEach((emailKey) => {
            if (config.validateEmail(formDataRef.value[emailKey])) {
              return;
            }
            emailFail = true;
          });
          if (emailFail) {
            emit("failresponse", "email format fail");
            return;
          }
        }

        emit(emitName, formDataRef.value);
        return;
      }
      emit(emitName);
    };

    const isShowCalenderRef = ref({});
    const dateTimePickerCloseClick = (isFromInner) => {
      console.log(isFromInner);
    };

    const marginMainStyle = (itemStyle) => {
      let initialStyle = "mb-4 ";
      switch (itemStyle.margin) {
        case "small":
          initialStyle = "mb-4 ";
          break;
        case "medium":
          initialStyle = "mb-10 ";
          break;
        case "large":
          initialStyle = "mb-12 ";
          break;
        default:
          break;
      }

      if (
        itemStyle.type === "ddl" ||
        itemStyle.type === "checkbox" ||
        itemStyle.type === "radio"
      ) {
        initialStyle += "self-start";
      }
      return initialStyle;
    };

    const btnMainStyle = (styleName) => {
      let btnStyle = "bg-gray-700 hover:bg-gray-900";
      switch (styleName) {
        case "info":
          btnStyle = "bg-green-700 hover:bg-green-900";
          break;
        case "primary":
          btnStyle = "bg-blue-700 hover:bg-blue-900";
          break;
        case "danger":
          btnStyle = "bg-red-700 hover:bg-red-900";
          break;
        case "warn":
          btnStyle = "bg-orange-700 hover:bg-orange-900";
          break;
        case "normal":
          btnStyle = "bg-gray-700 hover:bg-green-900";
          break;
        default:
          break;
      }
      return btnStyle;
    };

    return {
      formDataRef,
      btnClick,
      isShowCalenderRef,
      dateTimePickerCloseClick,
      marginMainStyle,
      btnMainStyle,
    };
  },
};
</script>