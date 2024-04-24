<template>
    <ul class="thrdctgy">
        <li class="thrdctgy-item" @click="toBookInfo(firstCtgyActiveId, secondctgy.secondctgyid, item.thirdctgyid)"
            v-for="item of thirdctgys" :key="item.thirdctgyid">
            <span class="thrdctgyname">{{ item.thirdctgyname }}</span>
            <i class="iconfont icon-tubiaozhizuo-" />
        </li>
        <div v-if="thirdCtgys.length > subThirdCtgySliceNum" @click="openOrCollapse($event, secondctgy)"
            :class="{ readopen: isReadyOpen, readcollapse: !isReadyOpen }">
            {{ isReadyOpen ? '展开' : '收起' }}
            <i class="iconfont icon-yuan-shangjiantou" :class="{ down: isReadyOpen }" />
        </div>
    </ul>
</template>

<script setup lang="ts">
import { SecondCtgy, ThirdCtgy } from '@/piniastore/state';
import { subThirdCtgySliceNum } from '@/piniastore/ctgy';

import { computed, Ref, toRefs } from 'vue';
import FstToThrCtgy from '@/piniaviews/ctgy/service'
const { openOrCollapse, toBookInfo } = FstToThrCtgy

const props = defineProps<{
    isReadyOpen: boolean,
    firstCtgyActiveId: number,
    secondctgy: SecondCtgy
    thirdCtgys: ThirdCtgy[],
    subThirdctgys: ThirdCtgy[]
}>()

const { thirdCtgys, isReadyOpen, subThirdctgys, firstCtgyActiveId } = toRefs(props)
const thirdctgys: Ref<ThirdCtgy[]> = computed(() => isReadyOpen.value ? subThirdctgys.value : thirdCtgys.value)
// const isThreeIntColumn = ref(false)
// watch(thirdctgys, (newv) => isThreeIntColumn.value = newv.length % 3 === 0)

</script>
<style lang="scss" scoped>
.thrdctgy {
    // 网格布局
    display: grid;
    padding: 0 0.05rem 0 0.1rem;
    // 网格分三列布局
    grid-template-columns: 1.18rem 1.1rem 1.25rem;
    position: relative;

    &-item {
        padding: 0.2rem 0;
        text-align: center;
        display: flex;
        align-items: center;

        .thrdctgyname {
            flex: 1;
            font-size: 0.18rem;
        }

        .icon-tubiaozhizuo- {
            font-size: 0.16rem;
            color: #a8a8a8;
        }

        &:nth-child(3n) {
            .icon-tubiaozhizuo- {
                display: none;
            }
        }
    }

    .readcollapse,
    .readopen {
        width: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.18rem;

        .icon-yuan-shangjiantou {
            transition: transform 0.3s ease-in-out;
            font-size: 0.18rem;

            &.down {
                transform: rotate(180deg);
            }
        }
    }

    .readcollapse {
        position: absolute;
        left: 2.384rem;
        height: 0.635rem;
        bottom: 0;
    }
}
</style>