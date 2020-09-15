<template>
  <div>
    <dashboardtable
      v-if="boardTitle === '' && boardiData.length === 0"
      addBtnName="add user"
      @create="addUserfunc"
      :func="['update','delete','create']"
      :iData="userMainList"
    ></dashboardtable>
    <mainform
      v-if="boardTitle !== '' && boardiData.length > 0"
      :outputFortitle="true"
      :iData="boardiData"
      :funcbtn="boardFunc"
      @clear="clearFrom"
      @AddUser="adminAddUser"
    ></mainform>
  </div>
</template>

<script>
import dashboardtable from "@/components/DashboardTable.vue";
import mainform from "@/components/MainForm.vue";
import Admin from "@/api/Admin.js";
import { reactive, toRefs } from "vue";

export default {
  name: "usertable",
  components: {
    dashboardtable,
    mainform,
  },
  async setup() {
    const adminModules = Admin();
    const { success } = await adminModules.getMainList();
    if (!success) {
      console.error("adminModules.getMainList : get data");
      return;
    }

    const funcBoardRef = reactive({
      boardTitle: "",
      boardiData: [],
      boardFunc: [],
    });
    const clearFrom = () => {
      funcBoardRef.boardTitle = "";
      funcBoardRef.boardiData = [];
      funcBoardRef.boardFunc = [];
    };

    const addUserfunc = () => {
      funcBoardRef.boardTitle = "add user";
      funcBoardRef.boardiData = [
        {
          id: 1,
          title: "username",
          type: "text",
          margin: "small",
        },
        {
          id: 2,
          title: "password",
          type: "password",
          margin: "small",
        },
        {
          id: 3,
          title: "email",
          type: "text",
          margin: "small",
        },
        {
          id: 4,
          title: "displayName",
          type: "text",
          margin: "small",
        },
        {
          id: 5,
          title: "role",
          type: "ddl",
          margin: "small",
          ddl: [
            {
              value: 2,
              title: "validator",
            },
            {
              value: 3,
              title: "Test Center",
            },
          ],
        },
      ];
      funcBoardRef.boardFunc = [
        {
          id: 1,
          title: "cancel",
          style: "normal",
          emitname: "clear",
          needSendData: false,
        },
        {
          id: 2,
          title: "add user",
          style: "info",
          emitname: "AddUser",
        },
      ];
    };

    return { ...adminModules, ...toRefs(funcBoardRef), clearFrom, addUserfunc };
  },
};
</script>

<style scoped lang="postcss">
</style>