<template>
  <div>
    <dashboardtable
      addBtnName="add doctor"
      :func="['update','delete','create']"
      @create="addDoctorfunc"
      @update="updateDoctorFunc"
      @delete="doctorDeleteUser"
      :iData="doctorMainList"
    ></dashboardtable>
    <mainform
      v-if="boardTitle !== '' && boardiData.length > 0"
      :outputFortitle="true"
      :iData="boardiData"
      :funcbtn="boardFunc"
      @clear="clearFrom"
      @AddUser="addDataAction"
      @UpdateUser="updateDataAction"
    ></mainform>
  </div>
</template>

<script>
import dashboardtable from "@/components/DashboardTable.vue";
import mainform from "@/components/MainForm.vue";
import Doctor from "@/api/Doctor.js";
import { reactive, toRefs } from "vue";

export default {
  name: "usertable",
  components: {
    dashboardtable,
    mainform,
  },
  async setup() {
    const doctorModules = Doctor();
    const { success } = await doctorModules.getMainList();
    if (!success) {
      console.error("doctorModules.getMainList : get data");
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

    const addDoctorfunc = () => {
      funcBoardRef.boardTitle = "add doctor";
      funcBoardRef.boardiData = [
        {
          id: 1,
          title: "clinic",
          type: "text",
          margin: "small",
        },
        {
          id: 2,
          title: "name",
          type: "text",
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
          title: "address",
          type: "text",
          margin: "small",
        },
        {
          id: 5,
          title: "city",
          type: "text",
          margin: "small",
        },
        {
          id: 6,
          title: "zip",
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
          title: "add user",
          style: "info",
          emitname: "AddDoctor",
        },
      ];
    };

    const updateDoctorFunc = (doctorId) => {
      funcBoardRef.boardTitle = "update Doctor Info";
      funcBoardRef.boardiData = [
        {
          id: 1,
          title: "doctorId",
          type: "label",
          label: doctorId,
          margin: "small",
        },
        {
          id: 2,
          title: "clinic",
          type: "text",
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
          title: "address",
          type: "text",
          margin: "small",
        },
        {
          id: 5,
          title: "city",
          type: "text",
          margin: "small",
        },
        {
          id: 6,
          title: "zip",
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
          title: "update Info",
          style: "info",
          emitname: "UpdateUser",
        },
      ];
    };

    const addDataAction = async (iData) => {
      const { success } = await doctorModules.doctorAddUser(iData);
      if (!success) {
        console.log("add user fail");
        return;
      }
      clearFrom();
    };

    const updateDataAction = async (iData) => {
      const { success } = await doctorModules.doctorUpdateUser(iData);
      if (!success) {
        console.log("update user fail");
        return;
      }
      clearFrom();
    };

    return {
      ...doctorModules,
      ...toRefs(funcBoardRef),
      clearFrom,
      addDoctorfunc,
      updateDoctorFunc,
      addDataAction,
      updateDataAction,
    };
  },
};
</script>

<style scoped lang="postcss">
</style>