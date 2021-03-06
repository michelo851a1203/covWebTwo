import { reactive, toRefs, computed } from "vue"
import centerList from "@/api/global/testCenterList.js"

export default function TestCenterNavbar() {

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
        dataReset: () => {
            centerList.testCenterTrigger = false
            centerList.listLocX = 0
            centerList.listLocY = 0
        },
        testCenterTriggerFill: computed(() => centerList.testCenterTrigger ? "#2b6cb0" : "black")
    })

    return { ...toRefs(centerList), ...toRefs(TestCenterListRef) }
}