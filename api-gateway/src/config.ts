import dotenv from "dotenv";
dotenv.config()


export interface ProxyConfig {
    [path: string]: {
        isProtected: boolean;
        target: string;
        changeOrigin: boolean;
        pathRewrite: {
            [key: string]: string;
        };
    };
}

export let proxies: ProxyConfig = {
    "/appointment": {
        isProtected: true,
        target: "https://appointment-service-y30u.onrender.com/",
        changeOrigin: true,
        pathRewrite: {
            '^/api/appointment/slots': '/slots',
            '^/api/appointment/appointments': '/appointments'
        }
    },
    "/emr": {
        isProtected: true,
        target: "https://emr-sevice.onrender.com/",
        changeOrigin: true,
        pathRewrite: {
            '^/api/emr/records': '/record',
            // '^/emr/appointments': '/appointments'
        }
    },
}