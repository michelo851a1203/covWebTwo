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
                      currentMonthRef === selectMonthRef,
                    'text-gray-600':
                      allSetRef[col - 1 + (row - 1) * week.length].status !==
                      'Now',
                  }"
                >
                  {{ allSetRef[col - 1 + (row - 1) * week.length].mainDate }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
      setrowRef: null,
      allSetRef: null,
      inputData: (e) => {
        emit("update:maintext", e.target.value);
      },
      getNow: () => {
        const current = new Date(Date.now());
        const currentYear = current.getFullYear();
        let currentMonth = `${current.getMonth() + 1}`;
        let currentDay = `${current.getDate()}`;
        currentMonth =
          currentMonth.length === 1 ? `0${currentMonth}` : currentMonth;
        currentDay = currentDay.length === 1 ? `0${currentDay}` : currentDay;
        const nowFormat = `${currentYear}-${currentMonth}-${currentDay}`;
        dateTimePickerCluster.isHoverCalender(false);
        emit("update:maintext", nowFormat);
        datetimeInput.value.value = nowFormat;
      },
      isHoverCalender: (hover) => {
        emit("update:isShowCalender", hover);
        emit("isinner", true);
        if (!hover) {
          const expTest = /^\d{4}-\d{2}-\d{2}$/g.test(props.maintext);
          if (!expTest && props.maintext !== "") {
            window.alert("not correspond to dateformat");
            emit("update:maintext", "");
            datetimeInput.value.value = "";
          }
          datetimeInput.value.blur();
        }
      },
      clearCalender: () => {
        dateTimePickerCluster.isHoverCalender(false);
        emit("update:maintext", "");
        datetimeInput.value.value = "";
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
        const dateFmt = `${dateTimePickerCluster.selectYearRef}-${mainMonth}-${mainDate}`;
        emit("update:maintext", dateFmt);
        dateTimePickerCluster.isHoverCalender(false);
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