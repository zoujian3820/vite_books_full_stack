<script setup lang="ts">

// import { PageTransition, TransitionPresets, defineTransitionProps } from 'vue3-page-transition'

// const transitionProps = defineTransitionProps({
//   mode: 'out-in',
//   name: TransitionPresets.fadeInRight,
//   appear: true,
//   overlay: true,
//   overlayBg: '#818cf8', // or use overlayBgClassName: 'bg-violet-500'
//   overlayZIndex: 999,
//   transformDistance: '2rem',
//   transitionDuration: 300,
// })

</script>

<template>
  <router-view />

  <!-- <router-view v-slot='{ Component }'>
    <PageTransition v-bind='transitionProps'>
      <component :is='Component' />
    </PageTransition>
  </router-view> -->

  <!-- <router-view v-slot='{ Component }'>
    <transition name="fade">
      <KeepAlive>
        <component :is='Component' />
      </KeepAlive>
    </transition>
  </router-view> -->
</template>

<style lang="scss">
@import '@/assets/viewwindow.css';
@import '@/assets/reset.css';
@import '@/assets/font/iconfont.css';
// @import '//at.alicdn.com/t/c/font_4507918_pfqul9b0pua.css‘

body {
  user-select: none;
}

 

// .fade-enter-active,
// .fade-leave-active {
//   transition: all 0.3s ease-out;
// }
// .fade-enter-from,
// .fade-leave-to {
//   transform: translate3d(0, 0, 0);
// }

// .fade-enter-to,
// .fade-leave-from {
//   transform: translate3d(100%, 0, 0);
// }
</style>
