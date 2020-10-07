<template>
  <div class="relative">
    <input
      ref="datetimeInput"
      :value="maintext"
      :placeholder="placeholder"
      @input="inputData"
      @focus="isHoverCalender(true)"
      class="w-full border-b-2 border-gray-600 placeholder-gray-600 bg-transparent sm:border-gray-400 px-4 pt-1 focus:outline-none"
      type="text"
    />
    <transition name="fade">
      <div
        v-if="isShowCalender"
        @mouseleave="isHoverCalender(false)"
        class="calenderBorder fixed sm:absolute"
      >
        <div class="hidden sm:block px-4 mb-2">
          <button
            @click="getNow"
            class="w-full hover:bg-blue-500 bg-gray-500 focus:outline-none text-white font-medium py-1 px-2 rounded"
          >
            today
          </button>
        </div>
        <div class="flex items-center justify-around mb-2">
          <div class="flex items-center select-none">
            <div class="cursor-pointer" @click="switchYear('prev')">
              <svg class="w-4" viewBox="0 0 100 100">
                <polyline
                  points="65 20 30 50 65 80"
                  stroke-width="10"
                  stroke="black"
                  fill="transparent"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="select-none rounded px-2 py-1 shadow-lg mx-4">
              {{ selectYearRef }}
            </div>
            <div class="cursor-pointer" @click="switchYear('next')">
              <svg class="w-3" viewBox="0 0 100 100">
                <polyline
                  points="25,10 80,50 25,90"
                  stroke="black"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="transparent"
                />
              </svg>
            </div>
          </div>
          <div>
            <label class="mr-2" for>month</label>
            <select
              v-model="selectMonthRef"
              class="border rounded border-gray-500 px-2 py-1"
            >
              <option
                v-for="item in 12"
                :key="item"
                class="bg-white"
                :value="item"
              >
                {{ item }}
              </option>
            </select>
          </div>
        </div>
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-1" v-for="item in week" :key="item">{{ item }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in setrowRef" :key="row">
              <td class="text-center" v-for="col in week.length" :key="col">
                <div
                  @click="
                    dateClick(allSetRef[col - 1 + (row - 1) * week.length])
                  "
                  class="mx-auto rounded-full w-6 h-6 transition duration-100 ease-in-out hover:bg-blue-300 hover:shadow-2xl cursor-pointer"
                  :class="{
                    'bg-red-300':
                      currentDateRef ===
                        allSetRef[col - 1 + (row - 1) * week.length].mainDate &&
                      currentYearRef === selectYearRef &&
                      currentMonthRef === selectMonthRef &&
                      allSetRef[col - 1 + (row - 1) * week.length].status ===
                        'Now',
                    'text-gray-600':
                      allSetRef[col - 1 + (row - 1) * week.length].status !==
                      'Now',
                    'bg-blue-300': indicationisOkay(
                      allSetRef[col - 1 + (row - 1) * week.length]
                    ),
                  }"
                >
                  {{ allSetRef[col - 1 + (row - 1) * week.length].mainDate }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="leastUnit > 0"
          class="mx-auto flex mt-4 items-center justify-around"
        >
          <select
            v-model="selectHour"
            class="border rounded border-gray-500 shadow-lg px-2 py-1"
          >
            <option class="bg-white" value="0">Hour</option>
            <option
              v-for="(item, index) in 24"
              :key="item"
              class="bg-white"
              :value="index"
            >
              {{ index }}
            </option>
          </select>
          <select
            v-if="leastUnit > 1"
            v-model="selectMins"
            class="border rounded border-gray-500 shadow-lg px-2 py-1"
          >
            <option class="bg-white" value="0">Mins</option>
            <option
              v-for="(item, index) in 60"
              :key="item"
              class="bg-white"
              :value="index"
            >
              {{ index }}
            </option>
          </select>
          <select
            v-if="leastUnit > 2"
            v-model="selectSec"
            class="border rounded border-gray-500 px-2 py-1"
          >
            <option class="bg-white" value="">item1</option>
          </select>
        </div>
        <div class="mx-auto mt-4 w-full px-4">
          <button
            @click="clearCalender(false)"
            class="w-full bg-gray-500 hover:bg-blue-500 text-white font-medium py-1 px-2 rounded"
          >
            clear
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// ============================================================================
// <datetimepicker
//       @isinner="testClick"
//       v-model:isShowCalender="isShowCalenderRef"
//       v-model:maintext="mainDataRef"
// ></datetimepicker>

// isinner : tell if showCandler from inner
// maintext : Date Format
// isShowCalenderRef : is show Calender content
// ============================================================================
import { ref, watch, reactive, toRefs } from "vue";
export default {
  name: "datetimepicker",
  props: {
    // dateFmt text in textbox
    maintext: {
      type: String,
      default: "",
    },
    // show calender control
    isShowCalender: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: [String, Number],
      default: "",
    },
    leastUnit: {
      type: Number,
      default: 0,
      // 0 :date
      // 1 :hour
      // 2 :min
      // 3 :sec
    },
  },
  setup(props, { emit }) {
    const current = new Date();
    const datetimeInput = ref(null);

    const dateTimePickerCluster = reactive({
      week: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
      currentYearRef: current.getFullYear(),
      currentMonthRef: current.getMonth() + 1,
      currentDateRef: current.getDate(),
      selectYearRef: current.getFullYear(),
      selectMonthRef: current.getMonth() + 1,
      selectHour: 0,
      selectMins: 0,
      selectSec: 0,
      indicationRef: {
        year: null,
        month: null,
        day: null,
        status: null,
      },
      setrowRef: null,
      allSetRef: null,
      inputData: (e) => {
        emit("update:maintext", e.target.value);
      },
      getNow: () => {
        const current = new Date(Date.now());
        const currentYear = current.getFullYear();
        dateTimePickerCluster.selectYearRef = currentYear;
        dateTimePickerCluster.selectMonthRef = current.getMonth() + 1;
        let currentMonth = `${current.getMonth() + 1}`;
        let currentDay = `${current.getDate()}`;
        currentMonth =
          currentMonth.length === 1 ? `0${currentMonth}` : currentMonth;
        currentDay = currentDay.length === 1 ? `0${currentDay}` : currentDay;
        const nowFormat = `${currentYear}-${currentMonth}-${currentDay}`;
        dateTimePickerCluster.isHoverCalender(false);
        dateTimePickerCluster.indicationRef.year = null;
        dateTimePickerCluster.indicationRef.month = null;
        dateTimePickerCluster.indicationRef.day = null;
        dateTimePickerCluster.indicationRef.status = null;
        emit("update:maintext", nowFormat);
        // okay here try to solve all the problem
      },
      isHoverCalender: (hover) => {
        emit("update:isShowCalender", hover);
        emit("isinner", true);
        if (!hover) {
          let mainRegx = /^\d{4}-\d{2}-\d{2}$/g;
          switch (props.leastUnit) {
            case 1:
              mainRegx = /^\d{4}-\d{2}-\d{2} \d{2}$/g;
              break;
            case 2:
              mainRegx = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/g;
              break;
            case 3:
              mainRegx = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/g;
              break;
            default:
              break;
          }
          const expTest = mainRegx.test(props.maintext);
          if (!expTest && props.maintext !== "") {
            window.alert("not correspond to dateformat");
            emit("update:maintext", "");
            datetimeInput.value.value = "";
          }
          datetimeInput.value.blur();
        }
      },
      clearCalender: () => {
        const newCurrent = new Date();
        dateTimePickerCluster.selectYearRef = newCurrent.getFullYear();
        dateTimePickerCluster.selectMonthRef = newCurrent.getMonth() + 1;
        dateTimePickerCluster.isHoverCalender(false);
        emit("update:maintext", "");
        datetimeInput.value.value = "";
        dateTimePickerCluster.indicationRef.year = null;
        dateTimePickerCluster.indicationRef.month = null;
        dateTimePickerCluster.indicationRef.day = null;
        dateTimePickerCluster.indicationRef.status = null;
      },
      changeContent: (weekLen, chooseYear, chooseMonth) => {
        const numOfPreDate = new Date(chooseYear, chooseMonth - 1, 0).getDate();
        const numOfCurrentDate = new Date(chooseYear, chooseMonth, 0).getDate();
        const currentSet = Array.from({ length: numOfCurrentDate }, (_, i) => {
          return {
            mainDate: i + 1,
            status: "Now",
          };
        });

        // get first day of month is on what week
        const initDate = new Date();
        initDate.setDate(1);
        const firstDayWeek = initDate.getDay();

        // get last day of month is on what week
        const ultDate = new Date();
        ultDate.setDate(numOfCurrentDate);

        // calc the num of row
        const setLen = firstDayWeek + numOfCurrentDate;
        const rowLen = parseInt(setLen / weekLen);
        const isRest = setLen % weekLen;
        const setrow = isRest === 0 ? rowLen : rowLen + 1;

        // get the pastSet
        const pastMonthset = [];
        for (let i = 0; i < firstDayWeek; i++) {
          const pastValue = numOfPreDate - (firstDayWeek - i) + 1;
          pastMonthset.push({
            mainDate: pastValue,
            status: "prev",
          });
        }

        let allSet = [...pastMonthset, ...currentSet];

        if (isRest !== 0) {
          const lastLen = Array.from({ length: isRest }, (_, i) => {
            return {
              mainDate: i + 1,
              status: "next",
            };
          });
          allSet = [...allSet, ...lastLen];
        }

        return {
          firstDayWeek,
          setrow,
          allSet,
        };
      },
      switchYear: (cmd) => {
        if (cmd === "prev") {
          dateTimePickerCluster.selectYearRef =
            dateTimePickerCluster.selectYearRef - 1;
          return;
        }
        if (cmd === "next") {
          dateTimePickerCluster.selectYearRef =
            dateTimePickerCluster.selectYearRef + 1;
          return;
        }
      },
      dateClick: (iData) => {
        let chooseMonth = dateTimePickerCluster.selectMonthRef;
        if (iData.status === "prev") {
          chooseMonth = chooseMonth === 1 ? 12 : chooseMonth - 1;
        }
        if (iData.status === "next") {
          chooseMonth = chooseMonth === 12 ? 1 : chooseMonth + 1;
        }

        const mainMonth =
          `${chooseMonth}`.length === 1 ? `0${chooseMonth}` : `${chooseMonth}`;

        const mainDate =
          `${iData.mainDate}`.length === 1
            ? `0${iData.mainDate}`
            : `${iData.mainDate}`;
        let dateFmt = `${dateTimePickerCluster.selectYearRef}-${mainMonth}-${mainDate}`;

        dateTimePickerCluster.indicationRef.year =
          dateTimePickerCluster.selectYearRef;
        dateTimePickerCluster.indicationRef.month = chooseMonth;
        dateTimePickerCluster.indicationRef.day = iData.mainDate;
        dateTimePickerCluster.indicationRef.status = iData.status;

        if (props.leastUnit > 0) {
          const hour =
            `${dateTimePickerCluster.selectHour}`.length === 1
              ? `0${dateTimePickerCluster.selectHour}`
              : `${dateTimePickerCluster.selectHour}`;
          dateFmt += ` ${hour}`;

          if (props.leastUnit > 1) {
            const min =
              `${dateTimePickerCluster.selectMins}`.length === 1
                ? `0${dateTimePickerCluster.selectMins}`
                : `${dateTimePickerCluster.selectMins}`;
            dateFmt += `:${min}`;
          }

          if (props.leastUnit > 2) {
            const sec =
              `${dateTimePickerCluster.selectSec}`.length === 1
                ? `0${dateTimePickerCluster.selectSec}`
                : `${dateTimePickerCluster.selectSec}`;
            dateFmt += `:${sec}`;
          }
        }

        emit("update:maintext", dateFmt);
        dateTimePickerCluster.isHoverCalender(false);
      },
      indicationisOkay: (filterData) => {
        let mounthStatus = false;

        switch (dateTimePickerCluster.indicationRef.status) {
          case "now":
            mounthStatus =
              dateTimePickerCluster.indicationRef.month ===
              dateTimePickerCluster.selectMonthRef;
            break;
          case "prev": {
            const prevMonth = parseInt(dateTimePickerCluster.selectMonthRef);
            const preData = prevMonth === 1 ? 12 : prevMonth - 1;
            mounthStatus =
              parseInt(dateTimePickerCluster.indicationRef.month) === preData;
            break;
          }
          case "next": {
            const nextMonth = parseInt(dateTimePickerCluster.selectMonthRef);
            const nextData = nextMonth === 12 ? 1 : nextMonth + 1;
            mounthStatus =
              parseInt(dateTimePickerCluster.indicationRef.month) === nextData;
            break;
          }
          default:
            mounthStatus =
              dateTimePickerCluster.indicationRef.month ===
              dateTimePickerCluster.selectMonthRef;
            break;
        }
        return (
          props.maintext !== "" &&
          /^\d{4}-\d{2}-\d{2}$/g.test(props.maintext) &&
          props.maintext.split("-").length === 3 &&
          mounthStatus &&
          dateTimePickerCluster.indicationRef.year ===
            dateTimePickerCluster.selectYearRef &&
          dateTimePickerCluster.indicationRef.day === filterData.mainDate &&
          dateTimePickerCluster.indicationRef.status === filterData.status
        );
      },
    });

    const { setrow, allSet } = dateTimePickerCluster.changeContent(
      dateTimePickerCluster.week.length,
      dateTimePickerCluster.selectYearRef,
      dateTimePickerCluster.selectMonthRef
    );

    dateTimePickerCluster.setrowRef = setrow;
    dateTimePickerCluster.allSetRef = allSet;

    watch(
      () => dateTimePickerCluster.selectYearRef,
      (val) => {
        const { setrow, allSet } = dateTimePickerCluster.changeContent(
          dateTimePickerCluster.week.length,
          val,
          dateTimePickerCluster.selectMonthRef
        );
        dateTimePickerCluster.setrowRef = setrow;
        dateTimePickerCluster.allSetRef = allSet;
      }
    );

    watch(
      () => dateTimePickerCluster.selectMonthRef,
      (val) => {
        const { setrow, allSet } = dateTimePickerCluster.changeContent(
          dateTimePickerCluster.week.length,
          dateTimePickerCluster.selectYearRef,
          val
        );
        dateTimePickerCluster.setrowRef = setrow;
        dateTimePickerCluster.allSetRef = allSet;

        const mainRegx = /^\d{0,4}-\d{0,2}-\d{0,2}$/g;
        if (props.maintext !== "" && mainRegx.test(props.maintext)) {
          const newData = `${val}`.length === 1 ? `0${val}` : `${val}`;
          const replaceData = props.maintext.replace(
            /(^\d{0,4}-)\d{0,2}(-\d{0,2}$)/g,
            "$1" + newData + "$2"
          );
          emit("update:maintext", replaceData);
        }
      }
    );

    watch(
      () => dateTimePickerCluster.selectHour,
      (val) => {
        let mainRegx = /(^\d{0,4}-\d{2}-\d{2} )\d{2}($)/g;
        if (props.leastUnit === 2) {
          mainRegx = /(^\d{0,4}-\d{2}-\d{2} )\d{2}(:\d{2}$)/g;
        }
        if (props.leastUnit === 3) {
          mainRegx = /(^\d{0,4}-\d{2}-\d{2} )\d{2}(:\d{2}:\d{2})/g;
        }
        if (props.maintext !== "" && mainRegx.test(props.maintext)) {
          const oResult = `${val}`.length === 1 ? `0${val}` : `${val}`;
          const dateFmt = props.maintext.replace(
            mainRegx,
            "$1" + oResult + "$2"
          );
          emit("update:maintext", dateFmt);
        }
      }
    );

    watch(
      () => dateTimePickerCluster.selectMins,
      (val) => {
        let mainRegx = /(^\d{0,4}-\d{2}-\d{2} \d{2}:)\d{2}($)/g;
        if (props.leastUnit === 3) {
          mainRegx = /(^\d{0,4}-\d{2}-\d{2} \d{2}:)\d{2}(:\d{2})/g;
        }
        if (props.maintext !== "" && mainRegx.test(props.maintext)) {
          const oResult = `${val}`.length === 1 ? `0${val}` : `${val}`;
          const dateFmt = props.maintext.replace(
            mainRegx,
            "$1" + oResult + "$2"
          );
          emit("update:maintext", dateFmt);
        }
      }
    );

    watch(
      () => dateTimePickerCluster.selectSec,
      (val) => {
        const mainRegx = /(^\d{0,4}-\d{2}-\d{2} \d{2}:\d{2}:)\d{2}($)/g;
        if (props.maintext !== "" && mainRegx.test(props.maintext)) {
          const oResult = `${val}`.length === 1 ? `0${val}` : `${val}`;
          const dateFmt = props.maintext.replace(
            mainRegx,
            "$1" + oResult + "$2"
          );
          emit("update:maintext", dateFmt);
        }
      }
    );

    return {
      datetimeInput,
      ...toRefs(dateTimePickerCluster),
    };
  },
};
</script>

<style scoped lang="postcss">
.calenderBorder {
  @apply mt-1 z-50 py-4 rounded bg-gray-300 shadow-xl w-full;
  bottom: 0;
  left: 0;
}

@media only screen and (min-width: theme(screens.sm)) {
  .calenderBorder {
    @apply ml-1;
    bottom: unset;
    min-width: 18rem;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>