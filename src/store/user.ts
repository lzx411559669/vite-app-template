import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user", // id必填，且需要唯一
  state: () => {
    const user = {
      name: "Developer",
      age: 18,
    };
    return user;
  },
  actions: {
    setName(name: string) {
      this.name = name;
    },
    increateAge() {
      this.age++;
    },
  },
  getters: {
    hello(state) {
      return `Hi，${state.name}!`;
    },
  },
});
