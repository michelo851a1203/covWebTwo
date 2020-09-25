import { reactive } from "vue"
export default reactive({
    testCenterTrigger: false,
    listLocX: 0,
    listLocY: 0,
    testCenterList: [
        {
            id: 1,
            title: "Doctor List",
            routeName: "/doctorlist"
        },
        {
            id: 2,
            title: "Director List",
            routeName: "/directorlist"
        },
        {
            id: 3,
            title: "Test Type",
            routeName: "/testtypelist"
        },
    ],
})