import navTag from "@/api/global/navTag.js"
import centerList from "@/api/global/testCenterList.js"
import CredentialRequest from "@/api/request/Credential.js"
import { ref, watch, reactive, toRefs, computed } from "vue"
export default function navbar({ initial, role }) {
    const showTypeRef = ref(initial);
    const credStatusName = ref("Disable Credential")
    const showComponent = role === 1 ? "reportList".toLowerCase() : "verifyQrcode".toLowerCase()
    const list = ref([
        {
            id: 1,
            active: showTypeRef.value === "scanQrcode".toLowerCase(),
            type: "scan",
            role: [1, 2],
        },
        {
            id: 2,
            active: showTypeRef.value === showComponent,
            type: "qrcode",
            role: [1, 2],
        },
    ]);
    const changeTag = (reName) => {
        navTag.value = reName
    }
    const clickBelow = (id) => {
        const listIndex = list.value.findIndex((item) => item.id === id);
        if (listIndex === -1) {
            return;
        }
        list.value[listIndex].active = true;
        list.value.forEach((item) => {
            if (item.id !== id) {
                item.active = false;
            }
        });
        switch (list.value[listIndex].type) {
            case "scan":
                navTag.value = "scanQrcode"
                break;
            case "qrcode":
                navTag.value = "genQrcode"
                break;
            default:
                break;
        }
    }

    watch(navTag, () => {
        switch (navTag.value) {
            case "scanQrcode":
                showTypeRef.value = "scanQrcode".toLowerCase()
                break;
            case "genQrcode":
                showTypeRef.value = showComponent
                break;
            default:
                break;
        }
    })

    watch(credStatusName, async (val) => {
        const iData = val === "Disable Credential" ? true : false
        const response = await CredentialRequest.lockCredential(iData)
        if (!response.success) {
            console.log("success");
        }
    })

    const triggerEnableCredential = () => {
        const statusA = "Disable Credential"
        const statusB = "Enable Credential"
        credStatusName.value = credStatusName.value === statusA ? statusB : statusA
    }

    const TestCenterListRef = reactive({
        testCenterTriggerSwitch: (event) => {
            centerList.testCenterTrigger = true
            centerList.listLocX = event.pageX
            centerList.listLocY = event.pageY
        },
        testCenterListClose: (action) => {
            if (!action) return;
            centerList.testCenterTrigger = false
        },
        testCenterTriggerFill: computed(() => centerList.testCenterTrigger ? "#2b6cb0" : "black")
    })

    return { list, showTypeRef, navTag, credStatusName, ...toRefs(centerList), ...toRefs(TestCenterListRef), changeTag, clickBelow, triggerEnableCredential }
}