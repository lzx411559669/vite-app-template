import { Get } from "~/utils/request"

export enum UserApis {
    getUser = '/api/getUser'
}

export const getUser = async () => {
    const res = await Get<any>(UserApis.getUser)
    return res.data
}