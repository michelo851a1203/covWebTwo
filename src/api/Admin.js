import AdminModule from "./request/Admin";
import AdminState from "./global/admin.js"

import { toRefs } from "vue"
export default function Admin() {
    // ============================================================================
    // ** navbar **
    const changeAdminComponent = (componentName) => {
        AdminState.navbarActive = componentName
    }
    // ============================================================================

    const getMainList = async () => {
        const response = await AdminModule.getUserListByAdmin()
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
                displayName: item.displayName,
                username: item.username,
                role: item.role,
                createTime
            }
        })
        // ============================================================================

        AdminState.userMainList = oData
        return {
            success: true,
        }
    }

    const adminAddUser = async ({ username, password, email, displayName, role }) => {
        const response = await AdminModule.createUserListByAdmin({ username, password, email, displayName, role })
        if (!response || !response.success) {
            console.error("adminAddUser error");
            return {
                success: false
            }
        }
        const { success } = await getMainList()
        return {
            success,
        }
    }

    const adminUpdateUser = async ({ userId, displayName }) => {
        const response = await AdminModule.updateUserListByAdmin({ userId, displayName })
        if (!response || !response.success) {
            console.error("adminUpdateUser error");
            return {
                success: false
            }
        }
        const { success } = await getMainList()
        return {
            success,
        }
    }

    const adminDeleteUser = async (ids) => {
        const response = await AdminModule.deleteUserListByAdmin(ids)
        if (!response || !response.success) {
            console.error("adminDeleteUser error");
            return {
                success: false
            }
        }
        const { success } = await getMainList()
        return {
            success,
        }
    }

    return { ...toRefs(AdminState), changeAdminComponent, getMainList, adminAddUser, adminUpdateUser, adminDeleteUser }

}