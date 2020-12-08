import config from "./config.js"
export default {
    // 檢驗中心: 取得醫生列表，如果是用管理員會全部回傳，檢測中心則會取得底下資訊。
    getDoctorList: async () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/doctor`
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const doctorListData = await response.json()
            return doctorListData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    getDoctorDetail: async (doctorId) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/doctor/${doctorId}`
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const doctorListData = await response.json()
            return doctorListData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // 檢驗中心: 刪除醫生資料
    deleteDoctorList: async (ids) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/doctor`
            const idData = {
                ids
            }
            const response = await fetch(url, {
                method: "DELETE",
                body: JSON.stringify(idData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const doctorListData = await response.json()
            return doctorListData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // 檢驗中心: 建立醫生資料
    createDoctorList: async ({ clinic, name, email, address, city, zip }) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/doctor`
            const idData = {
                clinic,
                name,
                email,
                address,
                city,
                zip
            }
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(idData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const doctorListData = await response.json()
            return doctorListData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // 檢驗中心: 更新醫生資訊
    updateDoctorList: async ({ doctorId, name, clinic, email, address, city, zip }) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/doctor/${doctorId}`
            const idData = {
                clinic,
                name,
                email,
                address,
                city,
                zip
            }
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(idData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const doctorListData = await response.json()
            return doctorListData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },

}