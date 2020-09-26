import { reactive } from "vue"
export default reactive({
    testCenterTrigger: false,
    listLocX: 0,
    listLocY: 0,
    testCenterList: [
        {
            id: 1,
            title: "Test Center",
            routeName: "/"
        },
        {
            id: 2,
            title: "Doctor List",
            routeName: "/doctorDashboard"
        },
        {
            id: 3,
            title: "Director List",
            routeName: "/directorDashboard"
        },
        {
            id: 4,
            title: "Test Type",
            routeName: "/testTypeDashboard"
        },
    ],
})