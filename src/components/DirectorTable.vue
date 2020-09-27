<template>
  <div>
    <dashboardtable
      v-if="boardTitle === '' && boardiData.length === 0"
      addBtnName="add director"
      v-on="dashboardEvent"
      :func="['update', 'delete', 'create']"
      :iData="directorMainList"
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
import Director from "@/api/Director.js"
import { reactive, toRefs, ref } from "vue";

export default {
  name: "directortable",
  components: {
    dashboardtable,
    mainform,
  },
  async setup() {
    const directorModules = Director();
    const { success } = await directorModules.getMainList();
    if (!success) {
      console.error("directorModules.getMainList : get data");
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
      funcBoardRef.boardTitle = "add director";
      funcBoardRef.boardiData = [
        {
          id: 1,
          title: "name",
          type: "text",
          margin: "small",
        },
        {
          id: 2,
          title: "email",
          type: "email",
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
          title: "add director",
          style: "info",
          emitname: "AddUser",
        },
      ];
    };

    const updateUserFunc = (directorId) => {
      funcBoardRef.boardTitle = "update director";
      funcBoardRef.boardiData = [
        {
          id: 1,
          title: "directorId",
          type: "label",
          label: directorId,
          margin: "small",
        },
        {
          id: 2,
          title: "email",
          type: "email",
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

      const initialData = directorModules.directorMainList.value.find(
        (item) => item.id === directorId
      );

      funcBoardRef.updateDefault = [
        {
          key: "email",
          value: initialData.email,
        },
      ];
    };

    const addDataAction = async (iData) => {

      const { success } = await directorModules.cDirector(iData);
      if (!success) {
        console.log("add user fail");
        return;
      }
      clearFrom();
    };

    const updateDataAction = async (iData) => {
      const { success } = await directorModules.uDirector(iData);
      if (!success) {
        console.log("update user fail");
        return;
      }
      clearFrom();
    };

    const dashboardEvent = ref({
      create: addUserfunc,
      update: updateUserFunc,
      delete: directorModules.dDirector,
    });

    const mainFromEvent = ref({
      clear: clearFrom,
      AddUser: addDataAction,
      UpdateUser: updateDataAction,
    });

    return {
      ...directorModules,
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