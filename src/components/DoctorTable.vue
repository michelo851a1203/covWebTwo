<template>
  <div>
    <div v-if="doctorMainList.length === 0" class="mb-4">
      <button
        class="ml-auto focus:outline-none bg-blue-300 hover:bg-blue-500 flex items-center font-medium px-2 rounded"
      >
        <div>
          <svg class="w-10" viewBox="0 0 96 96" style="enable-background:new 0 0 96 96;">
            <g>
              <path
                fill="black"
                d="M53.5,39.8h-33v5.5h33V39.8z M53.5,28.8h-33v5.5h33V28.8z M64.5,50.8v-11H59v11H48v5.5h11v11
        h5.5v-11h11v-5.5H64.5z M20.5,56.3h22v-5.5h-22V56.3z"
              />
            </g>
          </svg>
        </div>
        <div class="ml-1">add doctor</div>
      </button>
    </div>
    <dashboardtable :func="['update','delete','create']" :iData="doctorMainList"></dashboardtable>
  </div>
</template>

<script>
import dashboardtable from "@/components/DashboardTable.vue";
import Doctor from "@/api/Doctor.js";

export default {
  name: "usertable",
  components: {
    dashboardtable,
  },
  async setup() {
    const doctorModules = Doctor();
    const { success } = await doctorModules.getMainList();
    if (!success) {
      console.error("doctorModules.getMainList : get data");
      return;
    }
    return { ...doctorModules };
  },
};
</script>

<style scoped lang="postcss">
</style>