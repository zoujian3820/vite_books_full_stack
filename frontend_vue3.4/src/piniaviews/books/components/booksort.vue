<template>
    <ul class="book-sort">
        <li class="compsive">综合</li>
        <li :class="{ selected: isCurStField('monthsalecount') }" @click="sortBook('monthsalecount')">销量</li>
        <li :class="{ selected: isCurStField('originalprice') }" @click="sortBook('originalprice')">
            价格
            <span class="ascdesc">
                <i :class="{ active: isCurStField('originalprice') && isReadAsc }"
                    class="iconfont icon-xiangshangxiaojiantou" />
                <i :class="{ active: isCurStField('originalprice') && !isReadAsc }"
                    class="iconfont icon-xiangshangxiaojiantou icondown" />
            </span>
        </li>
        <li class="shop">店铺</li>
        <!-- <li><i class="iconfont icon-fenlei"></i></li> -->
        <li class="dressing">
            筛选
            <i class="iconfont icon-shaixuan"></i>
        </li>
    </ul>
</template>

<script setup lang="ts">
import Books from '../service';
const { sortBook, isReadAsc, sortField, ascOrDesc } = Books

const isCurStField = (field: string) => sortField.value === field
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.book-sort {
    @include flex-box(flex-start, center);
    font-size: 0.2rem;
    width: 100%;
    margin-left: 0.1rem;
    // gap: 0.2rem;

    &>li {
        flex: 1;
        height: 0.5rem;
        @include flex-box(flex-start, center);

        .ascdesc {
            @include flex-box(center, center, column);

            .iconfont {
                display: inline-block;
            }

            .icon-xiangshangxiaojiantou {
                font-size: 0.125rem;
                color: #848484;
                transform: translateY(0.02rem);

                &.icondown {
                    transform: rotate(180deg) translateY(0.02rem);
                }
            }

            .active {
                color: #fe463c;
            }
        }

        &.selected {
            color: #fe463c;
        }
    }

    .compsive {}
}
</style>