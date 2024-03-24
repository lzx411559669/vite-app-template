import type { UserInfo } from "~/interface/user";
import { Get } from "~/utils/request";

export enum UserApis {
  getUser = "/api/getUser",
}

export const getUser = async () => {
  const res = await Get<UserInfo>(UserApis.getUser);
  return res
};
