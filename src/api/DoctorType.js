import DoctorTypeModule from "./request/DoctorType.js";
import AdminState from "./global/admin.js"
import { toRefs } from "vue";

export default function DoctorType() {
    const getMainList = async () => {
        const response = await DoctorTypeModule.getDocTypeList()
        if (!response || !response.success) {
            console.error("getDocTypeList error");
            return {
                success: false
            }
        }

        console.group(`%c DoctorTypeModule`, 'color:yellow');
        console.log(response.data);
        console.groupEnd();
        // ============================================================================

        const oData = response.data.map(item => {
            const mainDate = new Date(item.createdAt)
            const tmpMonth = String(mainDate.getMonth() + 1)
            const tmpDate = String(mainDate.getDate())
            const yyyy = mainDate.getFullYear()
            const mm = tmpMonth.length === 1 ? `0${tmpMonth}` : tmpMonth
            const dd = tmpDate.length === 1 ? `0${tmpDate}` : tmpDate
            const createTime = `${yyyy}-${mm}-${dd}`
            return {
                id: item._id,
                displayName: item.displayName,
                Detect_Typename: item.Detect_Typename,
                role: item.role,
                createTime
            }
        })

        // ============================================================================

        AdminState.detectTypeMainList = oData
        return {
            success: true,
        }
    }
    return { ...toRefs(AdminState), getMainList }

}