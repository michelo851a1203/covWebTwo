export default {
    // TODO: all admin info
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
    updateUserListByAdmin: async (userId, displayName) => {
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
}