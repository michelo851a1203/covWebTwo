<template>
  <div>
    <dashboardtable
      v-if="boardTitle === '' && boardiData.length === 0"
      addBtnName="add doctor"
      :func="['update', 'delete', 'create']"
      v-on="dashboardEvent"
      :iData="doctorMainList"
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
import Doctor from "@/api/Doctor.js";
import { reactive, toRefs, ref } from "vue";

export default {
  name: "doctortable",
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
      updateDefault: [],
    });

    const clearFrom = () => {
      funcBoardRef.boardTitle = "";
      funcBoardRef.boardiData = [];
      funcBoardRef.boardFunc = [];
      funcBoardRef.updateDefault = [];
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
          title: "add doctor",
          style: "info",
          emitname: "AddUser",
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
          title: "Clinic Name",
          type: "text",
          margin: "small",
        },
        {
          id: 3,
          title: "Name",
          type: "text",
          margin: "small",
        },
        {
          id: 4,
          title: "Doctor Email",
          type: "text",
          margin: "small",
        },
        {
          id: 5,
          title: "Address",
          type: "text",
          margin: "small",
        },
        {
          id: 6,
          title: "City",
          type: "text",
          margin: "small",
        },
        {
          id: 7,
          title: "Zip",
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

      const initialData = doctorModules.doctorMainList.value.find(
        (item) => item.id === doctorId
      );

      funcBoardRef.updateDefault = [
        {
          key: "Clinic Name",
          value: initialData["Clinic Name"],
        },
        {
          key: "Name",
          value: initialData["Doctor Name"],
        },
        {
          key: "Doctor Email",
          value: initialData["Doctor Email"],
        },
        {
          key: "Address",
          value: initialData["Address"],
        },
        {
          key: "City",
          value: initialData["City"],
        },
        {
          key: "Zip",
          value: initialData["Zip"],
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
      const { success } = await doctorModules.doctorUpdateUser({
        doctorId: iData["doctorId"],
        clinic: iData["Clinic Name"],
        name: iData["Name"],
        email: iData["Doctor Email"],
        address: iData["Address"],
        city: iData["City"],
        zip: iData["Zip"],
      });
      if (!success) {
        console.log("update user fail");
        return;
      }
      clearFrom();
    };

    const dashboardEvent = ref({
      create: addDoctorfunc,
      update: updateDoctorFunc,
      delete: doctorModules.doctorDeleteUser,
    });

    const mainFromEvent = ref({
      clear: clearFrom,
      AddUser: addDataAction,
      UpdateUser: updateDataAction,
    });

    return {
      ...doctorModules,
      ...toRefs(funcBoardRef),
      clearFrom,
      addDoctorfunc,
      updateDoctorFunc,
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