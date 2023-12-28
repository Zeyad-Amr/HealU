
export const errorHandler = (error: any) => {
    if (error?.name === "AxiosError") {
        return {
            statusCode: error.response.status,
            url: error.response.config.url,
            msg: error.response.data
        }
    } else if (error?.statusCode) {
        return {
            statusCode: error.statusCode,
            msg: error.msg
        }
    }
    console.log(error)
    return {
        statusCode: 500,
        msg: "Internal Server Error"
    }
}