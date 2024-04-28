<template>
    <div>
        <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="msg" v-show="showhidden">hello</div>
        </transition>
        <button class="button" @click="switchShowHidden">切换1</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showhidden = ref(false)
function switchShowHidden() {
    showhidden.value = !showhidden.value
}
function beforeDrop(ele: Element) {
    const curEle_ = ele as HTMLBodyElement
    curEle_.style.color = 'red'
    curEle_.style.fontSize = '14px'
    curEle_.style.transform = 'translate3d(210px, 100px, 0)'
}
function dropping(ele: Element, done: (...arg: any) => any) {
    // 由于vuek中的动画执行是放在nextTick中，而nextTick是要等dom更新完才执行
    // 所以用 document.body.scrollHeight 触发重绘使dom更新  提前执行nextTick 这样动画才能生效
    document.body.scrollHeight
    const curEle_ = ele as HTMLBodyElement
    curEle_.style.color = 'blue'
    curEle_.style.fontSize = '28px'
    curEle_.style.transform = 'translate3d(0, 10px, 0)'
    done()
}
function afterDrop(ele: Element) {
    console.log('动画已经结束')
    const curEle_ = ele as HTMLBodyElement
    const rect = curEle_.getBoundingClientRect()
    console.log('rect:', rect)
}
</script>
<style lang="scss" scoped>
.button {
    position: absolute;
    top: 200px;
    left: 100px;
    font-size: 20px;
}

.msg {
    position: relative;
    width: 70px;
    height: 70px;
    top: 100px;
    left: 80px;
    background-color: red;
    transition: all 0.3s ease;
}
</style>