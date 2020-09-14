<template>
  <div>
    <dashboardtable :func="['update','delete','create']" :iData="detectTypeMainList"></dashboardtable>
  </div>
</template>

<script>
import dashboardtable from "@/components/DashboardTable.vue";
import DoctorType from "@/api/DoctorType.js";

export default {
  name: "usertable",
  components: {
    dashboardtable,
  },
  async setup() {
    const doctorTypeModules = DoctorType();
    const { success } = await doctorTypeModules.getMainList();
    if (!success) {
      console.error("getMainList : get data");
      return;
    }
    return { ...doctorTypeModules };
  },
};
</script>

<style scoped lang="postcss">
</style>