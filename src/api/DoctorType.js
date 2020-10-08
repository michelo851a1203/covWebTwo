import DoctorTypeModule from "./request/DoctorType.js";
import AdminState from "./global/admin.js"
import { ref, toRefs } from "vue";

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

    const AddDetectType = async ({ name, cctNo, testResult }) => {
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
        const illegalArr = combineData.filter(item => typeof item.name !== "string" || !item.name || typeof item.type !== "number" || typeof item.status !== "boolean")
        if (illegalArr.length > 0) {
            return {
                success: false,
            }
        }
        const response = await DoctorTypeModule.createDocTypeList({ name, cctNo, testResult: combineData })
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

    const UpdateDetectType = async ({ detectTypeId, cctNo, testResult }) => {
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

        const illegalArr = combineData.filter(item => typeof item.name !== "string" || !item.name || typeof item.type !== "number" || typeof item.status !== "boolean")
        if (illegalArr.length > 0) {
            return {
                success: false,
            }
        }
        const response = await DoctorTypeModule.updateDocTypeList(detectTypeId, { cctNo, testResult: combineData })
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

    const tagRef = ref({})
    const mainDdlChange = ({ title, value, tagData }) => {
        if (!value || value === "") {
            tagRef.value[tagData.tagName] = null
            return
        }
        if (title === "Test Type") {
            const testTypeObj = AdminState.detectTypeMainList.find(item => item["id"] === tagData.tagValue)
            if (!testTypeObj) {
                tagRef.value[tagData.tagName] = null
            }
            tagRef.value[tagData.tagName] = testTypeObj.id
        }

        if (title === "Referred Doctor") {
            const targetTag = tagData.tagName
            const selectedValue = tagData.tagValue

            const emailObj = AdminState.doctorMainList.find(item => item.id === selectedValue)
            if (emailObj) {
                console.log(emailObj);
                emailObj["Doctor Email"]
                tagRef.value[targetTag] = emailObj["Doctor Email"]
            }
        }

    };
    return { ...toRefs(AdminState), getMainList, AddDetectType, UpdateDetectType, DeleteDetectType, getMainOne, tagRef, mainDdlChange }

}