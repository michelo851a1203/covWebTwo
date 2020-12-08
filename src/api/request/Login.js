import config from "./config.js"

export default {
    login: async (username, password) => {
        try {
            const url = `${config.baseURL}/api/v1/auth/login`
            const iData = {
                username,
                password,
            }
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            const loginData = await response.json()
            return loginData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    register: async (username, password, email, displayName) => {
        try {
            const url = `${config.baseURL}/api/v1/auth/signup`
            const iData = {
                username,
                password,
                email,
                displayName,
            }
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            const registerData = await response.json()
            return registerData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // 使用者詳細資訊
    getUserDetail: async () => {
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
            const userDetailData = await response.json()
            return userDetailData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // 使用者 資訊(個人)
    changeUserPassword: async (userId, password) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/user/${userId}/password`
            const iData = {
                password
            }
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const userTokenData = await response.json()
            return userTokenData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    getTokenUser: async () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/user/me`
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const userTokenData = await response.json()
            return userTokenData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },

}