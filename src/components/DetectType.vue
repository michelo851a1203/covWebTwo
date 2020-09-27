<template>
  <div>
    <dashboardtable
      v-if="boardTitle === '' && boardiData.length === 0"
      addBtnName="add detect type"
      v-on="dashboardEvent"
      :func="['update', 'delete', 'create']"
      :iData="detectTypeMainList"
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
import DoctorType from "@/api/DoctorType.js";
import { reactive, toRefs, ref } from "vue";

export default {
  name: "detecttypetable",
  components: {
    dashboardtable,
    mainform,
  },
  async setup() {
    const doctorTypeModules = DoctorType();
    const { success } = await doctorTypeModules.getMainList();
    if (!success) {
      console.error("getMainList : get data");
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

    const addDetectfunc = () => {
      funcBoardRef.boardTitle = "add detecttype";
      funcBoardRef.boardiData = [
        {
          id: 1,
          title: "Test Type",
          type: "text",
          margin: "small",
        },
        {
          id: 2,
          title: "Normal Range",
          type: "text",
          margin: "small",
        },
        {
          id: 3,
          title: "CCT No.",
          type: "text",
          margin: "small",
        },
        {
          id: 4,
          title: "Test Result",
          type: "group",
          margin: "small",
          groupPattern: [
            {
              gid: 1,
              title: "name",
              type: "text",
              margin: "small",
            },
            {
              gid: 2,
              title: "type",
              type: "ddl",
              margin: "small",
              ddl: [
                {
                  value: 0,
                  title: "normal",
                },
                {
                  value: 1,
                  title: "abnormal",
                },
                {
                  value: 2,
                  title: "N/A",
                },
              ],
            },
            {
              gid: 3,
              title: "status",
              type: "ddl",
              margin: "small",
              ddl: [
                {
                  value: true,
                  title: "enable",
                },
                {
                  value: false,
                  title: "disable",
                },
              ],
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
          title: "add detect type",
          style: "info",
          emitname: "AddUser",
        },
      ];
    };

    const updateDetectFunc = (detectTypeId) => {
      funcBoardRef.boardTitle = "update detect type";
      funcBoardRef.boardiData = [
        {
          id: 1,
          title: "detectTypeId",
          type: "label",
          label: detectTypeId,
          margin: "small",
        },
        {
          id: 2,
          title: "Normal Range",
          type: "text",
          margin: "small",
        },
        {
          id: 3,
          title: "CCT No.",
          type: "text",
          margin: "small",
        },
        {
          id: 4,
          title: "Test Result",
          type: "group",
          margin: "small",
          groupPattern: [
            {
              gid: 1,
              title: "name",
              type: "text",
              margin: "small",
            },
            {
              gid: 2,
              title: "type",
              type: "ddl",
              margin: "small",
              ddl: [
                {
                  value: 0,
                  title: "normal",
                },
                {
                  value: 1,
                  title: "abnormal",
                },
                {
                  value: 2,
                  title: "N/A",
                },
              ],
            },
            {
              gid: 3,
              title: "status",
              type: "ddl",
              margin: "small",
              ddl: [
                {
                  value: true,
                  title: "enable",
                },
                {
                  value: false,
                  title: "disable",
                },
              ],
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
          title: "update detect type",
          style: "info",
          emitname: "UpdateUser",
        },
      ];

      const initialData = doctorTypeModules.detectTypeMainList.value.find(
        (item) => item.id === detectTypeId
      );

      const ddlArray = doctorTypeModules.testResultDdl.value[detectTypeId];

      funcBoardRef.updateDefault = [
        {
          key: "Normal Range",
          value: initialData["Normal Range"],
        },
        {
          key: "CCT No.",
          value: initialData["CCT No."],
        },
      ];
      if (ddlArray && ddlArray.length > 0) {
        const ddloData = ddlArray.map((item) => {
          return Object.keys(item)
            .filter((item) => item !== "_id")
            .sort()
            .map((iItem) => {
              return {
                title: iItem,
                content: item[iItem],
              };
            });
        });

        funcBoardRef.updateDefault.push({
          key: "Test Result",
          value: ddloData,
        });
      }
    };

    const addDataAction = async (iData) => {
      const { success } = await doctorTypeModules.AddDetectType({
        name: iData["Test Type"],
        normalRange: iData["Normal Range"],
        cctNo: iData["CCT No."],
        testResult: iData["Test Result"],
      });
      if (!success) {
        console.log("add detecttype fail");
        return;
      }
      clearFrom();
    };

    const updateDataAction = async (iData) => {
      const { success } = await doctorTypeModules.UpdateDetectType({
        detectTypeId: iData["detectTypeId"],
        normalRange: iData["Normal Range"],
        cctNo: iData["CCT No."],
      });
      if (!success) {
        console.log("update user fail");
        return;
      }
      clearFrom();
    };

    const dashboardEvent = ref({
      create: addDetectfunc,
      update: updateDetectFunc,
      delete: doctorTypeModules.DeleteDetectType,
    });

    const mainFromEvent = ref({
      clear: clearFrom,
      AddUser: addDataAction,
      UpdateUser: updateDataAction,
    });

    return {
      ...doctorTypeModules,
      ...toRefs(funcBoardRef),
      clearFrom,
      addDetectfunc,
      updateDetectFunc,
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