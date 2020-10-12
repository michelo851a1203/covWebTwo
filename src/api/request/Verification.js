import config from "./config.js"

export default {
    // (postpone) 驗證者使用： 取得驗證列表
    getVerificationList: async () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/verification`
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const VerificationListData = await response.json()

            return VerificationListData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // 驗證者使用： 掃描 Qrcode 取得憑證 id， 進行驗證並返回驗證資訊
    createVerification: async (credentialId) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/verification`
            const iData = {
                credentialId
            }
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const verificationData = await response.json()
            return verificationData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // 驗證者使用： 取得驗證 qrcode 目前的狀態資訊
    // this method will get current info and keep request after genQrcode (setInterval)
    getVerifyQrcodeInfo: async (verificationQrcodeId) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/verification/qrcode?verificationQrcodeId=${verificationQrcodeId}`
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const verifyQrcodeInfo = await response.json()
            return verifyQrcodeInfo
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // 驗證者使用： 產生驗證用 Qrcode 資訊，給使用者做掃描使用。
    createVerifyQrcodeForUser: async () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/verification/qrcode`
            const response = await fetch(url, {
                method: "POST",
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const VerifyQrcodeForUserData = await response.json()
            return VerifyQrcodeForUserData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // 使者使用： 掃描 Qrcode 取得驗證 id， 發送驗證驗證資訊
    UserVerification: async (verificationId) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/wallet/verification`
            const iData = {
                verificationId
            }
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const userVerificationData = await response.json()
            return userVerificationData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // 取得列印的驗證資料 (print) no need to use
    PrintVerification: async (verificationId) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }


        try {
            const url = `${config.baseURL}/api/v1/print/verification`
            const iData = {
                verificationId
            }
            const response = await fetch(url, {
                method: "GET",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const printVerificationData = await response.json()
            return printVerificationData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    }
}