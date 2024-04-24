import { defineStore } from 'pinia'

export const testStore = defineStore('testStore', {
  state: () => {
    return {
      username: 'kaka',
      phone: 13032345678,
      age: 23
    }
  },
  getters: {
    getUserinfo(state): string {
      // pinia getters方法中，可用this和参数state 获取state中的值，但要统一用一种方式
      return `用户名：${state.username}__年龄：${state.age}__电话：${state.phone}`
    },
    getUsername(): string {
      //  this可以获取 getters 中的所有方法
      //   this.getUser
      //   this.getUsername
      return this.username
    }
  },
  actions: {
    // 用于异步数据处理
    findUser(username: string, age: number) {
      this.username = username
      this.age = age
    },
    changeUser(username: string, age: number) {
      this.username = username
      this.age = age
    }
  }
})
