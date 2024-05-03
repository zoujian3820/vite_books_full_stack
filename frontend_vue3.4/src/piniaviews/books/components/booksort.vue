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
    <ul class="autocompsearch_inct" v-show="isAutoCompSearch">
        <li>知书发货</li>
        <li>促销</li>
        <li class="publisher" @click.self="controlPanel">
            出版社
            <span class="down-or-up-arrow" @click="controlPanel">
                <i v-show="!isReadyOpen" class="iconfont icon-shangxiajiantou" />
                <i v-show="isReadyOpen" class="iconfont icon-xiajiantou" />
            </span>
            <div class="publisher-panel" ref="publisherPanelRef">
                <div class="publisher-panel-items">
                    <div v-for="item of publisherList" :key="item.publishid" @click="onPubPanelClick(item)"
                        class="publisher-panel-item">
                        <span>{{ item.publishername }}</span>
                        <span :class="{ hide: !item.checked }"><i class="iconfont icon-gouxuan3" /></span>
                    </div>
                </div>
                <div class="confirmOrReset">
                    <span class="reset" @click="onResetPubPanel">重置</span>
                    <span class="confirm" @click="onFindBksByPublishIds">搜索</span>
                </div>
                <div class="overlay"></div>
            </div>
        </li>
        <li>
            作者
            <span class="down-or-up-arrow">
                <i v-show="!isAuthorReadOpen" class="iconfont icon-shangxiajiantou" />
                <i v-show="isAuthorReadOpen" class="iconfont icon-xiajiantou" />
            </span>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import Books from '../service';
const { init, sortBook, isReadAsc, findBksByPublishIds,
    sortField, isAutoCompSearch, isReadyOpen, onPubPanelClick } = Books
const { publisherList } = Books.storeRefs
const publisherPanelRef: Ref<HTMLBodyElement | undefined> = ref<HTMLBodyElement>()
const isAuthorReadOpen = ref(true)
const isCurStField = (field: string) => sortField.value === field

const { ctrlShopCart } = defineProps<{ ctrlShopCart: (isShow: boolean) => void }>()


init()

function restorePanel() {
    const publisherPane = publisherPanelRef.value
    publisherPane!.className = 'publisher-panel'
    ctrlShopCart(true)
    isReadyOpen.value = true
    document.body.style.removeProperty('overflow')
}
function controlPanel() {
    isReadyOpen.value = !isReadyOpen.value
    const publisherPane = publisherPanelRef.value
    if (publisherPane!.className === 'publisher-panel') {
        publisherPane!.className = 'publisher-panel-show'
        // 隐藏底部 购物车去支付模块
        ctrlShopCart(false)
        // 禁止页面上下滑动
        document.body.style.overflow = 'hidden'
    } else {
        restorePanel()
    }
}

async function onFindBksByPublishIds() {
    await findBksByPublishIds()
    restorePanel()
}
function onResetPubPanel() {
    publisherList.value.forEach(item => {
        item.checked = true
    })
    restorePanel()
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.book-sort,
.autocompsearch_inct {
    @include flex-box(flex-start, center);
    font-size: 0.2rem;
    width: 100%;
    margin-left: 0.1rem;
    // gap: 0.2rem;

    &>li {
        flex: 1;
        height: 0.5rem;
        @include flex-box(flex-start, center);

        .ascdesc,
        .down-or-up-arrow {
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

.autocompsearch_inct {
    .publisher {
        position: relative;

        .publisher-panel {
            display: none;
        }

        .publisher-panel-show {
            display: block;
            position: absolute;
            top: 0.5rem;
            background-color: #fff;
            width: 5.4rem;
            left: -2.8rem;

            .publisher-panel-items {
                display: grid;
                grid-template-columns: 2.6rem 2.2rem;

                .publisher-panel-item {
                    height: 0.82rem;
                    @include flex-box(center, center);

                    .hide {
                        opacity: 0;
                        pointer-events: none;
                    }
                }
            }

            .confirmOrReset {
                border-top: 1px solid #f6f6f6;
                height: 0.8rem;
                @include flex-box(space-around, center);

                .confirm,
                .reset {
                    text-shadow: 0 0 0.1rem #777;
                    background-color: #f94836;
                    color: #fff;
                    padding: 0.02rem 0.08rem;
                    border-radius: 0.05rem;
                    font-size: 0.2rem;
                }

                .reset {
                    background-color: #777;
                }
            }

            .overlay {
                position: absolute;
                @include wh(5.4rem, 100vh);
                background-color: #777;
                z-index: 9999999;
                opacity: 0.6;
            }
        }
    }
}
</style>