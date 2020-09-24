export default {
    // TODO 檢驗中心: 取得檢測中心負責人列表，如果是用管理員會全部回傳，檢測中心則會取得底下資訊。
    getDirectorList: async () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/director`
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
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // TODO 檢驗中心: 刪除檢測中心負責人資料
    deleteDirector: async (ids) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }
        const iData = {
            ids,
        }
        try {
            const url = `${config.baseURL}/api/v1/director`
            const response = await fetch(url, {
                method: "DELETE",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const oData = await response.json()
            return oData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // TODO: 檢驗中心: 建立檢測中心負責人
    createDirector: async ({ name, email }) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }
        const iData = {
            name,
            email,
        }

        try {
            const url = `${config.baseURL}/api/v1/director`
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const oData = await response.json()
            return oData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // TODO: 檢驗中心: 更新檢測中心負責人資訊
    updateDirector: async ({ directorId, email }) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }
        const iData = {
            email,
        }

        try {
            const url = `${config.baseURL}/api/v1/director/${directorId}`
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const oData = await response.json()
            return oData
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // TODO: 檢驗中心: 更新檢測中心負責人資訊
    DirectorOne: async ({ directorId }) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/director/${directorId}`
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
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
}