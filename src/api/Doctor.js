import DoctorModule from "./request/Doctor.js";
import AdminState from "./global/admin.js"
import { toRefs } from "vue";

export default function Doctor() {
    const getMainList = async () => {
        const response = await DoctorModule.getDoctorList()
        if (!response || !response.success) {
            console.error("getCredentialDetail error");
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
                clinic: item.clinic,
                name: item.name,
                email: item.email,
                zip: item.zip,
                city: item.city,
                address: item.address,
                createTime
            }
        })

        // ============================================================================

        AdminState.doctorMainList = oData
        return {
            success: true,
        }
    }

    const doctorAddUser = async ({ clinic, name, email, address, city, zip }) => {
        const response = await DoctorModule.createDoctorList({ clinic, name, email, address, city, zip })
        if (!response || !response.success) {
            console.error("doctorAddUser error");
            return {
                success: false
            }
        }
        const { success } = await getMainList()
        return {
            success,
        }
    }

    const doctorUpdateUser = async ({ doctorId, clinic, email, address, city, zip }) => {
        const response = await DoctorModule.updateDoctorList({ doctorId, clinic, email, address, city, zip })
        if (!response || !response.success) {
            console.error("doctorUpdateUser error");
            return {
                success: false
            }
        }
        const { success } = await getMainList()
        return {
            success,
        }
    }

    const doctorDeleteUser = async (ids) => {
        const response = await DoctorModule.deleteDoctorList(ids)
        if (!response || !response.success) {
            console.error("doctorDeleteUser error");
            return {
                success: false
            }
        }
        const { success } = await getMainList()
        return {
            success,
        }
    }

    return { ...toRefs(AdminState), getMainList, doctorAddUser, doctorUpdateUser, doctorDeleteUser }

}