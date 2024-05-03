<template>
    <div class="content">
        <i class="iconfont icon-youjiantou" @click="FstToThrCtgy.back" />
        <div class="tosearch">
            <i class="iconfont icon-fangdajing fangdajing" />
            <div class="tosearch-keyword">
                <input type="text" placeholder="" readonly class="tosearch-keyword-input" @click="toSearch">
                <span class="keyword">
                    {{ getThirdCtgy.thirdctgyname }}
                    <i class="iconfont icon-guanbi" />
                </span>
            </div>
        </div>
        <i class="iconfont icon-sandian more" />
    </div>
</template>

<script setup lang="ts">
import FstToThrCtgy from '@/piniaviews/ctgy/service';
const { getThirdCtgy } = FstToThrCtgy.storeRefs
import router from '@/router';
// // 持久化搜索数据
// FstToThrCtgy.persistentBookSearchData()
function toSearch() {
    router.push({ path: '/search' })
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/common.scss';

.content {
    @extend .multiplex-content;
    z-index: 2;

    .icon-youjiantou {
        font-size: 0.31rem;
        transform: rotate(180deg);
    }

    .more {
        font-size: 0.32rem;
        margin: 0 0.2rem 0 0;
    }

    .tosearch {
        @extend .multiplex-tosearch;

        .fangdajing {
            font-size: 0.32rem;
            margin: 0 0.26rem;
        }

        &-keyword {
            display: grid;
            grid-template-columns: 3rem;
            align-items: center;
            color: #fff;

            .keyword {
                padding: 0.09rem 0.15rem 0.09rem 0.13rem;
                background-color: #838383;
                border-radius: 1rem;
                // width: 0.7rem;
                width: fit-content;

                .icon-guanbi {
                    font-size: 0.15rem;
                }
            }

            // .icon-guanbi {
            //     justify-self: flex-end;
            //     position: relative;
            //     // left: 0.9rem;
            //     right: 0;
            //     font-size: 0.15rem;
            // }

            &-input {
                height: 0.3rem;
                background: none;
                border: none;
            }

            .keyword,
            &-input {
                grid-row: 1/2;
                grid-column: 1/2;
            }
        }
    }
}
</style>