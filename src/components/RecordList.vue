<template>
  <div class="flex flex-col items-center">
    <component
      v-if="currentCredStatus.title !== '' && currentCredStatus.status !== ''"
      @close="closeCredentialAlert"
      :currentstatus="currentCredStatus"
      :is="alertComponent"
    ></component>
    <mainform
      v-if="testCenterAttr.length > 0"
      :iData="testCenterAttr"
      :funcbtn="recordbtn"
      :tagCluster="tagRef"
      v-on="recordEvent"
    ></mainform>
  </div>
</template>

<script>
import Credential from "@/api/Credential.js";
import router from "@/router";
import alert from "@/components/Alert.vue";
import alertmobile from "@/components/Alertmobile.vue";
import config from "@/api/request/config.js";
import mainform from "@/components/MainForm.vue";
import Doctor from "@/api/Doctor.js";
import DoctorType from "@/api/DoctorType.js";
import Director from "@/api/Director.js";
import { ref } from "vue";
export default {
  name: "RecordList",
  components: {
    alert,
    alertmobile,
    mainform,
  },
  async setup() {
    const alertComponent = ref("alert");
    if (config.mobileCheck()) {
      alertComponent.value = "alertmobile";
    }

    const credentialModule = Credential();
    const doctorModule = Doctor();
    const doctorTypeModule = DoctorType();
    const directorModule = Director();

    const credentialData = credentialModule.credentialData;
    if (credentialData.name !== "" && credentialData.attributes.length > 0) {
      return { ...credentialModule, sendIssueFunc, alertComponent };
    }

    const oResult = await credentialModule.getCredDefinition();
    const {
      success: testTypeDdlSuccess,
    } = await doctorTypeModule.getMainList();

    const { success: doctorListSuccess } = await doctorModule.getMainList();
    const { success: directorListSuccess } = await directorModule.getMainList();
    if (!testTypeDdlSuccess) {
      console.error("test type ddl fail");
    }

    if (!doctorListSuccess) {
      console.error("doctor ddl fail");
    }

    if (!directorListSuccess) {
      console.error("dirctor ddl fail");
    }

    // here to get test type
    if (!oResult) {
      return;
    }

    const sendIssueFunc = async (iData) => {
      const oResult = await credentialModule.sendIssue(iData);
      if (!oResult.success) {
        credentialModule.normalCredentialAlert({
          title: oResult.msg,
          status: "fail",
        });
        return;
      }
      router.push("/report");
    };

    const recordbtn = ref([
      {
        id: 1,
        title: "Reset",
        style: "normal",
        emitname: "refill",
        needSendData: false,
      },
      {
        id: 2,
        title: "Issue",
        style: "info",
        emitname: "sendissue",
        needSendData: false,
      },
    ]);

    const recordEvent = ref({
      refill: credentialModule.refillRecord,
      sendissue: sendIssueFunc,
      ddlemit: doctorTypeModule.mainDdlChange,
    });

    return {
      ...credentialModule,
      ...doctorTypeModule,
      ...doctorModule,
      ...directorModule,
      sendIssueFunc,
      alertComponent,
      recordbtn,
      recordEvent,
    };
  },
};
</script>

<style scoped lang="postcss">
</style>