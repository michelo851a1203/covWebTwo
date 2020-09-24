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
    const credentialData = credentialModule.credentialData;
    if (credentialData.name !== "" && credentialData.attributes.length > 0) {
      return { ...credentialModule, sendIssueFunc, alertComponent };
    }

    const oResult = await credentialModule.getCredDefinition();
    if (!oResult) {
      return;
    }

    const sendIssueFunc = async () => {
      const oResult = await credentialModule.sendIssue();
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
    });

    return {
      ...credentialModule,
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