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
    "/admin": {
        isProtected: true,
        target: process.env.Admin_URL as string,
        changeOrigin: true,
        pathRewrite: {
            '^/api/admin/clinic': '/api/v1/clinic',
            '^/api/admin/clinicService': '/api/v1/clinicService',
        }
    },
    "/appointment": {
        isProtected: true,
        target: process.env.Appointment_URL as string,
        changeOrigin: true,
        pathRewrite: {
            '^/api/appointment/slots': '/slots',
            '^/api/appointment': '/appointments'
        }
    },
    "/bill": {
        isProtected: true,
        target: process.env.Bill_URL as string,
        changeOrigin: true,
        pathRewrite: {
            '^/api/bill': '/bill',
            '^/api/bill/invoice/': '/invoice/'
        }
    },
    "/emr": {
        isProtected: true,
        target: process.env.EMR_URL as string,
        changeOrigin: true,
        pathRewrite: {
            '^/api/emr/records': '/record',
            '^/api/emr/prescription': '/prescription',
            '^/api/emr/medical-history': '/medical-history'
        }
    },
    "/registration": {
        isProtected: true,
        target: process.env.Registration_URL as string,
        changeOrigin: true,
        pathRewrite: {
            '^/api/registration/user': '/user',
            '^/api/registration/staff': '/staff',
            '^/api/registration/patient': '/patient',
        }
    },
    "/storage": {
        isProtected: true,
        target: process.env.Storage_URL as string,
        changeOrigin: true,
        pathRewrite: {
            '^/api/storage/images': '/images',
            '^/api/storage/files': '/files',
        }
    },
}