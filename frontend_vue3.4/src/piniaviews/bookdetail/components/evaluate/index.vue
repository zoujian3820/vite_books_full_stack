<template>
    <div class="contain">
        <evaldegree />
        <evallist />
    </div>
</template>

<script setup lang="ts">
import evaldegree from './components/evaldegree.vue';
import evallist from './components/evallist.vue';
import BookDetailService, { EvaluateService } from '@/piniaviews/bookdetail/service/bookdetailService';
const { setHeaderOpacity } = BookDetailService
const { searchEvalRplLst } = EvaluateService

setHeaderOpacity(1)
searchEvalRplLst()

</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.contain {
    position: absolute;
    top: 0.6rem;
    left: 0.4rem;
    width: 4.6rem;
}
</style>