/* eslint-disable @typescript-eslint/no-unsafe-return */
import _ from "lodash";
import * as pathToRegexp from "path-to-regexp";
import axios, { AxiosResponse } from "axios";
import { HttpMethod, Result } from "~/interface/base";

export interface Options {
  url: string;
  method: HttpMethod;
  data?: any;
  params?: any;
  headers?: any;
  cancelToken?: any;
  responseType?: string;
}

export async function request<R>(name: string, options: Options): Promise<R> {
  const { method = "get", data, params, headers, cancelToken, responseType } = options;
  let url: string = options.url;
  // if (!_.startsWith(url, 'http')) {
  //    url = baseURL + url
  // }
  // 跨域设置
  const withCredentials = true;
  const cloneParams = _.cloneDeep(params);

  // 解析URl并将params中的数据填充到URL中
  try {
    const domainReg = /[a-zA-Z]+:\/\/[^/]*/;
    let domain = "";
    if (domainReg.test(url)) {
      domain = domainReg.exec(url)?.[0] || "";
      url = url.slice(domain.length);
    }

    const match = pathToRegexp.parse(url);
    params && (url = pathToRegexp.compile(url)(params));
    for (const item of match) {
      item instanceof Object
                && cloneParams
                && item.name in cloneParams
                && delete cloneParams[item.name];
    }
    url = domain + url;
  } catch (e: any) {
    throw new Error(e);
  }

  const realOptions: any = {
    method,
    url,
    params: cloneParams,
    data,
    withCredentials,
    responseType,
  };

  if (cancelToken) {
    realOptions.cancelToken = cancelToken;
  }

  const jsonHeader = {
    "Content-Type": "application/json",
  };
  realOptions.headers = _.merge(jsonHeader, headers);
  return axios<any, R>(realOptions);
}

// use(两个参数)
axios.interceptors.request.use(
  (req: any) => {
    // 在发送请求前要做的事儿
    // req.headers["USER_LOGIN_TOKEN"] = localStorage.getItem("token");
    return req;
  },
  (err) => {
    // 在请求错误时要做的事儿
    // 该返回的数据则是axios.catch(err)中接收的数据
    return Promise.reject(err);
  },
);

// 响应拦截器
axios.interceptors.response.use(
  <R>(res: AxiosResponse<Result<R>>) => {
    const { success, message, data } = res.data ;
    if (success) {
      return data;
    }
     // 业务错误
    return Promise.reject(new Error(message));
  },
  (err) => {
    // 统一异常提示
    return Promise.reject(err);
  },
);

export const Get = async <T>(url: string, params: any = {}) => {
  return await request<T>("", { url, params, method: HttpMethod.GET });
};

export const Post = async <T>(url: string, params: any = {}, data: any) => {
  return await request<T>("", { url, params, data, method: HttpMethod.POST });
};

export const Put = async <T>(url: string, params: any = {}, data: any) => {
  return await request<T>("", { url, params, data, method: HttpMethod.PUT });
};

export const Delete = async <T>(url: string, params: any = {}) => {
  return await request<T>("", { url, params, method: HttpMethod.DELETE });
};
