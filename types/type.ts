interface Person {

  test: {
    hello: (index: string) => string;
  };
  tabs: {
    setTabs: (index: string) => void;
    getTabs: (index: string) => string;
  };
}

// 1.模板字符类型
type MB<T, U> = `${T & string}/${U & string}`;

// 2.先拿到父模块的属性名

type ModulesSpliceKeys<T> = {
  [key in keyof T]: T[key]
};

type testModulesSpliceKeys = ModulesSpliceKeys<Person>;

// 3.父，子模块联合起来 [keyof T] 或舍弃 [key in keyof T]  只取后面的  MB<key, keyof T[key]>

type ModulesSpliceKeys_<T> = {
  [key in keyof T]: MB<key, keyof T[key]>
}[keyof T];

type testModulesSpliceKeys_ = ModulesSpliceKeys_<Person>;

interface Customer {
  custname: string;
  buymoney: number;
}

type CustFn = (params: Customer) => string;

type ParamsType<T> = T extends (param: infer P) => any ? P : never;

type ReturnType_<T> = T extends (param: any) => infer P ? P : never;

type testCustParamType = ParamsType<CustFn>; // Customer

type testReturnType = ReturnType_<CustFn>; // string

// 数组中的应用

type EleOfArr<T> = T extends Array<infer P> ? P : never;

type EleOfArrTest = EleOfArr<Array<{ name: string; age: number }>>;
// type { name: string, age: number }

type extractCustomer = Extract<string, Customer>; // nevner

type testExclude = Exclude<string | number | boolean, string | number>;// boolean

type customkeys<T> = T extends any ? T : never;

type testcustomkeys = customkeys<keyof Customer>;

type testRecord = Record<"name" | "age", string | number>;

function test(params: Record<"name" | "age", string | number>) {
  console.log(params);
}

function isPlainObject(data: Record<string, any>) {
  return Object.prototype.toString.call(data) === "[object Object]";
}

type BaseType = string | number | boolean;

/**
 * 深拷贝
 * @param data
 */
function deepCopy(data: Omit<string, any> | BaseType) {

}

interface Todo {
  titie: string;
  completed: boolean;
  des: string;
  add(): number;
  del(): number;
}

type MyOmit<T, K> = {
  [P in keyof T as P extends K ? never : P]: T[P]
};

type testMyOmit = MyOmit<Todo, "des">;// {titie:string, completed: boolean}

// 拿到所有function类型
// type Degree<T> = {
//     [P in keyof T as T[P] extends Function ? P : never]: T[P]
// }

// type testDegree = Degree<Todo>

type Degree<T extends Record<string, any>> = {
  [P in keyof T as T[P] extends Function ? `do${Capitalize<P & string>}` : never]: T[P]
};

type testDegree = Degree<Todo>;
