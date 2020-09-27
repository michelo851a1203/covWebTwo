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
        const ddlData = {}
        const oData = response.data.map(item => {
            const mainDate = new Date(item.createdAt)
            const tmpMonth = String(mainDate.getMonth() + 1)
            const tmpDate = String(mainDate.getDate())
            const yyyy = mainDate.getFullYear()
            const mm = tmpMonth.length === 1 ? `0${tmpMonth}` : tmpMonth
            const dd = tmpDate.length === 1 ? `0${tmpDate}` : tmpDate
            const createTime = `${yyyy}-${mm}-${dd}`

            if (item.data instanceof Array) {
                ddlData[item._id] = item.data
            }

            return {
                id: item._id,
                "Test Type": item.name,
                "Normal Range": item.normalRange,
                "CCT No.": item.cctNo,
                "Create Time": createTime
            }
        })
        // ============================================================================

        AdminState.testResultDdl = ddlData
        AdminState.detectTypeMainList = oData
        return {
            success: true,
        }
    }

    const AddDetectType = async ({ name, normalRange, cctNo, testResult }) => {
        if (!(testResult instanceof Array)) {
            return {
                success: false
            }
        }

        const combineData = testResult.map(mainObj => {
            const aData = {}
            mainObj.forEach(item => {
                aData[item.title] = item.content
            })
            return aData
        })

        const illegalArr = combineData.filter(item => typeof item.name !== "string" || !item.name || typeof item.type !== "string" || !item.type || typeof item.status !== "boolean")
        if (illegalArr.length > 0) {
            return {
                success: false,
            }
        }
        const response = await DoctorTypeModule.createDocTypeList({ name, normalRange, cctNo, testResult: combineData })
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

    const UpdateDetectType = async ({ detectTypeId, normalRange, cctNo, testResult }) => {
        if (typeof testResult !== "object") {
            return {
                success: false
            }
        }
        const illegalArr = testResult.filter(item => typeof item.name !== "string" || !item.name || typeof item.type !== "string" || !item.type || typeof item.status !== "boolean")
        if (illegalArr.length > 0) {
            return {
                success: false,
            }
        }
        const response = await DoctorTypeModule.updateDocTypeList(detectTypeId, { normalRange, cctNo, testResult })
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

    const getMainOne = async (detectTypeId) => {
        const response = await DoctorTypeModule.getDocTypeListOne(detectTypeId)
        if (!response || !response.success) {
            console.error("getDocTypeListOne error");
            return {
                success: false
            }
        }

        // ============================================================================

        const getData = response.data

        const mainDate = new Date(getData.createdAt)
        const tmpMonth = String(mainDate.getMonth() + 1)
        const tmpDate = String(mainDate.getDate())
        const yyyy = mainDate.getFullYear()
        const mm = tmpMonth.length === 1 ? `0${tmpMonth}` : tmpMonth
        const dd = tmpDate.length === 1 ? `0${tmpDate}` : tmpDate
        const createTime = `${yyyy}-${mm}-${dd}`

        const oData = {
            id: getData._id,
            "Test Type": getData.name,
            "Normal Range": getData.normalRange,
            "CCT No.": getData.cctNo,
            "Create Time": createTime
        }

        if (typeof (getData.data) !== "object" || !getData.data) {
            return {
                success: true,
                data: oData
            }
        }
        oData.ddlTestResult = getData.data
        return {
            success: true,
            data: oData
        }
    }
    return { ...toRefs(AdminState), getMainList, AddDetectType, UpdateDetectType, DeleteDetectType, getMainOne }

}