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
                "Test Type": item.name,
                "Normal Range": item.normalRange,
                "CCT No.": item.cctNo,
                "Create Time": createTime
            }
        })

        // ============================================================================

        AdminState.detectTypeMainList = oData
        return {
            success: true,
        }
    }

    const AddDetectType = async ({ name, normalRange, cctNo }) => {
        const response = await DoctorTypeModule.createDocTypeList({ name, normalRange, cctNo })
        if (!response || !response.success) {
            console.error("AddDetectType error");
            return {
                success: false
            }
        }
        const { success } = await getMainList()
        return {
            success,
        }
    }

    const UpdateDetectType = async ({ detectTypeId, normalRange, cctNo }) => {
        const response = await DoctorTypeModule.updateDocTypeList(detectTypeId, { normalRange, cctNo })
        if (!response || !response.success) {
            console.error("UpdateDetectType error");
            return {
                success: false
            }
        }
        const { success } = await getMainList()
        return {
            success,
        }
    }

    const DeleteDetectType = async (ids) => {
        const response = await DoctorTypeModule.deleteDocTypeList(ids)
        if (!response || !response.success) {
            console.error("DeleteDetectType error");
            return {
                success: false
            }
        }
        const { success } = await getMainList()
        return {
            success,
        }
    }
    return { ...toRefs(AdminState), getMainList, AddDetectType, UpdateDetectType, DeleteDetectType }

}