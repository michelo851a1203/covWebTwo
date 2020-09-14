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

        console.group(`%c DoctorModule`, 'color:yellow');
        console.log(response.data);
        console.groupEnd();
        // ============================================================================

        // const oData = response.data.map(item => {
        //     const mainDate = new Date(item.createdAt)
        //     const tmpMonth = String(mainDate.getMonth() + 1)
        //     const tmpDate = String(mainDate.getDate())
        //     const yyyy = mainDate.getFullYear()
        //     const mm = tmpMonth.length === 1 ? `0${tmpMonth}` : tmpMonth
        //     const dd = tmpDate.length === 1 ? `0${tmpDate}` : tmpDate
        //     const createTime = `${yyyy}-${mm}-${dd}`
        //     return {
        //         id: item._id,
        //         displayName: item.displayName,
        //         username: item.username,
        //         role: item.role,
        //         createTime
        //     }
        // })

        // ============================================================================

        AdminState.doctorMainList = response.data
        return {
            success: true,
        }
    }

    return { ...toRefs(AdminState), getMainList }

}