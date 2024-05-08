<template>
    <div class="content">
        <ul class="firstctgy">
            <li class="firstctgy-item" @click="changeTap(item.firstctgyId)"
                :class="{ 'firstctgy-item_active': firstCtgyActiveId === item.firstctgyId }"
                v-for="(item) of firstCtgyList" :key="item.firstctgyId">
                <span class="firstctgyname">{{ item.firstctgyname }}</span>
            </li>
        </ul>
        <div class="secondthrdctgy">
            <ul>
                <li class="secondthrdctgy-item" v-for="item of secondCtgyList" :key="item.secondctgyid">
                    <div class="secondctgy-item">
                        <span class="secondctgyname">{{ item.secondname }}</span>
                        <span class="secondctgynameshop"
                            @click="toBookInfo(firstCtgyActiveId, item.secondctgyid, thirdAllCtgy.thirdctgyid)">
                            {{ item.secondname }}馆
                            <i class="iconfont icon-youjiantou" />
                        </span>
                    </div>
                    <ThrdCtgy :firstCtgyActiveId="firstCtgyActiveId" :isReadyOpen="item.isReadyOpen" :secondctgy="item"
                        :thirdCtgys="item.thirdctgys" :subThirdctgys="item.subThirdctgys" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, WatchStopHandle } from 'vue';
import FstToThrCtgy from '../service'
import ThrdCtgy from './ThrdCtgy.vue'
import { onBeforeRouteLeave } from 'vue-router';
import { thirdAllCtgy } from '@/piniastore/ctgy'
import goodstorageutil from '@/utils/goodstorageutil';

const {
    storeRefs,
    storeFirstCtgy,
    geFirstCtgys,
    changeTap,
    firstCtgyActiveId,
    watchFirstCtgyActiveIdHandle,
    toBookInfo
} = FstToThrCtgy
const { firstCtgyList, secondCtgyList } = storeRefs


let stopWatch: WatchStopHandle = () => { }

async function getData() {
    const { firstctgyId } = goodstorageutil.get('firstCtgy') || {}
    // const { secondctgyid } = goodstorageutil.get('secondCtgy') || {}
    await geFirstCtgys()

    firstCtgyActiveId.value = firstctgyId || firstCtgyList.value[0].firstctgyId

    storeFirstCtgy()

    stopWatch = watchFirstCtgyActiveIdHandle()
}

onBeforeUnmount(() => {
    stopWatch()
    console.log('onBeforeUnmount')
})

onBeforeRouteLeave((to, from) => {
    console.log(`来自页面:${from.fullPath}__去页面:${to.fullPath}`)
})

getData()

</script>
<style lang="scss" scoped>
.content {
    display: flex;
    position: absolute;
    top: 1.215rem;
    left: 0;
    bottom: 0.85rem;
    width: 100%;
    gap: 0.1rem;

    .firstctgy {
        width: 1.3rem;
        flex-basis: 1.3rem;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        &-item {
            height: 0.78rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.2rem;
        }

        &-item_active {
            color: #fe463c;
            text-shadow: 0 0 0.015rem #757171;
            background-color: #f7f7f7;

            .firstctgyname {
                width: 100%;
                border-left: 3px solid #fe463c;
                text-align: center;
            }
        }
    }

    .secondthrdctgy {
        flex: 1;
        margin: 0 0.15rem 0 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        &-item {
            background-color: #fff;

            .secondctgy-item {
                height: 0.73rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.2rem;

                .secondctgyname {
                    color: #0d0d0d;
                    font-weight: bolder;
                }

                .secondctgynameshop {
                    display: flex;
                    align-items: center;
                    color: #535353;
                }

                .icon-youjiantou {
                    font-size: 100%;
                    margin-left: 0.02rem;
                }
            }
        }
    }
}
</style>