import config from "./config.js"
export default {
    getDocTypeList: async () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/detect/type`
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const getDocTypeData = await response.json()
            return getDocTypeData
        } catch (error) {
            console.error(`error : error`);
            return { success: false }
        }
    },
    deleteDocTypeList: async (ids) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/detect/type`
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
            const oData = await response.json()
            return oData
        } catch (error) {
            console.error(`error : error`);
            return { success: false }
        }
    },
    createDocTypeList: async ({ name, normalRange, cctNo, testResult }) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        console.group(`%c name, normalRange, cctNo, testResult`,'color:yellow');
        console.log(name, normalRange, cctNo, testResult);
        console.groupEnd();

        try {
            const url = `${config.baseURL}/api/v1/detect/type`
            const iData = {
                name,
                normalRange,
                cctNo,
                data: testResult
            }
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(iData),
                headers: new Headers({
                    "Authorization": token,
                    "Content-Type": "application/json"
                })
            })
            const oData = await response.json()

            console.group(`%c oData`,'color:yellow');
            console.log(oData);
            console.groupEnd();
            return oData
        } catch (error) {
            console.error(`error : error`);
            return { success: false }
        }
    },
    updateDocTypeList: async (detectTypeId, { normalRange, cctNo, testResult }) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/detect/type/${detectTypeId}`
            const iData = {
                normalRange,
                cctNo,
                data: testResult
            }
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
            console.error(`error : error`);
            return { success: false }
        }
    },
    getDocTypeListOne: async (detectTypeId) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `${config.baseURL}/api/v1/detect/type/${detectTypeId}`
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