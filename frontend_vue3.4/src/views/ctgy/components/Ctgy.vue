<template>
    <div class="content">
        <ul class="firstctgy">
            <li class="firstctgy-item" @click="changeTap(index)"
                :class="{ 'firstctgy-item_active': firstCtgyActiveIndex === index }"
                v-for="(item, index) of firstCtgyList" :key="item.firstctgyId">
                <span class="firstctgyname">{{ item.firstctgyname }}</span>
            </li>
        </ul>
        <ul class="secondctgy"></ul>
    </div>
</template>

<script setup lang="ts">
import { CtgyActions } from '@/store/actions';
import { CtgyGettersProxy } from '@/store/getters';
import { FirstCtgy } from '@/store/state';
import { Ref, ref, /*toRefs*/ } from 'vue';

const firstCtgyActiveIndex: Ref<number> = ref(0)
const firstCtgyList: Ref<FirstCtgy[]> = ref([])
async function geFirstCtgys() {
    await CtgyActions.findFirstCtgyList()
    firstCtgyList.value = CtgyGettersProxy.getFirstCtgyList
}

async function changeTap(index: number) {
    firstCtgyActiveIndex.value = index
}

geFirstCtgys()
// const { getFirstCtgyList, getSecThrdCtgyList } = toRefs(CtgyGettersProxy)
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
        }

        &-item_active {
            color: #f04343;
            text-shadow: 0 0 0.015rem #757171;
            background-color: #f7f7f7;

            .firstctgyname {
                width: 100%;
                border-left: 3px solid #f04343;
                text-align: center;
            }
        }
    }

    .secondctgy {
        flex: 1;
        margin-right: 0.19rem;
    }
}
</style>