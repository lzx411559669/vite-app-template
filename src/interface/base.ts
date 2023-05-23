export interface Result<T> {
    code: string | number,
    success: boolean,
    data: T
    message: string
}

export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
  }