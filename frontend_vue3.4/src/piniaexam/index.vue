<template>
    <div>用户名：{{ username }} __ 年龄：{{ age }} __ 电话：{{ phone }}</div>
    <div>{{ store.age }} </div>
    <div>{{ store.phone }} </div>
    <div> {{ store.getUsername }}==={{ getUsername }}</div>
    <div> {{ store.getUserinfo }}</div>
    <div><input type="text" v-model="store.username"></div>
    <div><button @click="changeState">改变state</button></div>
    <div><button @click="changeStateByActions">通过pinia action改变</button></div>
    <div><button @click="changeState2">通过pinia $patch改变</button></div>
</template>

<script setup lang="ts">
// import { storeToRefs } from 'pinia';
import { testStore } from './store'

import service from './service';

const store = testStore()
const { username, age, phone, getUsername } = service.getStore()
const { changeState, changeState2, changeStateByActions, findUser } = service

findUser('acc', 19)
// store.findUser('acc', 19)

// function changeState() {
//     store.username = 'haha =='
// }

// function changeStateByActions() {
//     store.changeUser('小林', 34)
// }
// function changeStateByActions2() {
//     store.$patch((state) => {
//         state.username = '明哈'
//         state.age = 28
//     })
// }
</script>
<style lang="scss" scoped></style>