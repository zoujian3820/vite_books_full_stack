<template>
    <div class="search-history">
        <div class="search-history-header">
            <span class="historytext">{{ title }}</span>
            <i class="iconfont icon-shanchu shanchu" @click="$emit('del')" />
        </div>
        <div class="search-history-items">
            <div class="item" @click="$emit('tapitem', item)" v-for="item of kwdlist" :key="getkey(item)">
                <span>{{ getval(item) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { isPlainObject } from '@/utils/goodstorageutil';
import { HistoryKeyword } from '@/piniastore/search';
import { computed } from 'vue';
const props = defineProps<{ title: string, keywords?: string[], keywordobjlist?: HistoryKeyword[] }>()
const kwdlist = computed(() => props?.keywords?.length ? props.keywords : props.keywordobjlist)
const getkey = (item: HistoryKeyword | string) => isPlainObject(item) ? item.historykeywordid : item
const getval = (item: HistoryKeyword | string) => isPlainObject(item) ? item.historykeyword : item



</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.search-history {
    width: 5.14rem;
    margin: 0 0.13rem;

    &-header {
        @include flex-box(space-between, center);
        height: 0.4rem;

        .historytext {
            font-weight: bolder;
            text-shadow: 0 0 0.01rem gray;
            font-size: 0.19rem;
        }

        .shanchu {
            @include wh(0.4rem, 0.3rem);
            @include flex-box(flex-end, center);
            font-size: 0.24rem;
            color: #555;

        }
    }

    &-items {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        // 划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。
        // 默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行
        // grid-auto-flow默认值是row，即"先行后列"。也可以将它设成column，变成"先列后行"。
        grid-auto-flow: row;
        margin-left: 0.05rem;
        margin-top: 0.2rem;
        gap: 0.15rem;

        .item {
            height: 0.42rem;
            @include flex-box(center, center);
            background-color: #f6f6f6;
            padding: 0 0.15rem;
            border-radius: 1rem;

            span {
                font-size: 0.17rem;
                @include clamp(1);
            }
        }
    }
}
</style>