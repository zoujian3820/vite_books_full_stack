<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import getImg from '../utils/imgUtil'
defineProps<{ msg: string }>()

const count = ref(0);
const { name } = toRefs(reactive({ name: 'John' }))
</script>

<template>
  <h1>{{ msg }} {{ name }}</h1>
  <img :src="getImg('4.走遍中国.png')" alt="">
  <div class="card">
    <button type="button" @click="count++, name = String(count)">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
