import React, { Suspense, lazy } from "react";
// import { ConfigProvider, Spin } from "antd";
// import { useGlobalStore } from "@stores/index";
// import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";
import { Calendar } from "@zhh-ui/components";

dayjs.locale("zh-cn");

// const BasicLayout = lazy(()=> import("./layout"))

export function authLoader() {
    return { isAdmin: true}
}

const App: React.FC = () => {
    // const { primaryColor } = useGlobalStore();

    return (
        // <ConfigProvider
        //     locale = {zhCN}
        //     // theme = {{
        //     //     token: {
        //     //         colorPrimary: primaryColor,
        //     //     }
        //     // }}
        // >
        //     <Suspense fallback={<Spin size="large" className="globa_spin" />}>
        //         {/* <BasicLayout /> */}
        //     </Suspense>
        // </ConfigProvider>        
        <div>
            <Calendar value={dayjs('2023-11-08')}></Calendar>
        </div>    
    )
}

export default App;