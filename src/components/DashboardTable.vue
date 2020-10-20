<template>
  <div>
    <div class="hidden sm:block">
      <table
        class="table-auto select-none w-full shadow-lg"
        v-if="iData.length > 0"
      >
        <thead>
          <tr>
            <th class="border px-3 py-2" v-if="!funcReadOnly">
              <div class="flex items-center justify-center">
                <button
                  v-if="func.includes('delete')"
                  @click="multipleClick('delete')"
                  class="focus:outline-none bg-transparent outline-none font-medium rounded"
                >
                  <svg class="w-6" viewBox="0 0 100 100">
                    <path
                      stroke="black"
                      stroke-width="5"
                      fill="transparent"
                      d="M20,25 v50 a20,20 0 0 0 20,20 h20 a20,20 0 0 0 20,-20 v-50"
                    />
                    <line
                      stroke-linecap="round"
                      stroke="black"
                      stroke-width="5"
                      x1="12"
                      y1="25"
                      x2="88"
                      y2="25"
                    />
                    <path
                      stroke="black"
                      stroke-width="5"
                      fill="transparent"
                      d="M35,25 v-10 a5,5 0 0 1 5,-5 h20 a 5,5 0 0 1 5,5 v10"
                    />
                    <line
                      stroke-linecap="round"
                      stroke="black"
                      stroke-width="5"
                      x1="35"
                      y1="45"
                      x2="35"
                      y2="75"
                    />
                    <line
                      stroke-linecap="round"
                      stroke="black"
                      stroke-width="5"
                      x1="50"
                      y1="45"
                      x2="50"
                      y2="75"
                    />
                    <line
                      stroke-linecap="round"
                      stroke="black"
                      stroke-width="5"
                      x1="65"
                      y1="45"
                      x2="65"
                      y2="75"
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th class="border px-3 py-2" v-for="item in title" :key="item">
              {{ item }}
            </th>
            <th class="border" v-if="!funcReadOnly">
              <div class="flex items-center justify-center">
                <button
                  @click="funcClick('create', -1)"
                  v-if="func.includes('create')"
                  class="focus:outline-none outline-none text-white font-medium rounded"
                >
                  <svg class="w-10" viewBox="0 0 96 96">
                    <g>
                      <path
                        fill="black"
                        d="M53.5,39.8h-33v5.5h33V39.8z M53.5,28.8h-33v5.5h33V28.8z M64.5,50.8v-11H59v11H48v5.5h11v11
                h5.5v-11h11v-5.5H64.5z M20.5,56.3h22v-5.5h-22V56.3z"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody @mouseleave="rowMouse(false)">
          <tr
            @mousedown="rowMouse(true, $event, item.id)"
            @mouseup="rowMouse(false, $event)"
            @mouseenter="rowSelect(item.id)"
            :class="{ 'bg-gray-300': selectedRef.includes(item.id) }"
            v-for="item in iData"
            :key="item.id"
          >
            <td class="border px-3 py-2" v-if="!funcReadOnly">
              <div class="flex items-center justify-center">
                <input v-model="selectedRef" :value="item.id" type="checkbox" />
              </div>
            </td>
            <td
              class="border px-3 py-2"
              v-for="colItem in title"
              :key="colItem"
            >
              <div class="flex items-bottom space-x-4">
                <div>
                  {{ item[colItem] }}
                </div>
                <CopiedTip
                  v-if="canCopiedCol.includes(colItem)"
                  :bindData="item[colItem]"
                  @actionevent="copiedClick"
                  tipText="copied"
                ></CopiedTip>
              </div>
            </td>
            <td class="px-3 border" v-if="!funcReadOnly">
              <div class="flex items-center justify-center">
                <button
                  v-if="func.includes('update')"
                  @click="funcClick('update', item.id)"
                  class="focus:outline-none bg-transparent outline-none font-medium py-2 px-1 rounded"
                >
                  <svg class="w-4" viewBox="0 0 1000 1000">
                    <g>
                      <path
                        d="M984.1,122.3C946.5,84.5,911.4,42.1,867.8,11c-40-8.3-59.2,34.9-86.7,55.1c46.4,53.9,100.5,101.5,150.4,152.5C954.1,191.7,1007.7,164.1,984.1,122.3z M959.3,325.9c-31.7,31.8-64.5,62.8-95.1,95.8c-0.8,127.5,0.3,255-0.4,382.6c-0.6,47-41.8,88.7-88.8,90.3c-193.4,0.8-387,0.8-580.4,0.1c-52.2-1.4-94-51.4-89.9-102.7c-0.1-184.6-0.1-369.1,0-553.5c-4-51.1,38-100.3,89.6-102.1c128.1-1.7,256.3,0.1,384.3-0.9c33.2-30,63.9-62.9,95.7-94.5c-170.6,0-341-0.9-511.6,0.5c-79.6,1.4-151,71-152.4,151C10.1,407.7,9.5,622.8,10.7,838c0.3,77.5,66.1,144.7,142.4,152h670.2c72.3-12.7,134.3-75.8,135.2-150.9C960.7,668.1,959,496.9,959.3,325.9z M908.2,242.2C858,191.7,807.4,141.5,756.6,91.5C645.4,201.9,534,312,423.4,423c50.1,50.4,100.4,100.6,151.3,150.3C686,463.1,797.2,352.6,908.2,242.2z M341.2,654.6c68.1-18.5,104.4-30.2,172.5-48.5c18.2-5.8,30.3-9.3,39.7-13c-48.2-45.9-103.6-102.5-151.7-148.8C381.4,514.4,361.4,584.5,341.2,654.6z"
                      />
                    </g>
                  </svg>
                </button>
                <button
                  v-if="func.includes('delete')"
                  @click="funcClick('delete', item.id)"
                  class="focus:outline-none bg-transparent outline-none font-medium py-2 px-1 rounded"
                >
                  <svg class="w-6" viewBox="0 0 100 100">
                    <path
                      stroke="black"
                      stroke-width="5"
                      fill="transparent"
                      d="M20,25 v50 a20,20 0 0 0 20,20 h20 a20,20 0 0 0 20,-20 v-50"
                    />
                    <line
                      stroke-linecap="round"
                      stroke="black"
                      stroke-width="5"
                      x1="12"
                      y1="25"
                      x2="88"
                      y2="25"
                    />
                    <path
                      stroke="black"
                      stroke-width="5"
                      fill="transparent"
                      d="M35,25 v-10 a5,5 0 0 1 5,-5 h20 a 5,5 0 0 1 5,5 v10"
                    />
                    <line
                      stroke-linecap="round"
                      stroke="black"
                      stroke-width="5"
                      x1="35"
                      y1="45"
                      x2="35"
                      y2="75"
                    />
                    <line
                      stroke-linecap="round"
                      stroke="black"
                      stroke-width="5"
                      x1="50"
                      y1="45"
                      x2="50"
                      y2="75"
                    />
                    <line
                      stroke-linecap="round"
                      stroke="black"
                      stroke-width="5"
                      x1="65"
                      y1="45"
                      x2="65"
                      y2="75"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="shadow-2xl flex justify-center items-center bg-gray-200 text-center px-6 py-4"
        v-else
      >
        <div class="select-none animate-bounce">no Data</div>
        <button
          @click="funcClick('create', -1)"
          v-if="!funcReadOnly && func.includes('create')"
          class="flex items-center ml-4 bg-blue-300 focus:outline-none hover:bg-blue-500 px-3 font-medium rounded"
        >
          <div>
            <svg
              class="w-10"
              viewBox="0 0 96 96"
              style="enable-background: new 0 0 96 96"
            >
              <g>
                <path
                  fill="black"
                  d="M53.5,39.8h-33v5.5h33V39.8z M53.5,28.8h-33v5.5h33V28.8z M64.5,50.8v-11H59v11H48v5.5h11v11
        h5.5v-11h11v-5.5H64.5z M20.5,56.3h22v-5.5h-22V56.3z"
                />
              </g>
            </svg>
          </div>
          <div class="ml-1">{{ addBtnName }}</div>
        </button>
      </div>
    </div>
    <div
      v-if="iData.length > 0"
      class="sm:hidden mb-24 w-11/12 mx-auto space-y-5"
    >
      <div
        v-if="!funcReadOnly"
        class="bg-gray-300 flex items-center justify-end px-2 py-1 rounded select-none w-full shadow-xl"
      >
        <button
          @click="funcClick('create', -1)"
          v-if="func.includes('create')"
          class="focus:outline-none outline-none text-white font-medium rounded"
        >
          <svg class="w-10" viewBox="0 0 96 96">
            <g>
              <path
                fill="black"
                d="M53.5,39.8h-33v5.5h33V39.8z M53.5,28.8h-33v5.5h33V28.8z M64.5,50.8v-11H59v11H48v5.5h11v11
                h5.5v-11h11v-5.5H64.5z M20.5,56.3h22v-5.5h-22V56.3z"
              />
            </g>
          </svg>
        </button>
      </div>
      <div
        v-for="item in iData"
        :key="item.id"
        class="px-6 py-4 rounded select-none w-full shadow-xl"
      >
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th colspan="2">
                <div
                  class="rounded bg-gray-300 -mx-6 -mt-4 px-3 py-2 flex items-center justify-end space-x-4"
                >
                  <button
                    v-if="func.includes('update') && !funcReadOnly"
                    @click="funcClick('update', item.id)"
                    class="focus:outline-none bg-transparent outline-none font-medium py-2 px-1 rounded"
                  >
                    <svg class="w-4" viewBox="0 0 1000 1000">
                      <g>
                        <path
                          d="M984.1,122.3C946.5,84.5,911.4,42.1,867.8,11c-40-8.3-59.2,34.9-86.7,55.1c46.4,53.9,100.5,101.5,150.4,152.5C954.1,191.7,1007.7,164.1,984.1,122.3z M959.3,325.9c-31.7,31.8-64.5,62.8-95.1,95.8c-0.8,127.5,0.3,255-0.4,382.6c-0.6,47-41.8,88.7-88.8,90.3c-193.4,0.8-387,0.8-580.4,0.1c-52.2-1.4-94-51.4-89.9-102.7c-0.1-184.6-0.1-369.1,0-553.5c-4-51.1,38-100.3,89.6-102.1c128.1-1.7,256.3,0.1,384.3-0.9c33.2-30,63.9-62.9,95.7-94.5c-170.6,0-341-0.9-511.6,0.5c-79.6,1.4-151,71-152.4,151C10.1,407.7,9.5,622.8,10.7,838c0.3,77.5,66.1,144.7,142.4,152h670.2c72.3-12.7,134.3-75.8,135.2-150.9C960.7,668.1,959,496.9,959.3,325.9z M908.2,242.2C858,191.7,807.4,141.5,756.6,91.5C645.4,201.9,534,312,423.4,423c50.1,50.4,100.4,100.6,151.3,150.3C686,463.1,797.2,352.6,908.2,242.2z M341.2,654.6c68.1-18.5,104.4-30.2,172.5-48.5c18.2-5.8,30.3-9.3,39.7-13c-48.2-45.9-103.6-102.5-151.7-148.8C381.4,514.4,361.4,584.5,341.2,654.6z"
                        />
                      </g>
                    </svg>
                  </button>
                  <button
                    v-if="func.includes('delete') && !funcReadOnly"
                    @click="funcClick('delete', item.id)"
                    class="focus:outline-none bg-transparent outline-none font-medium rounded"
                  >
                    <svg class="w-6" viewBox="0 0 100 100">
                      <path
                        stroke="black"
                        stroke-width="5"
                        fill="transparent"
                        d="M20,25 v50 a20,20 0 0 0 20,20 h20 a20,20 0 0 0 20,-20 v-50"
                      />
                      <line
                        stroke-linecap="round"
                        stroke="black"
                        stroke-width="5"
                        x1="12"
                        y1="25"
                        x2="88"
                        y2="25"
                      />
                      <path
                        stroke="black"
                        stroke-width="5"
                        fill="transparent"
                        d="M35,25 v-10 a5,5 0 0 1 5,-5 h20 a 5,5 0 0 1 5,5 v10"
                      />
                      <line
                        stroke-linecap="round"
                        stroke="black"
                        stroke-width="5"
                        x1="35"
                        y1="45"
                        x2="35"
                        y2="75"
                      />
                      <line
                        stroke-linecap="round"
                        stroke="black"
                        stroke-width="5"
                        x1="50"
                        y1="45"
                        x2="50"
                        y2="75"
                      />
                      <line
                        stroke-linecap="round"
                        stroke="black"
                        stroke-width="5"
                        x1="65"
                        y1="45"
                        x2="65"
                        y2="75"
                      />
                    </svg>
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="colItem in title" :key="colItem">
              <th class="w-1/3 px-2 py-1">{{ colItem }}</th>
              <td class="break-all">
                <div class="flex items-center space-x-4">
                  <div>
                    {{ item[colItem] }}
                  </div>
                  <CopiedTip
                    v-if="canCopiedCol.includes(colItem)"
                    :bindData="item[colItem]"
                    @actionevent="copiedClick"
                    tipText="copied"
                  ></CopiedTip>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-else
      class="sm:hidden bg-gray-300 flex items-center justify-end px-2 py-1 space-x-5 rounded select-none w-full shadow-xl"
    >
      <div class="select-none animate-bounce">no Data</div>
      <button
        @click="funcClick('create', -1)"
        v-if="func.includes('create')"
        class="focus:outline-none outline-none text-white font-medium rounded"
      >
        <svg class="w-10" viewBox="0 0 96 96">
          <g>
            <path
              fill="black"
              d="M53.5,39.8h-33v5.5h33V39.8z M53.5,28.8h-33v5.5h33V28.8z M64.5,50.8v-11H59v11H48v5.5h11v11
                h5.5v-11h11v-5.5H64.5z M20.5,56.3h22v-5.5h-22V56.3z"
            />
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
// ============================================================================
// funcReadOnly // only see no function
// iData:[], // append content with table
// func : [update,delete,create] // append to solve all
// addBtnName : ""
// ============================================================================
import CopiedTip from "@/components/CopiedTip.vue";
import { reactive, computed, toRefs } from "vue";
export default {
  name: "dashboardTable",
  components: {
    CopiedTip,
  },
  props: {
    canCopiedCol: {
      default: () => [],
      type: Array,
    },
    funcReadOnly: {
      default: false,
      type: Boolean,
    },
    func: {
      type: Array,
      default: () => [],
    },
    iData: {
      type: Array,
      default: () => [],
    },
    addBtnName: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const tableCluster = reactive({
      isTrigger: false,
      selectedRef: [],
      rowMouse: (trigger, event = null, id = -1) => {
        if (event) {
          const element = event.target;
          if (element.tagName === "INPUT") {
            return;
          }
        }
        tableCluster.isTrigger = trigger;
        if (trigger && id !== -1) {
          tableCluster.rowClick(id);
        }
      },
      rowClick: (id) => {
        if (tableCluster.selectedRef.includes(id)) {
          const modelIndex = tableCluster.selectedRef.findIndex(
            (item) => item === id
          );
          tableCluster.selectedRef.splice(modelIndex, 1);
          return;
        }
        tableCluster.selectedRef.push(id);
      },
      rowSelect: (id) => {
        if (!tableCluster.isTrigger) {
          return;
        }
        tableCluster.rowClick(id);
      },
      funcClick: (type, id) => {
        emit(type, id);
      },
      multipleClick: (type) => {
        emit(type, tableCluster.selectedRef);
      },
      copiedClick: (bindData) => {
        const el = document.createElement("textarea");
        el.value = bindData;
        el.setAttribute("readonly", "");
        el.style = { position: "absolute", left: "-9999px" };
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      },
      title: computed(() => {
        if (props.iData.length === 0) {
          return [];
        }
        const mainTitle = [];
        props.iData.forEach((item) => {
          Object.keys(item).forEach((colItem) => {
            if (!mainTitle.includes(colItem) && colItem !== "id") {
              mainTitle.push(colItem);
            }
          });
        });
        return mainTitle;
      }),
    });
    return {
      ...toRefs(tableCluster),
    };
  },
};
</script>

<style scoped lang="postcss">
</style>