import config from "./config.js"
export default {
    // 系統管理員: 取得使用者列表
    getUserListByAdmin: async () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/user`
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const userListData = await response.json()
            return userListData
        } catch (error) {
            console.error(`error : error`);
            return { success: false }
        }
    },
    // 系統管理員: 建立使用者
    createUserListByAdmin: async ({ username, password, email, displayName, role }) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/user`
            const iData = {
                username,
                password,
                email,
                displayName,
                role
            }
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const userListData = await response.json()
            return userListData
        } catch (error) {
            console.error(`error : error`);
            return { success: false }
        }
    },
    // 系統管理員: 刪除使用者用
    deleteUserListByAdmin: async (ids) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/user`
            const iData = {
                ids
            }
            const response = await fetch(url, {
                method: "DELETE",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const userListData = await response.json()
            return userListData
        } catch (error) {
            console.error(`error : error`);
            return { success: false }
        }
    },
    // 系統管理員: 更新使用者資訊
    updateUserListByAdmin: async ({ userId, displayName }) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/user/${userId}`
            const iData = {
                displayName
            }
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const userListData = await response.json()
            return userListData
        } catch (error) {
            console.error(`error : error`);
            return { success: false }
        }
    },
    getUserListByAdminOne: async (userId) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/user/${userId}`
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const oData = await response.json()
            return oData
        } catch (error) {
            console.error(`error : error`);
            return { success: false }
        }
    },
}