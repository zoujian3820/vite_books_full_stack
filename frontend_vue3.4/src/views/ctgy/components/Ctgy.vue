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
                        <span class="secondctgynameshop">
                            {{ item.secondname }}馆
                            <i class="iconfont icon-youjiantou" />
                        </span>
                    </div>
                    <ThrdCtgy :isReadyOpen="item.isReadyOpen" :secondctgy="item" :thirdCtgys="item.thirdctgys"
                        :subThirdctgys="item.subThirdctgys" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { FirstCtgy } from '@/store/state';
import FstToThrCtgy from '@/views/ctgy/service'
import ThrdCtgy from '@/views/ctgy/components/ThrdCtgy.vue'
const { geFirstCtgys, changeTap, firstCtgyList, firstCtgyActiveId, secondCtgyList, geSecondThrdCtgyList } = FstToThrCtgy

    ; (async () => {
        await geFirstCtgys()
        firstCtgyActiveId.value = firstCtgyList.value[0].firstctgyId
        geSecondThrdCtgyList()
    })();


</script>
<style lang="scss" scoped>
.content {
    display: flex;
    position: absolute;
    top: 1.02rem;
    left: 0;
    bottom: 0.85rem;
    width: 100%;

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
            font-size: 0.202rem;
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
        margin: 0 0.15rem 0 0.19rem;

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