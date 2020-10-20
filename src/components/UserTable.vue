<template>
  <div>
    <dashboardtable
      v-if="boardTitle === '' && boardiData.length === 0"
      addBtnName="add user"
      v-on="dashboardEvent"
      :canCopiedCol="['ID']"
      :func="['update', 'delete', 'create']"
      :iData="userMainList"
    ></dashboardtable>
    <mainform
      v-if="boardTitle !== '' && boardiData.length > 0"
      :outputFortitle="true"
      :iData="boardiData"
      :funcbtn="boardFunc"
      :defaultValue="updateDefault"
      v-on="mainFromEvent"
    ></mainform>
  </div>
</template>

<script>
import dashboardtable from "@/components/DashboardTable.vue";
import mainform from "@/components/MainForm.vue";
import Admin from "@/api/Admin.js";
import { reactive, toRefs, ref } from "vue";

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
      updateDefault: [],
    });

    const clearFrom = () => {
      funcBoardRef.boardTitle = "";
      funcBoardRef.boardiData = [];
      funcBoardRef.boardFunc = [];
      funcBoardRef.updateDefault = [];
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
          type: "email",
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

    const updateUserFunc = (userId) => {
      funcBoardRef.boardTitle = "update user";
      funcBoardRef.boardiData = [
        {
          id: 1,
          title: "userId",
          type: "label",
          label: userId,
          margin: "small",
        },
        {
          id: 2,
          title: "displayName",
          type: "text",
          margin: "small",
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
          title: "update user",
          style: "info",
          emitname: "UpdateUser",
        },
      ];

      const initialData = adminModules.userMainList.value.find(
        (item) => item.id === userId
      );

      funcBoardRef.updateDefault = [
        {
          key: "displayName",
          value: initialData.displayName,
        },
      ];
    };

    const addDataAction = async (iData) => {
      const { success } = await adminModules.adminAddUser(iData);
      if (!success) {
        console.log("add user fail");
        return;
      }
      clearFrom();
    };

    const updateDataAction = async (iData) => {
      const { success } = await adminModules.adminUpdateUser(iData);
      if (!success) {
        console.log("update user fail");
        return;
      }
      clearFrom();
    };

    const dashboardEvent = ref({
      create: addUserfunc,
      update: updateUserFunc,
      delete: adminModules.adminDeleteUser,
    });

    const mainFromEvent = ref({
      clear: clearFrom,
      AddUser: addDataAction,
      UpdateUser: updateDataAction,
    });

    return {
      ...adminModules,
      ...toRefs(funcBoardRef),
      clearFrom,
      addUserfunc,
      updateUserFunc,
      addDataAction,
      updateDataAction,
      dashboardEvent,
      mainFromEvent,
    };
  },
};
</script>

<style scoped lang="postcss">
</style>