<template>
  <div>
    <dashboardtable :func="['update','delete','create']" :iData="userMainList"></dashboardtable>
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