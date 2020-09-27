
import DirectorModule from "./request/Director.js"
import AdminState from "./global/admin.js"
import { toRefs } from "vue"
export default function Director() {
    const getMainList = async () => {
        const response = await DirectorModule.getDirectorList()
        if (!response || !response.success) {
            console.error("getMainList error");
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
                "Director Name": item.name,
                "Director Email": item.email,
                "Create Time": createTime
            }
        })

        // ============================================================================

        AdminState.directorMainList = oData
        return {
            success: true,
        }
    }

    const cDirector = async ({ name, email }) => {
        const response = await DirectorModule.createDirector({ name, email })
        if (!response || !response.success) {
            console.error("cDirector error");
            return {
                success: false
            }
        }
        const { success } = await getMainList()
        return {
            success,
        }
    }

    const uDirector = async ({ directorId, email }) => {
        const response = await DirectorModule.updateDirector({ directorId, email })
        if (!response || !response.success) {
            console.error("uDirector error");
            return {
                success: false
            }
        }
        const { success } = await getMainList()
        return {
            success,
        }
    }

    const dDirector = async (ids) => {
        const response = await DirectorModule.deleteDirector(ids)
        if (!response || !response.success) {
            console.error("dDirector error");
            return {
                success: false
            }
        }
        const { success } = await getMainList()
        return {
            success,
        }
    }

    return { ...toRefs(AdminState), getMainList, cDirector, uDirector, dDirector }


}