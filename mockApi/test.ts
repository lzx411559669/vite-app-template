import type { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  "list|1-10": [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    "id|+1": 1,
  }],
});
export default [
  {
    url: "/api/getUser",
    method: "get",
    response: () => {
      console.log("body>>>>>>>>");
      return {
        code: 0,
        message: "ok",
        data: {
          name: "lzx",
          age: 25,
          desc: "xxxxx",
        },
        success: true,
      };
    },
  },
  {
    url: "/api/lists",
    method: "get",
    response: () => {
      console.log("body>>>>>>>>");
      return {
        code: 0,
        message: "ok",
        data,
      };
    },
  },
  {
    url: "/api/text",
    method: "post",
    rawResponse: async (req: any, res: any) => {
      let reqbody = "";
      await new Promise((resolve) => {
        req.on("data", (chunk: any) => {
          reqbody += chunk;
        });
        req.on("end", () => resolve(undefined));
      });
      res.setHeader("Content-Type", "text/plain");
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    },
  },
] as MockMethod[];
