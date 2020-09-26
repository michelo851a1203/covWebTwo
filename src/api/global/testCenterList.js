import { reactive } from "vue"
export default reactive({
    testCenterTrigger: false,
    listLocX: 0,
    listLocY: 0,
    testCenterList: [
        {
            id: 1,
            title: "Doctor List",
            routeName: "/doctorDashboard"
        },
        {
            id: 2,
            title: "Director List",
            routeName: "/directorDashboard"
        },
        {
            id: 3,
            title: "Test Type",
            routeName: "/testTypeDashboard"
        },
    ],
})