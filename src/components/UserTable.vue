<template>
  <div>
    <dashboardtable :func="['update','delete','create']" :iData="userMainList"></dashboardtable>
  </div>
</template>

<script>
import dashboardtable from "@/components/DashboardTable.vue";
import Admin from "@/api/Admin.js";

export default {
  name: "usertable",
  components: {
    dashboardtable,
  },
  async setup() {
    const adminModules = Admin();
    const { success } = await adminModules.getMainList();
    if (!success) {
      console.error("adminModules.getMainList : get data");
      return;
    }
    return { ...adminModules };
  },
};
</script>

<style scoped lang="postcss">
</style>