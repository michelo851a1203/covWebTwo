import config from "./config.js"

export default {
    // 檢驗中心使用： 取得檢驗中心可以發放的憑證詳細資訊
    getCredentialDetail: async () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/credential`
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const credentialData = await response.json()
            return credentialData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // 檢驗中心使用：建立 憑證 與 Wallet 後進行連線並取得憑證發送至檢測者信箱
    sendCredential: async (doctor, detectType, definitionId, director, data) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/credential`
            const iData = {
                doctor,
                detectType,
                definitionId,
                director,
                data
            }
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const sendCredentialData = await response.json()
            return sendCredentialData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // 使者使用： 取得憑證詳細資訊
    getUserCredential: async () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/wallet/credential`
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const UserCredentialData = await response.json()
            return UserCredentialData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    sendMail: async (_id) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }
        try {
            const url = `${config.baseURL}/api/v1/email`
            const iData = {
                credentialId: _id
            }
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const sendMailData = await response.json()
            return sendMailData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // TODO 使者使用： 變更憑證讀取的狀態，當 lock 是 true 時無法被進行讀取 false 時候將無限制。
    lockCredential: async (lock) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }
        try {
            const url = `${config.baseURL}/api/v1/wallet/credential/lock`
            const iData = {
                lock
            }
            const response = await fetch(url, {
                method: "GET",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const lockData = await response.json()

            return lockData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    }
}