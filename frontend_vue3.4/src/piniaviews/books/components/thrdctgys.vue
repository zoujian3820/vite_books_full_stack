<template>
    <div class="content">
        <!-- <div class="thrdctgys" @click="changeThrdCtgyActiveId(-1)">
            <span :class="{ active: switchThrdCtgyActiveId === -1 }" class="thrdctgys-item">全部</span>
        </div> -->
        <div class="thrdctgys" @click="changeThrdCtgyActiveId(item.thirdctgyid)" v-for="item of thirdCtgyList"
            :key="item.thirdctgyid">
            <span :class="{ active: switchThrdCtgyActiveId === item.thirdctgyid }" class="thrdctgys-item">
                {{ item.thirdctgyname }}
            </span>
        </div>
        <div class="icon">
            <span @click="openOrCollapseInBook(!isReadyOpen)">
                <i class="iconfont icon-youjiantou" :class="{
                    icondown: isReadyOpen,
                    iconup: !isReadyOpen
                }" />
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import FstToThrCtgy from '@/piniaviews/ctgy/service';
const { openOrCollapseInBook, switchThrdCtgyActiveId, changeThrdCtgyActiveId } = FstToThrCtgy
const { getSubThirdCtgyList, getThirdCtgyList, isReadyOpen } = FstToThrCtgy.storeRefs
import { thirdAllCtgy } from '@/piniastore/ctgy';
import { computed } from 'vue';

const thirdCtgyList = computed(() => {
    const list = isReadyOpen.value ? getSubThirdCtgyList.value : getThirdCtgyList.value
    return [thirdAllCtgy, ...list]
})

</script>
<style lang="scss" scoped>
.content {
    margin-top: 0.3rem;
    width: 5.04rem;
    display: flex;
    flex-wrap: wrap;
    position: relative;

    .thrdctgys {
        height: 0.48rem;
        margin-right: 0.5rem;
        font-size: 0.22rem;

        &-item {
            text-shadow: 0 0 0.01rem gray;
            padding: 0.03rem 0.15rem 0.04rem;
            border-radius: 1rem;

            &.active {
                background-color: #fe463c;
                color: #fff;
            }
        }
    }

    .icon {
        position: absolute;
        top: 0.06rem;
        right: 0.2rem;

        .icon-youjiantou {
            display: inline-block;
            font-size: 0.18rem;
            transition: transform 0.3s ease-in-out;

            &.iconup {
                transform: rotate(-90deg);
            }

            &.icondown {
                transform: rotate(90deg);
            }
        }
    }
}
</style>