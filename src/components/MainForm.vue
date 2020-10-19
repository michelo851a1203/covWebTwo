<template>
  <div>
    <div class="self-start ml-10 mb-4">
      <label>{{ title }}</label>
    </div>
    <div
      v-for="item in iData"
      :key="item.id"
      class="w-full"
      :class="marginMainStyle(item)"
    >
      <!-- title -->
      <h2 class="font-bold select-none" v-if="item.type === 'title'">
        {{ item.title }}
      </h2>
      <!-- label -->
      <label
        class="select-none"
        v-if="
          item.type === 'label' && (!item.targetTag || item.targetTag === '')
        "
        >{{ outputFortitle ? item.title : item.id }} : {{ item.label }}</label
      >

      <label
        class="select-none"
        v-if="item.type === 'label' && item.targetTag && item.targetTag !== ''"
        >{{ outputFortitle ? item.title : item.id }} :
        {{ tagCluster[item.targetTag] }}</label
      >
      <!-- textbox -->
      <input
        v-model.trim="formDataRef[outputFortitle ? item.title : item.id]"
        v-if="item.type === 'text'"
        class="w-full border-b-2 border-gray-600 placeholder-gray-600 bg-transparent sm:border-gray-400 px-4 pt-1 focus:outline-none"
        :placeholder="item.title"
        type="text"
      />
      <!-- password -->
      <input
        v-model.trim="formDataRef[outputFortitle ? item.title : item.id]"
        v-if="item.type === 'password'"
        class="w-full border-b-2 border-gray-600 placeholder-gray-600 bg-transparent sm:border-gray-400 px-4 pt-1 focus:outline-none"
        :placeholder="item.title"
        type="password"
      />
      <!-- email -->
      <input
        v-model.trim="formDataRef[outputFortitle ? item.title : item.id]"
        v-if="item.type === 'email'"
        class="w-full border-b-2 border-gray-600 placeholder-gray-600 bg-transparent sm:border-gray-400 px-4 pt-1 focus:outline-none"
        :placeholder="item.title"
        type="email"
      />
      <!-- datetimepicker -->
      <datetimepicker
        v-if="item.type === 'dateTimePicker'"
        @isinner="dateTimePickerCloseClick"
        v-model:isShowCalender="
          isShowCalenderRef[outputFortitle ? item.title : item.id]
        "
        :placeholder="item.title"
        v-model:maintext="formDataRef[outputFortitle ? item.title : item.id]"
        :dateSeparator="item.dateTimeFormat"
      ></datetimepicker>

      <!-- datetimepicker-hour-min -->
      <datetimepicker
        v-if="item.type === 'dateTimePicker-hour-min'"
        :leastUnit="2"
        @isinner="dateTimePickerCloseClick"
        v-model:isShowCalender="
          isShowCalenderRef[outputFortitle ? item.title : item.id]
        "
        :placeholder="item.title"
        v-model:maintext="formDataRef[outputFortitle ? item.title : item.id]"
        :dateSeparator="item.dateTimeFormat"
      ></datetimepicker>

      <!-- need append email validator -->
      <!-- dropdownlist -->
      <div class="flex items-center" v-if="item.type === 'ddl'">
        <label class="select-none" for>{{ item.title }}</label>
        <select
          @change="
            ddlChange($event, item.title, {
              tagName: item.tag,
              tagValue: $event.target.value,
            })
          "
          v-model="formDataRef[outputFortitle ? item.title : item.id]"
          class="ml-4 flex-1 border-b-2 bg-transparent focus:outline-none border-gray-500 px-2 py-1"
        >
          <option class="bg-white" value>please Select</option>
          <option
            v-for="ddlItem in ddlFilter(item.ddl, item.targetTag)"
            :key="ddlItem.value"
            class="bg-white"
            :value="ddlItem.value"
          >
            {{ ddlItem.title }}
          </option>
        </select>
      </div>
      <!-- checkbox -->
      <div v-if="item.type === 'checkbox'" class="flex items-center">
        <input
          v-model.trim="formDataRef[outputFortitle ? item.title : item.id]"
          :true-value="item.cb && item.cb.trueValue ? item.cb.trueValue : true"
          :false-value="
            item.cb && item.cb.falseValue ? item.cb.falseValue : false
          "
          :id="item.id + item.title"
          type="checkbox"
        />
        <label
          class="cursor-pointer text-xs ml-2"
          :for="item.id + item.title"
          >{{ item.title }}</label
        >
      </div>
      <!-- radiobox (when spare time) -->

      <!-- build a group append -->
      <div v-if="item.type === 'group'">
        <div class="flex items-center mt-6 mb-4">
          <h2 class="select-none font-bold">{{ item.title }}</h2>
          <button
            @click="groupAppend(item)"
            class="ml-6 bg-gray-500 focus:outline-none shadow-lg hover:bg-green-700 font-medium w-10 h-10 py-2 px-2 rounded-full"
          >
            +
          </button>
        </div>
        <div
          v-for="(groupObj, groupIndex) in formDataRef[
            outputFortitle ? item.title : item.id
          ]"
          :key="groupObj"
        >
          <h3 class="text-lg text-gray-800 mb-4">
            {{ item.title }} - {{ groupIndex + 1 }}
          </h3>
          <div
            v-for="paItem in groupObj"
            :key="paItem.gid"
            :class="marginMainStyle(paItem)"
          >
            <!-- textbox -->
            <input
              v-model.trim="paItem.content"
              v-if="
                groupPattern(item.groupPattern, paItem.title).type === 'text'
              "
              class="w-4/5 border-b-2 border-gray-600 placeholder-gray-600 bg-transparent sm:border-gray-400 px-4 pt-1 focus:outline-none"
              :placeholder="paItem.title"
              type="text"
            />
            <!-- password -->
            <input
              v-model.trim="paItem.content"
              v-if="
                groupPattern(item.groupPattern, paItem.title).type ===
                'password'
              "
              class="w-4/5 border-b-2 border-gray-600 placeholder-gray-600 bg-transparent sm:border-gray-400 px-4 pt-1 focus:outline-none"
              :placeholder="paItem.title"
              type="password"
            />
            <!-- email -->
            <input
              v-model.trim="paItem.content"
              v-if="
                groupPattern(item.groupPattern, paItem.title).type === 'email'
              "
              class="w-4/5 border-b-2 border-gray-600 placeholder-gray-600 bg-transparent sm:border-gray-400 px-4 pt-1 focus:outline-none"
              :placeholder="paItem.title"
              type="email"
            />
            <!-- datetimepicker -->
            <datetimepicker
              v-if="
                groupPattern(item.groupPattern, paItem.title).type ===
                'dateTimePicker'
              "
              @isinner="dateTimePickerCloseClick"
              v-model:isShowCalender="isShowCalenderRef[paItem.title]"
              v-model:maintext="paItem.content"
              :dateSeparator="item.dateTimeFormat"
            ></datetimepicker>
            <!-- dropdownlist -->
            <div
              v-if="
                groupPattern(item.groupPattern, paItem.title).type === 'ddl'
              "
            >
              <label for>{{ paItem.title }}</label>
              <select
                v-model="paItem.content"
                class="ml-4 border-b-2 bg-transparent focus:outline-none border-gray-500 px-2 py-1"
              >
                <option class="bg-white" value>please Select</option>
                <option
                  v-for="ddlpItem in ddlFilter(
                    groupPattern(item.groupPattern, paItem.title).ddl,
                    groupPattern(item.groupPattern, paItem.title).tag
                  )"
                  :key="ddlpItem.value"
                  class="bg-white"
                  :value="ddlpItem.value"
                >
                  {{ ddlpItem.title }}
                </option>
              </select>
            </div>
            <!-- checkbox -->
            <div
              v-if="
                groupPattern(item.groupPattern, paItem.title).type ===
                'checkbox'
              "
              class="flex items-center"
            >
              <input
                v-model.trim="paItem.content"
                :true-value="
                  groupPattern(item.groupPattern, paItem.title).cb &&
                  groupPattern(item.groupPattern, paItem.title).cb.trueValue
                    ? groupPattern(item.groupPattern, paItem.title).cb.trueValue
                    : true
                "
                :false-value="
                  groupPattern(item.groupPattern, paItem.title).cb &&
                  groupPattern(item.groupPattern, paItem.title).cb.falseValue
                    ? groupPattern(item.groupPattern, paItem.title).cb
                        .falseValue
                    : false
                "
                :id="paItem.title + item.title + item.id"
                type="checkbox"
              />
              <label
                class="cursor-pointer text-xs ml-2"
                :for="paItem.title + item.title + item.id"
                >{{ paItem.title }}</label
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto w-4/5 mb-2 flex justify-around">
      <button
        @click="btnClick(item.emitname, item.needSendData)"
        v-for="item in funcbtn"
        :key="item.id"
        :class="btnMainStyle(item.style)"
        class="focus:outline-none text-white font-medium py-2 px-4 rounded"
      >
        {{ item.title }}
      </button>
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
//     type: "title,label,text,password,ddl,datetimepicker,checkbox,radio,email",
//     margin: "small,medium,large,title",
//     ep: "bold,none",
//     label: "to set a label text",
//     ddl: [{ value, title, group<optional> }], // if type is ddl need this one
//     cb: { trueValue: "", falseValue: "" }, // if is checkbox apply this,
//     tag:"this tag is apply to ddl to get data and connection with targetTag"
//     targetTag:"this is change connect with tag"(currently can apply to ddl -> label and ddl -> ddl )
//   },
//
// this props is for target tag cluster to send data { "TestResult": "{id}" }
// tagCluster:{
//   "tageName":tagValue
// }
// ============================================================================
// ** iData group append pattern **
// in this append fixed patten
// iData: [
//   {
//     id: "id",
//     title: "multiple title",
//     type: "group",
//     margin: "small,medium,large,title",
//     groupPattern: [
//       {
//         gid: "id",
//         title: "placeholder",
//         type: "title,label,text,password,ddl,dateTimePicker,datetimepicker-hour-min,checkbox,radio,email",
//         margin: "small,medium,large,title",
//         ep: "bold,none",
//         label: "to set a label text",
//         ddl: [{ value, title }], // if type is ddl need this one
//         cb: { trueValue: "", falseValue: "" }, // if is checkbox apply this
//         dateTimeFormat:"-" // this if for datetimpicker
//         appendDefaultValue // this is append data default value
//       },
//     ],
//   },
// ];
// ============================================================================

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

// ddlemit : ddl change to emit
// params :
// ----------------------------------------------------------
// ** title : (ddl Title) String ,
// ** value : (selected ddl Value) String,Number
// ** tagData : { tagName , tagValue } Object
// **** tagValue : usually put id
// **** tagName : usually put target tagName
// ----------------------------------------------------------

// failresponse : emit error response

// ============================================================================
import { reactive, toRefs } from "vue";
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
    tagCluster: {
      default: () => {},
      type: Object,
    },
    funcbtn: {
      default: () => [],
      type: Array,
    },
  },
  setup(props, { emit }) {
    const mainFormCluster = reactive({
      formDataRef: {},
      isShowCalenderRef: {},
      btnClick: (emitName, needSendData = true) => {
        if (needSendData) {
          const isEmailType = [];
          props.iData.forEach((item) => {
            const key = props.outputFortitle ? item.title : item.id;
            if (item.type === "email") {
              isEmailType.push(key);
            }
            if (
              Object.keys(mainFormCluster.formDataRef).includes(key) ||
              item.type === "title"
            ) {
              return;
            }
            mainFormCluster.formDataRef[key] = "";
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
              if (
                mainFormCluster.formDataRef[emailKey] === "" ||
                config.validateEmail(mainFormCluster.formDataRef[emailKey])
              ) {
                return;
              }
              emailFail = true;
            });
            if (emailFail) {
              console.error("email Fail");
              emit("failresponse", "email format fail");
              return;
            }
          }

          emit(emitName, mainFormCluster.formDataRef);
          return;
        }
        emit(emitName);
      },
      ddlChange: (event, titlename, { tagName, tagValue }) => {
        if (tagName) {
          const targetddl = props.iData.find(
            (item) => item.targetTag && item.targetTag === tagName
          );
          mainFormCluster.formDataRef[
            props.outputFortitle ? targetddl.title : targetddl.id
          ] = "";
        }

        emit("ddlemit", {
          title: titlename,
          value: event.target.value,
          tagData: {
            tagName,
            tagValue,
          },
        });
      },
      groupPattern: (pattern, sampleTitle) => {
        return pattern.find(
          (item) =>
            (props.outputFortitle ? item.title : item.id) === sampleTitle
        );
      },
      marginMainStyle: (itemStyle) => {
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
          case "subtitle":
            initialStyle = "mt-10 mb-6";
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
      },
      btnMainStyle: (styleName) => {
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
      },
      groupAppend: (groupObjItem) => {
        const groupObj = props.iData.find(
          (item) => item.id === groupObjItem.id
        );
        const newData = [...groupObj.groupPattern];
        const newFit = newData.map((item) => {
          return {
            title: props.outputFortitle ? item.title : item.id,
            content:
              typeof item.appendDefaultValue !== "undefined"
                ? item.appendDefaultValue
                : "",
          };
        });

        mainFormCluster.formDataRef[
          props.outputFortitle ? groupObjItem.title : groupObjItem.id
        ].push(newFit);
      },
      ddlFilter: (ddlItem, tagName = null) => {
        const isNeedGroup = ddlItem.filter(
          (item) => item.group && item.group !== ""
        );
        if (isNeedGroup.length === 0 || !tagName) {
          return ddlItem;
        }

        const ddlClassify = ddlItem.map((item) => {
          if (typeof item.group !== "boolean" && !item.group) {
            item.status = "none";
          }
          return item;
        });

        if (!props.tagCluster || !props.tagCluster[tagName]) {
          return [];
        }

        return ddlClassify.filter(
          (item) => item.group === props.tagCluster[tagName]
        );
      },
      dateTimePickerCloseClick: (isFromInner) => {
        // console.log(isFromInner);
        isFromInner;
      },
    });

    if (props.defaultValue && props.defaultValue.length > 0) {
      const propsData = props.iData.map((item) => {
        return props.outputFortitle ? item.title : item.id;
      });

      props.defaultValue.forEach((item) => {
        if (propsData.includes(item.key)) {
          mainFormCluster.formDataRef[item.key] = item.value;
        }
      });
    }

    props.iData.forEach((item) => {
      const mainKey = props.outputFortitle ? item.title : item.id;
      if (item.type === "ddl") {
        mainFormCluster.formDataRef[mainKey] = "";
      }
      if (item.type === "label") {
        mainFormCluster.formDataRef[mainKey] = item.label;
      }
      if (item.type === "group") {
        if (!mainFormCluster.formDataRef[mainKey]) {
          const newFit = item.groupPattern.map((pitem) => {
            const subMainKey = props.outputFortitle ? pitem.title : pitem.id;
            return {
              title: subMainKey,
              content:
                typeof pitem.appendDefaultValue !== "undefined"
                  ? pitem.appendDefaultValue
                  : "",
            };
          });
          mainFormCluster.formDataRef[mainKey] = [newFit];
        }
      }
      if (item.type.indexOf("dateTimePicker") > -1) {
        mainFormCluster.isShowCalenderRef[mainKey] = false;
      }
    });

    // const cleardefaultValue = () => {
    //   props.iData[props.outputFortitle ? item.title : item.id]
    // }

    // ============================================================================
    // ddl group sample

    return {
      ...toRefs(mainFormCluster),
    };
  },
};
</script>