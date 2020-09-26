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
            console.log(action);
            if (!action) return;
            centerList.testCenterTrigger = false
        },
        testCenterTriggerFill: computed(() => centerList.testCenterTrigger ? "#2b6cb0" : "black")
    })

    return { ...toRefs(centerList), ...toRefs(TestCenterListRef) }
}